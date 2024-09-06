import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Destiny 2 Power",
	description:
		"A simple tool to optimize your power level grind. It allows you to both prepare for upcoming episodes and gain levels in the current episode. This page shows your highest light items and gives suggestions about the kinds of activities you should do",
	keywords: [
		"Destiny 2",
		"power level",
		"grind",
		"Prep",
		"Destiny",
		"seasonal preparation",
		"preparation",
		"episode",
		"power level",
		"highest light",
		"light level",
		"equipment",
		"items"
	],
	icons: {
		icon: "tricorn.png",
	},
};

export default async function PowerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
