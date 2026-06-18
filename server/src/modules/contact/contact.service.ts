import type { ContactMessage, ContactRepository } from "./contact.types.js";
import type { CreateContactInput } from "./contact.validation.js";

/** Business logic for contact messages. Receives its repository, so it stays unaware of the database. */
export class ContactService {
  constructor(private readonly repository: ContactRepository) {}

  submit(input: CreateContactInput): Promise<ContactMessage> {
    return this.repository.create(input);
  }
}
