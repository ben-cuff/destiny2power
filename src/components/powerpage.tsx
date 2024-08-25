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
	return (
		<div>
			<h1>Power Page</h1>
			<p>Light Level: {lightLevel + lightLevelBonus}</p>
			<p>Light Level without Bonus: {lightLevel}</p>
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
