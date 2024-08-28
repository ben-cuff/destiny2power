export async function getLightLevel(
	membershipType: string,
	membershipId: string,
	itemInstanceId: string
): Promise<number> {
	const url = `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Item/${itemInstanceId}/?components=300`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		const lightLevel = data.Response.data.primaryStat.value;
		console.log(lightLevel);
		return lightLevel;
	} catch (error) {
		console.error("Error retrieving light level:", error);
		throw error;
	}
}
