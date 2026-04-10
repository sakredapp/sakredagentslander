import type { VercelRequest, VercelResponse } from "@vercel/node";

const CRM_BASE_URL = process.env.CRM_BASE_URL || "https://sakredcrm.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { slot_id, email, name, phone, recruit_id } = req.body;

    if (!slot_id || !email || !name || !phone) {
      return res.status(400).json({
        message: "Missing required fields: slot_id, email, name, phone",
      });
    }

    const response = await fetch(`${CRM_BASE_URL}/api/scheduling/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot_id, email, name, phone, recruit_id }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        message: errorData.message || "Booking failed",
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error("Error booking slot:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
