import type { Request, Response } from "express";
import { getClientContext } from "../../shared/request/client-context.js";
import type { CommentService } from "./comment.service.js";
import type { CreateCommentInput } from "./comment.validation.js";

export class CommentController {
  constructor(private readonly service: CommentService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.submit(req.body as CreateCommentInput, getClientContext(req));
    res.status(201).json(result);
  };

  listApproved = async (_req: Request, res: Response): Promise<void> => {
    res.json(await this.service.listApproved());
  };

  listAll = async (_req: Request, res: Response): Promise<void> => {
    res.json(await this.service.listAll());
  };

  approve = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.service.approve(req.params.id ?? ""));
  };

  remove = async (req: Request, res: Response): Promise<void> => {
    await this.service.remove(req.params.id ?? "");
    res.status(204).end();
  };
}
