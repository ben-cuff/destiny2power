// this function returns the name and icon for a given item

export async function getItemNameIcon(
	itemHash: string
): Promise<{ name: string; icon: string }> {
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
				`Error fetching Item name and Image: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		// assigns the values for the name and icon if they exist
		const itemName = data.Response.displayProperties.name || "";
		const itemIcon = data.Response.displayProperties.icon || "";

		// returns the two items as an object
		return { name: itemName, icon: itemIcon };
	} catch (error) {
		console.error("Failed to fetch weapon type hash:", error);
		throw error;
	}
}
