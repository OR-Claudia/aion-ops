import { useState } from "react";
import type { DetectionData } from "../../../lib/utils";
import DetectionListItem from "../DetectionListItem";
import Modal from "./Modal";

interface FollowModalProps {
	isOpen: boolean;
	onClose: () => void;
	detections?: DetectionData[];
	// record: StorageData;
	// activeTab: string;
}

const tempDetections: DetectionData[] = [
	{
		class_id: 0,
		class_name: "pedestrian",
		confidence: 0.902970552444458,
		bbox: [
			527.0844116210938, 187.8198699951172, 584.216796875, 339.19415283203125,
		],
		track_id: 1490,
		geo_coordinates: {
			latitude: 36.71601423047036,
			longitude: -4.287966531719738,
			estimated_ground_distance_m: 0.9581725958572745,
			camera_azimuth_deg: 218.14218768135044,
			camera_elevation_deg: -91.56369273208688,
			calculation_method: "photogrammetry",
			gimbal_method: "fallback_nadir",
			has_camera_specs: true,
		},
	},
	{
		class_id: 1,
		class_name: "people",
		confidence: 0.45470988750457764,
		bbox: [
			609.0904541015625, 402.57611083984375, 697.0224609375, 586.1136474609375,
		],
		track_id: 1748,
		geo_coordinates: {
			latitude: 36.71601172811927,
			longitude: -4.28796937696068,
			estimated_ground_distance_m: 1.334351793067317,
			camera_azimuth_deg: 219.3290952461113,
			camera_elevation_deg: -87.822908024738,
			calculation_method: "photogrammetry",
			gimbal_method: "fallback_nadir",
			has_camera_specs: true,
		},
	},

	{
		class_id: -1,
		class_name: "Parrot",
		confidence: 1,
		latitude: 36.716021,
		longitude: -4.2879599,
		// @ts-expect-error - Dummy Data - Parrot is UAV, not real tracked object
		altitude: 35.1,
	},
];

const FollowModal: React.FC<FollowModalProps> = ({
	isOpen,
	onClose,
	detections = tempDetections,
	// record,
	// activeTab,
}) => {
	const [selectedDetectionId, setSelectedDetectionId] = useState<number | null>(
		null
	);

	const handleDetectionClick = (trackId: number) => {
		if (trackId === selectedDetectionId) {
			setSelectedDetectionId(null);
		} else {
			setSelectedDetectionId(trackId);
		}
	};

	return (
		<Modal title={`Follow Path`} isOpen={isOpen} onClose={onClose}>
			{/* TODO: Map + points */}
			{/* Detections content */}

			<div className="max-h-[300px] p-3 overflow-y-auto">
				{detections.map((detection, index) => {
					if (detection.class_name !== "Parrot") {
						return (
							<DetectionListItem
								key={`${detection.class_name}-${index}`}
								followDetection={detection}
								isSelected={detection.track_id === selectedDetectionId}
								selectDetection={() => handleDetectionClick(detection.track_id)}
							/>
						);
					}
				})}
			</div>
		</Modal>
	);
};

export default FollowModal;
