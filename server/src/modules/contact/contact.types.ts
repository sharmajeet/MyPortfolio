import type { CreateContactInput } from "./contact.validation.js";

export interface ContactMessage extends CreateContactInput {
  id: string;
  createdAt: Date;
}

/** Persistence boundary. The service depends on this, never on Mongoose directly (DIP). */
export interface ContactRepository {
  create(input: CreateContactInput): Promise<ContactMessage>;
}
