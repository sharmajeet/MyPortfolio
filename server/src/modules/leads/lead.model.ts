import { Schema, model } from "mongoose";

const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    company: String,
    note: String,
    purpose: { type: String, default: "resume_download" },
    sessionId: String,
    ip: String,
    userAgent: String,
    geo: { country: String, region: String, city: String },
    device: { browser: String, os: String, deviceType: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const LeadModel = model("Lead", leadSchema);
