import { requestProfileComponent } from "./bungie-api-request";
import { BungieComponents } from "@/types/bungie-components";


export async function getPowerBonus(): Promise<number> {
	const data = await requestProfileComponent(
		BungieComponents.PROFILE_PROGRESSION,
	);

	//gets the power bonus from the JSON
	const powerBonus =
		data.Response.profileProgression.data.seasonalArtifact
			.powerBonusProgression.level;

	return powerBonus;
}
