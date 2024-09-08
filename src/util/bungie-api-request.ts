import { BungieComponents } from "@/types/bungie-components";

// class used to store data about an authSession
class ApiSession {
	constructor(
		public readonly accessToken: string,
		public readonly membershipType: number,
		public readonly membershipId: string,
	) {}

	getAccessToken(): string {
		return this.accessToken;
	}

	getMembershipType(): number {
		return this.membershipType;
	}

	getMembershipId(): string {
		return this.membershipId;
	}
}

let apiSession: ApiSession;

/**
 * Initializes the API session with the provided access token, membership type, and membership ID.
 * @param accessToken - The access token for the API session.
 * @param membershipType - The membership type for the API session.
 * @param membershipId - The membership ID for the API session.
 */
export function initializeApiSession(
	accessToken: string,
	membershipType: number,
	membershipId: string,
) {
	apiSession = new ApiSession(accessToken, membershipType, membershipId);
}

/**
 * Makes the getProfile API call
 * @param component - the BungieComponent that the API call is using
 * @returns - the response to the api call
 */
export async function requestProfileComponent(
	component: BungieComponents,
): Promise<any> {
	try {
		const response = await fetch(
			`https://www.bungie.net/Platform/Destiny2/${apiSession.membershipType}/Profile/${apiSession.membershipId}/?components=${component}`,
			{
				headers: new Headers({
					Authorization: `Bearer ${apiSession.accessToken}` || "",
					"X-API-Key": process.env.BUNGIE_API_KEY || "",
				}),
			},
		);

		if (!response.ok) {
			throw new Error(
				`Error fetching component ${component}: ${response.status} ${response.statusText}`,
			);
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}
/**
 * Gets the DestinyInventoryItemDefinition for a item hash from the manifest
 * @param itemHash - the given item hash that you want information about.
 * @returns - the response from the API
 */
export async function requestItemDefinition(itemHash: number): Promise<any> {
	try {
		const response = await fetch(
			`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`,
			{
				headers: new Headers({
					Authorization: `Bearer ${apiSession.accessToken}` || "",
					"X-API-Key": process.env.BUNGIE_API_KEY || "",
				}),
			},
		);

		if (!response.ok) {
			throw new Error(
				`Error fetching item definition ${itemHash}: ${response.status} ${response.statusText}`,
			);
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

/**
 * performs the get itemInstance API call through getProfile
 * @param component - the BungieComponent that the API call is using
 * @param itemInstanceId - the specific item instance you want to know about
 * @returns - the response from the API
 */
export async function requestItemInstanceComponent(
	component: BungieComponents,
	itemInstanceId: string,
): Promise<any> {
	try {
		const response = await fetch(
			`https://www.bungie.net/Platform/Destiny2/${apiSession.membershipType}/Profile/${apiSession.membershipId}/Item/${itemInstanceId}/?components=${component}`,
			{
				headers: new Headers({
					Authorization: `Bearer ${apiSession.accessToken}` || "",
					"X-API-Key": process.env.BUNGIE_API_KEY || "",
				}),
			},
		);

		if (!response.ok) {
			throw new Error(
				`Error fetching component ${component}: ${response.status} ${response.statusText}`,
			);
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}
