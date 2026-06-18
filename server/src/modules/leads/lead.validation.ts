import { z } from "zod";

export const captureLeadSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().toLowerCase().email("Invalid email address").max(254),
  company: z.string().trim().max(150).optional(),
  note: z.string().trim().max(1000).optional(),
});

export type CaptureLeadInput = z.infer<typeof captureLeadSchema>;
