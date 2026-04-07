import type { VercelRequest, VercelResponse } from "@vercel/node";

const CRM_BASE_URL = process.env.CRM_BASE_URL || "https://sakredcrm.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch(
      `${CRM_BASE_URL}/api/scheduling/available?type=admin&weeks=4`
    );
    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to fetch available slots from CRM",
      });
    }
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error("Error fetching available slots:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
