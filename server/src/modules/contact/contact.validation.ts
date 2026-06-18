import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().toLowerCase().email("Invalid email address").max(254),
  message: z.string().trim().min(10, "Message is too short").max(5000),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
