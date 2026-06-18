import type { Request, Response } from "express";
import { getClientContext } from "../../shared/request/client-context.js";
import type { DateRange } from "./event.types.js";
import type { EventService } from "./event.service.js";
import type { TrackEventInput } from "./event.validation.js";

export class EventController {
  constructor(private readonly service: EventService) {}

  // Public: fire-and-forget tracking, always 202 so a failed write never breaks the UI.
  track = async (req: Request, res: Response): Promise<void> => {
    await this.service.track(req.body as TrackEventInput, getClientContext(req));
    res.status(202).json({ accepted: true });
  };

  // Admin: aggregated analytics, optionally bounded by ?from / ?to (ISO dates).
  stats = async (req: Request, res: Response): Promise<void> => {
    const stats = await this.service.getStats(parseRange(req));
    res.json(stats);
  };
}

function parseRange(req: Request): DateRange {
  const range: DateRange = {};
  const from = req.query.from;
  const to = req.query.to;
  if (typeof from === "string") range.from = new Date(from);
  if (typeof to === "string") range.to = new Date(to);
  return range;
}
