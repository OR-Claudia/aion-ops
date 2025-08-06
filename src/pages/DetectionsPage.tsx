import React from "react";
import { Layout } from "../components/layout";
import DetectionsSidebar from "../components/layout/DetectionsSidebar";
import { DetectionProvider } from "../components/layout/DetectionContext";

const DetectionsPage: React.FC = () => {
	return (
		<DetectionProvider>
			<Layout showTools={true}>
				{/* Detections sidebar */}
				<DetectionsSidebar />
			</Layout>
		</DetectionProvider>
	);
};

export default DetectionsPage;
