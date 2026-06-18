import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    type: { type: String, required: true, index: true },
    sessionId: { type: String, index: true },
    path: String,
    referrer: String,
    metadata: { type: Schema.Types.Mixed, default: {} },
    ip: String,
    userAgent: String,
    geo: { country: String, region: String, city: String },
    device: { browser: String, os: String, deviceType: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

// Azure Cosmos DB (Mongo API) only allows sorting/filtering/aggregating on indexed
// fields. A wildcard index covers every field, so the analytics range-match,
// `distinct`, and `$group` pipelines work on Cosmos.
eventSchema.index({ "$**": 1 });

export const EventModel = model("Event", eventSchema);
