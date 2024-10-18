import { prisma } from "@/lib/prisma";
import { randomUuid } from "@/lib/utils";
import { NextResponse } from "next/server";

type CreateTeamBody = {
  name: string;
  userId: string;
}

export async function POST(request: Request) {
  try {
    const body: CreateTeamBody = await request.json()

    if (!body) {
      return NextResponse.json({ message: "Missing team name" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: body.userId
      }
    })

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }

    const teamMember = await prisma.teamMember.create({
      data: {
        id: randomUuid(),
        Team: {
          connectOrCreate: {
            where: {
              name: body.name
            },
            create: {
              id: randomUuid(),
              name: body.name
            }
          }
        },
        player: {
          connect: {
            id: user.id
          }
        }
      }
    })

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error create Team:', error);

    return NextResponse.json({ message: "Failed to create Team" }, { status: 500 });
  }
}


export async function GET(request: Request) {
  try {
    const team = await prisma.team.findMany({
      include: {
        members: {
          include: {
            player: true
          }
        }
      }
    })

    return NextResponse.json({team});
  } catch (error) {
    console.log(error)
    return NextResponse.json({});
  }
}