import { ROLES } from "@/lib/constants";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { facebookOAuthClient } from "@/lib/providers/facebookOauth";
import { getBaseURl, randomUuid } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface FacebookUser {
  first_name: string;
  last_name: string;
  email: string;
  picture: {
    url: string;
  }
}

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url)
    const searchParams = url.searchParams

    const code = searchParams.get("code")

    if (!code) {
      return Response.json({ error: "Invalid request" }, { status: 400 })
    }

    const { accessToken, accessTokenExpiresAt } =
      await facebookOAuthClient.validateAuthorizationCode(code)

    const facebookRes = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,first_name,last_name,email,picture`,
      { method: "GET" }
    )

    const facebookData = (await facebookRes.json()) as FacebookUser

    const existingUser = await prisma.user.findUnique({
      where: {
        email: facebookData.email
      } // need update the user date from the provider
    })
  
    const userId = existingUser 
      ? existingUser.id
      : (await createUser(facebookData))
  
    const session = await lucia.createSession(userId, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return NextResponse.redirect(`${getBaseURl()}/onboarding/${userId}`)
  } catch (error: any) {
    return NextResponse.redirect(getBaseURl())
  }
}

async function createUser(userData: FacebookUser) {
  const user = await prisma.user.create({
    data: {
      id:  randomUuid(),
      email: userData.email,
      picture: userData.picture.url,
      provider: 'facebook',
      firstName: userData.first_name,
      lastName: userData.last_name,
      role: [ROLES.USER],
      permissions: []
    }
  })
  return user.id
}