import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import PrepPage from "@/components/prep/prep-page";

export default async function PrepPageContainer() {
	await getServerSession(authOptions);

	return (
		<div>
			<PrepPage></PrepPage>
		</div>
	);
}
