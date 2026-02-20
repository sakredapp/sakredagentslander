import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
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
  smsConsent: boolean("sms_consent").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads, {
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phone: z.string().min(14, "Please enter a complete phone number"),
  npn: z.string().optional().refine(
    (val) => !val || /^\d{1,10}$/.test(val),
    { message: "NPN must be up to 10 digits (numbers only)" }
  ),
  smsConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive SMS notifications",
  }),
}).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  isLicensed: true,
  npn: true,
  licensedStates: true,
  licensingContext: true,
  smsConsent: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
