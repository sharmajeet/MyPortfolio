import type { ClientContext } from "../../shared/request/client-context.types.js";
import type { CaptureLeadInput } from "./lead.validation.js";

export interface CreateLeadInput extends ClientContext, CaptureLeadInput {
  purpose: string;
}

/** Flattened for easy admin listing and CSV export. */
export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  note?: string;
  purpose: string;
  sessionId?: string;
  country?: string;
  city?: string;
  browser?: string;
  os?: string;
  createdAt: Date;
}

export interface LeadRepository {
  create(input: CreateLeadInput): Promise<Lead>;
  list(): Promise<Lead[]>;
}
