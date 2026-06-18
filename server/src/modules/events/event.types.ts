import type { ClientContext } from "../../shared/request/client-context.types.js";

export interface CreateEventInput extends ClientContext {
  type: string;
  path?: string;
  metadata?: Record<string, unknown>;
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface Count {
  key: string;
  count: number;
}

export interface EventStats {
  totalEvents: number;
  uniqueVisitors: number;
  byType: Count[];
  topPaths: Count[];
  topReferrers: Count[];
  topLinks: Count[];
  topCountries: Count[];
  byBrowser: Count[];
  daily: Count[];
}

/** Persistence + read-model boundary for events. */
export interface EventRepository {
  record(input: CreateEventInput): Promise<void>;
  stats(range: DateRange): Promise<EventStats>;
}
