import React from "react";
import { Layout } from "../components/layout";
import DetectionsSidebar from "../components/layout/DetectionsSidebar";

const DetectionsPage: React.FC = () => {
	return (
		<Layout showTools={true}>
			{/* Detections sidebar */}
			<DetectionsSidebar />
		</Layout>
	);
};

export default DetectionsPage;
