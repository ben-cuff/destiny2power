import { PowerPageProps } from "@/types/powerPageProps";
import { ItemBucketHashes } from "@/types/itemBucketHashes";
import { getLightLevel } from "./getLightLevel";
import { getItemBucket } from "./getItemBucket";
import { get } from "http";

export async function fetchPowerData(
	accessToken: string,
	membershipType: number,
	membershipId: string
): Promise<PowerPageProps> {
	const components = [102, 201, 205];
	const fetchPromises = components.map((component) =>
		fetch(
			`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${component}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"X-API-Key": process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
				},
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

	const [data102, data201, data205] = await Promise.all(fetchPromises);

	const items102 = data102.Response.profileInventory.data.items || [];

	const items201 = Object.values(
		data201.Response.characterInventories.data
	).flatMap((character: any) => character.items || []);

	const items205 = Object.values(
		data205.Response.characterEquipment.data
	).flatMap((character: any) => character.items || []);

	const combinedData = [...items102, ...items201, ...items205].filter(
		(item) => item.itemInstanceId
	);

	//console.log(JSON.stringify(combinedData, null, 2));

	// const filteredData = combinedData.reduce((acc, item) => {
	// 	if (item.bucketHash == ItemBucketHashes[1]) {
	// 		acc.push(item);
	// 	}
	// 	return acc;
	// }, []);

	//console.log(JSON.stringify(filteredData, null, 2));

	for (const item of combinedData) {
		await new Promise((resolve) => setTimeout(resolve, 2));
		//getLightLevel(membershipType, membershipId, item.itemInstanceId);
		var index = -1;
		const itemHash = await getItemBucket(item.itemHash);
		for (let i = 0; i < ItemBucketHashes.length; i++) {
			const item = ItemBucketHashes[i];
			if (itemHash == item.hash) {
				index = i;
				break;
			}
		}
	}

	const lightLevelBonus = 20;
	const highestLightItems = [
		{ itemId: "1", lightLevel: 0, itemImage: "" },
		{ itemId: "2", lightLevel: 1000, itemImage: "" },
		{ itemId: "3", lightLevel: 1000, itemImage: "" },
		{ itemId: "4", lightLevel: 1001, itemImage: "" },
		{ itemId: "5", lightLevel: 1000, itemImage: "" },
		{ itemId: "6", lightLevel: 1000, itemImage: "" },
		{ itemId: "7", lightLevel: 1000, itemImage: "" },
		{ itemId: "8", lightLevel: 1000, itemImage: "" },
	];
	const lightLevel =
		highestLightItems.reduce((total, item) => total + item.lightLevel, 0) /
		highestLightItems.length;
	return {
		lightLevel,
		lightLevelBonus,
		highestLightItems,
	};
}
