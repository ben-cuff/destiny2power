import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

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

// all of the bungie components and their descriptions
export enum BungieComponents {
	NONE = "0",
	PROFILES = "100", // Profiles is the most basic component, only relevant when calling GetProfile. This returns basic information about the profile.
	VENDOR_RECEIPTS = "101", // Only applicable for GetProfile, this will return information about receipts for refundable vendor items.
	PROFILE_INVENTORIES = "102", // Profile-level inventories, such as your Vault buckets.
	PROFILE_CURRENCIES = "103", // Summary of items on your Profile that are considered "currencies".
	PROFILE_PROGRESSION = "104", // Progression-related information on a Profile-wide level, across all characters.
	PLATFORM_SILVER = "105", // Information about the silver that this profile has on every platform on which it plays.
	CHARACTERS = "200", // Summary info about each of the characters in the profile.
	CHARACTER_INVENTORIES = "201", // Information about any non-equipped items on the character(s).
	CHARACTER_PROGRESSIONS = "202", // Progression (faction, experience, etc.) relevant to each character.
	CHARACTER_RENDER_DATA = "203", // Information to render the character in 3D.
	CHARACTER_ACTIVITIES = "204", // Info about activities that a user can see and gating on it.
	CHARACTER_EQUIPMENT = "205", // Info about the equipped items on the character(s).
	CHARACTER_LOADOUTS = "206", // Info about the loadouts of the character(s).
	ITEM_INSTANCES = "300", // Basic info about instanced items - whether they can be equipped, their tracked status, etc.
	ITEM_OBJECTIVES = "301", // Items with Objectives (DestinyObjectiveDefinition) bound to them.
	ITEM_PERKS = "302", // Info about what perks are active on items.
	ITEM_RENDER_DATA = "303", // Just enough info to render the weapon.
	ITEM_STATS = "304", // Stats for items, like rate of fire.
	ITEM_SOCKETS = "305", // Info relevant to the sockets on items that have them.
	ITEM_TALENT_GRIDS = "306", // Info about activated Nodes and Steps on this talent grid.
	ITEM_COMMON_DATA = "307", // Important information for non-instanced items.
	ITEM_PLUG_STATES = "308", // Statuses about plugs and why they can/can't be inserted.
	ITEM_PLUG_OBJECTIVES = "309", // Objectives on plugs.
	ITEM_REUSABLE_PLUGS = "310", // Info about reusable plugs.
	VENDORS = "400", // Summary information about the Vendor or Vendors being returned.
	VENDOR_CATEGORIES = "401", // Information about the categories of items provided by the Vendor.
	VENDOR_SALES = "402", // Information about items being sold by the Vendor.
	KIOSKS = "500", // Account's Kiosk statuses.
	CURRENCY_LOOKUPS = "600", // Item hashes/quantities of items that the requested character can use as currency.
	PRESENTATION_NODES = "700", // Summary status information about all "Presentation Nodes".
	COLLECTIBLES = "800", // Summary status information about all "Collectibles".
	RECORDS = "900", // Summary status information about all "Records" (also known as "Triumphs").
	TRANSITORY = "1000", // Transitory data that may change frequently or come from a non-authoritative source.
	METRICS = "1100", // Summary status information about all "Metrics" (also known as "Stat Trackers").
	STRING_VARIABLES = "1200", // Mapping of localized string variable hashes to values.
	CRAFTABLES = "1300", // Summary status information about all "Craftables" aka crafting recipe items.
	SOCIAL_COMMENDATIONS = "1400", // Score values for all commendations and commendation nodes.
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
	const url = `https://www.bungie.net/Platform/Destiny2/${apiSession.membershipType}/Profile/${apiSession.membershipId}/?components=${component}`;
	const headers = new Headers({
		Authorization: `Bearer ${apiSession.accessToken}` || "",
		"X-API-Key": process.env.BUNGIE_API_KEY || "",
	});

	try {
		const response = await fetchWithRetry(url, { headers });

		return await response.json();
	} catch (error) {
		console.error(`Error fetching profile component: ${component}`, error);
		throw error;
	}
}
/**
 * Gets the DestinyInventoryItemDefinition for a item hash from the manifest
 * @param itemHash - the given item hash that you want information about.
 * @returns - the response from the API
 */
export async function requestItemDefinition(itemHash: number): Promise<any> {
	const url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`;
	const headers = new Headers({
		Authorization: `Bearer ${apiSession.accessToken}` || "",
		"X-API-Key": process.env.BUNGIE_API_KEY || "",
	});

	try {
		const response = await fetchWithRetry(url, { headers });

		return await response.json();
	} catch (error) {
		console.error(`Error fetching item definition ${itemHash}:`, error);
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
	const url = `https://www.bungie.net/Platform/Destiny2/${apiSession.membershipType}/Profile/${apiSession.membershipId}/Item/${itemInstanceId}/?components=${component}`;
	const headers = new Headers({
		Authorization: `Bearer ${apiSession.accessToken}` || "",
		"X-API-Key": process.env.BUNGIE_API_KEY || "",
	});

	try {
		const response = await fetchWithRetry(url, { headers });

		return await response.json();
	} catch (error) {
		console.error(`Error fetching component ${component}:`, error);
		throw error;
	}
}

async function fetchWithRetry(
	url: string,
	options: RequestInit = {},
	retries: number = 3,
	backoff: number = 1000,
	timeout: number = 20000, // Timeout in milliseconds
): Promise<Response> {
	for (let i = 0; i < retries; i++) {
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);
		try {
			const response = await fetch(url, {
				...options,
				signal: controller.signal,
			});
			clearTimeout(id);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response;
		} catch (error) {
			clearTimeout(id);
			if (error.name === "AbortError") {
				console.warn(
					`Fetch request timed out, retrying in ${backoff}ms... (${i + 1}/${retries})`,
				);
			} else {
				console.warn(
					`Fetch failed, retrying in ${backoff}ms... (${i + 1}/${retries})`,
				);
			}
			if (i < retries - 1) {
				await new Promise((resolve) => setTimeout(resolve, backoff));
				backoff *= 2; // Exponential backoff
			} else {
				throw error;
			}
		}
	}
	throw new Error("Fetch failed after all retries");
}
