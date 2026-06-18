import type { ClientContext } from "../../shared/request/client-context.types.js";
import type { CreateCommentInput } from "./comment.validation.js";

export interface CreateComment extends ClientContext, CreateCommentInput {}

/** Full record, including moderation state and PII — admin view only. */
export interface Comment {
  id: string;
  name: string;
  email?: string;
  message: string;
  targetSlug?: string;
  approved: boolean;
  country?: string;
  createdAt: Date;
}

/** Safe projection shown publicly on the site. */
export interface PublicComment {
  id: string;
  name: string;
  message: string;
  targetSlug?: string;
  createdAt: Date;
}

export interface CommentRepository {
  create(input: CreateComment): Promise<Comment>;
  listApproved(): Promise<PublicComment[]>;
  listAll(): Promise<Comment[]>;
  approve(id: string): Promise<Comment | null>;
  remove(id: string): Promise<boolean>;
}
