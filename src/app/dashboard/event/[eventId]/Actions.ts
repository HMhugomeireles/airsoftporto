import { GameEventsModel } from "@/module/GameEvents"
import { GameEventStatusType, TicketPlayerType } from "@/module/type"


export type EventDetails = {
  event: {
    id: string
    name: string
    date: Date
    status: GameEventStatusType
  }
  players: {
    totalPlayers: number
    teams: {
      name: string
      totalPlayersPresents: number
    }[]
    list: TicketPlayerType[]
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
  const event = await GameEventsModel.getGameEventDetails(eventId);

  if (!event) {
    throw new Error('Event not found!')
  }

  const eventStats = GameEventsModel.getEventStats(event)
  const playersEventDetails = GameEventsModel.getPlayersEventDetails(event)

  return {
    event: {
      id: event.id,
      name: event.name,
      date: event.date,
      status: event.status
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

