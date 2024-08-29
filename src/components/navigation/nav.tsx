import Link from "next/link";

export default function Nav() {
	return (
		<div>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/prep">Seasonal Prep</Link>
				</li>
				<li>
					<Link href="/power">Power Level</Link>
				</li>
			</ul>
		</div>
	);
}
