import { Router } from "express";
import rateLimit from "express-rate-limit";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { ContactController } from "./contact.controller.js";
import { MongoContactRepository } from "./contact.repository.js";
import { ContactService } from "./contact.service.js";
import { createContactSchema } from "./contact.validation.js";

// Composition root for the module: pick concrete implementations and wire them once.
const controller = new ContactController(new ContactService(new MongoContactRepository()));

// Public, unauthenticated endpoint — throttle to blunt spam and abuse.
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { error: "Too many messages, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const contactRouter = Router();

contactRouter.post(
  "/",
  submitLimiter,
  validateBody(createContactSchema),
  asyncHandler(controller.create),
);
