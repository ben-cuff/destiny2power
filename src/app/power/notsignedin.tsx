import Login from "@/components/navigation/login";
import Suggestions from "@/components/power/suggestions";

// This is the sign-in prompt page for the power page
// It is designed to resemble the item cards
export default function NotSignedInPowerPage() {
	return (
		<div className="p-6 min-h-screen flex justify-center">
			<div className="w-full max-w-3xl">
				<div className="fixed inset-0 mt-32">
					<Login />
				</div>
				<div className="grid grid-cols-2 gap-6 mt-20">
					<div className="flex flex-col space-y-6">
						{[...Array(3)].map((_, index) => (
							<div
								key={index}
								className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md"
							>
								<div className="flex-grow space-y-4">
									<div className="h-6 bg-gray-700 rounded w-3/4"></div>
									<div className="h-4 bg-gray-600 rounded w-1/2"></div>
								</div>
								<div className="w-24 h-24 bg-gray-700 rounded ml-4 flex items-center justify-center"></div>
							</div>
						))}
					</div>
					<div className="flex flex-col space-y-6">
						{[...Array(5)].map((_, index) => (
							<div
								key={index}
								className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md"
							>
								<div className="flex-grow space-y-4">
									<div className="h-6 bg-gray-700 rounded w-3/4"></div>
									<div className="h-4 bg-gray-600 rounded w-1/2"></div>
								</div>
								<div className="w-24 h-24 bg-gray-700 rounded ml-4 flex items-center justify-center"></div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="ml-8 max-w-sm p-4 h-auto max-h-64 overflow-auto">
				<Suggestions lightLevel={3000} highestLightItems={[]} />
			</div>
		</div>
	);
}
