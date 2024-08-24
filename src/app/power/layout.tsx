import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function PowerLayout({ children }) {
	const session = await getServerSession();

	if (!session) {
		redirect("/");
	}

	return <div>{children}</div>;
}
