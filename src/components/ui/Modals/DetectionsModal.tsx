import React from "react";
import Modal from "./Modal";

interface Coordinates {
	lat: number;
	lon: number;
}

export interface Detection {
	id: number;
	timestamp: number;
	class_id: number;
	class_name: string;
	confidence: number;
	coordinates: Coordinates;
	bbox: {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
		width: number;
		height: number;
		center_x: number;
		center_y: number;
	};
}

interface DetectionsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const DetectionsModal: React.FC<DetectionsModalProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<Modal title={"Detections"} isOpen={isOpen} onClose={onClose}>
			<div>Content</div>
		</Modal>
	);
};

export default DetectionsModal;
