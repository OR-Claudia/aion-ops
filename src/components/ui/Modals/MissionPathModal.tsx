import React, { useEffect, useState, useContext, useRef } from "react";
import {
	MapContainer,
	TileLayer,
	Polyline,
	Polygon,
	CircleMarker,
} from "react-leaflet";
import { LatLngBounds } from "leaflet";
import Modal from "./Modal";
import type { StorageData } from "../StorageItem";
import type { UAVDetailData } from "./UAVDetailModal";
import { reverseGeocode, MetaDataCtx } from "../../../lib/utils";
import DroneMarker from "../DroneMarker";
import { useUAVLocations } from "../../layout/ctx/UAVLocations/useUAVLocations";

interface MissionPathModalProps {
	isOpen: boolean;
	onClose: () => void;
	record?: StorageData;
	uavData?: UAVDetailData;
}

interface DetectionCluster {
	lat: number;
	lon: number;
	count: number;
	type: "low" | "medium" | "high";
}

const MissionPathModal: React.FC<MissionPathModalProps> = ({
	isOpen,
	onClose,
	record,
	uavData,
}) => {
	const [region, setRegion] = useState<string>("Loading...");
	const hasIdentifiedRef = useRef(false);
	const lastGeocodeAtRef = useRef(0);

	// Determine which data source to use
	const isUAVData = !!uavData;
	const isLiveUav2 = isUAVData && String(uavData?.id) === "2";
	const uavLocations = useUAVLocations();
	const [{ telemetry }] = useContext(MetaDataCtx);

	// Geo helpers: convert meters to degrees at given latitude
	const metersToLat = (meters: number) => meters / 111320;
	const metersToLon = (meters: number, atLat: number) =>
		meters / (111320 * Math.cos((atLat * Math.PI) / 180));

	// Get mission path coordinates and detections based on data type
	const missionPathCoordinates = isLiveUav2
		? uavLocations.getPathById(2)
		: isUAVData
		? uavData?.missionPathCoordinates || []
		: record?.MissionPath || [];

	const numberOfDetections = isUAVData
		? uavData?.detections?.length || 0
		: record?.detected?.detections?.length || 0;

	const title = isUAVData
		? `${uavData?.name} - Mission Path`
		: record?.title || "Mission Path";

	// Generate detection clusters based on Mission Path and detections
	const generateDetectionClusters = (): DetectionCluster[] => {
		if (!missionPathCoordinates || missionPathCoordinates.length === 0)
			return [];

		// For live UAV data with 0 detections, don't generate any clusters
		if (isUAVData && numberOfDetections === 0) {
			return [];
		}

		const clusters: DetectionCluster[] = [];
		const pathLength = missionPathCoordinates.length;

		// Ensure we have at least some clusters along the path
		const numClusters = Math.min(Math.max(3, Math.floor(pathLength / 3)), 8);
		const step = Math.max(1, Math.floor(pathLength / numClusters));

		// Add clusters at strategic points along the Mission Path
		for (let i = 0; i < pathLength; i += step) {
			const point = missionPathCoordinates[i];

			// For UAV data, use actual detections; for storage data, simulate if needed
			const detectionCount = isUAVData
				? numberOfDetections
				: numberOfDetections > 0
				? numberOfDetections
				: Math.floor(Math.random() * 20) + 5;

			let type: "low" | "medium" | "high" = "low";
			if (detectionCount > 15) type = "high";
			else if (detectionCount > 10) type = "medium";

			clusters.push({
				lat: point.lat,
				lon: point.lon,
				count: detectionCount,
				type,
			});
		}

		return clusters;
	};

	const detectionClusters = generateDetectionClusters();

	// Calculate map bounds to fit all points
	const calculateMapBounds = () => {
		if (!missionPathCoordinates || missionPathCoordinates.length === 0) {
			// Default to a small ~60m box
			const latPad = metersToLat(60);
			const lonPad = metersToLon(60, 50.0);
			return new LatLngBounds(
				[50.0 - latPad, 19.0 - lonPad],
				[50.0 + latPad, 19.0 + lonPad]
			);
		}

		// For live UAV id 2, focus tightly around the latest position (~60m box)
		if (isLiveUav2) {
			const last = missionPathCoordinates[missionPathCoordinates.length - 1];
			const latPad = metersToLat(60);
			const lonPad = metersToLon(60, last.lat);
			return new LatLngBounds(
				[last.lat - latPad, last.lon - lonPad],
				[last.lat + latPad, last.lon + lonPad]
			);
		}

		// For stored paths, fit bounds but cap padding to <= 60m
		const lats = missionPathCoordinates.map((p) => p.lat);
		const lons = missionPathCoordinates.map((p) => p.lon);

		const minLat = Math.min(...lats);
		const maxLat = Math.max(...lats);
		const minLon = Math.min(...lons);
		const maxLon = Math.max(...lons);

		const meanLat = (minLat + maxLat) / 2;

		const latPadPct = (maxLat - minLat) * 0.1;
		const lonPadPct = (maxLon - minLon) * 0.1;

		const latPad = Math.max(
			metersToLat(20),
			Math.min(metersToLat(60), latPadPct || metersToLat(30))
		);
		const lonPad = Math.max(
			metersToLon(20, meanLat),
			Math.min(metersToLon(60, meanLat), lonPadPct || metersToLon(30, meanLat))
		);

		return new LatLngBounds(
			[minLat - latPad, minLon - lonPad],
			[maxLat + latPad, maxLon + lonPad]
		);
	};

	const mapBounds = calculateMapBounds();
	const currentPosition = isLiveUav2
		? uavLocations.getCurrentPositionById(2)
		: null;

	// Reverse geocode only when modal is open and path becomes available;
	// throttle to once per minute after first successful identification
	useEffect(() => {
		let cancelled = false;
		let intervalId: ReturnType<typeof setInterval> | null = null;

		const run = async () => {
			if (!isOpen) {
				setRegion("Loading...");
				return;
			}

			if (!missionPathCoordinates || missionPathCoordinates.length === 0) {
				setRegion("No flight data");
				return;
			}

			const first = missionPathCoordinates[0];

			// while not identified yet, show fallback immediately
			if (!hasIdentifiedRef.current) {
				const fallback = `${first.lat.toFixed(5)}, ${first.lon.toFixed(5)}`;
				setRegion(fallback);
			}

			const now = Date.now();
			const shouldGeocode =
				!hasIdentifiedRef.current || now - lastGeocodeAtRef.current >= 60_000;

			if (!shouldGeocode) {
				return;
			}

			try {
				const name = await reverseGeocode(first.lat, first.lon);
				if (!cancelled && name) {
					setRegion(name);
					hasIdentifiedRef.current = true;
					lastGeocodeAtRef.current = Date.now();
				}
			} catch {
				// keep previous/fallback region on error
			}
		};

		// initial run
		void run();

		// re-check every minute when open and data available
		if (isOpen && missionPathCoordinates && missionPathCoordinates.length > 0) {
			intervalId = setInterval(() => {
				void run();
			}, 60_000);
		}

		return () => {
			cancelled = true;
			if (intervalId) clearInterval(intervalId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, missionPathCoordinates?.length]);

	// Generate covered area polygon points (~50m radius around current or path center)
	const generateCoveredArea = () => {
		if (!missionPathCoordinates || missionPathCoordinates.length === 0)
			return [];

		// Prefer current live position for UAV 2 if available
		let centerLat: number;
		let centerLon: number;
		if (isLiveUav2 && currentPosition) {
			centerLat = currentPosition[0];
			centerLon = currentPosition[1];
		} else {
			centerLat =
				missionPathCoordinates.reduce((sum, p) => sum + p.lat, 0) /
				missionPathCoordinates.length;
			centerLon =
				missionPathCoordinates.reduce((sum, p) => sum + p.lon, 0) /
				missionPathCoordinates.length;
		}

		const radiusMeters = 50; // max coverage radius
		const radiusLat = metersToLat(radiusMeters);
		const radiusLon = metersToLon(radiusMeters, centerLat);

		const points: [number, number][] = [];
		const segments = 24;
		for (let i = 0; i <= segments; i++) {
			const angle = (i / segments) * 2 * Math.PI;
			points.push([
				centerLat + radiusLat * Math.cos(angle),
				centerLon + radiusLon * Math.sin(angle),
			]);
		}
		return points;
	};

	const coveredAreaPoints = generateCoveredArea();

	const getClusterColor = (type: "low" | "medium" | "high") => {
		switch (type) {
			case "low":
				return "#00C6B8"; // App primary
			case "medium":
				return "#E09D18"; // Warning orange
			case "high":
				return "#C10000"; // Error red
			default:
				return "#00C6B8"; // Primary teal
		}
	};

	const getClusterRadius = (count: number) => {
		if (count > 15) return 14;
		if (count > 10) return 10;
		return 8;
	};

	// Custom component for cluster markers with labels
	const ClusterMarker: React.FC<{ cluster: DetectionCluster }> = ({
		cluster,
	}) => {
		return (
			<CircleMarker
				center={[cluster.lat, cluster.lon]}
				radius={getClusterRadius(cluster.count)}
				pathOptions={{
					color: getClusterColor(cluster.type),
					fillColor: getClusterColor(cluster.type),
					fillOpacity: 0.7,
					weight: 0,
					stroke: false,
				}}
			/>
		);
	};

	return (
		<Modal
			maxHeight={"700px"}
			title={title}
			isOpen={isOpen}
			onClose={onClose}
			width={"640px"}
		>
			<div className="max-h-[550px] overflow-y-auto py-3 mb-3">
				{/* Map Container */}
				<div className="w-full h-[330px] rounded-[3px] mb-5 relative">
					{missionPathCoordinates && missionPathCoordinates.length > 0 ? (
						<>
							<MapContainer
								bounds={mapBounds}
								style={{
									height: "100%",
									width: "100%",
									borderRadius: "3px",
									filter: "brightness(1.5) contrast(1) saturate(1.2)",
								}}
								zoom={17}
								zoomControl={false}
								dragging={false}
								touchZoom={false}
								doubleClickZoom={false}
								scrollWheelZoom={false}
								boxZoom={false}
								keyboard={false}
								className="rounded-[3px]"
							>
								<TileLayer
									url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
									attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
								/>

								{/* Covered Area */}
								{coveredAreaPoints.length > 0 && (
									<Polygon
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										positions={coveredAreaPoints as any}
										pathOptions={{
											color: "#00C6B8",
											fillColor: "#00C6B8",
											fillOpacity: 0.2,
											weight: 2,
											opacity: 0.6,
											dashArray: "5, 5",
										}}
									/>
								)}

								{/* Mission Path */}
								<Polyline
									positions={missionPathCoordinates.map((p) => [p.lat, p.lon])}
									pathOptions={{
										color: "#E3F3F2",
										weight: 3,
										opacity: 1,
										stroke: true,
										dashArray: "15, 8",
									}}
								/>
								{/* Live Drone Position (UAV id: 2) */}
								{isLiveUav2 && currentPosition ? (
									<DroneMarker
										position={currentPosition}
										zIndexOffset={1200}
										heading={telemetry?.heading}
										roll={telemetry?.roll}
										pitch={telemetry?.pitch}
									/>
								) : null}

								{/* Detection Clusters */}
								{detectionClusters.map((cluster, index) => (
									<ClusterMarker key={index} cluster={cluster} />
								))}
							</MapContainer>

							{/* Detection cluster labels overlay */}
							{detectionClusters.map((cluster, index) => {
								const bounds = mapBounds;
								const latRange = bounds.getNorth() - bounds.getSouth();
								const lonRange = bounds.getEast() - bounds.getWest();

								const x = ((cluster.lon - bounds.getWest()) / lonRange) * 100;
								const y = ((bounds.getNorth() - cluster.lat) / latRange) * 100;

								return (
									<div
										key={`label-${index}`}
										className="absolute flex items-center justify-center pointer-events-none z-10"
										style={{
											left: `${x}%`,
											top: `${y}%`,
											transform: "translate(-50%, -50%)",
										}}
									>
										<span className="text-white font-ubuntu text-xs font-bold drop-shadow-md">
											{cluster.count}
										</span>
									</div>
								);
							})}
						</>
					) : (
						<div className="w-full h-full bg-[#242B2C] rounded-[3px] flex items-center justify-center">
							<span className="text-[#E3F3F2] opacity-50">
								No Mission Path data available
							</span>
						</div>
					)}
				</div>

				{/* Legend */}
				<div className="w-full flex flex-col gap-5 mb-0">
					<div className="flex flex-col gap-3">
						{/* Area covered */}
						<div className="flex justify-between items-center">
							<span className="text-[#E3F3F2] font-ubuntu text-sm font-light">
								Area covered
							</span>
							<div className="w-[65px] h-[22px] rounded-[0_5px_5px_5px] bg-[#87FFF3] opacity-30"></div>
						</div>

						{/* Mission Path */}
						<div className="flex justify-between items-center">
							<span className="text-[#E3F3F2] font-ubuntu text-sm font-light">
								Mission Path
							</span>
							<div className="flex items-center gap-[5px]">
								<div className="w-[18px] h-[2px] rounded-[2px] bg-[#00C6B8]"></div>
								<div className="w-[18px] h-[2px] rounded-[2px] bg-[#00C6B8]"></div>
								<div className="w-[18px] h-[2px] rounded-[2px] bg-[#00C6B8]"></div>
							</div>
						</div>

						{/* Detection hotspots */}
						{/* <div className="flex justify-between items-center">
							<span className="text-[#E3F3F2] font-ubuntu text-sm font-light">
								Detection hotspots
							</span>
							<div className="w-[28px] h-[27px] rounded-full bg-[#00C6B8]"></div>
						</div> */}
					</div>
				</div>
			</div>
			{/* Region Information */}
			<div className="flex justify-between items-center">
				<span className="text-[#E3F3F2] font-ubuntu text-lg font-medium">
					Region
				</span>
				<span className="text-[#E3F3F2] font-ubuntu text-lg font-light opacity-70">
					{region}
				</span>
			</div>
			{/* Current detections footer */}
			{/* <div className="flex justify-between mt-5">
				<span className="text-xl font-bold text-[#E3F3F2]">
					Current detections
				</span>
				<span className="text-2xl font-normal text-[#E3F3F2]">
					{numberOfDetections}
				</span>
			</div> */}
		</Modal>
	);
};

export default MissionPathModal;
