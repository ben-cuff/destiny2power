import { useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Profile() {
	const { data: session } = useSession();
	const [menuVisible, setMenuVisible] = useState(false);

	// Toggles the menu for when the user presses the profile picture
	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	return (
		<div className="relative inline-block text-left">
			{session ? (
				<div>
					<Image
						className="rounded-full cursor-pointer transition-transform transform hover:scale-105"
						src={
							session.user.image ??
							"/Default-Profile-Picture-Transparent-Image.png"
						}
						alt={session.user.name || "Profile Picture"}
						width={50}
						height={50}
						onClick={toggleMenu}
					/>
					<div
						className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-transform transition-opacity duration-300 ease-in-out ${
							menuVisible
								? "opacity-100 translate-y-0 visible"
								: "opacity-0 translate-y-2 invisible"
						}`}
					>
						<ul className="py-1">
							<li>
								<Image
									className="w-8 h-8 mx-auto my-2 rounded-full cursor-pointer transition-transform transform hover:scale-105"
									src="/setting.png"
									alt="Settings"
									width={40}
									height={40}
									title="Settings"
									onClick={() => {
										// Handle settings click
									}}
								/>
							</li>
							<li
								className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
								onClick={() => void signOut()}
							>
								Logout
							</li>
						</ul>
					</div>
				</div>
			) : (
				<div>
					<Image
						className="rounded-full cursor-pointer transition-transform transform hover:scale-105"
						src="/Default-Profile-Picture-Transparent-Image.png"
						alt="Not Signed In"
						width={50}
						height={50}
						onClick={() => void signIn("bungie")}
					/>
				</div>
			)}
		</div>
	);
}
