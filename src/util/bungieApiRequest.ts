class ApiSession {
	public accessToken: string;
	public membershipType: number;
	public membershipId: string;

	constructor(
		accessToken: string,
		membershipType: number,
		membershipId: string,
	) {
		this.accessToken = accessToken;
		this.membershipType = membershipType;
		this.membershipId = membershipId;
	}

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
	console.log(
		apiSession.accessToken +
			"\n" +
			apiSession.membershipType +
			"\n" +
			apiSession.membershipId,
	);
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
