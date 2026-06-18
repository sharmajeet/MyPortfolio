import type { ClientContext } from "../../shared/request/client-context.types.js";
import type { EventRepository } from "../events/event.types.js";
import type { Lead, LeadRepository } from "./lead.types.js";
import type { CaptureLeadInput } from "./lead.validation.js";

export class LeadService {
  constructor(
    private readonly leads: LeadRepository,
    private readonly events: EventRepository,
  ) {}

  /** Stores the visitor's details, then logs the download as an event so it shows up in analytics too. */
  async captureForResume(input: CaptureLeadInput, context: ClientContext): Promise<Lead> {
    const lead = await this.leads.create({ ...context, ...input, purpose: "resume_download" });
    await this.events.record({
      ...context,
      type: "resume_download",
      metadata: { leadId: lead.id, email: lead.email },
    });
    return lead;
  }

  list(): Promise<Lead[]> {
    return this.leads.list();
  }
}
