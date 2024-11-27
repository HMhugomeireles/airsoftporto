import { prisma } from "@/lib/prisma";
import { randomUuid } from "@/lib/utils";
import { Prices } from "@prisma/client";

type CreateTicketArgs = {
  ticketQRToken: string;
  date: Date;
  totalPrice: number;
  eventId: string;
  players: { 
    id: string;
    ticketType: string;
    squadId: string;
  }[]
}

async function createTicket({
  date,
  eventId,
  players,
  ticketQRToken,
  totalPrice
}: CreateTicketArgs) {
  const user = await prisma.user.findFirst({
    where: {
      id: '9f4a0a06-2384-4f18-8509-eaaa897929a1'
    }
  })
  const event = await prisma.gameEvent.findFirst({
    where: {
      id: '5a2cfc3c-bd03-426e-8a0f-d0703113873f'
    },
    select: {
      squads: true
    }
  })

  if (!user || !event || user === null || event === null) {
    return undefined
  }

  const ticket = await prisma.ticket.create({
    data: {
      date: new Date(),
      id: randomUuid(),
      ticketQRToken: `${new Date().getTime()}-${randomUuid()}`,
      totalPrice: 10,
    }
  })

  return ticket;
}

type UpdateTicketTransactionArgs = {
  paymentIntent: string;
  amount: number
  ticketId: string
}
async function updateTicketTransaction({ amount, paymentIntent, ticketId }: UpdateTicketTransactionArgs) {

}

type CalculateTotalTicketArg = {
  eventPrices: Prices[];
  players: {
    id: string;
    ticketType: "partner" | "normal";
    squadId: string;
  }[]
}
function calculateTotalTicket({ eventPrices, players }: CalculateTotalTicketArg) {
  const playersAmount = players.map(player => eventPrices.find(price => price.type === player.ticketType)?.amount).filter(item => item !== undefined)
  
  const totalAmount = playersAmount.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)

  return totalAmount; 
}

export const TicketsModel = {
  createTicket,
  updateTicketTransaction,
  calculateTotalTicket
}