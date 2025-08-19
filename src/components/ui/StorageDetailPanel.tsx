import React from "react";
import type { StorageData } from "./StorageItem";
import timesIcon from "../../assets/times.svg";
import externalLinkIcon from "../../assets/external-link.svg";
import Button from "./Button";
import VideoPlayer from "./VideoPlayer.tsx";

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

			{/* Scrollable content container */}
			<div className="flex-1 overflow-x-auto px-[25px] pb-[80px]">
				<div>
					{/* Video Player */}
					<VideoPlayer
						src={
							// "https://objectstorage.eu-amsterdam-1.oraclecloud.com/p/rBbeJCt3p7y2zqZ7tvuDXiEeGkjD1InTVeMfCws8v2fCRtXw-fh72spHSK0ILSfS/n/ax7clclouzxl/b/bucket-20250812-1045/o/GX010921.MP4"
							"https://videos.pexels.com/video-files/6548176/6548176-hd_1920_1080_24fps.mp4"
							// "https://drive.google.com/file/d/1onsyYlOexL6JCanqPz0TLfSGyIVxfW_i/preview"
							// "http://193.123.68.104:8888/hls_stream/index.m3u8"
						}
					/>
				</div>

				{/* External links */}
				<div className="flex justify-around items-center w-full my-6">
					<Button variant="underline" onClick={handleFlightPathClick}>
						Flight path
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
						<span className="font-bold">Mission description:</span>
						{record.missionDescription}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-[14px] font-normal leading-normal w-[401px]">
						<span className="font-bold">Flight path:</span> {record.flightPath}
					</div>
				</div>
			</div>

			{/* Fixed Action Buttons at bottom */}
			<div className="flex-shrink-0 absolute left-8 bottom-[32px] flex items-center gap-3 ">
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
