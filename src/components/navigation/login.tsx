"use client";

import { signIn, signOut, useSession } from "next-auth/react";

// login button that uses next auth
export default function Login() {
	const { data: sessionData } = useSession();
	return (
		<div className="flex flex-col items-center space-y-4 p-6 bg-gray-600 rounded-lg shadow-lg max-w-md mx-auto">
			<button
				className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				onClick={
					sessionData
						? () => void signOut()
						: () => void signIn("bungie")
				}
			>
				{sessionData ? "Sign out" : "Sign in"}
			</button>
			<span className="text-gray-200  text-lg p-2 rounded-md text-center">
				You must sign in to view this page
			</span>
		</div>
	);
}
