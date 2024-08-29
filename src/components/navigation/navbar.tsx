"use client";

import Login from "./login";
import Profile from "./profile";
import Nav from "./nav";

//constructs the actual navbar
export default function NavBar() {
	return (
		<>
			<Nav />
			<Login />
			<Profile />
		</>
	);
}
