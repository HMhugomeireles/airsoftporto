import { z } from "zod";

export const formSchema = z.object({
    orderCode: z.string(),
    allInSameSquad: z.boolean().default(true),
    defaultPlayer: z.object({
        name: z.string(),
        apdName: z.string(),
        apdNumber: z.number().nullable(),
        ticketType: z.enum(['partner', 'normal']).default("normal"),
        squadId: z.string()
    }),
    teamMembersSelect: z.array(z.object({
        memberId: z.string(),
        name: z.string(),
        ticketType: z.enum(['partner', 'normal']).default("normal"),
        squadId: z.string()
    })).default([]),
    extraPlayers: z.array(z.object({
        id: z.string(),
        name: z.string(),
        apdName: z.string(),
        apdNumber: z.string(),
        ticketType: z.enum(['partner', 'normal']).default("normal"),
        squadId: z.string()
    })).default([])
})
