import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navigation/navbar";
import ClientProvider from "@/components/client-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
	title: "Destiny 2 Power",
	description:
		"A simple tool to optimize your power level grind. It allows you to both prepare for upcoming episodes and gain levels in the current episode",
	keywords: ["Destiny 2", "power level", "grind", "Prep", "Destiny"],
	icons: {
		icon: "tricorn.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<SpeedInsights />
				<Analytics />
				<ClientProvider>
					<div>
						<NavBar />
					</div>
					{children}
				</ClientProvider>
			</body>
		</html>
	);
}
