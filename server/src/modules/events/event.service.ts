import type { ClientContext } from "../../shared/request/client-context.types.js";
import type { DateRange, EventRepository, EventStats } from "./event.types.js";
import type { TrackEventInput } from "./event.validation.js";

export class EventService {
  constructor(private readonly repository: EventRepository) {}

  track(input: TrackEventInput, context: ClientContext): Promise<void> {
    return this.repository.record({ ...context, ...input });
  }

  getStats(range: DateRange): Promise<EventStats> {
    return this.repository.stats(range);
  }
}
