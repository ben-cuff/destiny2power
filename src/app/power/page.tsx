import { fetchPowerData } from "../../util/getPowerData";
import PowerPage from "../../components/powerpage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function PowerPageContainer() {
	const session = await getServerSession(authOptions);
	console.log(JSON.stringify(session));

	const powerData = await fetchPowerData(
		session?.accessToken || "",
		session?.user?.membershipType || -2,
		session?.user?.membershipId || ""
	);

	if (!powerData) {
		return <div>Loading...</div>;
	}

	return <PowerPage {...powerData} />;
}
