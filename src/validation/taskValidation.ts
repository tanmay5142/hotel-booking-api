import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum(["travel", "business", "personal", "other"]).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.enum(["travel", "business", "personal", "other"]).optional(),
  status: z.enum(["pending", "booked"]).optional(),
});