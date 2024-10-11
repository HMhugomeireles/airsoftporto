import { GameEventsModel } from "@/module/GameEvents";
import { GameEventWithStatsType } from "@/module/type";


export async function getAllEvents(): Promise<GameEventWithStatsType[]> {
  const events = await GameEventsModel.getAllEvents();
 
  const results = events.map(event => ({
    ...event,
    ...GameEventsModel.getEventStats(event)
  }))

  return results
}

