import React from "react";
import { cn } from "../../lib/utils";

// const detailData = {
// 	currentLocation: "Hangar H6 (0km/h)",
// 	signalPercentage: 99,
// 	batteryPercentage: 76,
// 	description:
// 		"Widely used during the Joint Forces Operation in eastern Ukraine to conduct aerial reconnaissance and artillery fire adjustment.The long flight endurance and the long-range of the command line make it possible to carry out tasks at a tactical depth up to 50 kilometers.",
// 	droneType: "tactical",
// 	mission: "None",
// 	controlUnit: "Charles Xavier (EMP101)",
// 	keyEvents: "N/A",
// 	totalFlightTime: "337h",
// 	timeSinceLastContact: "N/A",
// };

export interface UAVData {
	id: string;
	name: string;
	type: "tactical" | "combat" | "recon";
	status: "active" | "damage" | "standby" | "destroyed" | "engaged" | "offline";
	image: string;
	lastContact: string;
	readyForFlight: "Yes" | "No";
	lastKnownLocation: string;
	location: string;
	signalPercentage: number;
	batteryPercentage: number;
	description?: string;
	controlUnit?: string;
	mission?: string;
	keyEvents?: string;
	totalFlightTime?: string;
	timeSinceLastContact?: string;
	droneType?: string;
}

interface UAVCardProps {
	uav: UAVData;
	selected: boolean;
	onClick?: (uav: UAVData) => void;
}

const statusConfig: Record<
	string,
	{ color: string; label: string; hasCircle?: boolean }
> = {
	active: { color: "#71BC2C", label: "active" },
	damage: { color: "#C10000", label: "damage" },
	standby: { color: "#E09D18", label: "standby" },
	destroyed: { color: "#C10000", label: "destroyed" },
	engaged: { color: "#00C6B8", label: "engaged" },
	offline: { color: "#E3F3F2", label: "offline", hasCircle: false },
};

const UAVCard: React.FC<UAVCardProps> = ({
	uav,
	selected = false,
	onClick,
}) => {
	const statusInfo = statusConfig[uav.status];

	return (
		<div
			className="w-[243px] h-[175px] relative cursor-pointer hover:scale-105 transition-transform duration-200"
			onClick={() => onClick?.(uav)}
		>
			{/* Background border highlight */}
			<div
				className={cn("w-[243px] h-[175px] absolute left-0 top-0", {
					["bg-[rgba(211,251,216,0.6)]"]: selected,
				})}
				style={{ borderRadius: "0px 4px 4px 4px" }}
			/>

			{/* Main background */}
			<div
				className={`w-[239px] h-[162px] opacity-10 bg-app-text absolute left-[2px] top-[2px]`}
				style={{ borderRadius: "0px 4px 4px 4px" }}
			/>

			{/* UAV Image */}
			<img
				className="w-[239px] h-[132px] absolute left-[2px] top-[2px] object-cover"
				style={{ borderRadius: "0px 4px 0px 0px" }}
				src={uav.image}
				alt={uav.name}
			/>

			{/* Image overlay gradient */}
			<div
				className="w-[239px] h-[131px] absolute left-[2px] top-[3px]"
				style={{
					background:
						"linear-gradient(179deg, rgba(102, 102, 102, 0.00) -20.07%, #1E1E1E 99.39%)",
					backgroundBlendMode: "multiply",
					borderRadius: "0px 4px 0px 0px",
				}}
			/>

			{/* UAV Details overlay on image */}
			<div className="absolute left-[16px] top-[83px] w-[211px] h-[43px] flex flex-col gap-1]">
				<div className="flex justify-between items-center">
					<span className="text-app-text font-ubuntu text-[8px] font-medium">
						Last contact
					</span>
					<span className="text-app-text font-ubuntu text-[8px] font-normal">
						{uav.lastContact}
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-app-text font-ubuntu text-[8px] font-medium">
						Ready for flight
					</span>
					<span className="text-app-text font-ubuntu text-[8px] font-normal">
						{uav.readyForFlight}
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-app-text font-ubuntu text-[8px] font-medium">
						Last known location
					</span>
					<span className="text-app-text font-ubuntu text-[8px] font-normal">
						{uav.lastKnownLocation}
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-app-text font-ubuntu text-[8px] font-medium">
						Location
					</span>
					<span className="text-app-text font-ubuntu text-[8px] font-normal">
						{uav.location}
					</span>
				</div>
			</div>

			{/* Bottom section */}
			<div
				className="w-[239px] h-[40px] absolute left-[2px] top-[133px]"
				style={{
					borderRadius: "0px 0px 4px 4px",
					backgroundColor: "#242B2C",
				}}
			/>

			{/* UAV Info and Status */}
			<div className="absolute left-[16px] top-[137px] w-[211px] h-[32px] flex justify-between items-center">
				<div className="flex flex-col justify-center items-start gap-0.5">
					<span className="text-app-text overflow-hidden text-ellipsis whitespace-nowrap font-share-tech text-[12px] font-normal max-w-[140px]">
						{uav.name}
					</span>
					<span className="text-app-text font-share-tech text-[10px] font-normal opacity-70">
						{uav.type}
					</span>
				</div>

				{/* Status indicator */}
				<div className="flex items-center gap-[6px]">
					<span className="text-app-text font-ubuntu text-[10px] font-light opacity-50">
						{statusInfo.label}
					</span>
					{statusInfo.hasCircle !== false && (
						<div
							className="w-[11px] h-[11px] rounded-full"
							style={{ backgroundColor: statusInfo.color }}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default UAVCard;
