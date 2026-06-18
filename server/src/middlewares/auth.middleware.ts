import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../shared/auth/jwt.js";
import { UnauthorizedError } from "../shared/errors/app-error.js";

export interface AuthenticatedRequest extends Request {
  admin?: { id: string; email: string };
}

/** Guards admin-only routes: requires a valid Bearer token and attaches the admin to the request. */
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Missing or malformed Authorization header"));
  }

  try {
    const payload = verifyToken(header.slice("Bearer ".length));
    (req as AuthenticatedRequest).admin = { id: payload.sub, email: payload.email };
    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}
