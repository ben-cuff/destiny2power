import { getPrepData } from "@/util/get-prep-data";
import { BOUNTY_XP_VALUES } from "@/types/bounty-xp-values";
import BountyCard from "./bounty-card";

export default async function PrepPage() {
	const prepData = await getPrepData();

	const { totalXPPotential, totalXPSaved } = prepData.reduce(
		(acc: { totalXPPotential: number; totalXPSaved: number }, bounty) => {
			if (bounty.itemTypeDisplayName.includes("Weekly")) {
				acc.totalXPPotential += BOUNTY_XP_VALUES.weekly;
				if (bounty.isComplete) {
					acc.totalXPSaved += BOUNTY_XP_VALUES.weekly;
				}
			} else if (bounty.itemTypeDisplayName.includes("Daily")) {
				acc.totalXPPotential += BOUNTY_XP_VALUES.daily;
				if (bounty.isComplete) {
					acc.totalXPSaved += BOUNTY_XP_VALUES.daily;
				}
			} else {
				acc.totalXPPotential += BOUNTY_XP_VALUES.repeatable;
				if (bounty.isComplete) {
					acc.totalXPSaved += BOUNTY_XP_VALUES.repeatable;
				}
			}
			return acc;
		},
		{ totalXPPotential: 0, totalXPSaved: 0 },
	);

	return (
		<div>
			<h1>Prep Page</h1>
			<p>{totalXPPotential}</p>
			<p>{totalXPSaved}</p>
			{prepData.map((bounty) => (
				<BountyCard key={bounty.name} bounty={bounty} />
			))}
		</div>
	);
}
