import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function PowerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	// redirects the user if they are not authenticated
	if (!session) {
		redirect("/?message=signin");
	}

	return <div>{children}</div>;
}
