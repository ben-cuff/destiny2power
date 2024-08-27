export interface PowerPageProps {
	lightLevel: number;
	lightLevelBonus: number;
	highestLightItems: { name: string; lightLevel: number }[];
}

export async function fetchPowerData(
	accessToken: string,
	membershipType: number,
	membershipId: string
): Promise<PowerPageProps> {
	console.log(accessToken, membershipType, membershipId);
	console.log(process.env.NEXT_PUBLIC_BUNGIE_API_KEY);

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
	//console.log(JSON.stringify(data102, null, 2));
	//console.log(JSON.stringify(data201, null, 2));
	//console.log(JSON.stringify(data205, null, 2));

	const combinedData = {
		...data102.Response,
		...data201.Response,
		...data205.Response,
	};

	console.log(JSON.stringify(combinedData, null, 2));

	const lightLevelBonus = 20;
	const highestLightItems = [
		{ name: "Item 1", lightLevel: 1000 },
		{ name: "Item 2", lightLevel: 1000 },
		{ name: "Item 3", lightLevel: 1000 },
		{ name: "Item 4", lightLevel: 1001 },
		{ name: "Item 5", lightLevel: 1000 },
		{ name: "Item 6", lightLevel: 1000 },
		{ name: "Item 7", lightLevel: 1000 },
		{ name: "Item 8", lightLevel: 1000 },
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
