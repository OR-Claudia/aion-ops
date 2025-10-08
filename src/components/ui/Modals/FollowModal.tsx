import { useContext, useEffect } from "react";
import { MetaDataCtx, type DetectionData } from "../../../lib/utils";
import DetectionListItem from "../DetectionListItem";
import Modal from "./Modal";
import { MapContainer, TileLayer } from "react-leaflet";
import { PointTag } from "../PointTag/PointTag";

interface FollowModalProps {
	isOpen: boolean;
	onClose: () => void;
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
}) => {
	const [{detections, selectedDetection}, updateMetaData] = useContext(MetaDataCtx);

	useEffect(() => {
		return () => {
			updateMetaData({ selectedDetection: null });
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDetectionClick = (trackId: number) => {
		updateMetaData({ selectedDetection: trackId });
	};

	// console.log("FollowModal detections:", detections);

	const uavData = detections?.find((d) => d.class_name === "Parrot");
	const uavPosition: [number, number] = [
		uavData ? uavData.latitude! : 36.716021,
		uavData ? uavData.longitude! : -4.2879599,
	];

	return (
		<Modal title={`Follow Path`} isOpen={isOpen} onClose={onClose}>
			{/* Map + points */}
			<div className="h-[300px] min-w-[450px] border-b-[1.5px] border-[rgba(211,251,216,0.5)]">
				<MapContainer
					center={uavPosition}
					zoom={18}
					style={{
						height: "100%",
						width: "100%",
						borderRadius: "3px",
						// filter: "brightness(1.5) contrast(1) saturate(1.2)",
					}}
					className="rounded-[3px]"
				>
					<TileLayer
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
						// attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
					/>
				</MapContainer>
			</div>

			{/* Detections content */}
			<div className="max-h-[300px] p-3 overflow-y-auto">
				<PointTag position={uavPosition}>
					<div>Test</div>
				</PointTag>
				{tempDetections.map((detection, index) => {
					if (detection.class_name !== "Parrot") {
						return (
							<DetectionListItem
								key={`${detection.class_name}-${index}`}
								followDetection={detection}
								isSelected={detection.track_id === selectedDetection}
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
