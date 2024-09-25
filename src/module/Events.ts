import { prisma } from "@/lib/prisma";
import { EntryPlayerStatus, Squads } from "@prisma/client";
import { EntryPlayerModel, EventModelType, TicketModel } from "./type";

const options = {
  date: true,
  description: true,
  duration: true,
  eventStatus: true,
  gameGoals: true,
  id: true,
  location: true,
  name: true,
  openDoors: true,
  prices: true,
  rules: true,
  startGame: true,
  teamGap: true,
  squads: true,
  tickets: {
    select: {
      id: true,
      isPayed: true,
      ticketQRToken: true,
      token: true,
      isChecked: true,
      totalPrice: true,
      entries: {
        select: {
          id: true,
          entryPlayerStatus: true,
          hasCheckIn: true,
          cronoMeasure: true,
          bbWeight: true,
          player: true
        }
      }
    }
  }
}

function getEventMaxPlayers(squads: Squads[]) {
  return {
    eventMaxPlayers: squads.reduce((prev, curr) => prev + curr.maxPlayers, 0)
  }
}

function getNumberPlayersStatus(tickets: TicketModel[]) {
  let playersAccepted = 0;
  let playersNotAccepted = 0;
  let playersStandby = 0;
  for (const ticket of tickets) {
    for (const player of ticket.entries) {
      if (player.entryPlayerStatus === EntryPlayerStatus.ACCEPTED) {
        playersAccepted += 1
        continue;
      }
      if (player.entryPlayerStatus === EntryPlayerStatus.NOT_ACCEPTED) {
        playersNotAccepted += 1
        continue;
      }
      if (player.entryPlayerStatus === EntryPlayerStatus.STANDBY) {
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

async function getAllEventPlayers(eventId: string) {
  const event = await getEventDetails(eventId);

  if (!event) {
    throw new Error('Event not found!')
  }

  const playersList = event.tickets.map(ticket => ticket.entries.map(player => player))

  return {
    playersList
  }
}

async function getEventDetails(eventId: string) {
  const event = await prisma.event.findFirst({
    where: {
      id: eventId
    },
    select: {
      ...options
    }
  })

  return event
}

async function getAllEvents() {
  const event = await prisma.event.findMany({
    select: {
      ...options
    }
  })

  return event
}

function getEventStats(event: EventModelType) {
  return {
    ...getNumberPlayersStatus(event.tickets),
    ...getEventMaxPlayers(event.squads)
  }
}

function getPlayersEventDetails(event: EventModelType) {
  const eventPlayers: EntryPlayerModel[] = [];
  event.tickets.map(ticket => ticket.entries.map(player => eventPlayers.push(player)));

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

export const EventModel = {
  getAllEventPlayers,
  getEventStats,
  getAllEvents,
  getEventDetails,
  getPlayersEventDetails
}