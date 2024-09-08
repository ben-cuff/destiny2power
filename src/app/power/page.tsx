import { fetchPowerData } from "@/util/get-power-data";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { Suspense } from "react";
import Loading from "./loading";
import PowerPage from "../../components/power/power-page";
import NotSignedInPowerPage from "./not-signed-in";

// acts as the container for the power page
export default async function PowerPageContainer() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return <NotSignedInPowerPage />;
	}

	const powerData = await fetchPowerData();

	return <PowerPage {...powerData} />;
}
