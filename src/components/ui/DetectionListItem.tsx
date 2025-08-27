import React from "react";
import type { Detection } from "./Modals/DetectionsModal";
import { capitalize, formatDetectionTimestamp } from "../../lib/utils";

interface DetectionListItemProps {
	detection: Detection;
}

function getDetectionImage(class_name: string) {
	const imageMap: { [key: string]: string } = {
		civilian: "civilians.svg",
		vehicle: "civilian-vehicle.svg",
		tank: "military-vehicle.svg",
		soldier: "military-personnel.svg",
	};
	return imageMap[class_name.toLowerCase()] || "ban.svg"; // Default to a generic icon if no match found
}

const DetectionListItem: React.FC<DetectionListItemProps> = ({ detection }) => {
	const image = getDetectionImage(detection.class_name);

	return (
		<div className="bg-[#242B2C] w-[450px] rounded-[0px_10px_10px_10px] my-1 flex items-center">
			<img
				src={`src/assets/${image}`}
				alt={detection.class_name}
				className="w-16 h-16 mr-2 p-2"
			/>
			<div className="flex flex-col w-full content-center">
				{/* Header */}
				<div className="flex w-full justify-between">
					<div className="text-md">
						<span className="font-medium">
							{capitalize(detection.class_name)}
						</span>
						<span>{" (Object class)"}</span>
					</div>
					<div className="mr-3">
						<span>{formatDetectionTimestamp(detection.timestamp)}</span>
					</div>
				</div>
				{/* Details */}
				<div className="flex place-content-between mr-3">
					<div className="text-sm">
						<span>{"ID: "}</span>
						<span>{detection.track_id}</span>
					</div>
					<div className="text-sm">
						<span>{`Lat: ${detection.coordinates?.lat} Lon: ${detection.coordinates?.lon}`}</span>
					</div>
					<div className="text-sm">
						<span>{"Confidence: "}</span>
						<span>{detection.confidence.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetectionListItem;
