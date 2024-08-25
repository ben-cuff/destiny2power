export interface PowerPageProps {
	lightLevel: number;
	lightLevelBonus: number;
	highestLightItems: { name: string; lightLevel: number }[];
}

export async function fetchPowerData(
	accessToken: string,
	membershipType: number,
	membershipId: string
): Promise<PowerPageProps> {
	console.log(accessToken, membershipType, membershipId);
	console.log(process.env.BUNGIE_API_KEY);
	const response = await fetch(
		`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=100`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"X-API-Key": process.env.BUNGIE_API_KEY,
			},
		}
	);
	console.log(response);
	const data = await response.json();

	return {
		lightLevel,
		lightLevelBonus,
		highestLightItems,
	};
}
