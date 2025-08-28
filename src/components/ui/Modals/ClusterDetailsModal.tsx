import React from "react";
import Modal from "../Modals/Modal";
import Button from "../Button";

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
	if (!cluster) return null;

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

	// Format coordinates for subtitle
	const coordinatesSubtitle = `Coordinates: ${cluster.coordinates
		.replace("Lat: ", "")
		.replace(" Lon: ", ", ")}`;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={cluster.clusterId}
			subtitle={coordinatesSubtitle}
			width="551px"
			minHeight="462px"
		>
			{/* Content section */}
			<div className="px-1 flex flex-col gap-3 mb-6 flex-1">
				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-[600]">Description (AI Generated): </span>
					{cluster.description}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-[600]">Mission: </span>
					{cluster.mission}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-[600]">Mission summary: </span>
					{cluster.missionSummary}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-[600]">Objects type: </span>
					{cluster.objectsTypeDetailed}
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-[600]">Detection interval: </span>
					{cluster.detectionInterval}
				</div>

				<div className="text-[#E3F3F2] flex flex-row items-center font-ubuntu text-sm font-normal leading-normal">
					<span className="font-[600]">Recording: </span>
					<Button
						variant="underline"
						onClick={() => console.log("Open recording:", cluster.recording)}
					>
						{cluster.recording}
					</Button>
				</div>

				<div className="text-[#E3F3F2] flex flex-row items-center font-ubuntu text-sm font-normal leading-normal">
					<span className="font-[600]">Drone: </span>
					<Button
						variant="underline"
						onClick={() =>
							console.log("Open Responsible drone:", cluster.responsibleUAV)
						}
					>
						{cluster.responsibleUAV}
					</Button>
				</div>
			</div>

			{/* Action buttons - preserving exact wrapper structure */}
			<div className="px-[3px] pb-[3px] flex items-center gap-4">
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
		</Modal>
	);
};

export default ClusterDetailsModal;
