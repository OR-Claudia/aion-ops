/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { useLocation } from "react-router-dom";

import {
	ClusterableUAVMarker,
	DetectionMarker,
	UAVDetailModal,
	MissionPath,
} from "../ui";
import MissionPathModal from "../ui/Modals/MissionPathModal";
import KeyEventsModal from "../ui/Modals/KeyEventsModal";

import {
	generateUAVDetailData,
	generateMissionCoordinates,
	getMissionPathColor,
} from "./UAVData";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { useDetectionContext } from "./DetectionContext";
import { useMapControls } from "./MapContext";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import AnalysisModal from "../ui/Modals/AnalysisModal";
import DetectionsModal from "../ui/Modals/DetectionsModal";

interface SelectedUAV {
	id: string | number;
	activeTab: string;
	showKeyEvents: boolean;
	showDetections: boolean;
}

interface MapContainerProps {
	showIndicators?: boolean;
	onUAVDetailClick?: (markerData: {
		name: string;
		coordinates: string;
		status: string;
		battery?: string;
		signal: string;
	}) => void;
}

const systemStatusText =
	"Battery at 35% with 0.7 hours remaining mission time. WiFi connectivity excellent at -42 dBm, maintaining secure data link with zero interruptions. All critical systems operating within normal parameters.";

const missionProgressText =
	"Currently 68% complete on designated 12km² patrol route covering agricultural and woodland terrain. Navigation waypoints hit on schedule at 150m altitude. Weather conditions optimal with clear visibility extending 8+ kilometers.";
const operationalSummaryText =
	"Area assessment proceeding as planned with no significant anomalies detected. Reconnaissance data collection on target, with 3.5 GB transmitted successfully. Rural activity patterns consistent with intelligence briefings. Mission continuing toward scheduled completion with all safety protocols active.";

// Helper function to create UAV location with Mission Path
const createUAVLocation = (
	position: [number, number],
	type: "online" | "warning" | "danger",
	uavData: Parameters<typeof generateUAVDetailData>[0]
) => {
	const missionPathCoordinates = generateMissionCoordinates(position);

	return {
		position,
		type,
		data: {
			...generateUAVDetailData(uavData),
			missionPathCoordinates: missionPathCoordinates.map(([lat, lon]) => ({
				lat,
				lon,
			})),
		},
		MissionPath: missionPathCoordinates.map(([lat, lon]) => ({ lat, lon })),
		MissionPathColor: getMissionPathColor(type),
	};
};

// Comprehensive UAV locations covering a wider area for better simulation
const uavLocations = [
	createUAVLocation([50.620145, 35.285671], "warning", {
		id: "1",
		name: "KUNA",
		coordinates: "50.620145, 35.285671",
		status: "low battery",
		battery: "low",
		batteryPercentage: 100,
		signal: "strong",
		signalPercentage: 100,
		description: "Active UAV",
		mission: "Mission 1",
		MissionPath: "Path 1",
	}),
	// createUAVLocation([50.565492, 35.341889], "warning", {
	// 	id: "2",
	// 	name: "Hawk Delta",
	// 	coordinates: "52.2360, 21.0140",
	// 	status: "low battery",
	// 	battery: "low",
	// 	batteryPercentage: 20,
	// 	signal: "strong",
	// 	signalPercentage: 100,
	// 	description: "Low Battery UAV",
	// 	mission: "Mission 2",
	// 	MissionPath: "Path 2",
	// }),
	// createUAVLocation([50.612347, 35.398445], "online", {
	// 	id: "3",
	// 	name: "Falcon Gamma",
	// 	coordinates: "52.2370, 21.0160",
	// 	status: "active",
	// 	battery: "good",
	// 	batteryPercentage: 80,
	// 	signal: "strong",
	// 	signalPercentage: 100,
	// 	description: "Active UAV",
	// 	mission: "Mission 3",
	// 	MissionPath: "Path 3",
	// }),
	createUAVLocation([50.587456, 35.523167], "online", {
		id: "5",
		name: "Osprey Foxtrot",
		coordinates: "52.2380, 21.0170",
		status: "active",
		battery: "full",
		batteryPercentage: 100,
		signal: "strong",
		signalPercentage: 100,
		description: "Active UAV",
		mission: "Mission 5",
		MissionPath: "Path 5",
	}),

	createUAVLocation([50.512456, 35.389123], "danger", {
		id: "10",
		name: "Shark",
		coordinates: "52.2400, 21.0300",
		status: "danger",
		battery: "low",
		batteryPercentage: 20,
		signal: "weak",
		signalPercentage: 20,
		description: "danger UAV",
		mission: "Mission 10",
		MissionPath: "Path 10",
	}),
	// createUAVLocation([50.478923, 35.201456], "online", {
	// 	id: "12",
	// 	name: "Kestrel Kilo",
	// 	coordinates: "52.2420, 21.0320",
	// 	status: "active",
	// 	battery: "full",
	// 	batteryPercentage: 100,
	// 	signal: "strong",
	// 	signalPercentage: 100,
	// 	description: "Active UAV",
	// 	mission: "Mission 12",
	// 	MissionPath: "Path 12",
	// }),
	createUAVLocation([50.734567, 35.312889], "online", {
		id: "13",
		name: "Eagle Prime",
		coordinates: "52.2430, 21.0280",
		status: "active",
		battery: "good",
		batteryPercentage: 80,
		signal: "strong",
		signalPercentage: 100,
		description: "Active UAV",
		mission: "Mission 13",
		MissionPath: "Path 13",
	}),
	createUAVLocation([50.445612, 35.278934], "warning", {
		id: "14",
		name: "Bobr UJ26",
		coordinates: "52.2100, 21.0200",
		status: "fuel low",
		battery: "critical",
		batteryPercentage: 80,
		signal: "strong",
		signalPercentage: 100,
		description: "Active UAV",
		mission: "Mission 14",
		MissionPath: "Path 14",
	}),
	createUAVLocation([50.821345, 35.456723], "danger", {
		id: "15",
		name: "Albatross Lima",
		coordinates: "52.2110, 21.0210",
		status: "fuel low",
		battery: "critical",
		batteryPercentage: 10,
		signal: "intermittent",
		signalPercentage: 50,
		description: "Fuel Low UAV",
		mission: "Mission 15",
		MissionPath: "Path 15",
	}),
	createUAVLocation([50.356789, 35.189567], "online", {
		id: "16",
		name: "Pelican Mike",
		coordinates: "52.2120, 21.0190",
		status: "active",
		battery: "good",
		batteryPercentage: 80,
		signal: "strong",
		signalPercentage: 100,
		description: "Active UAV",
		mission: "Mission 16",
		MissionPath: "Path 16",
	}),
	// createUAVLocation([50.612345, 35.589234], "online", {
	// 	id: "19",
	// 	name: "Phoenix Beta",
	// 	coordinates: "52.2510, 21.0060",
	// 	status: "active",
	// 	battery: "full",
	// 	batteryPercentage: 100,
	// 	signal: "strong",
	// 	signalPercentage: 100,
	// 	description: "Active UAV",
	// 	mission: "Mission 19",
	// 	MissionPath: "Path 19",
	// }),
	createUAVLocation([50.634567, 35.734456], "warning", {
		id: "20",
		name: "Raven Omega",
		coordinates: "52.2520, 21.0080",
		status: "low battery",
		battery: "low",
		batteryPercentage: 20,
		signal: "strong",
		signalPercentage: 100,
		description: "Low Battery UAV",
		mission: "Mission 20",
		MissionPath: "Path 20",
	}),
	createUAVLocation([50.601234, 35.812789], "online", {
		id: "21",
		name: "Northern Scout 1",
		coordinates: "52.2700, 21.0100",
		status: "active",
		battery: "good",
		batteryPercentage: 80,
		signal: "strong",
		signalPercentage: 100,
		description: "Active UAV",
		mission: "Mission 21",
		MissionPath: "Path 21",
	}),
	createUAVLocation([50.623456, 35.967456], "warning", {
		id: "22",
		name: "Northern Scout 2",
		coordinates: "52.2750, 21.0150",
		status: "signal issues",
		battery: "good",
		batteryPercentage: 80,
		signal: "intermittent",
		signalPercentage: 50,
		description: "Signal Issues",
		mission: "Mission 22",
		MissionPath: "Path 22",
	}),
	createUAVLocation([51.045623, 35.298567], "online", {
		id: "24",
		name: "Southern Guard 1",
		coordinates: "52.1800, 21.0000",
		status: "active",
		battery: "full",
		batteryPercentage: 100,
		signal: "strong",
		signalPercentage: 100,
		description: "Active UAV",
		mission: "Mission 24",
		MissionPath: "Path 24",
	}),
	createUAVLocation([50.123456, 35.489234], "danger", {
		id: "25",
		name: "Southern Guard 2",
		coordinates: "52.1750, 21.0050",
		status: "low battery",
		battery: "critical",
		batteryPercentage: 10,
		signal: "weak",
		signalPercentage: 20,
		description: "Low Battery UAV",
		mission: "Mission 25",
		MissionPath: "Path 25",
	}),
	createUAVLocation([51.234567, 35.678945], "online", {
		id: "26",
		name: "Southern Perimeter",
		coordinates: "52.1700, 21.0100",
		status: "active",
		battery: "good",
		batteryPercentage: 80,
		signal: "strong",
		signalPercentage: 100,
		description: "Active UAV",
		mission: "Mission 26",
		MissionPath: "Path 26",
	}),
	createUAVLocation([49.876543, 34.912345], "warning", {
		id: "27",
		name: "Eastern Outpost 1",
		coordinates: "52.2300, 21.0800",
		status: "signal issues",
		battery: "good",
		batteryPercentage: 80,
		signal: "weak",
		signalPercentage: 20,
		description: "Signal Issues UAV",
		mission: "Mission 27",
		MissionPath: "Path 27",
	}),
];

const MapContainer: React.FC<MapContainerProps> = ({
	showIndicators = false,
}) => {
	const location = useLocation();
	const isDetectionsPage = location.pathname === "/detections";
	const { mapRef, showMissionPaths } = useMapControls();
	const { filteredDetections, selectedDetection, selectDetection } =
		useDetectionContext();
	const clusterGroupRef = useRef<any>(null);

	const [tileUrl, setTileUrl] = useState(
		"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
	);
	const [attribution, setAttribution] = useState(
		"&copy; CartoDB, &copy; OpenStreetMap contributors"
	);
	const [selectedUAVs, setSelectedUAVs] = useState<SelectedUAV[]>([]);
	const [clusteredUAVIds, setClusteredUAVIds] = useState<Set<string>>(
		new Set()
	);
	const [isMissionPathModalOpen, setIsMissionPathModalOpen] = useState(false);
	const [selectedUAVForMissionPath, setSelectedUAVForMissionPath] =
		useState<any>(null);

	const [isAnalysisOpen, setIsAnalysisOpen] = useState<boolean>(false);
	const [uavLocationsState, setUavLocationsState] = useState(uavLocations);

	// DEMO MOVEMENT - move UAVs slightly every 2 seconds
	useEffect(() => {
		const intervalId = setInterval(() => {
			setUavLocationsState((prevLocations: any[]) =>
				prevLocations.map((uav: any) => {
					const newLat = uav.position[0] + (Math.random() - 0.5) * 0.002;
					const newLon = uav.position[1] + (Math.random() - 0.5) * 0.002;
					return {
						...uav,
						position: [newLat, newLon] as [number, number],
					};
				})
			);
		}, 2000);

		return () => clearInterval(intervalId);
	}, [uavLocations]);

	// Ukraine coordinates (center remains the same)
	const mapCenter: [number, number] = [50.59277, 35.307222];
	// Mission path modal handlers
	const handleMissionPathClick = (uavData: any) => {
		setSelectedUAVForMissionPath(uavData);
		setIsMissionPathModalOpen(true);
	};

	const handleCloseMissionPath = () => {
		setIsMissionPathModalOpen(false);
		setSelectedUAVForMissionPath(null);
	};

	const handleUAVDetailClick = (id: string | number) => {
		setSelectedUAVs((prev) => [
			...prev,
			{
				id: id as string | number,
				activeTab: "rgb",
				showKeyEvents: false,
				showDetections: false,
			},
		]);
	};

	const handleCloseUAVModal = (id: number) => {
		setSelectedUAVs((prev) => prev.filter((uav) => uav.id !== id));
	};

	const handleTabChange = (uavId: string | number, tabId: string) => {
		setSelectedUAVs((prev) =>
			prev.map((uav) => (uav.id === uavId ? { ...uav, activeTab: tabId } : uav))
		);
	};

	const handleOpenKeyEvents = (uavId: string | number) => {
		setSelectedUAVs((prev) =>
			prev.map((uav) =>
				uav.id === uavId ? { ...uav, showKeyEvents: true } : uav
			)
		);
	};

	const handleCloseKeyEvents = (uavId: string | number) => {
		setSelectedUAVs((prev) =>
			prev.map((uav) =>
				uav.id === uavId ? { ...uav, showKeyEvents: false } : uav
			)
		);
	};

	const handleOpenDetections = (uavId: string | number) => {
		setSelectedUAVs((prev) =>
			prev.map((uav) =>
				uav.id === uavId ? { ...uav, showDetections: true } : uav
			)
		);
	};

	const handleCloseDetections = (uavId: string | number) => {
		setSelectedUAVs((prev) =>
			prev.map((uav) =>
				uav.id === uavId ? { ...uav, showDetections: false } : uav
			)
		);
	};

	return (
		<>
			<AnalysisModal
				isOpen={isAnalysisOpen}
				onClose={() => setIsAnalysisOpen(false)}
				systemStatus={systemStatusText}
				missionProgress={missionProgressText}
				operationalSummary={operationalSummaryText}
			/>

			{/* UAV Detail Modal */}
			{selectedUAVs.length > 0 &&
				uavLocationsState.map((uav: any) =>
					selectedUAVs.map((selectedUAV: any) => {
						if (uav.data.id === selectedUAV.id) {
							return (
								<UAVDetailModal
									key={`${uav.data.id}-modal`}
									data={uav.data}
									activeTab={selectedUAV.activeTab}
									onTabChange={(tabId: string) =>
										handleTabChange(selectedUAV.id, tabId)
									}
									onClose={() => handleCloseUAVModal(uav.data.id as number)}
									onMissionPathClick={() => handleMissionPathClick(uav)}
									onAnalysisClick={() => setIsAnalysisOpen(true)}
									onKeyEventsClick={() => handleOpenKeyEvents(selectedUAV.id)}
									onDetectionsClick={() => handleOpenDetections(selectedUAV.id)}
								/>
							);
						}
						return null;
					})
				)}
			{/* Detection Modals */}
			{selectedUAVs.length > 0 &&
				uavLocationsState.map((uav: any) =>
					selectedUAVs.map((selectedUAV: any) => {
						if (uav.data.id === selectedUAV.id && selectedUAV.showDetections) {
							return (
								<DetectionsModal
									key={`${uav.data.id}-detections`}
									isOpen={selectedUAV.showDetections}
									onClose={() => handleCloseDetections(selectedUAV.id)}
									activeTab={selectedUAV.activeTab}
								/>
							);
						}
						return null;
					})
				)}
			{/* Key Events Modals */}
			{selectedUAVs.length > 0 &&
				uavLocationsState.map((uav: any) =>
					selectedUAVs.map((selectedUAV: any) => {
						if (uav.data.id === selectedUAV.id && selectedUAV.showKeyEvents) {
							return (
								<KeyEventsModal
									key={`${uav.data.id}-keyevents`}
									isOpen={selectedUAV.showKeyEvents}
									onClose={() => handleCloseKeyEvents(selectedUAV.id)}
									title={`Key Events - ${uav.data.name}`}
								/>
							);
						}
						return null;
					})
				)}

			<div className="fixed top-0 left-0 w-screen h-screen bg-[#222631] z-10">
				<LeafletMap
					center={mapCenter}
					zoom={isDetectionsPage ? 12 : 11}
					style={{ height: "100%", width: "100%" }}
					zoomControl={false}
					ref={mapRef}
				>
					<TileLayer url={tileUrl} attribution={attribution} />

					{/* Mission Paths - only on homepage when showMissionPaths is true, hide for clustered UAVs */}
					{showIndicators && showMissionPaths && (
						<>
							{uavLocationsState
								.filter(
									(uav: any) => !clusteredUAVIds.has(uav.data.id.toString())
								)
								.map((uav: any) => (
									<MissionPath
										key={`mission-path-${uav.data.id}`}
										coordinates={uav.MissionPath}
										color={uav.MissionPathColor}
										uavId={uav.data.id.toString()}
									/>
								))}
						</>
					)}

					{/* UAV Status Indicators as location pins with clustering - only on homepage */}
					{showIndicators && (
						<MarkerClusterGroup
							ref={clusterGroupRef}
							chunkedLoading
							iconCreateFunction={(cluster: any) => {
								const childCount = cluster.getChildCount();

								return L.divIcon({
									html: `<div style='
									background-color: #00C6B8;
									border-radius: 50%;
									width: 40px;
									height: 40px;
									display: flex;
									align-items: center;
									justify-content: center;
									color: #1F2630;
									font-family: Ubuntu, sans-serif;
									font-weight: 500;
									font-size: 14px;
									border: 2px solid #00C6B8;
									box-shadow: 0 2px 8px rgba(0, 198, 184, 0.3);
								'>${childCount}</div>`,

									className: "custom-cluster-icon",
									iconSize: L.point(40, 40, true),
								});
							}}
							spiderfyOnMaxZoom={true}
							showCoverageOnHover={false}
							zoomToBoundsOnClick={true}
							maxClusterRadius={50}
						>
							{uavLocationsState.map((uav: any, index: number) => (
								<ClusterableUAVMarker
									key={`uav-${index}`}
									position={uav.position}
									type={uav.type}
									data={uav.data}
									onDetailClick={() =>
										handleUAVDetailClick(uav.data.id as string | number)
									}
								/>
							))}
						</MarkerClusterGroup>
					)}

					{/* Detection Markers - only on detections page */}
					{isDetectionsPage && (
						<>
							{filteredDetections.map((detection: any) => (
								<DetectionMarker
									key={detection.clusterId}
									position={[detection.lat, detection.lon]}
									detection={detection}
									isSelected={
										selectedDetection?.clusterId === detection.clusterId
									}
									onClick={selectDetection}
								/>
							))}
						</>
					)}
				</LeafletMap>

				{/* Map Provider Switcher - only on homepage */}
				{/* {showIndicators && (
					<MapProviderSwitcher onProviderChange={handleProviderChange} />
				)} */}
			</div>

			{/* Mission Path Modal - rendered at top level for full screen dragging */}
			{isMissionPathModalOpen && selectedUAVForMissionPath && (
				<MissionPathModal
					isOpen={isMissionPathModalOpen}
					onClose={handleCloseMissionPath}
					uavData={selectedUAVForMissionPath.data}
				/>
			)}
		</>
	);
};

export default MapContainer;
