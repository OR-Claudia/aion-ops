import React from "react";
import Modal from "./Modal";
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
			className="backdrop-blur-[16px]"
		>
			{/* Content section - preserving exact wrapper structure */}
			<div className="px-[3px] flex flex-col gap-3 mb-[24px] flex-1">
				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-bold">
						Description (AI Generated): {cluster.description}
					</span>
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-bold">Mission: {cluster.mission}</span>
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-bold">
						Mission summary: {cluster.missionSummary}
					</span>
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-bold">
						Objects type: {cluster.objectsTypeDetailed}
					</span>
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-bold">
						Detection interval: {cluster.detectionInterval}
					</span>
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-bold">
						Recording:{" "}
						<span className="text-[#00C6B8] underline cursor-pointer hover:text-[#00E6D8] transition-colors">
							{cluster.recording}
						</span>
					</span>
				</div>

				<div className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-normal">
					<span className="font-bold">
						UAV:{" "}
						<span className="text-[#00C6B8] underline cursor-pointer hover:text-[#00E6D8] transition-colors">
							{cluster.responsibleUAV}
						</span>
					</span>
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
