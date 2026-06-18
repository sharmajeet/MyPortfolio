import { z } from "zod";

/** Known actions worth tracing. `metadata` carries the specifics (e.g. clicked href). */
export const eventTypes = [
  "page_view",
  "section_view",
  "project_view",
  "link_click",
  "resume_view",
  "resume_download",
  "contact_submit",
  "comment_submit",
] as const;

export const trackEventSchema = z.object({
  type: z.enum(eventTypes),
  path: z.string().max(512).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type TrackEventInput = z.infer<typeof trackEventSchema>;
export type EventType = (typeof eventTypes)[number];
