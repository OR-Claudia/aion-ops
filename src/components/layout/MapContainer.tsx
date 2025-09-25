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
import DetectionsModal from "../ui/Modals/DetectionsModal";

import { useUAVLocations } from "./ctx/UAVLocations/useUAVLocations";

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



const MapContainer: React.FC<MapContainerProps> = ({
	showIndicators = false,
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
	const [selectedUAVs, setSelectedUAVs] = useState<SelectedUAV[]>([]);
	const [clusteredUAVIds] = useState<Set<string>>(new Set());
	const [isMissionPathModalOpen, setIsMissionPathModalOpen] = useState(false);
	const [selectedUAVForMissionPath, setSelectedUAVForMissionPath] =
		useState<any>(null);

	const [isAnalysisOpen, setIsAnalysisOpen] = useState<boolean>(false);

	const { getAllUAVLocations } = useUAVLocations();

	const allUAVLocations = getAllUAVLocations();

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

	const handleUAVDetailClick = useCallback((id: string | number) => {
		console.log('cluster', clusterGroupRef.current);
		setSelectedUAVs((prev) => [
			...prev,
			{
				id: id as string | number,
				activeTab: "rgb",
				showKeyEvents: false,
				showDetections: false,
			},
		]);
	}, []);

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
								/>
							);
						}
						return null;
					})
				)}
			{/* Detection Modals */}
			{selectedUAVs.length > 0 &&
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
				)}
			{/* Key Events Modals */}
			{selectedUAVs.length > 0 &&
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
							{allUAVLocations
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

					{showIndicators && allUAVLocations.map((uavLoc) => (
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
		</>
	);
};

export default MapContainer;
