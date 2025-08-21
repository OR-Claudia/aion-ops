import React, { useState } from "react";
import Modal from "./Modal";
import type { Coordinate, StorageData } from "../StorageItem";
import DetectionListItem from "../DetectionListItem";

export interface Detection {
	id: number;
	timestamp: number;
	class_id: number;
	class_name: string;
	confidence: number;
	coordinates: Coordinate;
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
	record: StorageData;
}

const DetectionsModal: React.FC<DetectionsModalProps> = ({
	isOpen,
	onClose,
	record,
}) => {
	const detections = record.detected?.detections;
	const [numberOfDetections] = useState<number | undefined>(
		detections ? detections?.length : 0
	);

	// split to 50
	return (
		<Modal
			maxHeight={"700px"}
			title={"Detections"}
			isOpen={isOpen}
			onClose={onClose}
			width={"640px"}
		>
			<div className="max-h-[550px] overflow-y-auto py-3 mb-3">
				{detections?.map((d) => (
					<DetectionListItem detection={d} key={`${d.id}-${d.timestamp}`} />
				))}
			</div>
			<div className="flex place-content-between mt-5">
				<span className="text-xl font-bold">{`Current detections:`}</span>
				<span className="text-2xl font-normal">{numberOfDetections}</span>
			</div>
		</Modal>
	);
};

export default DetectionsModal;
