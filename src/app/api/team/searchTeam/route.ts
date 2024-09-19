import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const teamName = url.searchParams.get('teamName');

    if (!teamName) {
      return NextResponse.json({ message: "Missing team name" }, { status: 400 });
    }

    const teams = await prisma.team.findMany({
      where: {
        name: {
          contains: teamName
        }
      }
    })

    return NextResponse.json(teams);

  } catch (error) {
    console.error('Error fetching Teams:', error);

    return NextResponse.json({ message: "Failed to fetch Teams" }, { status: 500 });
  }
}