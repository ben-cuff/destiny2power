import { PowerPageProps } from "@/types/powerPageProps";
import Image from "next/image";

export default function PowerPage({
	lightLevel,
	lightLevelBonus,
	highestLightItems = [],
}: PowerPageProps) {
	const wholeNumber = Math.floor(lightLevel);
	const decimalPart = lightLevel - wholeNumber;
	const fraction = Math.round(decimalPart * 8);

	const lightLevelString =
		fraction === 0 ? `${wholeNumber}` : `${wholeNumber} ${fraction}/8`;

	const lightLevelWithBonus = wholeNumber + lightLevelBonus;
	const lightLevelStringWithBonus =
		fraction === 0
			? `${lightLevelWithBonus}`
			: `${lightLevelWithBonus} ${fraction}/8`;

	return (
		<div>
			<h1>Power Page</h1>
			<p>Light Level: {lightLevelStringWithBonus}</p>
			<p>Light Level without Bonus: {lightLevelString}</p>
			<ul>
				{highestLightItems.map((item, index) => (
					<li key={index}>
						{item.name}: {item.lightLevel}
						{item.icon && (
							<Image
								src={`https://www.bungie.net${item.icon}`}
								alt={item.name}
								width={100}
								height={100}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
