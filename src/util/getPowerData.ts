import { PowerPageProps } from "@/types/powerPageProps";
import { ItemBucketHashes } from "@/types/itemBucketHashes";
import { getLightLevel } from "./getLightLevel";
import { getItemBucket } from "./getItemBucket";
import { getItemNameIcon } from "./getItemNameIcon";
import { getAllItems } from "./getAllItems";
import { getPowerBonus } from "./getPowerBonus";

// this functions gets the data necessary to create the power page

export async function fetchPowerData(
	accessToken: string,
	membershipType: number,
	membershipId: string
): Promise<PowerPageProps> {
	// this has every item on your account
	const combinedData = await getAllItems();

	// empty example that will be filled below
	let highestLightItems = [
		{ name: "", itemId: "", lightLevel: 0, icon: "" },
		{ name: "", itemId: "", lightLevel: 0, icon: "" },
		{ name: "", itemId: "", lightLevel: 0, icon: "" },
		{ name: "", itemId: "", lightLevel: 0, icon: "" },
		{ name: "", itemId: "", lightLevel: 0, icon: "" },
		{ name: "", itemId: "", lightLevel: 0, icon: "" },
		{ name: "", itemId: "", lightLevel: 0, icon: "" },
		{ name: "", itemId: "", lightLevel: 0, icon: "" },
	];

	// this gets all of the details necessary to find the highest light items
	// this includes data already gathered about plus its light level and item bucket
	const itemDetailsPromises = combinedData.map(async (item) => {
		const itemHash = await getItemBucket(item.itemHash);
		const lightLevel = await getLightLevel(
			membershipType,
			membershipId,
			item.itemInstanceId
		);
		return { item, itemHash, lightLevel };
	});

	const itemDetails = await Promise.all(itemDetailsPromises);

	// loops through all of itemDetails
	for (const { item, itemHash, lightLevel } of itemDetails) {
		//finds the index of the item bucket if it exists
		const index = ItemBucketHashes.findIndex(
			(bucketItem) => itemHash == bucketItem.hash
		);

		// if it didn't exist or if the light level is already maxed it continues
		if (index === -1 || highestLightItems[index].lightLevel >= 2000) {
			continue;
		}

		// checks if its light level is greater than the currently stored highest
		if (lightLevel > highestLightItems[index].lightLevel) {
			highestLightItems[index].lightLevel = lightLevel;
			highestLightItems[index].itemId = item.itemHash;
		}
	}

	// gets the name and icon for the highest light items
	await Promise.all(
		highestLightItems.map(async (item) => {
			const { name, icon } = await getItemNameIcon(item.itemId);
			item.name = name;
			item.icon = icon;
		})
	);

	// gets your account's light level bonus
	const lightLevelBonus = await getPowerBonus(membershipType, membershipId);

	// calculates the base light level using the highest light items
	const lightLevel =
		highestLightItems.reduce((total, item) => total + item.lightLevel, 0) /
		highestLightItems.length;
	return {
		lightLevel,
		lightLevelBonus,
		highestLightItems,
	};
}
