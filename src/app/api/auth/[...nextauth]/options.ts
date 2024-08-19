import type { NextAuthOptions } from "next-auth";
import BungieProvider from "next-auth/providers/bungie";
import GitHubProvider from "next-auth/providers/github";

export const options: NextAuthOptions = {
  providers: [
    BungieProvider({
      clientId: process.env.BUNGIE_CLIENT_ID,
      clientSecret: process.env.BUNGIE_CLIENT_SECRET,
      // The Bungie API doesn't like scope being set
      authorization: { params: { scope: '' } },
      httpOptions: { headers: { 'X-API-Key': process.env.BUNGIE_API_KEY } },
      // Correctly gets the current user info so that the existing `profile` definition works
      userinfo: {
        async request({ tokens, provider }) {
          return await fetch(
            'https://www.bungie.net/platform/User/GetMembershipsForCurrentUser',
            {
              headers: {
                ...provider.httpOptions.headers,
                authorization: `Bearer ${tokens.access_token}`
              }
            }
          ).then(async response => await response.json())
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};