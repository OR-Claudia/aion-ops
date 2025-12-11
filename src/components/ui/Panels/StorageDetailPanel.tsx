import React, { useEffect } from "react";
import type { StorageData } from "../StorageItem";
import TimesIcon from "../../../assets/times.svg?react";
import externalLinkIcon from "../../../assets/external-link.svg";
import Button from "../Button";
import VideoPlayer from "../VideoPlayer.tsx";
import Tabs, { type TabItem } from "../Tabs";
import aerialVideo from "../../../assets/videos/aerial.mp4";
// import RgbVideo from "../../../assets/videos/rgb_kuna.mp4";
// import ThermoVideo from "../../../assets/videos/thermo_kuna.mp4";

const keyEvents_1 = [
	{
		timestamp: "T+1s",
		event:
			"Initial detection of two separate vehicles (track_id: 1 and 2) indicating multiple elements entering frame from different locations",
	},
	{
		timestamp: "T+2s",
		event:
			"Emergence of additional vehicles (track_ids: 3 and 4) forming a dispersed group, suggesting a coordinated movement or convoy split",
	},
	{
		timestamp: "T+5s",
		event:
			"Vehicle with track_id: 3 reclassified from 'vehicle' to 'truck', indicating a possible logistics or heavy support role within group",
	},
	{
		timestamp: "T+6s",
		event:
			"New vehicle (track_id: 5) detected far from primary group, suggesting flanking maneuver or supporting element approaching separately",
	},
	{
		timestamp: "T+7s",
		event:
			"Convergence of multiple vehicles (track_ids: 1, 2, and 5) in proximity, implying a potential rally or staging point",
	},
	{
		timestamp: "T+9s",
		event:
			"Vehicle with track_id: 1 moves significantly across multiple coordinates, indicating it is actively maneuvering or leading the group",
	},
	{
		timestamp: "T+10s",
		event:
			"Track_id: 3 (truck) reaches the front of the formation; its central positioning may suggest command or supply unit repositioning",
	},
	{
		timestamp: "T+11s",
		event:
			"Formation shows clear structure with truck (track_id: 5) in rear, vehicle (track_id: 1) at front, and others in between — consistent with tactical convoy layout",
	},
];

const keyEvents_2 = [
	{
		timestamp: "T+1s",
		event:
			"Initial detection of multiple vehicles (track_ids: 1, 2, 3 & 4) which are static as transmission begins.",
	},
	{
		timestamp: "T+11s",
		event:
			"Upon closer observation, multiple individuals are observed near vehicles, some exhibiting soldier-class characteristics based on gear and posture.",
	},
	{
		timestamp: "T+30s",
		event:
			"A group of armed individuals (track_ids: 22, 27 & 29) are detected moving idly around one of the trucks (track_id 5), suggesting possible preparation or loading activity.",
	},
	{
		timestamp: "T+54s",
		event:
			"Two of the armed individuals (track_ids: 27 & 29) depart from the truck area and head towards a nearby tree line, possibly for reconnaissance or security.",
	},
	{
		timestamp: "T+67s",
		event:
			"The remaining armed individuals follow suit, following the graveled path towards the tree line, indicating a coordinated movement away from the vehicles.",
	},
	{
		timestamp: "T+93s",
		event:
			"One of the armed individuals (track_id: 86) is seen returning alone towards the vehicles, possibly to relay information or retrieve equipment.",
	},
	{
		timestamp: "T+119s",
		event:
			"Track_id: 102 (armed individual) is observed patrolling near the vehicles, suggesting a security detail has been established around the convoy.",
	},
	{
		timestamp: "T+127s",
		event:
			"Before transmission ends, all armed individuals regroup near the vehicles, indicating the conclusion of their activity in the area.",
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
	const tabs: TabItem[] = React.useMemo(
		() =>
			record.tabs ?? [
				{
					id: "rgb",
					label: "RGB",
					// value: "http://193.123.68.104:8888/rgb_hls_stream_1/index.m3u8",
					value: aerialVideo,
				},
				{
					id: "thermo",
					label: "Thermo",
					// value: "http://193.123.68.104:8888/thermal_hls_stream_1/index.m3u8",
					value: undefined,
				},
			],
		[record.tabs]
	);

	const getCurrentVideoSource = () => {
		const currentTab = tabs.find((tab) => tab.id === activeTab);
		return currentTab?.value || "";
		//  || tabs[0].value;
	};

	const getCurrentKeyEvents = () => {
		return record.id === "1" ? keyEvents_1 : keyEvents_2;
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

	useEffect(() => {
		if (tabs.find((tab) => !tab.value)) {
			const hasVideoSource = tabs.find((tab) => tab.value);
			setActiveTab(hasVideoSource?.id ?? "rgb");
		}
	}, [activeTab, tabs, setActiveTab]);

	const keyEvents = getCurrentKeyEvents();

	return (
		<div className="w-[650px] h-[calc(100vh-320px)] relative rounded-[0_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/50 backdrop-blur-[2px] flex flex-col transition-all duration-300">
			{/* Header section */}
			<div className="flex-shrink-1 relative px-[25px] py-[16px]">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute right-[21px] top-[16px] w-[21px] h-[23px] text-[#E3F3F2] hover:text-white transition-colors flex items-center justify-center border-none bg-transparent"
				>
					<TimesIcon className="w-[14px] h-[14px] fill-[#E3F3F2]" />
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
						livestream={false}
						showControls
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
						<span className="font-bold">Drone: </span>
						{/* <span className="text-[#00C6B8] underline">{record.uav}</span> */}
						<span className="text-[#00C6B8] underline">
							{"Mavic Air 3 - Raven"}
						</span>
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
							{keyEvents.map((i) => (
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
						{record.missionDescription}
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
