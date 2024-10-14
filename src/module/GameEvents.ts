import { prisma } from "@/lib/prisma";
import { Squad } from "@prisma/client";
import { GameEventType, TicketModelType } from "./type";


function getGameEventMaxPlayers(squads: Squad[]) {
  return {
    eventMaxPlayers: squads.reduce((prev, curr) => prev + curr.maxPlayers, 0)
  }
}

function getNumberPlayersStatus(tickets: TicketModelType[]) {
  let playersAccepted = 0;
  let playersNotAccepted = 0;
  let playersStandby = 0;
  for (const ticket of tickets) {
    for (const player of ticket.players) {
      if (player.entryPlayerStatus === "ACCEPTED") {
        playersAccepted += 1
        continue;
      }
      if (player.entryPlayerStatus === "NOT_ACCEPTED") {
        playersNotAccepted += 1
        continue;
      }
      if (player.entryPlayerStatus === "STANDBY") {
        playersStandby += 1
        continue;
      }
    }
  }

  return {
    playersAccepted,
    playersNotAccepted,
    playersStandby,
    maxPlayersRegister: playersAccepted + playersNotAccepted + playersStandby
  }
}

async function getAllGameEventPlayers(eventId: string) {
  const event = await getGameEventDetails(eventId);

  if (!event) {
    throw new Error('Event not found!')
  }

  const playersList = event.tickets.map(ticket => ticket.players.map(player => player))

  return {
    playersList
  }
}

async function getGameEventDetails(eventId: string): Promise<GameEventType | null> {
  const event = await prisma.gameEvent.findFirst({
    where: {
      id: eventId
    },
    include: {
      prices: true,
      location: true,
      rules: true,
      squads: true,
      tickets: {
        include: {
          players: {
            include: {
              user: true
            }
          }
        }
      }
    }
  })

  return event
}

async function getAllEvents(): Promise<GameEventType[] | []> {
  const event = await prisma.gameEvent.findMany({
    include: {
      prices: true,
      location: true,
      rules: true,
      squads: true,
      tickets: {
        include: {
          players: {
            include: {
              user: true
            }
          }
        }
      }
    }
  })

  return event
}

function getEventStats(event: GameEventType) {
  return {
    ...getNumberPlayersStatus(event.tickets),
    ...getGameEventMaxPlayers(event.squads)
  }
}

function getPlayersEventDetails(event: GameEventType) {
  const eventPlayers: any[] = [];
  event.tickets.map(ticket => ticket.players.map(player => eventPlayers.push(player)));

  const teams = []
  for (const eventSquad of event.squads) {
    const team = eventPlayers.filter(player => player.squad.name === eventSquad.name)

    teams.push({
      name: eventSquad.name,
      totalPlayersPresents: team.length,
      teamList: team
    })
  }

  return {
    eventPlayers,
    teams
  }
}

export const GameEventsModel = {
  getAllGameEventPlayers,
  getEventStats,
  getAllEvents,
  getGameEventDetails,
  getPlayersEventDetails
}