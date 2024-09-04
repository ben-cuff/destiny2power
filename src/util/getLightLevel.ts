// this function gets the light level of a particular item

import {
	BungieComponents,
	requestItemInstanceComponent,
} from "./bungieApiRequest";

export async function getLightLevel(itemInstanceId: string): Promise<number> {
	const data = await requestItemInstanceComponent(
		BungieComponents.ITEM_INSTANCES,
		itemInstanceId,
	);

	const lightLevel = data.Response.instance.data?.primaryStat?.value || 0;
	return lightLevel;
}
