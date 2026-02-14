import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertLead } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit application");
      }
      
      return api.leads.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Application Received",
        description: "We'll be in touch shortly.",
        duration: 5000,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
