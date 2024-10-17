'use server'
import { lucia } from "@/lib/lucia";
import { facebookOAuthClient } from "@/lib/providers/facebookOauth";
import { googleOAuthClient } from "@/lib/providers/googleOauth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


type ConsentUrlResult = {
  status: "success" | "error"
  url?: string;
  error?: string;
}

export async function getGoogleConsentUrl(): Promise<ConsentUrlResult> {
  try {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()

    cookies().set('codeVerifier', codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })
    cookies().set('state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })

    const authUrl = await googleOAuthClient.createAuthorizationURL(state, codeVerifier, {
      scopes: ['email', 'profile']
    })
    return { status: 'success', url: authUrl.toString() }

  } catch (error) {
    return { status: "error", error: 'Something went wrong' }
  }
}

export async function getFaceBookConsentUrl(): Promise<ConsentUrlResult> {
  try {
    const state = generateState()

    const authorizationURL = await facebookOAuthClient.createAuthorizationURL(state, {
      scopes: ["email", "public_profile"],
    })

    return { status: 'success', url: authorizationURL.toString() }
  } catch (error: any) {
    return { status: "error", error: 'Something went wrong' }
  }
}

// export const signUp = async (values: z.infer<typeof signUpSchema>) => {
//   try {
//       // if user already exists, throw an error
//       const existingUser = await prisma.user.findUnique({
//           where: {
//               email: values.email
//           }
//       })
//       if (existingUser) {
//           return { error: 'User already exists', success: false }
//       }

//       const hashedPassword = await new Argon2id().hash(values.password)

//       const user = await prisma.user.create({
//           data: {
//               email: values.email.toLowerCase(),
//               name: values.name,
//               hashedPassword
//           }
//       })
//       const session = await lucia.createSession(user.id, {})
//       const sessionCookie = await lucia.createSessionCookie(session.id)
//       cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
//       return { success: true }
//   } catch (error) {
//       return { error: 'Something went wrong', success: false }
//   }
// }

// export const signIn = async (values: z.infer<typeof signInSchema>) => {
//   const user = await prisma.user.findUnique({
//       where: {
//           email: values.email
//       }
//   })
//   if (!user || !user.hashedPassword) {
//       return { success: false, error: "Invalid Credentials!" }
//   }
//   const passwordMatch = await new Argon2id().verify(user.hashedPassword, values.password)
//   if (!passwordMatch) {
//       return { success: false, error: "Invalid Credentials!" }
//   }
//   // successfully login
//   const session = await lucia.createSession(user.id, {})
//   const sessionCookie = await lucia.createSessionCookie(session.id)
//   cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
//   return { success: true }
// }

export const logOut = async () => {
  const sessionCookie = await lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect('/')
}