import { EventModel } from "@/module/Events";
import { EntryPlayerModel, EventModelType } from "@/module/type";
import { EventStatus } from "@prisma/client";

export type EventDetails = {
  event: {
    id: string
    name: string
    date: Date
    status: EventStatus
  }
  players: {
    totalPlayers: number
    teams: {
      name: string
      totalPlayersPresents: number
    }[]
    list: EntryPlayerModel[]
  }
  cronoList: { 
    firstName: string
    lastName: string
    cronoMeasure: string
    bbWeight: string
    picture: string
  }[]
}

export async function getEventDetails(eventId: string): Promise<EventDetails> {
  const event = await EventModel.getEventDetails(eventId);

  if (!event) {
    throw new Error('Event not found!')
  }

  const eventStats = EventModel.getEventStats(event as EventModelType)
  const playersEventDetails = EventModel.getPlayersEventDetails(event as EventModelType)

  return {
    event: {
      id: event.id,
      name: event.name,
      date: event.date,
      status: event.eventStatus
    },
    players: {
      totalPlayers: eventStats.maxPlayersRegister,
      teams: playersEventDetails.teams,
      list: playersEventDetails.eventPlayers
    },
    cronoList: playersEventDetails.eventPlayers.map(eventPlayer => ({
      firstName: eventPlayer.player.firstName!,
      lastName: eventPlayer.player.lastName!,
      cronoMeasure: eventPlayer.cronoMeasure || '-',
      bbWeight: eventPlayer.bbWeight || '-',
      picture: eventPlayer.player.picture || ''
    }))
  }
}

