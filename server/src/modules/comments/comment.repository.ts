import mongoose from "mongoose";
import { CommentModel } from "./comment.model.js";
import type { Comment, CommentRepository, CreateComment, PublicComment } from "./comment.types.js";

export class MongoCommentRepository implements CommentRepository {
  async create(input: CreateComment): Promise<Comment> {
    const document = await CommentModel.create(input);
    return toComment(document);
  }

  async listApproved(): Promise<PublicComment[]> {
    const documents = await CommentModel.find({ approved: true }).sort({ createdAt: -1 });
    return documents.map((document) => ({
      id: document.id,
      name: document.name,
      message: document.message,
      targetSlug: document.targetSlug ?? undefined,
      createdAt: document.get("createdAt"),
    }));
  }

  async listAll(): Promise<Comment[]> {
    const documents = await CommentModel.find().sort({ createdAt: -1 });
    return documents.map(toComment);
  }

  async approve(id: string): Promise<Comment | null> {
    if (!mongoose.isValidObjectId(id)) return null;
    const document = await CommentModel.findByIdAndUpdate(id, { approved: true }, { new: true });
    return document ? toComment(document) : null;
  }

  async remove(id: string): Promise<boolean> {
    if (!mongoose.isValidObjectId(id)) return false;
    const result = await CommentModel.findByIdAndDelete(id);
    return result !== null;
  }
}

function toComment(document: InstanceType<typeof CommentModel>): Comment {
  return {
    id: document.id,
    name: document.name,
    email: document.email ?? undefined,
    message: document.message,
    targetSlug: document.targetSlug ?? undefined,
    approved: document.approved,
    country: document.geo?.country ?? undefined,
    createdAt: document.get("createdAt"),
  };
}
