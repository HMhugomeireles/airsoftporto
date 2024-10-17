import { UserWithTeamMembers } from '@/module/type'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Lucia, generateId } from 'lucia'
import { cookies } from 'next/headers'
import { ROLES } from './constants'
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
    hasAdminPrecision: boolean;
}

async function getUserSession() {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
    if (!sessionId) {
        return undefined
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

        return user
    } catch (error) {
        return undefined
    }
}

export const getUser = async () => {
    try {
        const user = await getUserSession();

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
        return undefined;
    }
}

export async function getUserAuthorization() {
    const user = await getUser();

    if (!user) {
        return null;
    }

    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName!,
        lastName: user.lastName!,
        active: user.active,
        picture: user.picture!,
        hasAdminPrecision: user.role.includes(ROLES.ADMIN)
    }
}

export async function getUserTeamDetails(): Promise<UserWithTeamMembers | undefined> {
    try {
        const user = await getUserSession();
        
        if (!user) {
            return undefined;
        }

        const userWithTeam = await prisma.user.findFirst({
            include: {
                TeamMember: {
                    include: {
                        Team: {
                            include: {
                                members: {
                                    include: {
                                        player: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!userWithTeam) {
            return undefined
        }

        return userWithTeam
        
    } catch (error) {
        console.log(error)
        return undefined;
    }
}