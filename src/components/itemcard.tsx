import Image from "next/image";

interface ItemCardProps {
	name: string;
	lightLevel: number;
	icon?: string;
}

// This generates the item card for the power page
const ItemCard: React.FC<ItemCardProps> = ({ name, lightLevel, icon }) => {
	return (
		<div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md animate-fade-in-up">
			<div className="flex-grow">
				<p className="text-lg font-semibold">{name}</p>
				<p className="text-sm text-gray-400">
					Light Level: {lightLevel}
				</p>
			</div>
			{icon && (
				<Image
					src={`https://www.bungie.net${icon}`}
					alt={name}
					width={100}
					height={100}
					className="ml-4 rounded-lg"
				/>
			)}
		</div>
	);
};

export default ItemCard;
