import { EntryPlayer, Event, Locations, Prices, Rule, Squads, Ticket, User } from "@prisma/client";

export type EntryPlayerModel = EntryPlayer & {
  player: User
  squad: Squads
}

export type TicketModel = Ticket & {
  entries: EntryPlayerModel[]
}

export type EventModelType = Omit<Event, "locationsId"> & {
  squads: Squads[]
  rules: Rule[]
  prices: Prices[]
  location: Locations
  tickets: TicketModel[]
}


export type EventViewType = EventModelType & {
  eventMaxPlayers: number;
  playersAccepted: number;
  playersNotAccepted: number;
  playersStandby: number;
  maxPlayersRegister: number;
}