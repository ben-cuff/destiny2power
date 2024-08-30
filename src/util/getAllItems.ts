// this function fetches all of the items on your account
// this includes your equipped items, items on your characters, and items in your vault

export async function getAllItems(
	membershipType: number,
	membershipId: string,
	accessToken: string
): Promise<any[]> {
	// these are the three different components necessary to get all items
	// 102: vault
	// 201: character inventory
	// 205: equipped items
	const components = [102, 201, 205];
	var fetchPromises: Promise<any>[];
	try {
		// fetch data from the api
		fetchPromises = components.map((component) =>
			fetch(
				`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${component}`,
				{
					headers: new Headers({
						Authorization: `Bearer ${accessToken}` || "",
						"X-API-Key": process.env.BUNGIE_API_KEY || "",
					}),
				}
			).then((response) => {
				if (!response.ok) {
					throw new Error(
						`Error fetching component ${component}: ${response.status} ${response.statusText}`
					);
				}
				return response.json();
			})
		);

		// combine the data to suit our needs
	} catch (error) {
		console.error("Failed to fetch items:", error);
		throw error;
	}

	return createCombinedData(fetchPromises);
}

// Goes through the data, cleaning and combining into single object
async function createCombinedData(fetchPromises: Promise<any>[]) {
	const [
		profileInventoryData,
		characterInventoriesData,
		characterEquipmentData,
	] = await Promise.all(fetchPromises);

	// these are cleaning the response so it is just the items
	const vaultItems =
		profileInventoryData.Response.profileInventory.data.items || [];

	const inventoryItems = Object.values(
		characterInventoriesData.Response.characterInventories.data
	).flatMap((character: any) => character.items || []);

	const equippedItems = Object.values(
		characterEquipmentData.Response.characterEquipment.data
	).flatMap((character: any) => character.items || []);

	// combines all of the data and removes everything without an instance id (we don't need these items)
	const combinedData = [
		...equippedItems,
		...inventoryItems,
		...vaultItems,
	].filter((item) => item.itemInstanceId);

	return combinedData;
}
