import type { NextFunction, Request, Response } from "express";

type AsyncRoute = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/** Forwards rejected promises to Express's error pipeline so controllers stay try/catch-free. */
export function asyncHandler(handler: AsyncRoute) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
}
