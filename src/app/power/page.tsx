
import { fetchPowerData } from "@/util/get-power-data";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import PowerPage from "../../components/power/power-page";
import NotSignedInPowerPage from "./not-signed-in";

/**
 * It is responsible for fetching power data and rendering the appropriate page component based on the user's session.
 * If the user is not signed in, it renders the NotSignedInPowerPage component.
 * If the user is signed in, it fetches the power data and renders the PowerPage component with the fetched data.
 *
 * @returns The rendered page component based on the user's session.
 */
export default async function PowerPageContainer() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return <NotSignedInPowerPage />;
	}

	const powerData = await fetchPowerData();

	return <PowerPage {...powerData} />;
}
