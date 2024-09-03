import Image from "next/image";
import { BountyProp } from "@/types/bounty-prop";

export default function BountyCard({ bounty }: { bounty: BountyProp }) {
	return (
		<div>
			<h2>{bounty.name}</h2>
			<p>{bounty.description}</p>
			<p>{bounty.isComplete ? "Complete" : "Incomplete"}</p>
			<Image
				src={`https://www.bungie.net${bounty.icon}`}
				width={50}
				height={50}
				alt={`${bounty.name} image`}
			/>
		</div>
	);
}
