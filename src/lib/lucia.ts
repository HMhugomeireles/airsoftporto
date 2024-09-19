import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Lucia, generateId } from 'lucia'
import { cookies } from 'next/headers'
import { prisma } from './prisma'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export { generateId }

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        name: 'airsoft-porto-auth-cookie',
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    },
})

export type User = {
    id: string;
    email: string;
    active: boolean;
    picture: string | null;
    firstName: string | null;
    lastName: string | null;
    role: string[];
} 

export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
    if (!sessionId) {
        return null
    }
    try {
        const { session, user } = await lucia.validateSession(sessionId)
        if (session && session.fresh) {
            // refreshing their session cookie
            const sessionCookie = await lucia.createSessionCookie(session.id)
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }
        if (!session) {
            const sessionCookie = await lucia.createBlankSessionCookie()
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }

        const dbUser = await prisma.user.findUnique({
            where: {
                id: user?.id
            },
            select: {
                id: true,
                email: true,
                picture: true,
                active: true,
                firstName: true,
                lastName: true,
                role: true,
            }
        })
        return dbUser

    } catch (error) {
        console.log(error)
    }
}