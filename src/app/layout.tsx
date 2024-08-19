import type { Metadata } from "next";
import "./globals.css";

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
				<div>
					<h1>Destiny 2 power</h1>
				</div>
				{children}
			</body>
		</html>
	);
}
