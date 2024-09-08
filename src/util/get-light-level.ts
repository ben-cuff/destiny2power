// this function gets the light level of a particular item

import { requestItemInstanceComponent } from "./bungie-api-request";

import { BungieComponents } from "@/types/bungie-components";

export async function getLightLevel(itemInstanceId: string): Promise<number> {
	const data = await requestItemInstanceComponent(
		BungieComponents.ITEM_INSTANCES,
		itemInstanceId,
	);

	const lightLevel = data.Response.instance.data?.primaryStat?.value || 0;
	return lightLevel;
}
