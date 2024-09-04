import { fetchPowerData } from "@/util/getPowerData";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { Suspense } from "react";
import Loading from "./loading";
import PowerPage from "../../components/power/powerpage";
import NotSignedInPowerPage from "./notsignedin";

// acts as the container for the power page
export default async function PowerPageContainer() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return <NotSignedInPowerPage />;
	}

	const powerData = await fetchPowerData(
		session?.user?.membershipType || -2,
		session?.user?.membershipId || "",
	);

	return <PowerPage {...powerData} />;
}
