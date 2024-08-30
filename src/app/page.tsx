import Login from "@/components/navigation/login";

export default function HomePage({
	searchParams,
}: {
	searchParams: { message?: string };
}) {
	const { message } = searchParams;
	return (
		<div>
			<div>Home Page</div>
			{message === "signin" && (
				<div>
					<p>You need to sign in to access that page.</p>
					<Login />
				</div>
			)}
		</div>
	);
}
