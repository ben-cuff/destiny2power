"use client";

import { SessionProvider } from "next-auth/react";

//this provides the client session to the app so that the user can be authenticated
export default function ClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <SessionProvider>{children}</SessionProvider>;
}
