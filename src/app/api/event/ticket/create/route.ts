import { TicketsModel } from "@/module/Tickets";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const result = await TicketsModel.createTicket()

    return NextResponse.json({result})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'error'})
  }
}