import { fetchPowerData } from "../../util/getPowerData";
import PowerPage from "../../components/powerpage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { initializeApiSession } from "../../util/bungieApiRequest";
import { Suspense } from "react";
import Loading from "./loading";

export default async function PowerPageContainer() {
	const session = await getServerSession(authOptions);

	initializeApiSession(
		session?.accessToken || "",
		session?.user?.membershipType || -2,
		session?.user?.membershipId || "",
	);

	const powerData = await fetchPowerData(
		session?.accessToken || "",
		session?.user?.membershipType || -2,
		session?.user?.membershipId || "",
	);

	return (
		<Suspense fallback={<Loading />}>
			<PowerPage {...powerData} />
		</Suspense>
	);
}
