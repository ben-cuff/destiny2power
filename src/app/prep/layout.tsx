import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Destiny 2 Power",
	description:
		"A simple tool to optimize your power level grind. It allows you to both prepare for upcoming episodes and gain levels in the current episode. This page shows all the bounties you have and how much xp you have saved",
	keywords: [
		"Destiny 2",
		"power level",
		"grind",
		"Prep",
		"Destiny",
		"seasonal preparation",
		"preparation",
		"episode",
	],
	icons: {
		icon: "tricorn.png",
	},
};

export default async function PrepLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
