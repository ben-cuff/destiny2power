import Link from "next/link";

// Constructs links to navigate around the website
export default function Nav() {
	return (
		<div className="flex items-center px-4">
			<div className="text-3xl font-bold text-white hover:text-gray-400 transition duration-200 ease-in-out mr-16">
				<Link href="/">Destiny 2 Power</Link>
			</div>
			<div className="flex-grow flex justify-start ml-10">
				<div className="flex space-x-10">
					<Link
						href="/prep"
						className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
					>
						Seasonal Prep
					</Link>
					<Link
						href="/power"
						className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
					>
						Power Level
					</Link>
				</div>
			</div>
		</div>
	);
}
