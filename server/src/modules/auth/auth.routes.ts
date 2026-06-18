import { Router } from "express";
import rateLimit from "express-rate-limit";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { AuthController } from "./auth.controller.js";
import { MongoAdminRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";

export const authService = new AuthService(new MongoAdminRepository());
const controller = new AuthController(authService);

// Throttle login to slow brute-force attempts.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRouter = Router();

authRouter.post("/login", loginLimiter, validateBody(loginSchema), asyncHandler(controller.login));
