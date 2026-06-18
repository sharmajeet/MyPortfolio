import { z } from "zod";

export const createCommentSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().toLowerCase().email().max(254).optional(),
  message: z.string().trim().min(2, "Message is too short").max(2000),
  targetSlug: z.string().trim().max(120).optional(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
