import React from "react";
import Modal from "./Modal";
import wifiIcon from "../../assets/wifi.svg";
import wifi1Icon from "../../assets/wifi-1.svg";
import wifi2Icon from "../../assets/wifi-2.svg";
import batteryFullIcon from "../../assets/battery-full.svg";
import batteryHalfIcon from "../../assets/battery-half.svg";
import batteryEmptyIcon from "../../assets/battery-empty.svg";
import Button from "./Button";

export interface UAVDetailData {
	id: string | number;
	name: string;
	coordinates: string;
	status: "active" | "damage" | "standby" | "destroyed" | "engaged" | "offline";
	signal: "strong" | "weak" | "intermittent" | "none";
	battery: "full" | "good" | "low" | "critical" | "empty";
	batteryPercentage: number;
	signalPercentage: number;
	description: string;
	mission: string;
	missionLink?: string;
	flightPath: string;
	flightPathLink?: string;
	videoFeed?: string;
	detections?: Array<{
		id: string;
		type: string;
		confidence: number;
		bounds: { x: number; y: number; width: number; height: number };
	}>;
}

export interface UAVDetailModalProps {
	onClose: () => void;
	data: UAVDetailData;
}

const UAVDetailModal: React.FC<UAVDetailModalProps> = ({ onClose, data }) => {
	if (!data) return null;

	const handleMinimize = () => {
		onClose();
	};

	const getSignalIcon = () => {
		switch (data.signal) {
			case "strong":
				return wifiIcon;
			case "weak":
				return wifi1Icon;
			case "intermittent":
				return wifi2Icon;
			default:
				return wifi1Icon;
		}
	};

	const getBatteryIcon = () => {
		switch (data.battery) {
			case "full":
			case "good":
				return batteryFullIcon;
			case "low":
				return batteryHalfIcon;
			case "critical":
			case "empty":
				return batteryEmptyIcon;
			default:
				return batteryFullIcon;
		}
	};

	const getSignalBarWidth = () => {
		return `${data.signalPercentage - 5}%`;
	};

	const getBatteryBarWidth = () => {
		return `${data.batteryPercentage - 5}%`;
	};

	const getBatteryBarColor = () => {
		if (data.batteryPercentage > 60) return "#71BC2C";
		if (data.batteryPercentage > 30) return "#E09D18";
		return "#C10000";
	};

	const handleFollow = () => {
		console.log("Follow UAV", data.id);
	};

	const handleDetections = () => {
		console.log("View detections for:", data.id);
	};

	const handleGenerateAnalysis = () => {
		console.log("Generate AI Analysis:", data.id);
	};

	const handleRequestControl = () => {
		console.log("Request control:", data.id);
	};

	return (
		<Modal
			isOpen={true}
			onClose={onClose}
			title={data.name}
			subtitle={`Live coordinates: ${data.coordinates}`}
			minimizable={true}
			onMinimize={handleMinimize}
			className="bg-black/90 backdrop-blur-[16px]"
		>
			{/* Video Player Section - preserving exact wrapper structure */}
			<div className="mb-[24px]">
				<div className="w-[610px] h-[328px] relative rounded-[0px_3px_3px_3px] bg-gray-800 overflow-hidden">
					{/* Video placeholder */}
					<img
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/97219cb76d0ca48becae0e439c360ec396f3b4f2?width=1220"
						alt="Video feed"
						className="w-full h-full object-cover"
					/>

					{/* Video overlay gradient */}
					<div className="absolute inset-x-0 bottom-0 h-[199px] bg-gradient-to-t from-black/70 to-transparent" />

					{/* Video controls */}
					<div className="absolute bottom-[22px] left-1/2 transform -translate-x-1/2 flex items-center gap-6">
						<button className="text-[#E3F3F2] hover:text-white transition-colors w-[24px] h-[24px] flex justify-center items-center">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M4 18l8.5-6L4 6v12z" />
								<path d="M13 6v12l8.5-6z" />
							</svg>
						</button>
						<button className="text-[#E3F3F2] hover:text-white transition-colors w-[24px] h-[24px] flex justify-center items-center">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
							</svg>
						</button>
						<button className="text-[#E3F3F2] hover:text-white transition-colors w-[24px] h-[24px] flex justify-center items-center">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M4 18l8.5-6L4 6v12z" />
								<path d="M13 6v12l8.5-6z" />
							</svg>
						</button>
					</div>

					{/* Expand button */}
					<button className="absolute bottom-[22px] right-[23px] text-[#E3F3F2] hover:text-white transition-colors w-[18px] h-[18px] flex justify-center items-center">
						<svg width="20" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
						</svg>
					</button>

					{/* Detection boxes (if any) */}
					{data.detections &&
						data.detections.map((detection) => (
							<div key={detection.id}>
								{/* Detection box */}
								<div
									className="absolute border-2 border-[#C10000]"
									style={{
										left: `${detection.bounds.x}px`,
										top: `${detection.bounds.y}px`,
										width: `${detection.bounds.width}px`,
										height: `${detection.bounds.height}px`,
									}}
								/>
								{/* Detection label */}
								<div
									className="absolute flex justify-center items-center gap-2.5 px-2 py-1 rounded-[0px_4px_0px_0px] border border-[#C10000] bg-[#C10000]"
									style={{
										left: `${detection.bounds.x}px`,
										top: `${detection.bounds.y - 24}px`,
									}}
								>
									<div className="text-[#E3F3F2] text-right font-ubuntu text-[8px] font-normal leading-normal">
										ID: {detection.id}
										<br />
										{detection.type} - {detection.confidence}%
									</div>
								</div>
							</div>
						))}
				</div>
			</div>

			{/* Stats Section */}
			<div className="px-[27px] mb-[20px]">
				<div className="flex items-center justify-center gap-[12px] w-[207px] mx-auto">
					{/* Signal Stats */}
					<div className="flex flex-col items-center gap-3 w-[97px]">
						<div className="flex items-center gap-[6px] mb-[6px] h-4">
							<img
								src={getSignalIcon()}
								alt="signal"
								className="w-[18px] h-[14px]"
							/>
							<span className="text-[#E3F3F2] font-ubuntu text-sm font-normal">
								{data.signalPercentage}%
							</span>
						</div>
						<div className="relative w-[97px] h-[18px]">
							<div className="w-full h-full rounded-[22px] border border-[#E3F3F2] bg-transparent" />
							<div
								className="absolute top-[3px] left-[3px] h-[12px] rounded-[22px] bg-[#00C6B8]"
								style={{ width: getSignalBarWidth() }}
							/>
						</div>
					</div>

					{/* Battery Stats */}
					<div className="flex flex-col items-center gap-3 w-[101px]">
						<div className="flex items-center gap-[6px] mb-[12px] h-[17px]">
							<img src={getBatteryIcon()} alt="battery" className="w-5 h-4" />
							<span className="text-[#E3F3F2] justify-center font-ubuntu text-sm font-normal">
								{data.batteryPercentage}%
							</span>
						</div>
						<div className="relative w-[97px] h-[18px]">
							<div className="w-full h-full rounded-[22px] border border-[#E3F3F2] bg-transparent" />
							<div
								className="absolute top-[3px] left-[3px] h-[12px] rounded-[22px]"
								style={{
									width: getBatteryBarWidth(),
									backgroundColor: getBatteryBarColor(),
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Information Section */}
			<div className="px-[12px] mb-[19px] flex flex-col gap-[11px]">
				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-bold">Description:</span> {data.description}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-bold">Mission:</span>
					{data.missionLink ? (
						<span className="text-[#00C6B8] underline cursor-pointer hover:text-[#00E6D8] transition-colors">
							{data.mission}
						</span>
					) : (
						<span className="text-[#00C6B8] underline">{data.mission}</span>
					)}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-bold">Flight path:</span>
					{data.flightPathLink ? (
						<span className="text-[#00C6B8] underline cursor-pointer hover:text-[#00E6D8] transition-colors">
							{data.flightPath}
						</span>
					) : (
						<span className="text-[#00C6B8] underline">{data.flightPath}</span>
					)}
				</div>
			</div>

			{/* Action buttons */}
			<div className="px-[12px] flex items-center gap-3 w-[596px]">
				<Button variant="secondary" onClick={handleFollow}>
					Follow
				</Button>
				<Button variant="secondary" onClick={handleDetections}>
					Detections
				</Button>
				<Button variant="secondary" onClick={handleGenerateAnalysis}>
					Generate analysis
				</Button>
				<Button variant="primary" onClick={handleRequestControl}>
					Request control
				</Button>
			</div>
		</Modal>
	);
};

export default UAVDetailModal;
