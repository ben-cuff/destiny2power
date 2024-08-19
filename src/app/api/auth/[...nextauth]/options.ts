import type { NextAuthOptions } from "next-auth";
import BungieProvider from "next-auth/providers/bungie";

export const options: NextAuthOptions = {
  providers: [
    BungieProvider({
      clientId: process.env.BUNGIE_CLIENT_ID,
      clientSecret: process.env.BUNGIE_CLIENT_SECRET,
      // The Bungie API doesn't like scope being set
      authorization: { params: { scope: "" } },
      httpOptions: { headers: { "X-API-Key": process.env.BUNGIE_API_KEY } },
      userinfo: {
        async request({ tokens, provider }) {
          return await fetch(
            "https://www.bungie.net/platform/User/GetMembershipsForCurrentUser",
            {
              headers: {
                ...provider.httpOptions.headers,
                authorization: `Bearer ${tokens.access_token}`,
              },
            }
          ).then(async (response) => await response.json());
        },
      },
      profile(profile) {
        // Extract the membershipId from the response
        const membershipId = profile?.Response?.primaryMembershipId;

        // Extract the user's profile image if available
        const profileImage =
          profile?.Response?.bungieNetUser?.profilePicturePath;

        return {
          id: membershipId, // Use the membershipId as the user's ID
          name: profile?.Response?.bungieNetUser?.displayName || "Bungie User",
          email: null, // Bungie API doesn't return an email
          image: profileImage ? `https://www.bungie.net${profileImage}` : null, // Construct the full image URL
          membershipId: membershipId, // Store the membershipId for later use
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.membershipId = user.membershipId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.membershipId = token.membershipId;
      return session;
    },
  },
};
