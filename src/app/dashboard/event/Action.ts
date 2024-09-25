import { EventModel } from "@/module/Events";
import { EventModelType } from "@/module/type";

export async function getAllEvents() {
  const events = await EventModel.getAllEvents();

  const results = events.map(event => ({
    ...event,
    ...EventModel.getEventStats(event as EventModelType)
  }))

  return results
}

