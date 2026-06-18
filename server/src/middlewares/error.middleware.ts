import type { NextFunction, Request, Response } from "express";
import { AppError, ValidationError } from "../shared/errors/app-error.js";
import { env } from "../config/env.js";
import { logger } from "../config/logger.js";

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
}

// Express identifies error handlers by their four-argument signature.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({ error: err.message, details: err.details });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (env.NODE_ENV !== "test") {
    logger.error(`Unhandled error: ${err instanceof Error ? err.stack ?? err.message : String(err)}`);
  }
  res.status(500).json({ error: "Internal server error" });
}
