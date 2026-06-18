import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { eventRepository } from "../events/event.routes.js";
import { CommentController } from "./comment.controller.js";
import { MongoCommentRepository } from "./comment.repository.js";
import { CommentService } from "./comment.service.js";
import { createCommentSchema } from "./comment.validation.js";

const service = new CommentService(new MongoCommentRepository(), eventRepository);
const controller = new CommentController(service);

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

export const commentRouter = Router();

// Public
commentRouter.post("/", submitLimiter, validateBody(createCommentSchema), asyncHandler(controller.create));
commentRouter.get("/", asyncHandler(controller.listApproved));

// Admin
commentRouter.get("/all", requireAuth, asyncHandler(controller.listAll));
commentRouter.patch("/:id/approve", requireAuth, asyncHandler(controller.approve));
commentRouter.delete("/:id", requireAuth, asyncHandler(controller.remove));
