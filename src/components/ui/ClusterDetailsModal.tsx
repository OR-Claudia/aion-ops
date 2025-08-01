import React, { useState, useRef, useEffect } from "react";
import timesIcon from "../../assets/times.svg";
import windowMinimizeIcon from "../../assets/window-minimize.svg";
import Button from "./Button";

export interface ClusterDetails {
	clusterId: string;
	coordinates: string;
	detectionInterval: string;
	objectsType: string;
	responsibleUAV: string;
	area: number;
	lat: number;
	lon: number;
	description: string;
	mission: string;
	missionSummary: string;
	objectsTypeDetailed: string;
	recording: string;
	uavLink: string;
}

interface ClusterDetailsModalProps {
	cluster: ClusterDetails | null;
	isOpen: boolean;
	onClose: () => void;
}

const ClusterDetailsModal: React.FC<ClusterDetailsModalProps> = ({
	cluster,
	isOpen,
	onClose,
}) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const modalRef = useRef<HTMLDivElement>(null);

	// Center the modal when it first opens
	useEffect(() => {
		if (isOpen && modalRef.current) {
			const modal = modalRef.current;
			const rect = modal.getBoundingClientRect();
			setPosition({
				x: (window.innerWidth - rect.width) / 2,
				y: (window.innerHeight - rect.height) / 2,
			});
		}
	}, [isOpen]);

	// Handle mouse events for dragging
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;

			setPosition({
				x: e.clientX - dragStart.x,
				y: e.clientY - dragStart.y,
			});
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging, dragStart]);

	if (!isOpen || !cluster) return null;

	const handleMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true);
		setDragStart({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};

	const handleMinimize = () => {
		onClose();
	};

	const handleDelete = () => {
		// Placeholder for delete functionality
		console.log("Delete cluster:", cluster.clusterId);
	};

	const handleDetections = () => {
		// Placeholder for viewing detections
		console.log("View detections for:", cluster.clusterId);
	};

	const handleEdit = () => {
		// Placeholder for edit functionality
		console.log("Edit cluster:", cluster.clusterId);
	};

	const handleGenerateAnalysis = () => {
		// Placeholder for generate analysis functionality
		console.log("Generate analysis for:", cluster.clusterId);
	};

	return (
		<div className="fixed z-50 pointer-events-auto">
			{/* Modal backdrop */}
			<div className="absolute" onClick={onClose} />
			{/* Modal content */}
			<div
				ref={modalRef}
				className="absolute w-[551px] min-h-[462px] rounded-[0px_10px_10px_0px] border-[1.5px] border-[rgba(211,251,216,0.5)] backdrop-blur-[16px]"
				style={{
					left: `${position.x}px`,
					top: `${position.y}px`,
				}}
			>
				{/* Header with controls - draggable area */}
				<div
					className={`flex items-start justify-between px-[24px] pt-[12px] mb-[17px] select-none ${
						isDragging ? "cursor-grabbing" : "cursor-grab"
					}`}
					onMouseDown={handleMouseDown}
				>
					<div>
						<h2 className="text-white font-ubuntu text-2xl font-bold leading-normal transform rotate-[0.081deg] mb-0">
							{cluster.clusterId}
						</h2>
						<p className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal m-0">
							Coordinates:
							{cluster.coordinates.replace("Lat: ", "").replace(" Lon: ", ", ")}
						</p>
					</div>
					<div className="flex items-center gap-[24px] mt-[24px]">
						<button
							onClick={handleMinimize}
							className="bg-transparent border-none hover:opacity-75 transition-opacity"
						>
							<img
								src={windowMinimizeIcon}
								alt="minimize"
								className="w-[18px] h-[18px]"
							/>
						</button>
						<button
							onClick={onClose}
							className="bg-transparent border-none hover:opacity-75 transition-opacity"
						>
							<img src={timesIcon} alt="close" className="w-[18px] h-[18px]" />
						</button>
					</div>
				</div>

				{/* Content section */}
				<div className="px-[27px] flex flex-col gap-3 mb-[24px] flex-1">
					<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
						<span className="font-bold">Description (AI Generated):</span>
						{cluster.description}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
						<span className="font-bold">Mission:</span> {cluster.mission}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
						<span className="font-bold">Mission summary:</span>
						{cluster.missionSummary}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
						<span className="font-bold">Objects type:</span>
						{cluster.objectsTypeDetailed}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
						<span className="font-bold">Detection interval:</span>
						{cluster.detectionInterval}
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
						<span className="font-bold">Recording:</span>
						<span className="text-[#00C6B8] underline cursor-pointer hover:text-[#00E6D8] transition-colors">
							{cluster.recording}
						</span>
					</div>

					<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
						<span className="font-bold">UAV:</span>
						<span className="text-[#00C6B8] underline cursor-pointer hover:text-[#00E6D8] transition-colors">
							{cluster.responsibleUAV}
						</span>
					</div>
				</div>

				{/* Action buttons */}
				<div className="px-[27px] pb-[27px] flex items-center gap-4">
					<Button variant="danger" onClick={handleDelete}>
						Delete
					</Button>
					<Button variant="secondary" onClick={handleDetections}>
						Detections
					</Button>
					<Button variant="secondary" onClick={handleEdit}>
						Edit
					</Button>
					<Button
						variant="primary"
						onClick={handleGenerateAnalysis}
						width="w-[163px]"
					>
						Generate analysis
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ClusterDetailsModal;
