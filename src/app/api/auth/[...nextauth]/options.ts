import { NextAuthOptions, User } from "next-auth";
import BungieProvider from "next-auth/providers/bungie";
import { initializeApiSession } from "@/util/bungieApiRequest";

declare module "next-auth" {
	interface User {
		membershipId?: string;
		membershipType?: number;
		accessToken?: string; // Add accessToken to User interface
	}

	interface Session {
		user: User & {
			membershipId?: string;
			membershipType?: number;
		};
		accessToken?: string;
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		BungieProvider({
			clientId: process.env.BUNGIE_CLIENT_ID,
			clientSecret: process.env.BUNGIE_CLIENT_SECRET,
			authorization: { params: { scope: "" } },
			httpOptions: {
				headers: { "X-API-Key": process.env.BUNGIE_API_KEY },
			},
			userinfo: {
				async request({ tokens, provider }) {
					const response = await fetch(
						"https://www.bungie.net/platform/User/GetMembershipsForCurrentUser",
						{
							headers: {
								...((provider.httpOptions?.headers ??
									{}) as Record<string, string>),
								authorization: `Bearer ${tokens.access_token}`,
							},
						}
					);
					const profile = await response.json();
					return {
						...profile,
						accessToken: tokens.access_token, // Include access token in the profile
					};
				},
			},
			profile(profile, tokens) {
				const membershipId = profile?.Response?.primaryMembershipId;
				const memberships = profile?.Response?.destinyMemberships || [];
				const primaryMembership = memberships.find(
					(m: { membershipId: any }) =>
						m.membershipId === membershipId
				);

				const profileImage =
					profile?.Response?.bungieNetUser?.profilePicturePath;

				const user: User = {
					id: membershipId,
					name:
						profile?.Response?.bungieNetUser?.displayName ||
						"Bungie User",
					email: null,
					image: profileImage
						? `https://www.bungie.net${profileImage}`
						: null,
					membershipId: membershipId,
					membershipType: primaryMembership?.membershipType,
					accessToken: tokens.access_token, // Store access token in the user object
				};

				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				token.membershipId = user.membershipId;
				token.membershipType = user.membershipType;
				token.accessToken = account.access_token;
			}
			initializeApiSession(
				(token?.accessToken || "") as string,
				(token?.membershipType || -2) as number,
				(token?.membershipId || "") as string
			);
			return token;
		},
		async session({ session, token }) {
			session.user.membershipId = token.membershipId as string;
			session.user.membershipType = token.membershipType as number;
			session.accessToken = token.accessToken as string;

			return session;
		},
	},
};
