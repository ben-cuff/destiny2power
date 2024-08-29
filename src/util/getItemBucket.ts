export async function getItemBucket(itemHash: number): Promise<string> {
	try {
		const response = await fetch(
			`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`,
			{
				headers: {
					"X-API-Key": process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error fetching light level: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		const weaponTypeHash = data.Response.inventory.bucketTypeHash || 0;

		return weaponTypeHash;
	} catch (error) {
		console.error("Failed to fetch weapon type hash:", error);
		throw error;
	}
}
