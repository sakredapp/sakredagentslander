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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const input = insertLeadSchema.parse(req.body);
    const db = getDb();
    const [lead] = await db.insert(leads).values(input).returning();
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
