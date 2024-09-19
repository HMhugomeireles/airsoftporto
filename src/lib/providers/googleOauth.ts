import {  Google } from "arctic";

const googlePathCallback = '/api/oauth/google';

export const googleOAuthClient = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.NODE_ENV === "production" ? `${process.env.NEXT_PUBLIC_BASE_URL}${googlePathCallback}` : `http://localhost:3000${googlePathCallback}`
);
