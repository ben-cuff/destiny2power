// this function gets the item bucket an item belongs to given a item

export async function getItemBucket(itemHash: number): Promise<string> {
	try {
		const response = await fetch(
			`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`,
			{
				headers: new Headers({
					"X-API-Key": process.env.BUNGIE_API_KEY || "",
				}),
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error fetching item bucket: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		// assigns the bucket type hash
		const typeHash = data.Response.inventory.bucketTypeHash || 0;

		return typeHash;
	} catch (error) {
		console.error("Failed to fetch type hash:", error);
		throw error;
	}
}
