"use client";
import { useSession } from "next-auth/react";

export default function HomePage() {
	const { data: session } = useSession();

	if (session) {
		console.log("Access Token:", session.accessToken);
	}

	return <div>Home Page</div>;
}
