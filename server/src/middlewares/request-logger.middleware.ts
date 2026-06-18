import type { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger.js";

const GREEN = "\x1b[32m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

function statusColor(status: number): string {
  if (status >= 500) return RED;
  if (status >= 400) return YELLOW;
  if (status >= 300) return CYAN;
  return GREEN;
}

/** Logs one line per request once it completes: METHOD path ?query STATUS elapsedMs ip */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
    const [path, query] = req.originalUrl.split("?");
    const status = res.statusCode;
    const parts = [
      req.method,
      path,
      query ? `?${query}` : "",
      `${statusColor(status)}${status}${RESET}`,
      elapsedMs.toFixed(2),
      req.ip ?? "",
    ].filter(Boolean);
    logger.info(parts.join(" "));
  });

  next();
}
