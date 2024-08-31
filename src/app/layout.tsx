import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navigation/navbar";
import ClientProvider from "@/components/clientprovider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
	title: "Destiny 2 Power",
	description: "A simple tool to optimize your power level grind.",
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
