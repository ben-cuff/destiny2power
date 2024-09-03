import { levelCaps } from "@/types/powerlevelcaps";
import { SuggestionsProps } from "@/types/suggestionsprops";

export default function Suggestions({
	lightLevel,
	highestLightItems,
}: SuggestionsProps) {
	let suggestion = "No suggestions available.";

	if (lightLevel === levelCaps.pinnacleCap) {
		suggestion =
			"You have reached the pinnacle cap. Congratulations! You can earn xp to level up your artifact and power level further.";
	} else if (lightLevel < levelCaps.softCap) {
		suggestion = `Farm blues and purples to increase your light level until you reach the soft cap of ${levelCaps.softCap}.`;
	} else if (lightLevel < levelCaps.powerfulCap) {
		const newItemLightLevel = lightLevel + 3;
		const chanceOfWaste =
			highestLightItems.reduce((acc, item) => {
				if (item.lightLevel >= newItemLightLevel) {
					return acc + 1;
				}
				return acc;
			}, 0) / highestLightItems.length;

		suggestion =
			chanceOfWaste >= 0.375
				? `T1 powerful rewards have a ${chanceOfWaste * 100}% chance of being wasted. Consider farming blues and purples to increase your base power level.`
				: `First, farm powerful rewards, then collect pinnacle rewards until you reach the powerful cap of ${levelCaps.powerfulCap}.`;
	} else if (lightLevel < levelCaps.pinnacleCap) {
		const newItemLightLevel = lightLevel + 2;
		const chanceOfWaste =
			highestLightItems.reduce((acc, item) => {
				if (
					item.lightLevel >= newItemLightLevel &&
					item.lightLevel != levelCaps.pinnacleCap
				) {
					return acc + 1;
				}
				return acc;
			}, 0) / highestLightItems.length;

		suggestion =
			chanceOfWaste >= 0.375
				? `Pinnacle rewards have a ${chanceOfWaste * 100}% chance of being wasted. Consider farming powerful rewards first to increase your base power level.`
				: `Farm pinnacle rewards until you reach the pinnacle cap of ${levelCaps.pinnacleCap}.`;
	}

	return (
		<div className="mt-6 w-80">
			<h2 className="text-2xl font-semibold mb-2 text-gray-600 border-b border-gray-300 pb-2">
				Suggestions
			</h2>
			<p className="text-gray-500 mt-4">{suggestion}</p>
		</div>
	);
}
