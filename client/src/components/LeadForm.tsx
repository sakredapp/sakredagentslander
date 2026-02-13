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
import { DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const { mutate, isPending } = useCreateLead();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      isLicensed: false,
      licensingContext: "",
    },
  });

  function onSubmit(data: InsertLead) {
    mutate(data, {
      onSuccess: () => {
        setSubmitted(true);
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
          className="flex flex-col items-center justify-center py-10 text-center space-y-6"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-serif text-[#0F172A]" data-testid="text-application-received">Application Received</h3>
            <p className="text-muted-foreground">Thank you for your interest. Please schedule your intro call below.</p>
          </div>
          
          <Button 
            variant="gold" 
            size="lg" 
            className="w-full sm:w-auto"
            data-testid="button-schedule-call"
            onClick={() => window.open("https://calendly.com", "_blank")}
          >
            Schedule Intro Call
          </Button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} data-testid="input-name" className="h-12 bg-white/50 border-gray-200 focus:border-[#C5A059] focus:ring-[#C5A059]/20" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
                  <Input placeholder="(555) 000-0000" {...field} data-testid="input-phone" className="h-12 bg-white/50 border-gray-200 focus:border-[#C5A059] focus:ring-[#C5A059]/20" />
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

        <DialogFooter className="pt-4">
          <Button type="submit" variant="navy" size="lg" className="w-full" data-testid="button-submit-application" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
