import type { Request, Response } from "express";
import type { ContactService } from "./contact.service.js";
import type { CreateContactInput } from "./contact.validation.js";

/** Translates HTTP to/from the service. Input is already validated by middleware. */
export class ContactController {
  constructor(private readonly service: ContactService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const message = await this.service.submit(req.body as CreateContactInput);
    res.status(201).json({ id: message.id, createdAt: message.createdAt });
  };
}
