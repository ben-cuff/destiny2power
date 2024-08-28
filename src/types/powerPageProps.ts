export interface PowerPageProps {
	lightLevel: number;
	lightLevelBonus: number;
	highestLightItems: {
		itemId: string;
		lightLevel: number;
		itemImage: string;
	}[];
}
