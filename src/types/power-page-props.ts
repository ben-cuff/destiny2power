// these are the props needed to construct the power page

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
