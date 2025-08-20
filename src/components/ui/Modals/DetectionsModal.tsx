import React from "react";
import Modal from "./Modal";

interface Coordinates {
	lat: number;
	lon: number;
}

export interface Detection {
	id: number;
	coordinates: Coordinates[];
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
