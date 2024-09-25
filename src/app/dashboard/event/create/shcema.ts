import { z } from "zod";

export const formSchema = z.object({
  eventName: z.string().min(1),
  eventDate: z.date(),
  location: z.object({
    street: z.string(),
    directions: z.string()
  }),
  duration: z.string(),
  openDoors: z.string(),
  startGame: z.string(),
  description: z.string().optional(),
  teamGap: z.string(),
  teams: z.array(z.object({
    teamName: z.string(),
    teamItems: z.array(z.string()),
    maxTeamPlayers: z.number(),
    color: z.string()
  })),
  ticketPrices: z.array(z.object({
    type: z.enum(['partner', 'normal']),
    amount: z.number()
  })),
  gameGoals: z.array(z.object({
    goal: z.string()
  })),
  rules: z.array(z.object({
    rule: z.string()
  }))
})