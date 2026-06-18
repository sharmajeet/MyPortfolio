import type { ClientContext } from "../../shared/request/client-context.types.js";
import { NotFoundError } from "../../shared/errors/app-error.js";
import type { EventRepository } from "../events/event.types.js";
import type { Comment, CommentRepository, PublicComment } from "./comment.types.js";
import type { CreateCommentInput } from "./comment.validation.js";

export class CommentService {
  constructor(
    private readonly comments: CommentRepository,
    private readonly events: EventRepository,
  ) {}

  /** Stored unapproved; surfaces on the site only after an admin approves it. */
  async submit(input: CreateCommentInput, context: ClientContext): Promise<{ id: string }> {
    const comment = await this.comments.create({ ...context, ...input });
    await this.events.record({ ...context, type: "comment_submit", metadata: { commentId: comment.id } });
    return { id: comment.id };
  }

  listApproved(): Promise<PublicComment[]> {
    return this.comments.listApproved();
  }

  listAll(): Promise<Comment[]> {
    return this.comments.listAll();
  }

  async approve(id: string): Promise<Comment> {
    const comment = await this.comments.approve(id);
    if (!comment) throw new NotFoundError("Comment not found");
    return comment;
  }

  async remove(id: string): Promise<void> {
    const removed = await this.comments.remove(id);
    if (!removed) throw new NotFoundError("Comment not found");
  }
}
