"use server";

import { getUserSession } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { createStripeCheckoutLink } from "@/lib/stripe";
import { TicketsModel } from "@/module/Tickets";
import { z } from "zod";
import { formSchema } from "./formSchema";


export type FormState = {
    fields?: Record<string, string>;
    issues?: string[];
    urlRedirect: string | undefined;
    isValid: boolean;
};

export async function handlerSubmitOrder(data: z.infer<typeof formSchema>): Promise<string | undefined> {
    const result = formSchema.safeParse(data);
    const userSession = await getUserSession();

    if (!userSession || !result.data) {
        return undefined;
    }

    const event = await prisma.gameEvent.findFirst({
        where: {
            id: result.data?.eventId
        },
        include: {
            prices: true
        }
    })

    if (!event) {
        return undefined;
    }
    const players = [
        { id: result.data?.defaultPlayer.id, ticketType: result.data?.defaultPlayer.ticketType, squadId: result.data?.defaultPlayer.squadId },
        ...result.data?.teamMembersSelect.map(member => ({ id: member.memberId, ticketType: member.ticketType, squadId: member.squadId })),
        ...result.data?.extraPlayers.map(player => ({ id: player.id, ticketType: player.ticketType, squadId: player.squadId }))
    ]

    const totalAmount = TicketsModel.calculateTotalTicket({
        eventPrices: event.prices, 
        players
    })

    console.log({totalAmount})
    const ticket = await TicketsModel.createTicket({
        date: new Date(),
        eventId: event?.id,
        totalPrice: totalAmount,
        ticketQRToken: result.data?.orderCode!,
        players: []
    });

    const checkoutLink = await createStripeCheckoutLink({
        eventId: (result.data?.eventId) as string,
        orderId: (result.data?.orderCode) as string,
        ticketId: (ticket?.id) as string,
        product: {
            amount: 3.00,
            productName: event.name,
            productDescription: event.description
        },
        customer: {
            email: `${userSession.user?.email}`
        }
    })

    if (!checkoutLink) {
        return undefined
    }

    return checkoutLink
}

