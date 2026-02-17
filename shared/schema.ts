import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("recruits", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  isLicensed: boolean("is_licensed").default(false),
  npn: text("npn"),
  licensedStates: text("licensed_states").array(),
  licensingContext: text("licensing_context"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads, {
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
}).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  isLicensed: true,
  npn: true,
  licensedStates: true,
  licensingContext: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
