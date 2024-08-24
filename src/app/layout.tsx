import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navigation/navbar";
import ClientProvider from "@/components/clientprovider";

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
				<ClientProvider>
					<div>
						<h1>Destiny 2 Power</h1>
						<NavBar />
					</div>
					{children}
				</ClientProvider>
			</body>
		</html>
	);
}
