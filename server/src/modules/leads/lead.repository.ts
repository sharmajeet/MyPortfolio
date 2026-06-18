import { LeadModel } from "./lead.model.js";
import type { CreateLeadInput, Lead, LeadRepository } from "./lead.types.js";

export class MongoLeadRepository implements LeadRepository {
  async create(input: CreateLeadInput): Promise<Lead> {
    const document = await LeadModel.create(input);
    return toLead(document);
  }

  async list(): Promise<Lead[]> {
    const documents = await LeadModel.find().sort({ createdAt: -1 });
    return documents.map(toLead);
  }
}

function toLead(document: InstanceType<typeof LeadModel>): Lead {
  return {
    id: document.id,
    name: document.name,
    email: document.email,
    company: document.company ?? undefined,
    note: document.note ?? undefined,
    purpose: document.purpose,
    sessionId: document.sessionId ?? undefined,
    country: document.geo?.country ?? undefined,
    city: document.geo?.city ?? undefined,
    browser: document.device?.browser ?? undefined,
    os: document.device?.os ?? undefined,
    createdAt: document.get("createdAt"),
  };
}
