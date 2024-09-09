import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getPrepData } from "@/util/get-prep-data";
import { BountyProp } from "@/types/bounty-prop";
import Login from "@/components/navigation/login";
import PrepPage from "@/components/prep/prep-page";

/**
 * PrepPageContainer is an async function that serves as a container component for the PrepPage component.
 * It handles the logic for fetching server session and prep data, and conditionally renders the Login component or the PrepPage component based on the session availability.
 *
 * @returns A React element that represents the container component for the PrepPage.
 */
export default async function PrepPageContainer() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<div className="mt-20">
				<Login />
			</div>
		);
	}

	const prepData: BountyProp[] = await getPrepData();
	
	return (
		<div>
			<PrepPage prepData={prepData} />
		</div>
	);
}
