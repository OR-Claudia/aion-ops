import React from "react";
import Modal from "./Modal";
import wifiIcon from "../../../assets/wifi.svg";
import wifi1Icon from "../../../assets/wifi-1.svg";
import wifi2Icon from "../../../assets/wifi-2.svg";
import batteryFullIcon from "../../../assets/battery-full.svg";
import batteryHalfIcon from "../../../assets/battery-half.svg";
import batteryEmptyIcon from "../../../assets/battery-empty.svg";
import Button from "../Button";
import VideoPlayer from "../VideoPlayer";
import Tabs, { type TabItem } from "../Tabs";

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
	MissionPath: string;
	MissionPathLink?: string;
	videoFeed?: string;
	droneType: string;
	detections?: Array<{
		id: string;
		type: string;
		confidence: number;
		bounds: { x: number; y: number; width: number; height: number };
	}>;
	missionPathCoordinates?: Array<{ lat: number; lon: number }>;
}

export interface UAVDetailModalProps {
	onClose: () => void;
	data: UAVDetailData;
	onMissionPathClick?: () => void;
	onAnalysisClick?: () => void;
	activeTab: string;
	onTabChange: (tabId: string) => void;
	onKeyEventsClick?: () => void;
	onDetectionsClick?: () => void;
}

const livestream = true;

const UAVDetailModal: React.FC<UAVDetailModalProps> = ({
	onClose,
	data,
	onMissionPathClick,
	onAnalysisClick,
	activeTab,
	onTabChange,
	onKeyEventsClick,
	onDetectionsClick,
}) => {
	if (!data) return null;

	const tabs: TabItem[] = [
		{
			id: "rgb",
			label: "RGB",
			value: "http://193.123.68.104:8888/rgb_hls_stream_1/index.m3u8",
		},
		{
			id: "thermo",
			label: "Thermo",
			value: "http://193.123.68.104:8888/thermal_hls_stream_1/index.m3u8",
		},
	];

	const getCurrentVideoSource = () => {
		const currentTab = tabs.find((tab) => tab.id === activeTab);
		return currentTab?.value || "";
	};

	const shouldEnableSync = () => {
		const currentSource = getCurrentVideoSource();
		// Enable sync only for live HLS streams (.m3u8 URLs)
		return livestream && (
			currentSource.toLowerCase().includes(".m3u8") ||
			currentSource.toLowerCase().includes("application/vnd.apple.mpegurl")
		);
	};

	const handleTabChange = (tabId: string) => {
		onTabChange(tabId);
	};

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

	const handleMissionPathClick = () => {
		if (onMissionPathClick) {
			onMissionPathClick();
		}
	};
	const handleGenerateAnalysis = () => {
		console.log("Generate analysis for:", data.id);
		onAnalysisClick?.();
	};

	const handleFollow = () => {
		console.log("Follow UAV", data.id);
	};

	const handleDetections = () => {
		console.log("View detections for:", data.id);
		if (onDetectionsClick) {
			onDetectionsClick();
		}
	};

	const handleKeyEvents = () => {
		console.log("View key events for:", data.id);
		if (onKeyEventsClick) {
			onKeyEventsClick();
		}
	};

	// const handleRequestControl = () => {
	// 	console.log("Request control:", data.id);
	// };

	return (
		<Modal
			isOpen={true}
			onClose={onClose}
			title={data.name}
			subtitle={`Live coordinates: ${data.coordinates}`}
			minimizable={true}
			onMinimize={handleMinimize}
			minHeight="750px"
			headerContent={
				<div className="flex items-center gap-2">
					<div
						className="w-[11px] h-[11px] rounded-full"
						style={{ backgroundColor: "#C10000" }}
					/>
					<span>Live</span>
				</div>
			}
		>
			{/* Tabs Section */}
			<div className=" mb-[14px]">
				<Tabs
					tabs={tabs}
					activeTab={activeTab}
					onTabChange={handleTabChange}
					className="w-[205px]"
				/>
			</div>

			{/* Video Player Section - preserving exact wrapper structure */}
			<div className="mb-4">
				<div className="w-full h-fit relative rounded-[0px_3px_3px_3px] overflow-hidden">
					{/* Video Player */}
					<div className="w-full ">
						<VideoPlayer
							livestream={livestream}
							src={getCurrentVideoSource()}
							enableSync={shouldEnableSync()}
							height={
								livestream
									? activeTab === "rgb"
										? "300px"
										: "300px"
									: activeTab === "rgb"
									? "auto"
									: "300px"
							}
						/>
					</div>
				</div>
			</div>
			<div className="overflow-y-auto max-h-[200px] ">
				{/* Stats Section */}
				<div className="px-[27px] mb-[20px]">
					<div className="flex items-center justify-center gap-[12px] w-[207px] mx-auto ">
						{/* Signal Stats */}
						<div className="flex flex-col items-center gap-3 w-[101px] min-h-[60px]">
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
						<div className="flex flex-col items-center min-h-[60px] gap-3 w-[101px]">
							<div className="flex items-center gap-[6px] mb-[6px] h-[17px]">
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
				<div className="px-[12px] mb-[32px] flex flex-col gap-[11px] ">
					<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
						<span className="font-bold">Description: </span> {data.description}
					</div>

					<div className="text-[#E3F3F2] flex flex-row items-center  font-ubuntu text-sm font-normal leading-normal">
						<span className="font-bold">Mission: </span>
						{data.missionLink ? (
							<Button
								variant="underline"
								onClick={() =>
									console.log("Open mission details:", data.missionLink)
								}
							>
								{data.mission}
							</Button>
						) : (
							<span className="text-[#00C6B8] underline">{data.mission}</span>
						)}
					</div>

					<div className="text-[#E3F3F2] flex flex-row items-center font-ubuntu text-sm font-normal leading-normal">
						<span className="font-bold">Mission Path:</span>
						<Button variant="underline" onClick={handleMissionPathClick}>
							{data.MissionPath}
						</Button>
					</div>
				</div>
			</div>

			{/* Action buttons */}
			<div className="px-3 flex items-center gap-2 w-[596px]">
				<Button variant="secondary" onClick={handleFollow}>
					Follow
				</Button>
				<Button variant="secondary" onClick={handleDetections}>
					Detections
				</Button>
				<Button variant="secondary" onClick={handleKeyEvents}>
					Key Events
				</Button>
				<Button variant="primary" onClick={handleGenerateAnalysis}>
					Generate analysis
				</Button>
				{/* <Button variant="primary" onClick={handleRequestControl}>
					Request control
				</Button> */}
			</div>
		</Modal>
	);
};

export default UAVDetailModal;
