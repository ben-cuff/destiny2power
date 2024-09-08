import { PowerPageProps } from "@/types/power-page-props";
import ItemCard from "./item-card";
import Suggestions from "./suggestions";

/**
 * The PowerPage component displays the power page.
 *
 * @param {PowerPageProps} props - The component props.
 * @returns {JSX.Element} The rendered PowerPage component.
 */
export default function PowerPage({
	lightLevel,
	lightLevelBonus,
	highestLightItems = [],
}: PowerPageProps) {
	const wholeNumber = Math.floor(lightLevel);
	const fraction = Math.round((lightLevel - wholeNumber) * 8);

	// Function that formats the light level string
	const formatLightLevel = (level: number, fraction: number) => {
		return fraction === 0 ? `${level}` : `${level} ${fraction}/8`;
	};

	const lightLevelString = formatLightLevel(wholeNumber, fraction);
	const lightLevelStringWithBonus = formatLightLevel(
		wholeNumber + lightLevelBonus,
		fraction,
	);

	const leftItems = highestLightItems.slice(0, 3);
	const rightItems = highestLightItems.slice(3);

	return (
		<div className="p-4 text-white min-h-screen flex justify-center">
			<div className="w-full max-w-3xl">
				<p className="text-xl mb-2">
					<span className="font-semibold">Light Level:</span>{" "}
					{lightLevelStringWithBonus}
				</p>
				<p className="text-xl mb-2">
					<span className="font-semibold">Base Light Level:</span>{" "}
					{lightLevelString}
				</p>
				<div className="grid grid-cols-2 gap-6">
					<div className="flex flex-col space-y-6">
						{leftItems.map((item, index) => (
							<ItemCard
								key={index}
								name={item.name}
								lightLevel={item.lightLevel}
								icon={item.icon}
							/>
						))}
					</div>
					<div className="flex flex-col space-y-6">
						{rightItems.map((item, index) => (
							<ItemCard
								key={index}
								name={item.name}
								lightLevel={item.lightLevel}
								icon={item.icon}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="ml-8 max-w-sm p-4 h-auto max-h-64 overflow-auto">
				<Suggestions
					highestLightItems={highestLightItems}
					lightLevel={lightLevel}
				/>
			</div>
		</div>
	);
}
