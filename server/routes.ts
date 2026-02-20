import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

const CRM_BASE_URL = process.env.CRM_BASE_URL || "https://sakredcrm.com";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

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

  app.get("/api/scheduling/available", async (req, res) => {
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
      res.json(data);
    } catch (err) {
      console.error("Error fetching available slots:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/scheduling/book", async (req, res) => {
    try {
      const { slot_id, email, name, phone } = req.body;

      if (!slot_id || !email || !name || !phone) {
        return res.status(400).json({
          message: "Missing required fields: slot_id, email, name, phone",
        });
      }

      const response = await fetch(`${CRM_BASE_URL}/api/scheduling/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot_id, email, name, phone }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return res.status(response.status).json({
          message: errorData.message || "Booking failed",
        });
      }

      const data = await response.json();
      res.json(data);
    } catch (err) {
      console.error("Error booking slot:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
