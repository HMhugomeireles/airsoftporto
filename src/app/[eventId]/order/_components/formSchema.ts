import { z } from "zod";

export const formSchema = z.object({
    orderCode: z.string(),
    defaultPlayer: z.object({
        name: z.string(),
        apdName: z.string(),
        apdNumber: z.string(),
        ticketType: z.enum(['partnerTicket', 'normalTicket']).default("normalTicket"),
        squadId: z.string()
    }),
    extraPlayers: z.array(z.object({
        name: z.string(),
        apdName: z.string(),
        apdNumber: z.string(),
        ticketType: z.enum(['partnerTicket', 'normalTicket']).default("normalTicket"),
        squadId: z.string()
    })).default([])
})
