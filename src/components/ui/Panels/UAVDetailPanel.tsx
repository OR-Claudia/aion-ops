import React from "react";
import type { UAVData } from "../UAVCard";
import StatusBar from "../StatusBar";
import wifiIcon from "../../../assets/wifi.svg";
import batteryFullIcon from "../../../assets/battery-full.svg";
import timesIcon from "../../../assets/times.svg";
import Button from "../Button";

interface UAVDetailPanelProps {
	uav: UAVData;
	onClose: () => void;
}

const UAVDetailPanel: React.FC<UAVDetailPanelProps> = ({ uav, onClose }) => {
	const statusConfig = {
		active: { color: "#71BC2C", label: "active" },
		damage: { color: "#C10000", label: "damage" },
		standby: { color: "#E09D18", label: "standby" },
		destroyed: { color: "#C10000", label: "destroyed" },
		engaged: { color: "#00C6B8", label: "engaged" },
		offline: { color: "rgba(227, 243, 242, 0.5)", label: "offline" },
	};

	console.log("UAVDetailPanel rendered for UAV:", uav);

	const statusInfo = statusConfig[uav.status];

	const handleFollowClick = () => {
		console.log("Follow UAV:", uav.id);
		// Implement follow functionality
	};

	const handleControlClick = () => {
		console.log("Control UAV:", uav.id);
		// Implement control functionality
	};

	const handleAssignMissionClick = () => {
		console.log("Assign mission to UAV:", uav.id);
		// Implement assign mission functionality
	};

	const getSignalBarWidth = () => {
		return uav.signalPercentage;
	};

	const getBatteryBarWidth = () => {
		return uav.batteryPercentage;
	};

	return (
		<div className="w-[30%] h-[69dvh] relative">
			{/* Container background */}
			<div className="w-full h-full rounded-[0_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/50 backdrop-blur-[2px]" />

			{/* Close button */}
			<button
				onClick={onClose}
				className="absolute right-[21px] top-[16px] w-8 h-8 text-[#E3F3F2] hover:text-white transition-colors flex items-center justify-center border-none bg-transparent"
			>
				<img src={timesIcon} alt="close" className="w-[14px] h-[14px]" />
			</button>
			{/* UAV Name */}
			<div className="absolute left-8 top-[20px] text-[#E3F3F2] font-ubuntu text-[20px] font-bold ">
				{uav.name}
			</div>

			{/* Current Location */}
			<div className="absolute left-8 top-[49px] text-[#E3F3F2] font-ubuntu text-[12px] font-normal opacity-80">
				Current location: {uav.location}
			</div>

			{/* UAV Image */}
			<img
				src={uav.image}
				alt={uav.name}
				className="absolute object-cover left-8 top-22 h-55  w-[60%] rounded-md border-[rgba(211,251,216,0.5)] border-3 mb-5  "
			/>

			{/* Status Indicators */}
			<div className="absolute right-16 top-28 flex flex-col items-center justify-evenly gap-5 w-[60px]">
				{/* Signal Status */}
				<div className="flex flex-col items-center gap-3">
					<div className="flex items-center justify-center gap-2 w-[63px] h-[15px] mb-[3px]">
						<img
							src={wifiIcon}
							alt="wifi signal"
							className="w-[18px] h-[14px]"
						/>
						<span className="text-[#E3F3F2] font-ubuntu text-sm font-normal">
							{getSignalBarWidth()}%
						</span>
					</div>
					<StatusBar percentage={getBatteryBarWidth()} color="#00C6B8" />
				</div>

				{/* Battery Status */}
				<div className="flex flex-col items-center gap-3">
					<div className="flex items-center justify-center gap-2 w-full h-[15px] mb-[3px]">
						<img
							src={batteryFullIcon}
							alt="battery level"
							className="w-[18px] h-[14px]"
						/>
						<span className="text-[#E3F3F2] font-ubuntu text-sm font-normal">
							{getBatteryBarWidth()}%
						</span>
					</div>
					<StatusBar percentage={getSignalBarWidth()} color="#71BC2C" />
				</div>

				{/* Status indicator */}
				<div className="flex items-center gap-[3px] justify-center">
					<div
						className="w-4 h-4 rounded-full"
						style={{ backgroundColor: statusInfo.color }}
					/>
					<span className="text-[#E3F3F2] font-ubuntu text-sm font-bold">
						Status:
					</span>
					<span className="text-[#E3F3F2] font-ubuntu text-sm font-normal">
						{statusInfo.label}
					</span>
				</div>
			</div>

			{/* Detail Information */}
			<div className="absolute left-8 mt-4 top-[42%] w-fit flex flex-col gap-2">
				<div className="text-[#E3F3F2] font-ubuntu text-md font-normal leading-normal w-[396px]">
					<span className="font-bold">Description: </span> {uav?.description}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-md font-normal leading-normal">
					<span className="font-bold">Drone type: </span> {uav.droneType}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-md font-normal leading-normal">
					<span className="font-bold">Mission: </span> {uav.mission}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-md font-normal leading-normal">
					<span className="font-bold">Control unit: </span> {uav.controlUnit}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-md font-normal leading-normal">
					<span className="font-bold">Key events: </span> {uav.keyEvents}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-md font-normal leading-normal">
					<span className="font-bold">Total mission time: </span>
					{uav.totalFlightTime}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-md font-normal leading-normal">
					<span className="font-bold">Time since last contact: </span>
					{uav.timeSinceLastContact}
				</div>
			</div>

			{/* Action Buttons */}
			<div className="absolute left-[35px] bottom-[32px] flex items-center gap-[6px] w-[396px] h-[34px]">
				<Button
					variant="secondary"
					onClick={handleFollowClick}
					disabled={
						statusInfo === statusConfig["offline"] ||
						statusInfo === statusConfig["destroyed"]
					}
				>
					Follow
				</Button>
				<Button variant="secondary" onClick={handleControlClick}>
					Control
				</Button>
				<Button variant="primary" onClick={handleAssignMissionClick}>
					Assign Mission
				</Button>
			</div>
		</div>
	);
};

export default UAVDetailPanel;
