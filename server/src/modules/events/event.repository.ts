import type { FilterQuery } from "mongoose";
import { EventModel } from "./event.model.js";
import type { Count, CreateEventInput, DateRange, EventRepository, EventStats } from "./event.types.js";

export class MongoEventRepository implements EventRepository {
  async record(input: CreateEventInput): Promise<void> {
    await EventModel.create(input);
  }

  async stats(range: DateRange): Promise<EventStats> {
    const match = buildMatch(range);

    const [totalEvents, uniqueVisitors, byType, topPaths, topReferrers, topLinks, topCountries, byBrowser, daily] =
      await Promise.all([
        EventModel.countDocuments(match),
        EventModel.distinct("sessionId", match).then((ids) => ids.filter(Boolean).length),
        this.topBy(match, "$type"),
        this.topBy({ ...match, path: { $ne: null } }, "$path"),
        this.topBy({ ...match, referrer: { $ne: null } }, "$referrer"),
        this.topBy({ ...match, type: "link_click" }, "$metadata.href"),
        this.topBy({ ...match, "geo.country": { $ne: null } }, "$geo.country"),
        this.topBy({ ...match, "device.browser": { $ne: null } }, "$device.browser"),
        this.dailyCounts(match),
      ]);

    return { totalEvents, uniqueVisitors, byType, topPaths, topReferrers, topLinks, topCountries, byBrowser, daily };
  }

  /** Top-N counts grouped by a single field expression. */
  private async topBy(match: FilterQuery<unknown>, field: string, limit = 10): Promise<Count[]> {
    const rows = await EventModel.aggregate<{ _id: string | null; count: number }>([
      { $match: match },
      { $group: { _id: field, count: { $sum: 1 } } },
      { $match: { _id: { $ne: null } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);
    return rows.map((row) => ({ key: String(row._id), count: row.count }));
  }

  private async dailyCounts(match: FilterQuery<unknown>): Promise<Count[]> {
    const rows = await EventModel.aggregate<{ _id: string; count: number }>([
      { $match: match },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    return rows.map((row) => ({ key: row._id, count: row.count }));
  }
}

function buildMatch(range: DateRange): FilterQuery<unknown> {
  if (!range.from && !range.to) return {};
  const createdAt: Record<string, Date> = {};
  if (range.from) createdAt.$gte = range.from;
  if (range.to) createdAt.$lte = range.to;
  return { createdAt };
}
