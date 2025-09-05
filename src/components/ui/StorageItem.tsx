import React from "react";
import { cn } from "../../lib/utils";
import type { Detection } from "./Modals/DetectionsModal";
// import ChevronRightIcon from "../../assets/chevron-right-icon.svg";

export interface Detected {
	video_info: {
		filename: string;
		fps: number;
		width: number;
		height: number;
		total_frames: number;
		duration: number;
	};
	model_info: {
		model: string;
		confidence_threshold: number;
		classes?: string | null;
	};
	detections: Detection[];
	processing_stats: {
		total_frames_processed: number;
		processing_time: number;
		average_fps: number;
		total_detections: number;
	};
}

export interface Coordinate {
	lat: number;
	lon: number;
}

export interface StorageData {
	id: string | number;
	title: string;
	date: string;
	image: string;
	uav: string;
	missionType: string;
	flightDuration: string;
	operator: string;
	status: string;
	description: string;
	coordinates: string;
	videoUrl: string;
	mission: string;
	flightDatetime: string;
	operatorId: string;
	keyEvents: string;
	missionDescription: string;
	MissionPath: Coordinate[];
	detected?: Detected;
}

interface StorageItemProps {
	record: StorageData;
	selected?: boolean;
	onClick: (record: StorageData) => void;
	isDetailView?: boolean;
}

const StorageItem: React.FC<StorageItemProps> = ({
	record,
	selected = false,
	onClick,
	isDetailView = false,
}) => {
	const handleClick = () => {
		onClick(record);
	};

	return (
		<div
			className={cn(
				"relative h-[92px] w-full rounded-[0_10px_10px_10px] bg-[#242B2C] backdrop-blur-[2px] cursor-pointer transition-all duration-200 hover:bg-[#2A3138] flex items-center",
				{
					"border-2 border-[rgba(211,251,216,0.5)]": selected,
				}
			)}
			onClick={handleClick}
		>
			{/* Mission Image */}
			<div className="flex-shrink-0 p-[4px]">
				<img
					src={record.image}
					alt={record.title}
					className={cn(
						"h-[89px] sobject-cover rounded-bl-[8px] relative -left-[4px] z-10",
						isDetailView ? "w-[117px]" : "w-[144px]"
					)}
				/>
			</div>

			{/* Content Area */}
			<div className="flex-1 px-4 py-3 min-w-0">
				{/* Header Row - Title and Date */}
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-[3px] min-w-0 flex-1">
						<span className="text-[#E3F3F2] font-ubuntu text-[16px] font-medium truncate">
							{record.title.split(" - ")[0]} -
						</span>
						<span className="text-[#E3F3F2] font-ubuntu text-[16px] font-medium flex-shrink-0">
							{record.title.split(" - ")[1]}
						</span>
					</div>
					<span className="text-[#E3F3F2] font-ubuntu text-sm opacity-80 flex-shrink-0 mr-[12px]">
						{record.date}
					</span>
				</div>

				{/* Mission Details Row */}
				<div
					className={cn(
						"flex items-center",
						isDetailView ? "gap-2 xl:gap-3" : "gap-4 xl:gap-6"
					)}
				>
					{/* UAV */}
					<div className="flex flex-col items-start gap-[6px] min-w-0 flex-1">
						<span className="text-[#E3F3F2] font-ubuntu text-xs font-light whitespace-nowrap">
							{isDetailView ? "UAV" : "Responsible UAV"}
						</span>
						<span className="text-[#E3F3F2] font-ubuntu text-sm opacity-90 truncate w-full">
							{/* {record.uav} */}
							{"Mavic Air 3"}
						</span>
					</div>

					{/* Mission Type */}
					<div className="flex flex-col items-start gap-[6px] min-w-0 flex-1">
						<span className="text-[#E3F3F2] font-ubuntu text-xs font-light whitespace-nowrap">
							Mission type
						</span>
						<span className="text-[#E3F3F2] font-ubuntu text-sm opacity-90 truncate w-full">
							{record.missionType}
						</span>
					</div>

					{/* Flight Duration */}
					<div className="flex flex-col items-start gap-[6px] min-w-0 flex-1">
						<span className="text-[#E3F3F2] font-ubuntu text-xs font-light whitespace-nowrap">
							Mission duration
						</span>
						<span className="text-[#E3F3F2] font-ubuntu text-sm opacity-90 truncate w-full">
							{record.flightDuration}
						</span>
					</div>

					{/* Operator */}
					<div className="flex flex-col items-start gap-[6px] min-w-0 flex-1">
						<span className="text-[#E3F3F2] font-ubuntu text-xs font-light whitespace-nowrap">
							Operator
						</span>
						<span className="text-[#E3F3F2] font-ubuntu text-sm opacity-90 truncate w-full">
							{record.operator}
						</span>
					</div>

					{/* Status */}
					<div className="flex flex-col items-start gap-[6px] min-w-0 flex-1">
						<span className="text-[#E3F3F2] font-ubuntu text-xs font-light whitespace-nowrap">
							Status
						</span>
						<span className="text-[#E3F3F2] font-ubuntu text-sm opacity-90 truncate w-full">
							{record.status}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StorageItem;
