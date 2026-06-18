import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { ValidationError } from "../shared/errors/app-error.js";

/** Validates and replaces req.body with the parsed result, so controllers receive typed, trusted input. */
export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new ValidationError("Validation failed", result.error.flatten().fieldErrors));
    }
    req.body = result.data;
    next();
  };
}
