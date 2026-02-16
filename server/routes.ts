import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  const CALENDLY_EVENT_TYPE = "https://api.calendly.com/event_types/ab67cb68-3133-477a-b9ea-601d07a57489";
  const CALENDLY_SLUG = "https://calendly.com/sakredhealth/opportunity";

  app.get("/api/calendly/available-times", async (req, res) => {
    try {
      const apiKey = process.env.CALENDLY_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ message: "Calendly API key not configured" });
      }

      const now = new Date();
      const startTime = now.toISOString();
      const endDate = new Date(now);
      endDate.setDate(endDate.getDate() + 14);
      const endTime = endDate.toISOString();

      const url = `https://api.calendly.com/event_type_available_times?event_type=${encodeURIComponent(CALENDLY_EVENT_TYPE)}&start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Calendly API error:", response.status, errorBody);
        return res.status(response.status).json({ message: "Failed to fetch available times" });
      }

      const data = await response.json();
      const slots = data.collection || [];

      const grouped: Record<string, string[]> = {};
      for (const slot of slots) {
        const startDate = slot.start_time.split("T")[0];
        if (!grouped[startDate]) {
          grouped[startDate] = [];
        }
        grouped[startDate].push(slot.start_time);
      }

      res.json({ dates: grouped, calendlySlug: CALENDLY_SLUG });
    } catch (err) {
      console.error("Error fetching Calendly times:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      res.status(201).json(lead);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
