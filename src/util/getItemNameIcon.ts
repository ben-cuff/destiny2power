export async function getItemNameImage(
	itemHash: string
): Promise<{ name: string; icon: string }> {
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
				`Error fetching Item name and Image: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		const itemName = data.Response.displayProperties.name || "";
		const itemIcon = data.Response.displayProperties.icon || "";

		console.log("Item Name:", itemName);
		console.log("Item Icon:", itemIcon);
		return { name: itemName, icon: itemIcon };
	} catch (error) {
		console.error("Failed to fetch weapon type hash:", error);
		throw error;
	}
}
