import { signIn, signOut, useSession} from "next-auth/react";

export default function Login() {
	const { data: sessionData } = useSession();
	return (
		<button
			className=""
			onClick={
				sessionData ? () => void signOut() : () => void signIn("bungie")
			}
		>
			{sessionData ? "Sign out" : "Sign in"}
		</button>
	);
}
