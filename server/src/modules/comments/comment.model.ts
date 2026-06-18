import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    message: { type: String, required: true, trim: true },
    targetSlug: { type: String, index: true },
    approved: { type: Boolean, default: false, index: true },
    sessionId: String,
    ip: String,
    userAgent: String,
    geo: { country: String, region: String, city: String },
    device: { browser: String, os: String, deviceType: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const CommentModel = model("Comment", commentSchema);
