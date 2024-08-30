import { useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

// creates a profile picture that the user can click to perform different actions
export default function Profile() {
	const { data: session } = useSession();
	const [menuVisible, setMenuVisible] = useState(false);

	// toggles the menu for when the user presses the profile picture
	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	return (
		<div>
			{session ? (
				<div>
					<Image
						className="rounded-full"
						src={session.user.image ?? ""}
						alt={session.user.name || ""}
						width={50}
						height={50}
						style={{ cursor: "pointer" }}
						onClick={toggleMenu}
					/>
					{menuVisible && (
						<div className="">
							<ul>
								<li>
									<Image
										className="rounded-full"
										src="/setting.png"
										title="settings icons"
										alt={"Settings Menu"}
										width={40}
										height={40}
										style={{ cursor: "pointer" }}
									/>
								</li>
								<li
									style={{ cursor: "pointer" }}
									onClick={() => void signOut()}
								>
									Logout
								</li>
							</ul>
						</div>
					)}
				</div>
			) : (
				<div>
					<Image
						className="rounded-full"
						src="/Default-Profile-Picture-Transparent-Image.png"
						alt={"Not Signed In"}
						width={50}
						height={50}
						style={{ cursor: "pointer" }}
						onClick={() => void signIn("bungie")}
					/>
				</div>
			)}
		</div>
	);
}
