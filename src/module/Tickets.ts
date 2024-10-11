import { prisma } from "@/lib/prisma"
import { randomUuid } from "@/lib/utils"

async function createTicket() {
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

  await prisma.ticket.create({
    data: {
      date: new Date(),
      id: randomUuid(),
      ticketQRToken: `${new Date().getTime()}-${randomUuid()}`,
      totalPrice: 10,
      
    }
  })
}

export const TicketsModel = {
  createTicket
}