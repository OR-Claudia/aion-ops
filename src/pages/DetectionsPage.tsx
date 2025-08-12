import React from "react";
import { Layout, useDetectionContext } from "../components/layout";
import DetectionsSidebar from "../components/layout/DetectionsSidebar";
import { ClusterDetailsModal } from "../components";

const DetectionsPage: React.FC = () => {
	const { selectedDetection, isModalOpen, clearSelection } =
		useDetectionContext();
	const handleCloseModal = () => {
		clearSelection();
	};

	return (
		<Layout showTools={true}>
			{/* Detections sidebar */}
			<DetectionsSidebar />
			{/* Cluster Details Modal */}
			<ClusterDetailsModal
				cluster={selectedDetection}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</Layout>
	);
};

export default DetectionsPage;
