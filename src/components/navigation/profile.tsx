import { useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Profile() {
	const { data: sessionData } = useSession();
	const [menuVisible, setMenuVisible] = useState(false);

	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	return (
		<div>
			{sessionData ? (
				<div>
					<Image
						className="rounded-full"
						src={sessionData.user.image ?? ""}
						alt={sessionData.user.name || ""}
						width={40}
						height={40}
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
						width={40}
						height={40}
						style={{ cursor: "pointer" }}
						onClick={() => void signIn("bungie")}
					/>
				</div>
			)}
		</div>
	);
}
