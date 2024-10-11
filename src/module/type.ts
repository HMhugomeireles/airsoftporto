import { GameEventStatus, Prisma, User } from "@prisma/client";


export type GameEventWithStatsType = GameEventType & {
  playersAccepted: number;
  playersNotAccepted: number;
  playersStandby: number;
  maxPlayersRegister: number;
  eventMaxPlayers: number;
}

export type GameEventType = Prisma.GameEventGetPayload<{
  include: {
    location: true,
    prices: true,
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
}>


export type TicketModelType = Prisma.TicketGetPayload<{
  include: {
    players: true
  }
}>

export type PlayerGameEvent = Prisma.TicketPlayerGetPayload<{
  include: {
    user: true
  }
}>

export type TicketPlayerType = Prisma.TicketPlayerGetPayload<{ 
  include: { 
    user: true, 
    squad: true 
  }
}>

export type UserWithTeamType = Prisma.UserGetPayload<{
  include: {
    TeamMember: true
  }
}>

export type GameEventStatusType = GameEventStatus
export type UserType = User