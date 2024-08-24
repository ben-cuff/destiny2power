"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const getVaultItems = () => {
	const { data: session } = useSession();
	const [result, setResult] = useState<string | null>(null);

	useEffect(() => {
		if (session) {
			const requestOptions = {
				method: "GET",
				headers: {
					Authorization: `Bearer ${session.accessToken}`,
					"X-API-Key": process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
				},
			};

			fetch(
				"https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018505949627/?components=102",
				requestOptions
			)
				.then((response) => response.json())
				.then((result) => {
					console.log(result);
					setResult(result);
				})
				.catch((error) => console.log("error", error));
		}
	}, [session]);
	return result;
};

const VaultDisplay = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchVaultItems = async () => {
			try {
				// Fetch the initial vault items (assuming getVaultItems is a function that you call)
				const items = getVaultItems();
				const itemHashes =
					items && typeof items === "string"
						? []
						: items?.Response?.profileInventory?.data?.items?.map(
								(item) => item.itemHash
						  );

				if (!itemHashes || itemHashes.length === 0) {
					console.error("No item hashes found.");
					return;
				}

				const itemDetails = [];
				for (let i = 0; i < itemHashes.length; i++) {
					console.log(itemHashes[i]);

					const requestOptions = {
						method: "GET",
						headers: {
							"X-API-Key": process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
						},
						redirect: "follow",
					};

					const response = await fetch(
						`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHashes[i]}/`,
						requestOptions
					);
					const result = await response.json();
					itemDetails.push(result);
					console.log(result);
				}
				setItems(itemDetails);
			} catch (error) {
				console.error("Error fetching vault items:", error);
			}
		};

		fetchVaultItems();
	}, []);

	return (
		<div>
			{items.length > 0 ? (
				<ul>
					{items.map((item, index) => (
						<li key={index}>{JSON.stringify(item)}</li>
					))}
				</ul>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default VaultDisplay;
