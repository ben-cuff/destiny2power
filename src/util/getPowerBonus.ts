// this function returns the player's power level bonus

export async function getPowerBonus(
	membershipType: number,
	membershipId: string
): Promise<number> {
	try {
		const response = await fetch(
			`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=104`,
			{
				headers: new Headers({
					"X-API-Key": process.env.BUNGIE_API_KEY || "",
				}),
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error fetching Power Bonus: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		//gets the power bonus from the JSON
		const powerBonus =
			data.Response.profileProgression.data.seasonalArtifact
				.powerBonusProgression.level;

		return powerBonus;
	} catch (error) {
		console.error("Failed to fetch Power Bonus:", error);
		throw error;
	}
}
