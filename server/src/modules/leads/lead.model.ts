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

// Azure Cosmos DB (Mongo API) only allows sorting/filtering on indexed fields.
// A wildcard index covers every field, so `.sort({ createdAt })` works on Cosmos.
leadSchema.index({ "$**": 1 });

export const LeadModel = model("Lead", leadSchema);
