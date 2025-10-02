import React, { useEffect, useState } from "react";
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
import { reverseGeocode } from "../../../lib/utils";
import { PointTag } from "../PointTag/PointTag";

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

	// Determine which data source to use
	const isUAVData = !!uavData;

	// Get mission path coordinates and detections based on data type
	const missionPathCoordinates = isUAVData
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
			return new LatLngBounds([50.0, 19.0], [50.1, 19.1]);
		}

		const lats = missionPathCoordinates.map((p) => p.lat);
		const lons = missionPathCoordinates.map((p) => p.lon);

		const minLat = Math.min(...lats);
		const maxLat = Math.max(...lats);
		const minLon = Math.min(...lons);
		const maxLon = Math.max(...lons);

		// Add padding to bounds
		const latPadding = (maxLat - minLat) * 0.1 || 0.01;
		const lonPadding = (maxLon - minLon) * 0.1 || 0.01;

		return new LatLngBounds(
			[minLat - latPadding, minLon - lonPadding],
			[maxLat + latPadding, maxLon + lonPadding]
		);
	};

	const mapBounds = calculateMapBounds();

	// Reverse geocode the first point in the Mission Path
	useEffect(() => {
		if (missionPathCoordinates && missionPathCoordinates.length > 0) {
			const firstPoint = missionPathCoordinates[0];
			reverseGeocode(firstPoint.lat, firstPoint.lon)
				.then(setRegion)
				.catch(() => setRegion("Unknown Location"));
		} else {
			setRegion("No flight data");
		}
	}, [missionPathCoordinates]);

	// Generate covered area polygon points (simplified convex hull approximation)
	const generateCoveredArea = () => {
		if (!missionPathCoordinates || missionPathCoordinates.length < 3) return [];

		const centerLat =
			missionPathCoordinates.reduce((sum, p) => sum + p.lat, 0) /
			missionPathCoordinates.length;
		const centerLon =
			missionPathCoordinates.reduce((sum, p) => sum + p.lon, 0) /
			missionPathCoordinates.length;

		// Generate an elliptical area around the center
		const radiusLat = 0.02; // ~2km
		const radiusLon = 0.02;
		const points = [];

		for (let i = 0; i <= 16; i++) {
			const angle = (i / 16) * 2 * Math.PI;
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
									url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
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
						<div className="flex justify-between items-center">
							<span className="text-[#E3F3F2] font-ubuntu text-sm font-light">
								Detection hotspots
							</span>
							<div className="w-[28px] h-[27px] rounded-full bg-[#00C6B8]"></div>
						</div>
					</div>
				</div>
			</div>
			{/* Region Information */}
			<div className="flex justify-between items-center">
				Test:
				<PointTag maxLen={50}>Test</PointTag>
				<span className="text-[#E3F3F2] font-ubuntu text-lg font-medium">
					Region
				</span>
				<span className="text-[#E3F3F2] font-ubuntu text-lg font-light opacity-70">
					{region}
				</span>
			</div>
			{/* Current detections footer */}
			<div className="flex justify-between mt-5">
				<span className="text-xl font-bold text-[#E3F3F2]">
					Current detections
				</span>
				<span className="text-2xl font-normal text-[#E3F3F2]">
					{numberOfDetections}
				</span>
			</div>
		</Modal>
	);
};

export default MissionPathModal;
