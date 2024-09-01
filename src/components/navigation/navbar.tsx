"use client";

import Profile from "./profile";
import Nav from "./nav";
import Refresh from "./refresh";

// Constructs the actual navbar
export default function NavBar() {
	return (
		<div className="flex items-center px-4 py-2 border-gray-950 border-b-2 rounded-md">
			<div className="flex-grow">
				<Nav />
			</div>
			<div className="ml-auto">
				<Refresh />
				<Profile />
			</div>
		</div>
	);
}
