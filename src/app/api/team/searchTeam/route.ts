import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { teamName }: { teamName: string } = await request.json();

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