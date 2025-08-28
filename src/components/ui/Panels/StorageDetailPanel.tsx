import React from "react";
import type { StorageData } from "../StorageItem";
import timesIcon from "../../../assets/times.svg";
import externalLinkIcon from "../../../assets/external-link.svg";
import Button from "../Button";
import VideoPlayer from "../VideoPlayer.tsx";
import Tabs, { type TabItem } from "../Tabs";
import RgbVideo from "../../../assets/videos/rgb_kuna.mp4";
// import ThermoVideo from "../../../assets/videos/;

const keyEventsDEMO = [
	{
		timestamp: "T+44-46s",
		event:
			"Initial vehicle contact established with high confidence tracking (81-90%), civilian presence detected in proximity to vehicle suggesting mixed-use area",
	},
	{
		timestamp: "T+47-56s",
		event:
			"Sustained dual tracking of vehicle and civilian personnel, confidence levels maintaining 70-85% range indicating stable observation conditions",
	},
	{
		timestamp: "T+57s",
		event:
			"Critical development - first soldier detection (Track ID-3) with 76% confidence, concurrent with multiple civilian contacts suggesting populated area with military presence",
	},
	{
		timestamp: "T+58-61s",
		event:
			"Soldier contact maintained with 70-84% confidence, civilian population continues in area with track reclassification occurring (Track ID-3 transitions between civilian/soldier classification)",
	},
	{
		timestamp: "T+64-66s",
		event:
			"Additional civilian contact (Track ID-5) appears, soldier presence confirmed with Track ID-3, indicating mixed civilian-military environment",
	},
	{
		timestamp: "T+76s",
		event:
			"Second soldier contact (Track ID-6) detected with 76% confidence, multiple civilian tracks active suggesting increased activity in sector",
	},
	{
		timestamp: "T+79-89s",
		event:
			"Third soldier contact (Track ID-7) identified with 79-85% confidence, sustained tracking of multiple personnel types indicating significant mixed population presence",
	},
];

interface StorageDetailPanelProps {
	record: StorageData;
	onClose: () => void;
	setDetectionsOpen: (param: boolean) => void;
	setMissionPathOpen: (param: boolean) => void;
	setAnalysisOpen: (param: boolean) => void;
	activeTab: string;
	setActiveTab: (tabId: string) => void;
}

const StorageDetailPanel: React.FC<StorageDetailPanelProps> = ({
	setDetectionsOpen,
	setMissionPathOpen,
	setAnalysisOpen,
	record,
	onClose,
	activeTab,
	setActiveTab,
}) => {
	const tabs: TabItem[] = [
		{
			id: "rgb",
			label: "RGB",
			// value: "http://193.123.68.104:8888/rgb_hls_stream_1/index.m3u8",
			value: RgbVideo,
		},
		{
			id: "thermo",
			label: "Thermo",
			value: "http://193.123.68.104:8888/thermal_hls_stream_1/index.m3u8",
			// value: ThermoVideo,
		},
	];

	const getCurrentVideoSource = () => {
		const currentTab = tabs.find((tab) => tab.id === activeTab);
		return currentTab?.value || tabs[0].value;
	};

	const handleTabChange = (tabId: string) => {
		setActiveTab(tabId);
	};
	// const handleEdit = () => {
	// 	console.log("Edit record:", record.id);
	// 	// Implement edit functionality
	// };

	const handleDelete = () => {
		console.log("Delete record:", record.id);
		// Implement delete functionality
	};

	const handleGenerateAnalysis = () => {
		console.log("Generate analysis for record:", record.id);
		setAnalysisOpen(true);
		// Implement analysis generation
	};

	const handleMissionPathClick = () => {
		setMissionPathOpen(true);
	};

	const handleDetectionsDetailClick = () => {
		setDetectionsOpen(true);
	};

	return (
		<div className="w-[650px] h-[calc(100vh-320px)] relative rounded-[0_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/50 backdrop-blur-[2px] flex flex-col transition-all duration-300">
			{/* Header section */}
			<div className="flex-shrink-1 relative px-[25px] py-[16px]">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute right-[21px] top-[16px] w-[21px] h-[23px] text-[#E3F3F2] hover:text-white transition-colors flex items-center justify-center border-none bg-transparent"
				>
					<img src={timesIcon} alt="close" className="w-[14px] h-[14px]" />
				</button>

				{/* Mission Title */}
				<div className="text-[#E3F3F2] font-ubuntu text-[20px] font-bold leading-normal w-[378px]">
					{record.title}
				</div>

				{/* Recording coordinates */}
				<div className="text-[#E3F3F2] font-ubuntu text-[12px] font-normal opacity-80 w-[313px] mt-[9px]">
					Recording coordinates: {record.coordinates}
				</div>
			</div>

			{/* Tabs */}
			<div className="px-[25px] mt-[7px]">
				<Tabs
					tabs={tabs}
					activeTab={activeTab}
					onTabChange={handleTabChange}
					className="w-[205px]"
				/>
			</div>

			{/* Scrollable content container */}
			<div className="flex-1 overflow-x-auto px-[25px] pb-[80px]">
				<div className="mt-[14px]">
					{/* Video Player with dynamic source based on active tab */}
					<VideoPlayer
						src={getCurrentVideoSource()}
						height={activeTab === "rgb" ? "auto" : "300px"}
					/>
				</div>

				{/* External links */}
				<div className="flex justify-around items-center w-full my-6">
					<Button variant="underline" onClick={handleMissionPathClick}>
						Mission Path
						<img
							src={externalLinkIcon}
							alt="external link"
							className="ml-2 w-[14px] h-[14px]"
						/>
					</Button>
					<Button variant="underline" onClick={handleDetectionsDetailClick}>
						Detections detail
						<img
							src={externalLinkIcon}
							alt="external link"
							className="ml-2 w-[14px] h-[14px]"
						/>
					</Button>
				</div>

				{/* Detail Information */}
				<div className="w-[98%] flex flex-col gap-3 ml-1 p-1">
					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Description:</span> {record.description}
					</div>
					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">UAV: </span>
						<span className="text-[#00C6B8] underline">{record.uav}</span>
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Mission:</span> {record.mission}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Flight datetime: </span>
						{record.flightDatetime}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Operator: </span> {record.operator} (
						{record.operatorId})
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Status: </span> {record.status}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Key events: </span>
						<div>
							{keyEventsDEMO.map((i) => (
								<div
									key={`event-key-${i.timestamp}`}
									className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal"
								>
									<span className="font-bold">{i.timestamp} </span> {i.event}
								</div>
							))}
						</div>
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Mission description: </span>
						{/* {record.missionDescription} */}
						{
							"Successfully completed 74% of designated 15km² sweep pattern covering mixed agricultural and forested sectors. Navigation executed precise waypoint timing at 180m operational ceiling. Weather conditions held favorable with 6km visibility and light crosswinds from northeast."
						}
					</div>
				</div>
			</div>

			{/* Fixed Action Buttons at bottom */}
			<div className="flex-shrink-0 absolute left-8 bottom-[32px] flex items-center gap-3 ">
				{/* <Button variant="secondary" onClick={handleEdit}>
					Edit
				</Button> */}
				<Button variant="danger" onClick={handleDelete}>
					Delete
				</Button>
				<Button variant="primary" onClick={handleGenerateAnalysis}>
					Generate analysis
				</Button>
			</div>
		</div>
	);
};

export default StorageDetailPanel;
