import { NextAuthOptions, User } from "next-auth";
import BungieProvider from "next-auth/providers/bungie";
import { initializeApiSession } from "../../../../util/bungieapirequest";

declare module "next-auth" {
	interface User {
		membershipId?: string;
		membershipType?: number;
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
						},
					);
					const profile = await response.json();
					return {
						...profile,
					};
				},
			},
			profile(profile) {
				const membershipId = profile?.Response?.primaryMembershipId;
				const memberships = profile?.Response?.destinyMemberships || [];
				const primaryMembership = memberships.find(
					(m: { membershipId: any }) =>
						m.membershipId === membershipId,
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
				};

				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				// First-time login, save the `access_token`, its expiry and the `refresh_token`
				return {
					...token,
					access_token: account.access_token,
					expires_at: account.expires_at,
					refresh_token: account.refresh_token,
					membershipId: user.id,
					membershipType: user.membershipType,
				};
			} else if (Date.now() < (token.expires_at as number) * 1000) {
				// Subsequent logins, but the `access_token` is has not expired
				return token;
			} else {
				// Subsequent logins, but the `access_token` has expired, try to refresh it
				if (!token.refresh_token)
					throw new TypeError("Missing refresh_token");

				try {
					const refreshedToken = await refreshAccessToken(
						token.refresh_token as string,
					);

					return {
						...token,
						access_token: refreshedToken.accessToken,
						// Added to to the current timestamp to get the new expiry time
						expires_at: Math.floor(
							Date.now() / 1000 + refreshedToken.expiresIn,
						),
						refresh_token: refreshedToken.refreshToken,
						membershipId: token.membershipId,
						membershipType: token.membershipType,
					};
				} catch (error) {
					console.error(
						"Error refreshing access_token in jwt",
						error,
					);
					// If we fail to refresh the token, return an error so we can handle it on the page
					return {
						...token,
						error: "RefreshTokenError",
					};
				}
			}
		},
		async session({ session, token }) {
			session.user.membershipId = token.membershipId as string;
			session.user.membershipType = token.membershipType as number;
			session.accessToken = token.access_token as string;

			initializeApiSession(
				token.access_token as string,
				token.membershipType as number,
				token.membershipId as string,
			);

			return session;
		},
	},
};

export async function refreshAccessToken(refreshToken: string) {
	const url = "https://www.bungie.net/platform/app/oauth/token/";
	const clientId = process.env.BUNGIE_CLIENT_ID!;
	const clientSecret = process.env.BUNGIE_CLIENT_SECRET!;
	const credentials = `${clientId}:${clientSecret}`;

	// Generates base64 encoded string for basic auth
	const base64Credentials = Buffer.from(credentials).toString("base64");
	const headers = {
		"Content-Type": "application/x-www-form-urlencoded",
		Authorization: `Basic ${base64Credentials}`,
		"X-API-Key": process.env.BUNGIE_API_KEY || "",
	};
	const body = new URLSearchParams({
		grant_type: "refresh_token",
		refresh_token: refreshToken,
	});

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: headers,
			body: body.toString(),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		return {
			accessToken: data.access_token,
			refreshToken: data.refresh_token,
			expiresIn: data.expires_in,
		};
	} catch (error) {
		console.error("Error refreshing access token:", error);
		throw error;
	}
}
