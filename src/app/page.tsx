"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

// component for the home page.
export default function Home() {
	const { data: sessionData } = useSession();

	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
			{sessionData ? (
				<div className="flex flex-col items-center">
					{sessionData.user?.image && (
						<Image
							src={sessionData.user.image}
							width={320}
							height={320}
							alt="Profile picture"
							className="rounded-full mb-4"
						/>
					)}
					<p className="text-2xl text-white font-semibold">
						Welcome, {sessionData.user?.name}!
					</p>
					<p className="text-xl text-gray-300 mb-8">
						You are signed in with Bungie.net.
					</p>
					<p className="text-lg text-gray-300 mb-8">
						Proceed to one of our pages in the menu bar to get
						started.
					</p>

					<button
						className="mt-8 rounded-full bg-red-600 px-10 py-3 font-semibold text-white hover:bg-red-700 duration-300 ease-in-out"
						onClick={() => void signOut()}
					>
						Sign out
					</button>
				</div>
			) : (
				<div className="text-center">
					<h1 className="text-4xl text-white font-bold mb-6">
						Welcome to Destiny 2 Power!
					</h1>
					<p className="text-xl text-gray-300 mb-8">
						This is a Destiny 2 power level tracking app. You can
						use it to track your power level and see what you should
						do next.
					</p>
					<p className="text-xl text-gray-300 mb-8">
						Sign in with your Bungie account to get started.
					</p>
					<button
						className="rounded-full bg-blue-600 px-10 py-3 font-semibold text-white hover:bg-blue-700"
						onClick={() => void signIn("bungie")}
					>
						Sign in with Bungie
					</button>
				</div>
			)}
		</main>
	);
};
