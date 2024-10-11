import { formSchema } from "@/app/dashboard/event/create/shcema";
import { prisma } from "@/lib/prisma";
import { randomUuid } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const body: z.infer<typeof formSchema> = await request.json();

  try {
    
    const result = await prisma.gameEvent.create({
      data: {
        id: randomUuid(),
        name: body.eventName,
        date: body.eventDate,
        description: body.description!,
        duration: body.duration,
        openDoors: body.openDoors,
        startGame: body.startGame,
        teamGap: Number(body.teamGap),
        gameGoals: mapperGameGoals(body.gameGoals),
        location: {
          create: {
            id: randomUuid(),
            street: body.location.street,
            directions: body.location.directions
          }
        },
        squads: {
          createMany: {
            data: mapperSquads(body.teams)
          }
        },
        rules: {
          createMany: {
            data: mapperRules(body.rules)
          }
        },
        prices: {
          createMany: {
            data: mapperPrices(body.ticketPrices)
          }
        },
      }
    })

    return NextResponse.json({})
  } catch (error) {
    console.error(error)
    return NextResponse.json({})
  }
}

function mapperGameGoals(items: { goal: string }[]) {
  return items.map(item => item.goal)
}

function mapperSquads(items: { teamName: string, teamItems: string[], maxTeamPlayers: number, color: string }[]) {
  return items.map(item => ({
    id: randomUuid(),
    name: item.teamName,
    maxPlayers: item.maxTeamPlayers,
    color: item.color,
    items: item.teamItems
  }))
}

function mapperRules(items: { rule: string }[]) {
  return items.map(item => ({
    id: randomUuid(),
    description: item.rule
  }))
}

function mapperPrices(items: { type: "partner" | "normal", amount: number }[]) {
  return items.map(item => ({
    id: randomUuid(),
    type: item.type,
    amount: item.amount
  }))
}