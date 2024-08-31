"use client";

import Login from "./login";
import Profile from "./profile";
import Nav from "./nav";

// Constructs the actual navbar
export default function NavBar() {
	return (
		<div className="flex items-center p-4 border-gray-950 border-b-2 rounded-md">
			<div className="flex-grow">
				<Nav />
			</div>
			<div className="ml-auto">
				<Profile />
			</div>
		</div>
	);
}
