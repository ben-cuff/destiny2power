// Define the prop types for the Suggestions component
export interface SuggestionsProps {
	lightLevel: number;
	highestLightItems: {
		name: string;
		itemId: string;
		lightLevel: number;
		icon: string;
	}[];
}
