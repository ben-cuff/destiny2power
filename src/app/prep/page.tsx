import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getPrepData } from "@/util/get-prep-data";
import Login from "@/components/navigation/login";
import PrepPage from "@/components/prep/prep-page";

export default async function PrepPageContainer() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<div className="mt-20">
				<Login />
			</div>
		);
	}

	const prepData = await getPrepData();

	return (
		<div>
			<PrepPage prepData={prepData} />
		</div>
	);
}
