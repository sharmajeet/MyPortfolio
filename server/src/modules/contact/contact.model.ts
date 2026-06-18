import { Schema, model } from "mongoose";
import type { CreateContactInput } from "./contact.validation.js";

const contactSchema = new Schema<CreateContactInput>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const ContactModel = model("Contact", contactSchema);
