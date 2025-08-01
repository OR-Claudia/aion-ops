import React from "react";
import type { StorageData } from "./StorageItem";
import timesIcon from "../../assets/times.svg";
import externalLinkIcon from "../../assets/external-link.svg";
import Button from "./Button";

interface StorageDetailPanelProps {
	record: StorageData;
	onClose: () => void;
}

const StorageDetailPanel: React.FC<StorageDetailPanelProps> = ({
	record,
	onClose,
}) => {
	const handleEdit = () => {
		console.log("Edit record:", record.id);
		// Implement edit functionality
	};

	const handleDelete = () => {
		console.log("Delete record:", record.id);
		// Implement delete functionality
	};

	const handleGenerateAnalysis = () => {
		console.log("Generate analysis for record:", record.id);
		// Implement analysis generation
	};

	const handleFlightPathClick = () => {
		console.log("View flight path for record:", record.id);
		// Implement flight path viewing
	};

	const handleDetectionsDetailClick = () => {
		console.log("View detections detail for record:", record.id);
		// Implement detections detail viewing
	};

	return (
		<div className="w-[464px] h-[70dvh] relative">
			{/* Container background */}
			<div className="w-full h-full rounded-[0_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/50 backdrop-blur-[2px]" />

			{/* Close button */}
			<button
				onClick={onClose}
				className="absolute right-[21px] top-[16px] w-[21px] h-[23px] text-[#E3F3F2] hover:text-white transition-colors flex items-center justify-center border-none bg-transparent"
			>
				<img src={timesIcon} alt="close" className="w-[14px] h-[14px]" />
			</button>

			{/* Mission Title */}
			<div className="absolute left-[25px] top-[20px] text-[#E3F3F2] font-ubuntu text-[20px] font-bold leading-normal w-[378px]">
				{record.title}
			</div>

			{/* Content container */}
			<div className="overflow-y-auto h-[65dvh]">
				{/* Recording coordinates */}
				<div className="absolute left-[25px] top-[49px] text-[#E3F3F2] font-ubuntu text-[12px] font-normal opacity-80 w-[313px]">
					Recording coordinates: {record.coordinates}
				</div>

				{/* Video Player */}
				<div className="absolute left-[25px] top-[87px] w-[414px] h-[223px]">
					{/* Video thumbnail/image */}
					<img
						src={record.videoUrl}
						alt="Mission video"
						className="w-[414px] h-[222px] object-cover rounded-[0_3px_3px_3px]"
					/>

					{/* Video overlay gradient */}
					<div className="absolute left-0 top-[71px] w-[414px] h-[152px] bg-gradient-to-b from-transparent via-transparent to-black/70 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]" />

					{/* Video controls */}
					<div className="absolute left-[156px] top-[196px] flex items-center gap-[24px] w-[101px] h-[11px]">
						{/* Previous/Rewind */}
						<div className="w-[18px] h-[18px] flex items-center justify-center text-[#E3F3F2] text-[14px] font-black">
							⏪
						</div>
						{/* Pause */}
						<div className="w-[18px] h-[18px] flex items-center justify-center text-[#E3F3F2] text-[14px] font-black">
							⏸️
						</div>
						{/* Forward */}
						<div className="w-[18px] h-[18px] flex items-center justify-center text-[#E3F3F2] text-[14px] font-black">
							⏩
						</div>
					</div>

					{/* Fullscreen button */}
					<div className="absolute right-[12px] top-[195px] w-[12px] h-[14px] flex items-center justify-center text-[#E3F3F2] text-[18px]">
						⛶
					</div>

					{/* Video timeline */}
					<div className="absolute left-[15px] top-[196px] text-white font-ubuntu text-[10px] font-light w-[26px] h-[11px]">
						33:20
					</div>

					{/* Progress bar */}
					<div className="absolute left-[2px] top-[219px] w-[258px] h-[4px] rounded-[2px] bg-[#C10000]" />

					{/* Detection overlays */}
					<div className="absolute left-[56px] top-[79px] w-[325px] h-[60px]">
						{/* Detection boxes and labels */}
						<div className="absolute left-0 top-[23px] w-[54px] h-[37px] border-2 border-[#C10000]" />
						<div className="absolute left-0 top-[5px] bg-[#C10000] border border-[#C10000] rounded-[0_4px_0_0] px-[8px] py-[3px]">
							<span className="text-[#E3F3F2] font-ubuntu text-[6px] text-right">
								ID: 396{"\n"}Rosomok - 68%
							</span>
						</div>

						<div className="absolute left-[83px] top-[28px] w-[41px] h-[26px] border-2 border-[#C10000]" />
						<div className="absolute left-[83px] top-[10px] bg-[#C10000] border border-[#C10000] rounded-[0_4px_0_0] px-[8px] py-[3px]">
							<span className="text-[#E3F3F2] font-ubuntu text-[6px] text-right">
								ID: 003{"\n"}Civilians - 98%
							</span>
						</div>

						<div className="absolute left-[181px] top-[23px] w-[24px] h-[37px] border-2 border-[#C10000]" />
						<div className="absolute left-[181px] top-[5px] bg-[#C10000] border border-[#C10000] rounded-[0_4px_0_0] px-[8px] py-[3px]">
							<span className="text-[#E3F3F2] font-ubuntu text-[6px] text-right">
								ID: 647{"\n"}Civilian - 77%
							</span>
						</div>

						<div className="absolute left-[273px] top-[18px] w-[52px] h-[21px] border-2 border-[#C10000]" />
						<div className="absolute left-[273px] top-0 bg-[#C10000] border border-[#C10000] rounded-[0_4px_0_0] px-[8px] py-[3px]">
							<span className="text-[#E3F3F2] font-ubuntu text-[6px] text-right">
								ID: 277{"\n"}F52 - 98%
							</span>
						</div>
					</div>
				</div>

				{/* External links */}
				<div className="absolute left-[63px] top-[326px] flex justify-between items-center w-[339px] h-[16px]">
					<button
						onClick={handleFlightPathClick}
						className="flex items-center gap-[6px] text-[#00C6B8] font-ubuntu text-[14px] underline hover:text-[#00D6C8] transition-colors"
					>
						Flight path
						<img
							src={externalLinkIcon}
							alt="external link"
							className="w-[14px] h-[14px]"
						/>
					</button>
					<button
						onClick={handleDetectionsDetailClick}
						className="flex items-center gap-[6px] text-[#00C6B8] font-ubuntu text-[14px] underline hover:text-[#00D6C8] transition-colors"
					>
						Detections detail
						<img
							src={externalLinkIcon}
							alt="external link"
							className="w-[14px] h-[14px]"
						/>
					</button>
				</div>

				{/* Detail Information */}
				<div className="absolute left-[28px] top-[358px] w-[414px] flex flex-col gap-[6px]">
					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Description:</span> {record.description}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Mission:</span> {record.mission}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">UAV:</span>{" "}
						<span className="text-[#00C6B8] underline">{record.uav}</span>
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Flight datetime:</span>{" "}
						{record.flightDatetime}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Operator:</span> {record.operator} (
						{record.operatorId})
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Status:</span> {record.status}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal">
						<span className="font-bold">Key events:</span> {record.keyEvents}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal w-[401px]">
						<span className="font-bold">Mission description:</span>{" "}
						{record.missionDescription.split("Commodo Consequat")[0]}
						<span className="text-[#00C6B8] underline">Commodo Consequat.</span>
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal w-[401px]">
						<span className="font-bold">Flight path:</span> {record.flightPath}
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="absolute left-[99px] bottom-[32px] flex items-center gap-[12px] w-[346px] h-[34px]">
				<Button variant="secondary" onClick={handleEdit}>
					Edit
				</Button>
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
