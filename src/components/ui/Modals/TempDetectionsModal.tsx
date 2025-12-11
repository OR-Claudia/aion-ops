import React from "react";
import Modal from "./Modal";
// import type { Coordinate } from "../StorageItem";
import DetectionListItem from "../DetectionListItem";
import Tag from "../Tag";

import type { DetectedInFrame } from "../../../lib/types";
import { useDistinctFrameDetections } from "../../../lib/utils";

interface TempDetectionsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const TempDetectionsModal: React.FC<TempDetectionsModalProps> = ({
	isOpen,
	onClose,
}) => {
	const detections: DetectedInFrame[] = useDistinctFrameDetections();
	const detectionCount = detections ? detections.length : 0;

	return (
		<Modal
			// maxHeight={"740px"}
			title={`Detections`}
			isOpen={isOpen}
			onClose={onClose}
			// width={"540px"}
		>
			<div className="flex items-center ">
				<span className="mr-2 font-medium my-3">Active source:</span>
				<Tag variant="primary" text={"Live"} />
			</div>
			<div className="max-h-[550px] overflow-y-auto w-[470px] pb-3 mb-2 ">
				{detections.map((d) => (
					<DetectionListItem
						frameDetection={d}
						isSelected={false}
						key={`live-${d.track_id}-${d.track_id}`}
					/>
				))}
			</div>
			<div className="flex place-content-between mt-3">
				<span className="text-xl font-bold">{`Current detections:`}</span>
				<span className="text-2xl font-normal">{detectionCount}</span>
			</div>
		</Modal>
	);
};

export default TempDetectionsModal;
