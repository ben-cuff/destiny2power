import Image from "next/image";
import { useState } from "react";
import { BountyProp } from "@/types/bounty-prop";

export default function BountyCard({ bounty }: { bounty: BountyProp }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="relative h-auto w-auto flex items-center">
			<Image
				src={`https://www.bungie.net${bounty.icon}`}
				width={100}
				height={100}
				alt={`${bounty.name} image`}
				className="object-cover w-24 h-24 border-2 border-black rounded-md bg-gray-300"
				style={{ opacity: bounty.isComplete ? 1 : 0.25 }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			/>
			<div
				className={`absolute ml-24 flex flex-col justify-center bg-gray-100 p-2 w-64 border-gray-800 border-2 rounded-lg transition-opacity duration-300 ease-in-out pointer-events-none z-10 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}
			>
				<h2 className="text-sm font-bold">{bounty.name}</h2>
				<p className="text-xs font-semibold">
					{bounty.itemTypeDisplayName}
				</p>
				<p className="text-xs">{bounty.description}</p>
			</div>
		</div>
	);
}
