import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const ticketId = url.searchParams.get('t');
    const eventId = url.searchParams.get('e');

    if (!ticketId || ! eventId) {
      return NextResponse.json({ message: "Not found" }, { status: 400 });
    }

    const event = await prisma.gameEvent.findFirst({
      where: {
        id: eventId
      }
    })
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId
      }
    })

    if (event === null || ticket === null || !event?.id && !ticket?.id) {
      return NextResponse.json({ message: "Not found" }, { status: 400 });
    }

    return redirect(`/dashboard/event/ticket/${event.id}/${ticket.id}`)
  } catch (error) {
    console.error('Error validate ticket:', error);

    return NextResponse.json({ message: "Error validate ticket" }, { status: 500 });
  }
}