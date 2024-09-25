import { ROLES } from '@/lib/constants';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { googleOAuthClient } from '@/lib/providers/googleOauth';
import { randomUuid } from '@/lib/utils';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

interface GoogleUser {
  id: string;
  email: string;
  verified_email: string;
  name: string;
  given_name: string;
  family_name:string
  picture: string;
  locale: string;
}

export async function GET(req: NextRequest, res: Response) {
  try {
    
    const url = new URL(req.url);
    const searchParams = url.searchParams;
  
    const code = searchParams.get('code');
    const state = searchParams.get('state');
  
    if (!code || !state) {
      return Response.json({ error: "Invalid request!1" }, { status: 400 })
    }
  
    const savedState = cookies().get('state')?.value
    const codeVerifier = cookies().get('codeVerifier')?.value
  
    if (!codeVerifier || !savedState) {
      console.error('no code verifier or state')
      return new Response('Invalid Request!2', { status: 400 })
    }
  
    if (state !== savedState) {
      console.error('state mismatch')
      return new Response('Invalid Request!3', { status: 400 })
    }
  
    const { accessToken, idToken } = await googleOAuthClient.validateAuthorizationCode(code, codeVerifier)
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: 'GET'
    })
  
    const googleData = (await googleResponse.json()) as any
  
    const existingUser = await prisma.user.findUnique({
      where: {
        email: googleData.email
      } // need update the user date from the provider
    })
  
    const userId = existingUser 
      ? existingUser.id
      : (await createUser(googleData))
  
    const session = await lucia.createSession(userId, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  
    return redirect(`/onboarding/${userId}`)
  } catch (error) {
    console.log(error)
    return redirect('/')
  }
}

async function createUser(userData: GoogleUser) {
  const user = await prisma.user.create({
    data: {
      id:  randomUuid(),
      email: userData.email,
      picture: userData.picture,
      provider: 'google',
      firstName: userData.given_name,
      lastName: userData.family_name,
      role: [ROLES.USER],
      permissions: []
    }
  })
  return user.id
}