import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

type CreateTeamBody = {
  name: string;
}

export async function POST(request: Request) {
  try {
    const body = request.formData as CreateTeamBody

    if (!body || !body.name) {
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

    const teamCreated = await prisma.team.create({
      data: {
        id: randomUUID(),
        name: body.name,
      },
      select: {
        id: true,
        name: true
      }
    })

    return NextResponse.json(teamCreated);

  } catch (error) {
    console.error('Error create Team:', error);

    return NextResponse.json({ message: "Failed to create Team" }, { status: 500 });
  }
}