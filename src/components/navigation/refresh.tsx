import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

// Refreshes the current page when clicked
export default function Refresh() {
	const router = useRouter();
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isCooldown, setIsCooldown] = useState(false);

	const handleRefresh = () => {
		if (!isCooldown) {
			setIsRefreshing(true);
			setIsCooldown(true);
			router.refresh();
		}
	};

	// handles the cooldown and refreshing state for the button
	useEffect(() => {
		if (isRefreshing) {
			const timer = setTimeout(() => setIsRefreshing(false), 5000);
			return () => clearTimeout(timer);
		}

		if (isCooldown) {
			const cooldownTimer = setTimeout(() => setIsCooldown(false), 5000);
			return () => clearTimeout(cooldownTimer);
		}
	}, [isRefreshing, isCooldown]);

	return (
		<button
			onClick={handleRefresh}
			className="md:px-5 px-0 rounded-full"
			disabled={isCooldown}
		>
			<Image
				src="/Refresh_icon.svg"
				alt="Spinner"
				width={50}
				height={50}
				className={`transition-transform ${isRefreshing ? "animate-spin-reverse" : ""}`}
			/>
		</button>
	);
}
