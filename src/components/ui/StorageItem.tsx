import React from "react";
import { cn } from "../../lib/utils";
// import ChevronRightIcon from "../../assets/chevron-right-icon.svg";

export interface StorageData {
	id: string;
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
	flightPath: string;
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

	const imageWidth = isDetailView ? "w-[117px]" : "w-[144px]";
	const containerWidth = isDetailView ? "w-[531px]" : "w-[981px]";
	const infoGap = isDetailView ? "gap-[6px]" : "gap-[24px]";
	const infoWidth = isDetailView ? "w-[328px]" : "w-[662px]";
	// const chevronPosition = isDetailView ? "left-[510px]" : "left-[958px]";
	const datePosition = isDetailView ? "left-[382px]" : "left-[820px]";
	const infoPosition = isDetailView ? "left-[138px]" : "left-[188px]";
	const titlePosition = isDetailView ? "left-[138px]" : "left-[188px]";

	return (
		<div className={cn("relative h-[92px] ", containerWidth)}>
			{/* Background */}
			<div
				className={cn(
					"h-[92px] rounded-[0_10px_10px_10px] bg-[#242B2C] backdrop-blur-[2px] cursor-pointer transition-all duration-200 hover:bg-[#2A3138]",
					containerWidth,
					{
						"border-2 border-[rgba(211,251,216,0.5)]": selected,
					}
				)}
				onClick={handleClick}
			/>
			{/* Mission Image */}
			<img
				src={record.image}
				alt={record.title}
				className={cn(
					"h-[88px] object-cover rounded-bl-[8px] absolute left-[2px] top-[2%] z-10",
					imageWidth
				)}
			/>
			{/* Title and Date */}
			<div
				className={cn(
					"inline-flex items-center gap-[3px] absolute top-[11px] w-[200px] h-[16px]",
					titlePosition
				)}
			>
				<span className="text-[#E3F3F2] font-ubuntu text-[16px] font-medium">
					{record.title.split(" - ")[0]} -
				</span>
				<span className="text-[#E3F3F2] font-ubuntu text-[16px] font-medium">
					{record.title.split(" - ")[1]}
				</span>
			</div>
			{/* Creation Date */}
			<span
				className={cn(
					"text-[#E3F3F2] font-ubuntu text-[12px] opacity-80 absolute top-[12px] w-[112px] h-[14px]",
					datePosition
				)}
			>
				{record.date}
			</span>
			{/* Chevron Right
			<img
				src={ChevronRightIcon}
				alt="View details"
				className={cn("w-[24px] h-[16px] absolute top-[38px]", chevronPosition)}
			/> */}
			{/* Mission Details */}
			<div
				className={cn(
					"flex items-center absolute top-[46px] h-[31px]",
					infoGap,
					infoWidth,
					infoPosition
				)}
			>
				{/* UAV */}
				<div className="flex flex-col items-start gap-[6px] flex-shrink-0 min-w-[74px]">
					<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-light">
						{isDetailView ? "UAV" : "Responsible UAV"}
					</span>
					<span className="text-[#E3F3F2] font-ubuntu text-[12px] opacity-90">
						{record.uav}
					</span>
				</div>

				{/* Mission Type */}
				<div className="flex flex-col items-start gap-[6px] flex-shrink-0 min-w-[74px]">
					<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-light">
						Mission type
					</span>
					<span className="text-[#E3F3F2] font-ubuntu text-[12px] opacity-90">
						{record.missionType}
					</span>
				</div>

				{/* Flight Duration */}
				<div className="flex flex-col items-start gap-[6px] flex-shrink-0 min-w-[74px]">
					<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-light">
						Flight duration
					</span>
					<span className="text-[#E3F3F2] font-ubuntu text-[12px] opacity-90">
						{record.flightDuration}
					</span>
				</div>

				{/* Operator */}
				<div className="flex flex-col items-start gap-[6px] flex-shrink-0 min-w-[74px]">
					<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-light">
						Operator
					</span>
					<span className="text-[#E3F3F2] font-ubuntu text-[12px] opacity-90">
						{record.operator}
					</span>
				</div>

				{/* Status */}
				<div className="flex flex-col items-start gap-[6px] flex-shrink-0 min-w-[74px]">
					<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-light">
						Status
					</span>
					<span className="text-[#E3F3F2] font-ubuntu text-[12px] opacity-90">
						{record.status}
					</span>
				</div>
			</div>
		</div>
	);
};

export default StorageItem;
