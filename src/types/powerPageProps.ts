export interface PowerPageProps {
	lightLevel: number;
	lightLevelBonus: number;
	highestLightItems: {
		name: string;
		itemId: string;
		lightLevel: number;
		icon: string;
	}[];
}
