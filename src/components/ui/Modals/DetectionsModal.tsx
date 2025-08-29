import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import type { Coordinate } from "../StorageItem";
import DetectionListItem from "../DetectionListItem";
import Tag from "../Tag";
import { capitalize } from "../../../lib/utils";
// import { thermoData } from "../../../assets/mock-data/thermo_data";
// import { detections as rgbData } from "../../../assets/mock-data/data";
import { aerialData } from "../../../assets/mock-data/aerial-data";

export interface Detection {
	id: string | number;
	timestamp: number;
	class_id: number;
	class_name: string;
	confidence: number;
	coordinates?: Coordinate;
	track_id: number;
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
	tracking_info: {
		frame_number?: number;
	};
}

interface DetectionsModalProps {
	isOpen: boolean;
	onClose: () => void;
	// record: StorageData;
	activeTab: string;
}

const DetectionsModal: React.FC<DetectionsModalProps> = ({
	isOpen,
	onClose,
	// record,
	activeTab,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [detections, setDetections] = useState<Detection[] | any[]>([]);

	const [detectionCount, setDetectionCount] = useState<number | undefined>(
		detections ? detections?.length : 0
	);

	const uniqueRgbDetections = aerialData.detections?.filter(
		(o, index, arr) =>
			arr.findIndex(({ track_id }) => track_id === o.track_id) === index
	);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const uniqueThermoDetections: any = [];

	// 	(o, index, arr) =>
	// 		arr.findIndex(({ track_id }) => track_id === o.track_id) === index
	// );

	useEffect(() => {
		const newDetections = activeTab === "rgb" ? uniqueRgbDetections : [];
		if (JSON.stringify(detections) !== JSON.stringify(newDetections)) {
			setDetections(newDetections);
			setDetectionCount(newDetections.length);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, uniqueRgbDetections, uniqueThermoDetections]);

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
				<Tag variant="primary" text={capitalize(activeTab)} />
			</div>
			<div className="max-h-[550px] overflow-y-auto w-[470px] pb-3 mb-2 ">
				{detections.map((d) => (
					<DetectionListItem
						detection={d}
						key={`${activeTab}-${d.id}-${d.track_id}-${d.timestamp}`}
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

export default DetectionsModal;
