import React from "react";
import type { Detection } from "./Modals/DetectionsModal";
import {
	capitalize,
	cn,
	formatDetectionTimestamp,
	type DetectionData,
} from "../../lib/utils";

interface DetectionListItemProps {
	detection?: Detection;
	followDetection?: DetectionData;
	// frameDetection?: DetectionData;
	isSelected?: boolean;
	selectDetection?: () => void;
}

function getDetectionImage(class_name: string) {
	const imageMap: { [key: string]: string } = {
		pedestrian: "civilians.svg",
		people: "civilians.svg",
		civilian: "civilians.svg",
		car: "civilian-vehicle.svg",
		vehicle: "civilian-vehicle.svg",
		truck: "civilian-vehicle.svg",
		tank: "military-vehicle.svg",
		soldier: "military-personnel.svg",
	};
	return imageMap[class_name.toLowerCase()] || "ban.svg"; // Default to a generic icon if no match found
}

const DetectionListItem: React.FC<DetectionListItemProps> = ({
	detection,
	followDetection,
	isSelected = true,
	selectDetection,
}) => {
	const image = getDetectionImage(
		detection?.class_name ? detection!.class_name : followDetection!.class_name
	);

	if (detection) {
		const detectionData = detection as Detection;
		return (
			<div className="bg-[#242B2C] w-[450px] rounded-[0px_10px_10px_10px] my-1 flex items-center ">
				<img
					src={`src/assets/${image}`}
					alt={detectionData.class_name}
					className="w-16 h-16 mr-2 p-2"
				/>
				<div className="flex flex-col w-full content-center">
					{/* Header */}
					<div className="flex w-full justify-between">
						<div className="text-md">
							<span className="font-medium">
								{capitalize(detectionData.class_name)}
							</span>
							<span>{" (Object class)"}</span>
						</div>
						<div className="mr-3">
							<span>{formatDetectionTimestamp(detectionData.timestamp)}</span>
						</div>
					</div>
					{/* Details */}
					<div className="flex place-content-between mr-3">
						<div className="text-sm">
							<span>{"ID: "}</span>
							<span>{detectionData.id}</span>
						</div>
						<div className="text-sm">
							<span>{`Lat: ${detectionData.coordinates?.lat} Lon: ${detectionData.coordinates?.lon}`}</span>
						</div>
						<div className="text-sm">
							<span>{"Confidence: "}</span>
							<span>{detectionData.confidence.toFixed(2)}</span>
						</div>
					</div>
				</div>
			</div>
		);
	} else if (followDetection) {
		return (
			<div
				className={cn(
					"w-[450px] rounded-[0px_10px_10px_10px] my-1 flex transition-all",
					isSelected
						? "bg-[#3A4441] h-fit pb-3 items-start"
						: "bg-[#242B2C] items-center "
				)}
				onClick={() => {
					selectDetection?.();
				}}
			>
				<img
					src={`src/assets/${image}`}
					alt={followDetection!.class_name}
					className="w-16 h-16 mr-2 p-2 "
				/>
				<div
					className={cn(
						"flex flex-col w-full content-center",
						isSelected ? "pt-2.5" : ""
					)}
				>
					{/* Header */}
					<div className="flex w-full justify-between">
						<div className="text-md">
							<span className="font-medium">
								{capitalize(followDetection!.class_name)}
							</span>
							<span>{" (Object class)"}</span>
						</div>
					</div>
					{/* Details */}
					<div className="flex place-content-between mr-3">
						<div className="text-sm">
							<span>{"ID: "}</span>
							<span>{followDetection!.track_id}</span>
						</div>
						<div className="text-sm">
							<span>{`Lat: ${followDetection.geo_coordinates.latitude.toFixed(
								4
							)} Lon: ${followDetection.geo_coordinates.longitude.toFixed(
								4
							)}`}</span>
						</div>
						<div className="text-sm">
							<span>{"Confidence: "}</span>
							<span>{followDetection!.confidence.toFixed(2)}</span>
						</div>
					</div>
					{/* Expanded details */}
					{isSelected && (
						<div className="flex flex-col place-content-between mr-3 mt-2 bt-6">
							<div className="text-sm whitespace-nowrap">
								<span className="font-bold mr-1">
									{"Estimated ground distance: "}
								</span>
								<span>{`${followDetection.geo_coordinates.estimated_ground_distance_m.toFixed(
									4
								)}m`}</span>
							</div>

							<div className="text-sm whitespace-nowrap">
								<span className="font-bold mr-1">
									{"Camera elevation degree: "}
								</span>
								<span>{`${followDetection.geo_coordinates.camera_elevation_deg.toFixed(
									4
								)}°`}</span>
							</div>
							<div className="text-sm whitespace-nowrap">
								<span className="font-bold mr-1">
									{"Camera azimuth degree: "}
								</span>
								<span>{`${followDetection.geo_coordinates.camera_azimuth_deg.toFixed(
									4
								)}°`}</span>
							</div>
							<div className="text-sm whitespace-nowrap">
								<span className="font-bold mr-1">{"Calculation method: "}</span>
								<span>{`${capitalize(
									followDetection.geo_coordinates.calculation_method
								)}`}</span>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	} else return null;
};

export default DetectionListItem;
