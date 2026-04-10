import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

// Inline validation schema — avoids importing drizzle (CJS) which crashes
// Vercel serverless functions when package.json has "type": "module"
const insertLeadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phone: z.string().min(14, "Please enter a complete phone number"),
  isLicensed: z.boolean().optional().default(false),
  npn: z.string().optional().refine(
    (val) => !val || /^\d{1,10}$/.test(val),
    { message: "NPN must be up to 10 digits (numbers only)" }
  ),
  licensedStates: z.array(z.string()).optional().default([]),
  licensingContext: z.string().optional().default(""),
  smsConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive SMS notifications",
  }),
});

type LeadInput = z.infer<typeof insertLeadSchema>;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const input = insertLeadSchema.parse(req.body);

    // Forward to CRM — the CRM handles database insertion
    const secret = process.env.RECRUIT_APPLY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("RECRUIT_APPLY_WEBHOOK_SECRET not set");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const payload = {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      phone: input.phone.replace(/\D/g, ""),
      is_licensed: input.isLicensed ?? false,
      npn: input.npn || "",
      licensed_states: input.licensedStates ?? [],
      licensing_context: input.licensingContext || "",
      source: "landing_page",
    };

    const resp = await fetch("https://sakredcrm.com/api/webhooks/recruit-apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": secret,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const body = await resp.text();
      console.error(`CRM webhook returned ${resp.status}: ${body}`);
      return res.status(502).json({ message: "Failed to submit application to CRM" });
    }

    const result = await resp.json();
    return res.status(201).json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        field: err.errors[0].path.join("."),
      });
    }
    console.error("Error creating lead:", err);
    const detail = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ message: "Internal server error", detail });
  }
}
