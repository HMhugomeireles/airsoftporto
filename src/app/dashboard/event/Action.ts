import { GameEventsModel } from "@/module/GameEvents";
import { GameEventWithStatsType } from "@/module/type";


export async function getAllEvents(): Promise<GameEventWithStatsType[]> {
  const events = await GameEventsModel.getAllEvents();
  console.log(JSON.stringify(events))

  const results = events.map(event => ({
    ...event,
    ...GameEventsModel.getEventStats(event)
  }))

  return results
}

