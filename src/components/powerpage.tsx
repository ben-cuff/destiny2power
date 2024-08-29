import { PowerPageProps } from "@/types/powerPageProps";
import Image from "next/image";

// this constructs the power page
export default function PowerPage({
	lightLevel,
	lightLevelBonus,
	highestLightItems = [],
}: PowerPageProps) {
	const wholeNumber = Math.floor(lightLevel);
	const fraction = Math.round((lightLevel - wholeNumber) * 8);

	// function that formats the light level string
	const formatLightLevel = (level: number, fraction: number) => {
		return fraction === 0 ? `${level}` : `${level} ${fraction}/8`;
	};

	const lightLevelString = formatLightLevel(wholeNumber, fraction);

	const lightLevelStringWithBonus = formatLightLevel(
		wholeNumber + lightLevelBonus,
		fraction
	);

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
