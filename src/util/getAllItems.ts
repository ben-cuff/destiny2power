import { requestProfileComponent, BungieComponents } from "./bungieApiRequest";

// this function fetches all of the items on your account
// this includes your equipped items, items on your characters, and items in your vault

export async function getAllItems(): Promise<any[]> {
	// these are the three different components necessary to get all items
	// 102: vault
	// 201: character inventory
	// 205: equipped items
	const components = [
		BungieComponents.PROFILE_INVENTORY,
		BungieComponents.CHARACTER_INVENTORIES,
		BungieComponents.CHARACTER_EQUIPMENT,
	];
	var fetchPromises: Promise<any>[];
	try {
		// fetch data from the api
		fetchPromises = components.map((component) =>
			requestProfileComponent(component),
		);

		// combine the data to suit our needs
		return createCombinedData(fetchPromises);
	} catch (error) {
		console.error("Failed to fetch items:", error);
		throw error;
	}
}

// Goes through the data, cleaning and combining into single object
async function createCombinedData(fetchPromises: Promise<any>[]) {
	const [
		profileInventoryData,
		characterInventoriesData,
		characterEquipmentData,
	] = await Promise.all(fetchPromises);

	// these are cleaning the response so it is just the items
	const profileInventoryItems =
		profileInventoryData.Response.profileInventory.data.items || [];

	const characterInventoryItems = Object.values(
		characterInventoriesData.Response.characterInventories.data,
	).flatMap((character: any) => character.items || []);

	const characterEquipmentItems = Object.values(
		characterEquipmentData.Response.characterEquipment.data,
	).flatMap((character: any) => character.items || []);

	// combines all of the data and removes everything without an instance id (we don't need these items)
	const combinedData = [
		...characterEquipmentItems,
		...characterInventoryItems,
		...profileInventoryItems,
	].filter((item) => item.itemInstanceId);

	return combinedData;
}
