import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navigation/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Destiny 2 Power",
  description: "A website to help optimize your power level in Destiny 2 and prepare for future seasons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div>
      <NavBar />
        <body className={inter.className}>{children}</body>
      </div>
    </html>
  );
}
