import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingCalendar } from "@/components/BookingCalendar";

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
  "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
  "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI",
  "WY",
] as const;

export type FormStage = "form" | "calendar" | "booked";

export function LeadForm({ onSuccess, onStageChange }: { onSuccess?: () => void; onStageChange?: (stage: FormStage) => void }) {
  const { mutate, isPending } = useCreateLead();
  const [submitted, setSubmitted] = useState(false);
  const submittedData = useRef<{ name: string; email: string; phone: string; leadId?: number }>({ name: "", email: "", phone: "" });

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      isLicensed: false,
      npn: "",
      licensedStates: [],
      licensingContext: "",
      smsConsent: false,
    },
  });

  const isLicensed = form.watch("isLicensed");

  function onSubmit(data: InsertLead) {
    const fullName = `${data.firstName} ${data.lastName}`;
    submittedData.current = { name: fullName, email: data.email, phone: data.phone };
    mutate(data, {
      onSuccess: (lead: any) => {
        submittedData.current.leadId = lead?.id ?? lead?.recruit_id;
        setSubmitted(true);
        onStageChange?.("calendar");
        if (onSuccess) onSuccess();
      },
    });
  }

  if (submitted) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-6 text-center space-y-5"
        >
          <div className="w-full">
            <BookingCalendar name={submittedData.current.name} email={submittedData.current.email} phone={submittedData.current.phone} leadId={submittedData.current.leadId} onBooked={() => onStageChange?.("booked")} />
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} data-testid="input-first-name" className="h-12 bg-white/50 border-gray-200 focus:border-[#C5A059] focus:ring-[#C5A059]/20" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} data-testid="input-last-name" className="h-12 bg-white/50 border-gray-200 focus:border-[#C5A059] focus:ring-[#C5A059]/20" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} data-testid="input-email" className="h-12 bg-white/50 border-gray-200 focus:border-[#C5A059] focus:ring-[#C5A059]/20" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(555) 000-0000"
                    data-testid="input-phone"
                    inputMode="tel"
                    className="h-12 bg-white/50 border-gray-200 focus:border-[#C5A059] focus:ring-[#C5A059]/20"
                    value={field.value}
                    onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isLicensed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you currently a licensed agent?</FormLabel>
              <Select 
                onValueChange={(val) => field.onChange(val === "yes")} 
                defaultValue={field.value ? "yes" : "no"}
              >
                <FormControl>
                  <SelectTrigger className="h-12 bg-white/50 border-gray-200 focus:border-[#C5A059] focus:ring-[#C5A059]/20" data-testid="select-licensed">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yes">Yes, I am licensed</SelectItem>
                  <SelectItem value="no">No, I am not licensed yet</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <AnimatePresence>
          {isLicensed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="npn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NPN (National Producer Number)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 0012345678" {...field} value={field.value ?? ""} data-testid="input-npn" maxLength={10} inputMode="numeric" className="h-12 bg-white/50 border-gray-200 focus:border-[#C5A059] focus:ring-[#C5A059]/20" />
                    </FormControl>
                    <p className="text-[11px] text-muted-foreground">10 digits — add leading zeros if yours is shorter (e.g. 0012345678)</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="licensedStates"
                render={({ field }) => {
                  const selected: string[] = field.value ?? [];
                  const toggle = (st: string) => {
                    const next = selected.includes(st)
                      ? selected.filter((s) => s !== st)
                      : [...selected, st];
                    field.onChange(next);
                  };
                  return (
                    <FormItem>
                      <FormLabel>States Licensed In</FormLabel>
                      <div
                        data-testid="select-states"
                        className="max-h-44 overflow-y-auto rounded-md border border-gray-200 bg-white/50 p-3"
                      >
                        <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5">
                          {US_STATES.map((st) => {
                            const isSelected = selected.includes(st);
                            return (
                              <button
                                key={st}
                                type="button"
                                data-testid={`chip-state-${st}`}
                                onClick={() => toggle(st)}
                                className={`py-1.5 text-[11px] font-medium rounded-full border text-center transition-colors ${
                                  isSelected
                                    ? "bg-[#D4B76E]/15 border-[#D4B76E]/40 text-[#B8A060]"
                                    : "bg-white border-gray-200 text-gray-400 hover:border-[#D4B76E]/30 hover:text-gray-500"
                                }`}
                              >
                                {st}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <FormField
          control={form.control}
          name="licensingContext"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Occupation / Context</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Real Estate Agent, Teacher, Sales..." {...field} value={field.value ?? ""} data-testid="input-context" className="h-12 bg-white/50 border-gray-200 focus:border-[#C5A059] focus:ring-[#C5A059]/20" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="smsConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="checkbox-sms-consent"
                  className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#C5A059] data-[state=checked]:border-[#C5A059]"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-xs text-gray-500 font-normal cursor-pointer">
                  I agree to receive SMS notifications related to my application, onboarding, and scheduling updates from Sakred Agents.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <DialogFooter className="pt-4">
          <Button type="submit" size="lg" className="w-full bg-gradient-to-b from-[#D4B76E] via-[#C5A059] to-[#B8944E] text-white border border-[#D4B76E]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] font-serif tracking-wide" data-testid="button-submit-application" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
