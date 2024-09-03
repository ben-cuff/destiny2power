import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

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

// 102: vault
// 201: character inventory
// 205: equipped items
export enum BungieComponents {
	PROFILE_INVENTORY = "102", //Vault
	CHARACTER_INVENTORIES = "201", //Inventory of each character
	CHARACTER_EQUIPMENT = "205", //Equipped items on each character
	ITEM_OBJECTIVES = "301", //Objectives for an item (like bounties)
}

let apiSession: ApiSession;

export function initializeApiSession(
	accessToken: string,
	membershipType: number,
	membershipId: string,
) {
	apiSession = new ApiSession(accessToken, membershipType, membershipId);
}

export async function requestProfileComponent(component: BungieComponents) {
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

export async function requestItemDefinition(itemHash: number) {
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

export async function requestItemInstanceComponent(
	component: BungieComponents,
	itemInstanceId: string,
) {
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
