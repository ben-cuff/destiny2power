import Image from "next/image";

export default function HomePage() {
	return (
		<div className="flex flex-col items-center justify-center align-middle">
			<div className="text-3xl text-gray-300">Prep Page</div>
			<div className="text-xl text-gray-300">
				This page is a work in progress, check back later to see how it
				looks
			</div>

			<Image
				src="/work-in-progress.png"
				width={500}
				height={500}
				alt="work in progress"
			></Image>
		</div>
	);
}
