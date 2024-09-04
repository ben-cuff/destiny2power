import Image from "next/image";

export default function Loading() {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="text-center">
				<div className="flex justify-center mb-4">
					<Image
						src="/loading.png"
						alt="Loading spinner"
						width={100}
						height={100}
						className="animate-spin"
					/>
				</div>
				<p className="text-gray-200">
					Please wait while we fetch the data.
				</p>
			</div>
		</div>
	);
}
