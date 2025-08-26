import React, { useState } from "react";
import Modal from "./Modal";
import type { Coordinate, StorageData } from "../StorageItem";
import DetectionListItem from "../DetectionListItem";
import Tag from "../Tag";
import { capitalize } from "../../../lib/utils";

export interface Detection {
	id: number;
	timestamp: number;
	class_id: number;
	class_name: string;
	confidence: number;
	coordinates: Coordinate;
	// track_id: number;
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
	// tracking_info: {
	// 	frame_number: number;
	// };
}

interface DetectionsModalProps {
	isOpen: boolean;
	onClose: () => void;
	record: StorageData;
	activeTab: string;
}

const DetectionsModal: React.FC<DetectionsModalProps> = ({
	isOpen,
	onClose,
	record,
	activeTab,
}) => {
	const detections = record.detected?.detections;
	const [numberOfDetections] = useState<number | undefined>(
		detections ? detections?.length : 0
	);

	// split to 50
	return (
		<Modal
			maxHeight={"740px"}
			title={`Detections - ${record.title}`}
			isOpen={isOpen}
			onClose={onClose}
			width={"640px"}
		>
			<div className="flex items-center ">
				<span className="mr-2 font-medium my-3">Active source:</span>
				<Tag variant="primary" text={capitalize(activeTab)} />
			</div>
			<div className="max-h-[550px] overflow-y-auto pb-3 mb-2">
				{detections?.map((d) => (
					<DetectionListItem detection={d} key={`${d.id}-${d.timestamp}`} />
				))}
			</div>
			<div className="flex place-content-between mt-3">
				<span className="text-xl font-bold">{`Current detections:`}</span>
				<span className="text-2xl font-normal">{numberOfDetections}</span>
			</div>
		</Modal>
	);
};

export default DetectionsModal;
