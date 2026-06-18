import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { eventRepository } from "../events/event.routes.js";
import { LeadController } from "./lead.controller.js";
import { MongoLeadRepository } from "./lead.repository.js";
import { LeadService } from "./lead.service.js";
import { captureLeadSchema } from "./lead.validation.js";

const service = new LeadService(new MongoLeadRepository(), eventRepository);
const controller = new LeadController(service);

const resumeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

export const leadRouter = Router();

leadRouter.post("/resume", resumeLimiter, validateBody(captureLeadSchema), asyncHandler(controller.requestResume));
leadRouter.get("/", requireAuth, asyncHandler(controller.list));
leadRouter.get("/export", requireAuth, asyncHandler(controller.exportCsv));
