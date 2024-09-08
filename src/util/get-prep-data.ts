import {
	requestProfileComponent,
	requestItemDefinition,
	requestItemInstanceComponent,
} from "./bungie-api-request";

import { BungieComponents } from "@/types/bungie-components";
import { BountyProp } from "@/types/bounty-prop";

/**
 * Retrieves the prepared data for bounties.
 *
 * @returns {promise<BountyProp[]>} - The prepared data needed to construct bounties.
 */
export async function getPrepData(): Promise<BountyProp[]> {
	// Get the character inventories, which is where bounties are stored
	const characterData = await requestProfileComponent(
		BungieComponents.CHARACTER_INVENTORIES,
	);

	const allItems: any[] = [];
	const inventories = characterData.Response.characterInventories.data;

	// Combine all items from all characters into a single array
	for (const characterId in inventories) {
		if (inventories.hasOwnProperty(characterId)) {
			allItems.push(...inventories[characterId].items);
		}
	}

	// Get the item definitions for all items 
	const itemPromises = allItems.map((item) =>
		requestItemDefinition(item.itemHash),
	);
	const itemDefinitions = await Promise.all(itemPromises);

	const bountyItemType = 26;

	// Filters out all items that are not bounties
	const bounties = itemDefinitions.filter(
		(item) => item.Response.itemType === bountyItemType,
	);

	// Combine bounty item and its instance ID into a single object
	const bountyDetails = bounties.map((bounty) => {
		const itemInstance = allItems.find(
			(item) => item.itemHash === bounty.Response.hash,
		);
		return {
			item: bounty,
			instanceId: itemInstance ? itemInstance.itemInstanceId : null,
		};
	});

	// Gets the instance details for each bounty, necessary to determine completion status
	const instancePromises = bountyDetails.map((bounty) =>
		requestItemInstanceComponent(
			BungieComponents.ITEM_OBJECTIVES,
			bounty.instanceId,
		),
	);
	const instanceDefinitions = await Promise.all(instancePromises);

	// Add completion status, description, name, itemTypeDisplayName, and icon to each bounty detail
	const bountyDetailsWithCompletion = bountyDetails.map((bounty, index) => {
		const objectives =
			instanceDefinitions[index].Response.objectives.data.objectives;
		const isComplete = objectives.every(
			(obj: { complete: any }) => obj.complete,
		);
		const { description, name, icon } =
			bounty.item.Response.displayProperties;
		const itemTypeDisplayName = bounty.item.Response.itemTypeDisplayName;
		return {
			description: description,
			name: name,
			itemTypeDisplayName: itemTypeDisplayName,
			icon: icon,
			isComplete: isComplete,
		};
	});

	return bountyDetailsWithCompletion;
}
