import {  Facebook } from "arctic";

const facebookPathCallback = '/api/oauth/facebook';

export const facebookOAuthClient = new Facebook(
  process.env.FACEBOOK_CLIENT_ID!,
  process.env.FACEBOOK_CLIENT_SECRET!,
  process.env.NODE_ENV === "production" ? `${process.env.NEXT_PUBLIC_BASE_URL}${facebookPathCallback}` : `http://localhost:3000${facebookPathCallback}`
);
