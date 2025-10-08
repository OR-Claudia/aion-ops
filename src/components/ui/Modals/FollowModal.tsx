import { memo, useContext, useEffect, useRef } from "react";
import {
	capitalize,
	MetaDataCtx,
	type DetectionData,
} from "../../../lib/utils";
import DetectionListItem from "../DetectionListItem";
import Modal from "./Modal";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { createRoot, type Root } from "react-dom/client";
import { PointTag } from "../PointTag/PointTag";
// import { PointTag } from "../PointTag/PointTag";

interface FollowModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const FollowModal: React.FC<FollowModalProps> = ({ isOpen, onClose }) => {
	const [{ detections, selectedDetection }, updateMetaData] =
		useContext(MetaDataCtx);

	useEffect(() => {
		return () => {
			updateMetaData({ selectedDetection: null });
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDetectionClick = (trackId: number) => {
		updateMetaData({ selectedDetection: trackId });
	};

	const uavData = detections?.find((d) => d.class_id === -1);
	const uavPosition: [number, number] = [
		uavData ? uavData.latitude! : 36.716021,
		uavData ? uavData.longitude! : -4.2879599,
	];

	return (
		<Modal title={`Follow Path`} isOpen={isOpen} onClose={onClose}>
			{/* Map + points */}
			<div className="h-[300px] min-w-[450px] border-b-[1.5px] border-[rgba(211,251,216,0.5)] relative mb-2">
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
					<TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
					{detections &&
						detections.map((detection, i) => {
							if (detection.class_id !== -1) {
								if (
									detection.geo_coordinates.latitude &&
									detection.geo_coordinates.longitude
								) {
									const position: [number, number] = [
										detection.geo_coordinates.latitude || 0,
										detection.geo_coordinates.longitude || 0,
									];
									return (
										<SimpleMarker
											key={`${detection.class_id}-${i}`}
											position={position}
											detection={detection}
										/>
									);
								}
								return null;
							}
							return null;
						})}
				</MapContainer>
			</div>

			{/* Detections content */}
			<div className="max-h-[300px] p-3 overflow-y-auto">
				{detections.map((detection, index) => {
					if (detection.class_id !== -1) {
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
			<div className="flex place-content-between mt-3">
				<span className="text-xl font-bold">{`Current detections:`}</span>

				<span className="text-2xl font-normal">
					{detections.filter((e) => e.class_id !== -1).length}
				</span>
			</div>
		</Modal>
	);
};

export default FollowModal;

interface SimpleMarkerProps {
	position: [number, number];
	detection: DetectionData;
}

const SimpleMarker = memo(({ position, detection }: SimpleMarkerProps) => {
	const map = useMap();
	const d = detection;
	const markerRef = useRef<L.Marker | null>(null);
	const rootRef = useRef<Root | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!map) return;

		const container = document.createElement("div");
		container.className = "custom-leafleft-marker";
		containerRef.current = container;

		const icon = L.divIcon({
			className: "custom-marker-icon",
			html: container,
			iconSize: [40, 40],
			iconAnchor: [20, 40],
		});

		const marker = L.marker(position, { icon });
		marker.addTo(map);
		markerRef.current = marker;

		rootRef.current = createRoot(container);
		rootRef.current.render(
			<PointTag length={0} position={position} trackId={d.track_id}>
				<div style={{ width: "fit-content", whiteSpace: "nowrap" }}>
					<p>{`ID:${d.track_id}`}</p>
					<p>{`${capitalize(d.class_name)}, ${d.confidence.toFixed(2)}`}</p>
				</div>
			</PointTag>
		);

		return () => {
			if (rootRef.current) {
				rootRef.current.unmount();
				rootRef.current = null;
			}
			if (markerRef.current) {
				map.removeLayer(markerRef.current);
				markerRef.current = null;
			}
		};
	}, [map, position, d]);

	useEffect(() => {
		if (rootRef.current && containerRef.current) {
			rootRef.current.render(
				<PointTag length={0} position={position}>
					<div style={{ width: "fit-content", whiteSpace: "nowrap" }}>
						<p>{`ID:${d.track_id}`}</p>
						<p>{`${capitalize(d.class_name)}, ${d.confidence.toFixed(2)}`}</p>
					</div>
				</PointTag>
			);
		}
	}, [position, d]);

	// Update position when it changes
	useEffect(() => {
		if (markerRef.current) {
			markerRef.current.setLatLng(position);
		}
	}, [position]);

	return null;
});
