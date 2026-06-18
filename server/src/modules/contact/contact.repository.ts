import { ContactModel } from "./contact.model.js";
import type { ContactMessage, ContactRepository } from "./contact.types.js";
import type { CreateContactInput } from "./contact.validation.js";

/** Mongoose-backed implementation of the ContactRepository boundary. */
export class MongoContactRepository implements ContactRepository {
  async create(input: CreateContactInput): Promise<ContactMessage> {
    const document = await ContactModel.create(input);
    return {
      id: document.id,
      name: document.name,
      email: document.email,
      message: document.message,
      createdAt: document.get("createdAt"),
    };
  }
}
