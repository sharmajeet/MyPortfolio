import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { EventController } from "./event.controller.js";
import { MongoEventRepository } from "./event.repository.js";
import { EventService } from "./event.service.js";
import { trackEventSchema } from "./event.validation.js";

// Shared so other modules (e.g. leads) can record events through the same boundary.
export const eventRepository = new MongoEventRepository();
const controller = new EventController(new EventService(eventRepository));

export const eventRouter = Router();

eventRouter.post("/", validateBody(trackEventSchema), asyncHandler(controller.track));
eventRouter.get("/stats", requireAuth, asyncHandler(controller.stats));
