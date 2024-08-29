"use client";

import Login from "./login";
import Profile from "./profile";
import Nav from "./nav";

export default function NavBar() {
	return (
		<>
			<Nav />
			<Login />
			<Profile />
		</>
	);
}
