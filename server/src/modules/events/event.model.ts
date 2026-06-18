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

export const EventModel = model("Event", eventSchema);
