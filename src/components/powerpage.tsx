"use client";

interface PowerPageProps {
	lightLevel: number;
	lightLevelBonus: number;
	highestLightItems: { name: string; lightLevel: number }[];
}

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
				{highestLightItems.map(
					(
						item: { name: string; lightLevel: number },
						index: number
					) => (
						<li key={index}>
							{item.name}: {item.lightLevel}
						</li>
					)
				)}
			</ul>
		</div>
	);
}
