import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

const connectionString = process.env.SUPABASE_DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "SUPABASE_DATABASE_URL must be set. Did you forget to add your Supabase connection string?",
  );
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
