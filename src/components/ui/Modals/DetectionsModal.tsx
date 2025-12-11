import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import type { Coordinate, StorageData } from "../StorageItem";
import DetectionListItem from "../DetectionListItem";
import Tag from "../Tag";
import { capitalize } from "../../../lib/utils";
import { thermoData } from "../../../assets/mock-data/thermo_data";
import { detections as rgbData } from "../../../assets/mock-data/rgb_data";
import { aerialData } from "../../../assets/mock-data/aerial_data";

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
	record: StorageData;
	activeTab: string;
}

const filterUniqueDetections = (detections: Detection[]) => {
	const uniqueDetections = detections.filter(
		(obj, index, arr) =>
			arr.findIndex(({ track_id }) => track_id === obj.track_id) === index
	);
	return uniqueDetections;
};

// Small helper to extract unique class names from detections
const extractUniqueClassNames = (
	items: Array<Pick<Detection, "class_name">>
) => {
	const set = new Set<string>();
	for (const d of items) {
		if (d && typeof d.class_name === "string") {
			set.add(d.class_name);
		}
	}
	return Array.from(set).sort();
};

const DetectionsModal: React.FC<DetectionsModalProps> = ({
	isOpen,
	onClose,
	record,
	activeTab,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [detections, setDetections] = useState<Detection[] | any[]>([]);

	const [detectionCount, setDetectionCount] = useState<number | undefined>(
		detections ? detections?.length : 0
	);

	const uniqueRgbDetections = filterUniqueDetections(rgbData.detections);
	const uniqueThermoDetections = filterUniqueDetections(thermoData.detections);
	const uniqueAerialDetections = filterUniqueDetections(aerialData.detections);

	// temporary implementation for demo purposes
	useEffect(() => {
		if (record.id === "1") {
			const newDetections =
				activeTab === "rgb" ? uniqueRgbDetections : uniqueThermoDetections;

			if (JSON.stringify(detections) !== JSON.stringify(newDetections)) {
				setDetections(newDetections);
				setDetectionCount(newDetections.length);
			}
		} else {
			const newDetections = uniqueAerialDetections;
			if (JSON.stringify(detections) !== JSON.stringify(newDetections)) {
				setDetections(newDetections);
				setDetectionCount(newDetections.length);
			}
		}
	}, [
		activeTab,
		detections,
		record.id,
		uniqueAerialDetections,
		uniqueRgbDetections,
		uniqueThermoDetections,
	]);

	// Log unique class names whenever detections change
	useEffect(() => {
		if (!detections || detections.length === 0) return;
		const unique = extractUniqueClassNames(detections as Detection[]);
		console.log(
			`[DetectionsModal] unique class names (${unique.length}):`,
			unique
		);
	}, [detections, activeTab]);

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
