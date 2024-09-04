import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getPrepData } from "@/util/get-prep-data";
import PrepPage from "@/components/prep/prep-page";

export default async function PrepPageContainer() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return <div>Please log in to view this page.</div>;
	}

	const prepData = await getPrepData();

	return (
		<div>
			<PrepPage prepData={prepData} />
		</div>
	);
}
