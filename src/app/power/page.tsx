"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchPowerData, PowerPageProps } from "../../util/getPowerData";
import PowerPage from "../../components/powerpage";

export default function PowerPageContainer() {
	const { data: session } = useSession();
	const [powerData, setPowerData] = useState<PowerPageProps | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (session) {
			const accessToken = session.accessToken as string;
			const membershipType = session.user.membershipType as number;
			const membershipId = session.user.membershipId as string;

			if (!accessToken) {
				console.error("Missing accessToken");
				setError("Error: Missing accessToken");
				return;
			}

			if (!membershipType) {
				console.error("Missing membershipType");
				setError("Error: Missing membershipType");
				return;
			}

			if (!membershipId) {
				console.error("Missing membershipId");
				setError("Error: Missing membershipId");
				return;
			}

			fetchPowerData(accessToken, membershipType, membershipId)
				.then((data) => setPowerData(data))
				.catch((err) => {
					console.error(err);
					setError("Error fetching power data");
				});
		}
	}, [session]);

	if (error) {
		return <div>{error}</div>;
	}

	if (!powerData) {
		return <div>Loading...</div>;
	}

	return <PowerPage {...powerData} />;
}
