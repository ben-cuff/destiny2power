export async function getAllItems(
	membershipType: number,
	membershipId: string,
	accessToken: string
): Promise<any[]> {
	try {
		const components = [102, 201, 205];

		const fetchPromises = components.map((component) =>
			fetch(
				`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${component}`,
				{
					headers: new Headers({
						Authorization: `Bearer ${accessToken}` || "",
						"X-API-Key": process.env.BUNGIE_API_KEY || "",
					}),
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

		const items102 = data102.Response.profileInventory.data.items || [];

		const items201 = Object.values(
			data201.Response.characterInventories.data
		).flatMap((character: any) => character.items || []);

		const items205 = Object.values(
			data205.Response.characterEquipment.data
		).flatMap((character: any) => character.items || []);

		const combinedData = [...items205, ...items201, ...items102].filter(
			(item) => item.itemInstanceId
		);

		return combinedData;
	} catch (error) {
		console.error("Failed to fetch items:", error);
		throw error;
	}
}
