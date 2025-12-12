/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useCallback } from "react";
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

import { useDetectionContext } from "./DetectionContext";
import { useMapControls } from "./MapContext";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import AnalysisModal from "../ui/Modals/AnalysisModal";
// import DetectionsModal from "../ui/Modals/DetectionsModal";

import { useUAVLocations } from "./ctx/UAVLocations/useUAVLocations";
import FollowModal from "../ui/Modals/FollowModal";

interface SelectedUAV {
	id: string | number;
	activeTab: string;
	showKeyEvents: boolean;
	showDetections: boolean;
	showFollowModal: boolean;
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
	center?: [number, number];
}

const systemStatusText =
	"Battery at 96% with 2.7 hours of operational time remaining. WiFi connectivity stable at -42 dBm with uninterrupted data link to command. All onboard sensors and imaging systems functioning within normal parameters.";

const missionProgressText =
	"Footage capture along the Málaga coastline is 68% complete, maintaining a steady 150m altitude over coastal roads and pedestrian zones. Conditions remain optimal with clear visibility over the shoreline and urban edges.";

const operationalSummaryText =
	"Visual analysis of the coastal area confirms routine civilian activity. Detected objects include 3 bicycles, approximately 5–7 people in various locations, and multiple vehicles, both stationary and in motion. No anomalies identified; data collection and transmission remain on target.";

const emptyUav = {
	id: 0,
	activeTab: "rgb",
	showKeyEvents: false,
	showDetections: false,
	showFollowModal: false,
};
const MapContainer: React.FC<MapContainerProps> = ({
	showIndicators = false,
	center,
}) => {
	const location = useLocation();
	const isDetectionsPage = location.pathname === "/detections";
	const { mapRef, showMissionPaths } = useMapControls();
	const { filteredDetections, selectedDetection, selectDetection } =
		useDetectionContext();
	const clusterGroupRef = useRef<any>(null);

	const [tileUrl] = useState(
		"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
	);
	const [attribution] = useState(
		"&copy; CartoDB, &copy; OpenStreetMap contributors"
	);
	// const [selectedUAVs, setSelectedUAVs] = useState<SelectedUAV[]>([]);
	const [selectedUAV, setSelectedUAV] = useState<SelectedUAV>(emptyUav);
	const [clusteredUAVIds] = useState<Set<string>>(new Set());
	const [isMissionPathModalOpen, setIsMissionPathModalOpen] = useState(false);
	const [selectedUAVForMissionPath, setSelectedUAVForMissionPath] =
		useState<any>(null);

	const [isAnalysisOpen, setIsAnalysisOpen] = useState<boolean>(false);

	const { getAllUAVLocations, getPathById } = useUAVLocations();

	const allUAVLocations = getAllUAVLocations();

	// Malaga coordinates (default center unless overridden)
	const defaultCenter: [number, number] = [36.716021, -4.2879599];
	const mapCenter: [number, number] = center ?? defaultCenter;
	// Mission path modal handlers
	const handleMissionPathClick = (uavData: any) => {
		setSelectedUAVForMissionPath(uavData);
		setIsMissionPathModalOpen(true);
	};

	const handleCloseMissionPath = () => {
		setIsMissionPathModalOpen(false);
		setSelectedUAVForMissionPath(null);
	};

	const handleUAVDetailClick = useCallback((id: string | number) => {
		console.log("cluster", clusterGroupRef.current);
		setSelectedUAV({
			id: id as string | number,
			activeTab: "rgb",
			showKeyEvents: false,
			showDetections: false,
			showFollowModal: false,
		});
		// setSelectedUAVs((prev) => [
		// 	...prev,
		// 	{
		// 		id: id as string | number,
		// 		activeTab: "rgb",
		// 		showKeyEvents: false,
		// 		showDetections: false,
		// 	},
		// ]);
	}, []);

	// const handleCloseUAVModal = (id: number) => {
	const handleCloseUAVModal = () => {
		// setSelectedUAVs((prev) => prev.filter((uav) => uav.id !== id));
		setSelectedUAV(emptyUav);
	};

	// const handleTabChange = (uavId: string | number, tabId: string) => {
	const handleTabChange = (tabId: string) => {
		// setSelectedUAVs((prev) =>
		// 	prev.map((uav) => (uav.id === uavId ? { ...uav, activeTab: tabId } : uav))
		// );
		setSelectedUAV((prev) => ({ ...prev, activeTab: tabId }));
	};

	// const handleOpenKeyEvents = (uavId: string | number) => {
	const handleOpenKeyEvents = () => {
		// setSelectedUAVs((prev) =>
		// 	prev.map((uav) =>
		// 		uav.id === uavId ? { ...uav, showKeyEvents: true } : uav
		// 	)
		// );
		setSelectedUAV((prev) => ({ ...prev, showKeyEvents: true }));
	};

	// const handleCloseKeyEvents = (uavId: string | number) => {
	const handleCloseKeyEvents = () => {
		// setSelectedUAVs((prev) =>
		// 	prev.map((uav) =>
		// 		uav.id === uavId ? { ...uav, showKeyEvents: false } : uav
		// 	)
		// );
		setSelectedUAV((prev) => ({ ...prev, showKeyEvents: false }));
	};

	// const handleOpenDetections = (uavId: string | number) => {
	// const handleOpenDetections = () => {
	// 	// setSelectedUAVs((prev) =>
	// 	// 	prev.map((uav) =>
	// 	// 		uav.id === uavId ? { ...uav, showDetections: true } : uav
	// 	// 	)
	// 	// );
	// 	setSelectedUAV((prev) => ({ ...prev, showDetections: true }));
	// };

	const toggleFollowModal = () => {
		// setSelectedUAVs((prev) =>
		// 	prev.map((uav) =>
		// 		uav.id === uavId ? { ...uav, showDetections: true } : uav
		// 	)
		// );
		setSelectedUAV((prev) => ({
			...prev,
			showFollowModal: !prev.showFollowModal,
		}));
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
			{selectedUAV !== emptyUav &&
				allUAVLocations.map((uav: any) => {
					if (uav.data.id === selectedUAV.id) {
						return (
							<UAVDetailModal
								key={`${uav.data.id}-modal`}
								data={uav.data}
								activeTab={selectedUAV.activeTab}
								onTabChange={(tabId: string) => handleTabChange(tabId)}
								onClose={() => handleCloseUAVModal()}
								onMissionPathClick={() => handleMissionPathClick(uav)}
								onAnalysisClick={() => setIsAnalysisOpen(true)}
								onKeyEventsClick={() => handleOpenKeyEvents()}
								// onDetectionsClick={() => handleOpenDetections()}
								onFollowClick={() => toggleFollowModal()}
							/>
						);
					}
					return null;
				})}
			{/* {selectedUAVs.length > 0 &&
				allUAVLocations.map((uav: any) =>
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
									onFollowClick={() => setIsFollowModalOpen(true)}
								/>
							);
						}
						return null;
					})
				)} */}
			{/* {selectedUAVs.length > 0 &&
				allUAVLocations.map((uav: any) =>
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
				)} */}
			{/* Key Events Modals */}
			{/* {selectedUAVs.length > 0 &&
				allUAVLocations.map((uav: any) =>
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
				)} */}
			{selectedUAV.showKeyEvents &&
				allUAVLocations.map((uav: any) => {
					if (uav.data.id === selectedUAV.id) {
						return (
							<KeyEventsModal
								key={`${uav.data.id}-keyevents`}
								isOpen={selectedUAV.showKeyEvents}
								onClose={() => handleCloseKeyEvents()}
								title={`Key Events - ${uav.data.name}`}
							/>
						);
					}
					return null;
				})}

			<div className="fixed top-0 left-0 w-screen h-screen bg-[#222631] z-10">
				<LeafletMap
					center={mapCenter}
					zoom={isDetectionsPage ? 12 : 9}
					style={{ height: "100%", width: "100%" }}
					zoomControl={false}
					ref={mapRef}
				>
					<TileLayer url={tileUrl} attribution={attribution} />

					{/* Mission Paths - only on homepage when showMissionPaths is true, hide for clustered UAVs */}
					{showIndicators && showMissionPaths && (
						<>
							{allUAVLocations
								.filter(
									(uav: any) => !clusteredUAVIds.has(uav.data.id.toString())
								)
								.map((uav: any) => {
									const idStr = uav.data.id.toString();
									// Default to static mission path converted to LatLng tuples
									let coordinates: [number, number][] = (
										uav.MissionPath || []
									).map((p: any) => [p.lat, p.lon]);
									// For UAV ID 2, prefer live path from UAVLocationsCtx
									if (idStr === "2") {
										const livePath = getPathById(2);
										if (livePath && livePath.length >= 2) {
											coordinates = livePath.map(
												(p: { lat: number; lon: number }) =>
													[p.lat, p.lon] as [number, number]
											);
										}
									}
									return (
										<MissionPath
											key={`mission-path-${uav.data.id}`}
											coordinates={coordinates}
											color={uav.MissionPathColor}
											uavId={idStr}
										/>
									);
								})}
						</>
					)}

					{showIndicators &&
						allUAVLocations.map((uavLoc) => (
							<ClusterableUAVMarker
								key={`uav-marker-${uavLoc.data.id}`}
								id={uavLoc.data.id}
								onDetailClick={handleUAVDetailClick}
							/>
						))}

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

			{/* Follow Path Modal*/}
			{selectedUAV.showFollowModal && (
				<FollowModal
					isOpen={selectedUAV.showFollowModal}
					onClose={() => toggleFollowModal()}
				/>
			)}
		</>
	);
};

export default MapContainer;
