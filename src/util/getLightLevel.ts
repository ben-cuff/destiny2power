export async function getLightLevel(
	membershipType: number,
	membershipId: string,
	itemInstanceId: string
): Promise<number> {
	try {
		const response = await fetch(
			`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Item/${itemInstanceId}/?components=300`,
			{
				headers: {
					"X-API-Key": process.env.PUBLIC_BUNGIE_API_KEY,
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error fetching light level: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		const lightLevel = data.Response.instance.data?.primaryStat?.value || 0;

		return lightLevel;
	} catch (error) {
		console.error("Failed to fetch light level:", error);
		throw error;
	}
}
