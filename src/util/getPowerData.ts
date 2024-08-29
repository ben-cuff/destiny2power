import { PowerPageProps } from "@/types/powerPageProps";
import { ItemBucketHashes } from "@/types/itemBucketHashes";
import { getLightLevel } from "./getLightLevel";
import { getItemBucket } from "./getItemBucket";
import { getItemNameImage } from "./getItemNameIcon";
import { getAllItems } from "./getAllItems";

export async function fetchPowerData(
	accessToken: string,
	membershipType: number,
	membershipId: string
): Promise<PowerPageProps> {
	const combinedData = await getAllItems(
		membershipType,
		membershipId,
		accessToken
	);

	let highestLightItems = [
		{ name: "", itemId: "1", lightLevel: 0, icon: "" },
		{ name: "", itemId: "2", lightLevel: 0, icon: "" },
		{ name: "", itemId: "3", lightLevel: 0, icon: "" },
		{ name: "", itemId: "4", lightLevel: 0, icon: "" },
		{ name: "", itemId: "5", lightLevel: 0, icon: "" },
		{ name: "", itemId: "6", lightLevel: 0, icon: "" },
		{ name: "", itemId: "7", lightLevel: 0, icon: "" },
		{ name: "", itemId: "8", lightLevel: 0, icon: "" },
	];

	let maxCount = 0;

	const itemHashPromises = combinedData.map((item) =>
		getItemBucket(item.itemHash)
	);
	const itemHashes = await Promise.all(itemHashPromises);

	const lightLevelPromises = combinedData.map((item) =>
		getLightLevel(membershipType, membershipId, item.itemInstanceId)
	);
	const lightLevels = await Promise.all(lightLevelPromises);

	for (let i = 0; i < combinedData.length; i++) {
		const item = combinedData[i];
		const itemHash = itemHashes[i];
		const lightLevel = lightLevels[i];
		let index = -1;

		for (let j = 0; j < ItemBucketHashes.length; j++) {
			const bucketItem = ItemBucketHashes[j];
			if (itemHash == bucketItem.hash) {
				index = j;
				break;
			}
		}

		if (index == -1 || highestLightItems[index].lightLevel >= 2000) {
			continue;
		}

		if (lightLevel > highestLightItems[index].lightLevel) {
			highestLightItems[index].lightLevel = lightLevel;
			highestLightItems[index].itemId = item.itemHash;
		}
	}

	await Promise.all(
		highestLightItems.map(async (item) => {
			const { name, icon } = await getItemNameImage(item.itemId);
			item.name = name;
			item.icon = icon;
		})
	);

	const lightLevelBonus = 20;

	const lightLevel =
		highestLightItems.reduce((total, item) => total + item.lightLevel, 0) /
		highestLightItems.length;
	return {
		lightLevel,
		lightLevelBonus,
		highestLightItems,
	};
}
