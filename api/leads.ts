import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { leads } from "../shared/schema";
import { z } from "zod";
import { insertLeadSchema } from "../shared/schema";

const { Pool } = pg;

function getDb() {
  const connectionString =
    process.env.SUPABASE_POOLER_URL || process.env.SUPABASE_DATABASE_URL;
  if (!connectionString) {
    throw new Error("SUPABASE_POOLER_URL must be set.");
  }
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  return drizzle(pool);
}

async function forwardToCRM(input: z.infer<typeof insertLeadSchema>) {
  const secret = process.env.RECRUIT_APPLY_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("RECRUIT_APPLY_WEBHOOK_SECRET not set — skipping CRM webhook");
    return;
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

  try {
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
    }
  } catch (err) {
    console.error("CRM webhook request failed:", err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const input = insertLeadSchema.parse(req.body);
    const db = getDb();
    const [lead] = await db.insert(leads).values(input).returning();

    // Fire-and-forget: forward to CRM webhook (don't block the response)
    forwardToCRM(input).catch((err) =>
      console.error("CRM webhook fire-and-forget error:", err)
    );

    return res.status(201).json(lead);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        field: err.errors[0].path.join("."),
      });
    }
    console.error("Error creating lead:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
