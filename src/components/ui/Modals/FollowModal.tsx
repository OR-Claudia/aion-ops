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
import DroneMarker from "../DroneMarker";
import type { DetectedInFrame } from "../../../lib/types";
// import { PointTag } from "../PointTag/PointTag";

// Dedupe by track_id keeping the highest confidence
type HasTrackConfidence = { track_id: number; confidence: number };
function uniqueByHighestConfidence<T extends HasTrackConfidence>(
	arr: T[]
): T[] {
	const byId = new Map<number, T>();
	for (const d of arr) {
		const prev = byId.get(d.track_id);
		if (!prev || d.confidence > prev.confidence) {
			byId.set(d.track_id, d);
		}
	}
	return Array.from(byId.values());
}

interface FollowModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const FollowModal: React.FC<FollowModalProps> = ({ isOpen, onClose }) => {
	const [{ detections, selectedDetection, activeFrame }, updateMetaData] =
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

	const uavFrameDetection = activeFrame?.detections?.find(
		(d) => d.class_id === -1
	);
	const uavListDetection = detections?.find((d) => d.class_id === -1);
	const uavPosition: [number, number] =
		uavFrameDetection &&
		uavFrameDetection.latitude &&
		uavFrameDetection.longitude
			? [uavFrameDetection.latitude, uavFrameDetection.longitude]
			: uavListDetection &&
			  uavListDetection.latitude &&
			  uavListDetection.longitude
			? [uavListDetection.latitude!, uavListDetection.longitude!]
			: [36.716021, -4.2879599];

	const afDetectionsRaw = activeFrame?.detections || [];
	const afUnique = uniqueByHighestConfidence(
		afDetectionsRaw.filter((d) => d.class_id !== -1)
	);
	const detUnique = uniqueByHighestConfidence(
		detections.filter((d) => d.class_id !== -1)
	);
	const frameTrackIds = new Set(afUnique.map((d) => d.track_id));

	// console.log(
	// 	"detections in frame",
	// 	activeFrame?.detections.map((d) => d.class_id)
	// );

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
					<TileLayer
						url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
						// url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
					/>
					<DroneMarker position={uavPosition} />
					{afUnique.map((detection, i) => {
						if (detection.class_id !== -1) {
							/* deduped by highest confidence; no per-render set needed */
							if (
								detection.geo_coordinates?.latitude &&
								detection.geo_coordinates?.longitude
							) {
								const position: [number, number] = [
									detection.geo_coordinates.latitude || 0,
									detection.geo_coordinates.longitude || 0,
								];
								return (
									<MiniMapMarker
										key={`af-${detection.track_id}-${i}`}
										position={position}
										frameDetection={detection}
									/>
								);
							}
							return null;
						}
						return null;
					})}
					{detUnique.map((detection, i) => {
						if (detection.class_id !== -1) {
							if (frameTrackIds.has(detection.track_id)) {
								return null;
							}
							/* deduped by highest confidence; duplicates filtered above */
							if (
								detection.geo_coordinates.latitude &&
								detection.geo_coordinates.longitude
							) {
								const position: [number, number] = [
									detection.geo_coordinates.latitude || 0,
									detection.geo_coordinates.longitude || 0,
								];
								return (
									<MiniMapMarker
										key={`det-${detection.track_id}-${i}`}
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
				{detUnique.length > 0 &&
					detUnique.map((detection, i) => {
						if (detection.class_id !== -1) {
							if (frameTrackIds.has(detection.track_id)) {
								return null;
							}
							/* deduped by highest confidence; duplicates filtered above */
							return (
								<DetectionListItem
									key={`det-${detection.track_id}-${i}`}
									followDetection={detection}
									isSelected={detection.track_id === selectedDetection}
									selectDetection={() =>
										handleDetectionClick(detection.track_id)
									}
								/>
							);
						}
					})}
				{afUnique.map((detection, i) => {
					if (detection.class_id !== -1) {
						/* deduped by highest confidence; duplicates filtered above */
						return (
							<DetectionListItem
								key={`af-${detection.track_id}-${i}`}
								frameDetection={detection}
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
					{activeFrame
						? activeFrame.detections.filter((e) => e.class_id !== -1).length
						: detections.filter((e) => e.class_id !== -1).length}
				</span>
			</div>
		</Modal>
	);
};

export default FollowModal;

interface SimpleMarkerProps {
	position: [number, number];
	detection?: DetectionData;
	frameDetection?: DetectedInFrame;
}

const MiniMapMarker = memo(
	({ position, detection, frameDetection }: SimpleMarkerProps) => {
		const map = useMap();
		const markerRef = useRef<L.Marker | null>(null);
		const rootRef = useRef<Root | null>(null);
		const containerRef = useRef<HTMLDivElement | null>(null);
		const metaCtx = useContext(MetaDataCtx);
		const metaCtxRef = useRef(metaCtx);
		useEffect(() => {
			metaCtxRef.current = metaCtx;
		}, [metaCtx]);
		const [{ selectedDetection }] = metaCtx;

		// console.log(
		// 	"track id on detection",
		// 	detection?.track_id,
		// 	frameDetection?.track_id
		// );

		useEffect(() => {
			if (!map) return;

			const container = document.createElement("div");
			container.className = "custom-leafleft-marker";
			containerRef.current = container;
			container.style.position = "relative";
			// Ensure clicks on the portal root are received (not swallowed by Leaflet panes)
			container.style.pointerEvents = "auto";
			container.style.cursor = "pointer";

			const icon = L.divIcon({
				className: "custom-marker-icon",
				html: container,
				iconSize: [40, 40],
				iconAnchor: [20, 40],
			});

			const marker = L.marker(position, { icon, zIndexOffset: 1000 });
			marker.addTo(map);
			markerRef.current = marker;

			rootRef.current = createRoot(container);
			if (detection) {
				rootRef.current.render(
					<MetaDataCtx.Provider value={metaCtx}>
						<PointTag
							length={0}
							position={position}
							trackId={detection.track_id}
							style={{ left: "20px", top: "40px" }}
						>
							<div style={{ width: "fit-content", whiteSpace: "nowrap" }}>
								<p>{`ID:${detection.track_id}`}</p>
								<p>{`${capitalize(
									detection.class_name
								)}, ${detection.confidence.toFixed(2)}`}</p>
							</div>
						</PointTag>
					</MetaDataCtx.Provider>
				);
			} else if (frameDetection) {
				rootRef.current.render(
					<MetaDataCtx.Provider value={metaCtx}>
						<PointTag
							length={0}
							position={position}
							trackId={frameDetection.track_id}
							style={{ left: "20px", top: "40px" }}
						>
							<div style={{ width: "fit-content", whiteSpace: "nowrap" }}>
								<p>{`ID:${frameDetection.track_id}`}</p>
								<p>{`${capitalize(
									frameDetection.class_name
								)}, ${frameDetection.confidence.toFixed(2)}`}</p>
							</div>
						</PointTag>
					</MetaDataCtx.Provider>
				);
			}

			return () => {
				// Defer unmount to avoid unmounting a root while React is rendering
				const root = rootRef.current;
				rootRef.current = null;
				if (root) {
					setTimeout(() => {
						try {
							root.unmount();
						} catch {
							// no-op
						}
					}, 0);
				}
				if (markerRef.current) {
					map.removeLayer(markerRef.current);
					markerRef.current = null;
				}
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [map]);

		useEffect(() => {
			if (rootRef.current && containerRef.current) {
				if (detection) {
					rootRef.current.render(
						<MetaDataCtx.Provider value={metaCtx}>
							<PointTag
								length={0}
								position={position}
								trackId={detection.track_id}
								style={{ left: "20px", top: "40px" }}
							>
								<div style={{ width: "fit-content", whiteSpace: "nowrap" }}>
									<p>{`ID:${detection.track_id}`}</p>
									<p>{`${capitalize(
										detection.class_name
									)}, ${detection.confidence.toFixed(2)}`}</p>
								</div>
							</PointTag>
						</MetaDataCtx.Provider>
					);
				}
				if (frameDetection) {
					rootRef.current.render(
						<MetaDataCtx.Provider value={metaCtx}>
							<PointTag
								length={0}
								position={position}
								trackId={frameDetection.track_id}
								style={{ left: "20px", top: "40px" }}
							>
								<div style={{ width: "fit-content", whiteSpace: "nowrap" }}>
									<p>{`ID:${frameDetection.track_id}`}</p>
									<p>{`${capitalize(
										frameDetection.class_name
									)}, ${frameDetection.confidence.toFixed(2)}`}</p>
								</div>
							</PointTag>
						</MetaDataCtx.Provider>
					);
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [position, detection, frameDetection, selectedDetection]);

		// Update position when it changes
		useEffect(() => {
			if (markerRef.current) {
				markerRef.current.setLatLng(position);
			}
		}, [position]);

		return null;
	}
);
