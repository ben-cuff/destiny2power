"use client";

import { useState, useEffect } from "react";
import BountyCard from "./bounty-card";
import { BOUNTY_XP_VALUES } from "@/types/bounty-xp-values";
import { BountyProp } from "@/types/bounty-prop";

export default function PrepPage({ prepData }: { prepData: BountyProp[] }) {
	const [isBlindingLightActive, setIsBlindingLightActive] = useState(false);
	const [totalXPPotential, setTotalXPPotential] = useState(0);
	const [totalXPSaved, setTotalXPSaved] = useState(0);

	// recalculate XP when blinding light or prepData changes
	useEffect(() => {
		
		// calculate total XP potential and saved
		let { totalXPPotential, totalXPSaved } = prepData.reduce(
			(acc, bounty) => {
				if (bounty.itemTypeDisplayName.includes("Weekly")) {
					acc.totalXPPotential += BOUNTY_XP_VALUES.weekly;
					if (bounty.isComplete) {
						acc.totalXPSaved += BOUNTY_XP_VALUES.weekly;
					}
				} else if (
					bounty.itemTypeDisplayName.includes("Daily") ||
					bounty.itemTypeDisplayName == "Cosmodrome Bounty"
				) {
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

		if (isBlindingLightActive) {
			totalXPPotential *= 1.12;
			totalXPSaved *= 1.12;
		}

		setTotalXPPotential(totalXPPotential);
		setTotalXPSaved(totalXPSaved);
	}, [isBlindingLightActive, prepData]);

	// toggle blinding light
	const handleToggleBlindingLight = () => {
		setIsBlindingLightActive(!isBlindingLightActive);
	};

	// sort bounties by completion status
	prepData.sort((a: { isComplete: boolean }, b: { isComplete: boolean }) => {
		if (a.isComplete && !b.isComplete) {
			return 1;
		} else if (!a.isComplete && b.isComplete) {
			return -1;
		} else {
			return 0;
		}
	});

	if (prepData.length === 0) {
		return (
			<div className="text-3xl font-bold mt-30 text-center text-gray-600">
				No bounties found
			</div>
		);
	} else {
		return (
			<div className="p-6 mx-auto flex flex-col items-center text-gray-400">
				<h1 className="text-3xl font-bold mb-4 text-center">
					Prep Page
				</h1>
				<div className="mb-6 text-center">
					<p className="text-lg font-semibold">
						Total XP Potential: {totalXPPotential.toFixed(0)}
					</p>
					<p className="text-lg font-semibold">
						Total XP Saved: {totalXPSaved.toFixed(0)}
					</p>
				</div>

				<div className="mb-6 flex items-center">
					<label
						className="text-lg font-semibold mr-2"
						htmlFor="blinding-light"
					>
						Blinding Light Ghost Mod:
					</label>
					<input
						type="checkbox"
						id="blinding-light"
						checked={isBlindingLightActive}
						onChange={handleToggleBlindingLight}
						className="mt-1 w-3 h-3"
					/>
				</div>

				<div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 gap-[4px] justify-center">
					{prepData.map((bounty) => (
						<BountyCard key={bounty.name} bounty={bounty} />
					))}
				</div>
			</div>
		);
	}
}
