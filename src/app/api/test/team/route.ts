import { prisma } from "@/lib/prisma";
import { randomUuid } from "@/lib/utils";
import { NextResponse } from "next/server";

type CreateTeamBody = {
  name: string;
  userId: string;
}

export async function POST(request: Request) {
  try {
    const body = request.formData as unknown as CreateTeamBody

    if (!body) {
      return NextResponse.json({ message: "Missing team name" }, { status: 400 });
    }


    const isExistTeam = await prisma.team.findFirst({
      where: {
        name: body.name
      }
    })

    if (isExistTeam) {
      return NextResponse.json({ message: "This are previous register" }, { status: 400 });
    }

    const player = await prisma.user.findFirst({ where: { id: body.userId }, include: { TeamMember: true, TicketPlayer: true } })

    if (!player) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }

    const teamCreated = await prisma.team.create({
      data: {
        id: randomUuid(),
        name: body.name,
        members: {
          create: {
            id: randomUuid(),
            player: {
              connect: {

              }
            }
          }
        }
      }
    })

    return NextResponse.json(teamCreated);

  } catch (error) {
    console.error('Error create Team:', error);

    return NextResponse.json({ message: "Failed to create Team" }, { status: 500 });
  }
}