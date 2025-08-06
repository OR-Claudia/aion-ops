import React, { useState, useEffect } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { useLocation } from "react-router-dom";

import {
	MapProviderSwitcher,
	ClusterableUAVMarker,
	DetectionMarker,
	UAVDetailModal,
	FlightPath,
} from "../ui";

import { generateUAVDetailData, generateFlightPathCoordinates, getFlightPathColor } from "./UAVData";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { useDetectionStore } from "../../stores";
import { useMapControls } from "./MapContext";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

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

const MapContainer: React.FC<MapContainerProps> = ({
	showIndicators = false,
}) => {
	const location = useLocation();

	const isDetectionsPage = location.pathname === "/detections";
	const { mapRef, showFlightPaths } = useMapControls();
	const { filteredDetections, selectedDetection, setSelectedDetection } = useDetectionStore();

	const [tileUrl, setTileUrl] = useState(
		"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
	);
	const [attribution, setAttribution] = useState(
		"&copy; CartoDB, &copy; OpenStreetMap contributors"
	);

	const [selectedUAVs, setSelectedUAVs] = useState<(string | number)[]>([]);
	const [clusteredUAVIds, setClusteredUAVIds] = useState<Set<string>>(new Set());

	// Warsaw coordinates (center remains the same)
	const warsawCenter: [number, number] = [52.2297, 21.0122];

	// Helper function to create UAV location with flight path
	const createUAVLocation = (
		position: [number, number],
		type: "online" | "warning" | "offline",
		uavData: Parameters<typeof generateUAVDetailData>[0]
	) => ({
		position,
		type,
		data: generateUAVDetailData(uavData),
		flightPath: generateFlightPathCoordinates(position, uavData.id.toString(), type),
		flightPathColor: getFlightPathColor(type),
	});

	// Comprehensive UAV locations covering a wider area for better simulation
	const uavLocations = [
		// Central Warsaw cluster
		createUAVLocation(
			[52.235, 21.015],
			"online",
			{
				id: "1",
				name: "UAV 22456",
				coordinates: "52.2350, 21.0150",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 1",
				flightPath: "Path 1",
			}
		),
		createUAVLocation(
			[52.236, 21.014],
			"warning",
			{
				id: "2",
				name: "Hawk Delta",
				coordinates: "52.2360, 21.0140",
				status: "low battery",
				battery: "low",
				batteryPercentage: 20,
				signal: "strong",
				signalPercentage: 100,
				description: "Low Battery UAV",
				mission: "Mission 2",
				flightPath: "Path 2",
			}
		),
		createUAVLocation(
			[52.237, 21.016],
			"online",
			{
				id: "3",
				name: "Falcon Gamma",
				coordinates: "52.2370, 21.0160",
				status: "active",
				battery: "good",
				batteryPercentage: 80,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 3",
				flightPath: "Path 3",
			}
		),
		createUAVLocation(
			[52.234, 21.013],
			"offline",
			{
				id: "4",
				name: "Raven Echo",
				coordinates: "52.2340, 21.0130",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 4",
				flightPath: "Path 4",
			}
		),
		createUAVLocation(
			[52.238, 21.017],
			"online",
			{
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
				flightPath: "Path 5",
			}
		),

		// Eastern cluster
		createUAVLocation(
			[52.24, 21.03],
			"warning",
			{
				id: "10",
				name: "Shark (ID:3456)",
				coordinates: "52.2400, 21.0300",
				status: "warning",
				battery: "low",
				batteryPercentage: 20,
				signal: "weak",
				signalPercentage: 20,
				description: "Warning UAV",
				mission: "Mission 10",
				flightPath: "Path 10",
			}
		),
		createUAVLocation(
			[52.241, 21.031],
			"offline",
			{
				id: "11",
				name: "Vulture Juliet",
				coordinates: "52.2410, 21.0310",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 11",
				flightPath: "Path 11",
			}
		),
		createUAVLocation(
			[52.242, 21.032],
			"online",
			{
				id: "12",
				name: "Kestrel Kilo",
				coordinates: "52.2420, 21.0320",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 12",
				flightPath: "Path 12",
			}
		),
		createUAVLocation(
			[52.243, 21.028],
			"online",
			{
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
				flightPath: "Path 13",
			}
		),

		// Western cluster
		createUAVLocation(
			[52.21, 21.02],
			"online",
			{
				id: "14",
				name: "Bobr UJ26 (ID:9931)",
				coordinates: "52.2100, 21.0200",
				status: "active",
				battery: "good",
				batteryPercentage: 80,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 14",
				flightPath: "Path 14",
			}
		),
		createUAVLocation(
			[52.211, 21.021],
			"warning",
			{
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
				flightPath: "Path 15",
			}
		),
		createUAVLocation(
			[52.212, 21.019],
			"online",
			{
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
				flightPath: "Path 16",
			}
		),
		createUAVLocation(
			[52.209, 21.018],
			"offline",
			{
				id: "17",
				name: "Stork November",
				coordinates: "52.2090, 21.0180",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 17",
				flightPath: "Path 17",
			}
		),

		// Northern clusters
		createUAVLocation(
			[52.25, 21.005],
			"offline",
			{
				id: "18",
				name: "Eagle Alpha",
				coordinates: "52.2500, 21.0050",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 18",
				flightPath: "Path 18",
			}
		),
		createUAVLocation(
			[52.251, 21.006],
			"online",
			{
				id: "19",
				name: "Phoenix Beta",
				coordinates: "52.2510, 21.0060",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 19",
				flightPath: "Path 19",
			}
		),
		createUAVLocation(
			[52.252, 21.008],
			"warning",
			{
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
				flightPath: "Path 20",
			}
		),

		// Additional spread out UAVs for realistic simulation
		createUAVLocation(
			[52.27, 21.01],
			"online",
			{
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
				flightPath: "Path 21",
			}
		),
		createUAVLocation(
			[52.275, 21.015],
			"warning",
			{
				id: "22",
				name: "Northern Scout 2",
				coordinates: "52.2750, 21.0150",
				status: "signal issues",
				battery: "good",
				batteryPercentage: 80,
				signal: "intermittent",
				signalPercentage: 50,
				description: "Signal Issues UAV",
				mission: "Mission 22",
				flightPath: "Path 22",
			}
		),
		createUAVLocation(
			[52.28, 21.02],
			"offline",
			{
				id: "23",
				name: "Northern Base",
				coordinates: "52.2800, 21.0200",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 23",
				flightPath: "Path 23",
			}
		),
		createUAVLocation(
			[52.18, 21.0],
			"online",
			{
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
				flightPath: "Path 24",
			}
		),
		createUAVLocation(
			[52.175, 21.005],
			"warning",
			{
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
				flightPath: "Path 25",
			}
		),
		createUAVLocation(
			[52.17, 21.01],
			"online",
			{
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
				flightPath: "Path 26",
			}
		),
		createUAVLocation(
			[52.23, 21.08],
			"warning",
			{
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
				flightPath: "Path 27",
			}
		),
		createUAVLocation(
			[52.235, 21.085],
			"online",
			{
				id: "28",
				name: "Eastern Outpost 2",
				coordinates: "52.2350, 21.0850",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 28",
				flightPath: "Path 28",
			}
		),
		createUAVLocation(
			[52.24, 21.09],
			"offline",
			{
				id: "29",
				name: "Eastern Border",
				coordinates: "52.2400, 21.0900",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 29",
				flightPath: "Path 29",
			}
		),
		createUAVLocation(
			[52.22, 20.95],
			"online",
			{
				id: "30",
				name: "Western Patrol 1",
				coordinates: "52.2200, 20.9500",
				status: "active",
				battery: "good",
				batteryPercentage: 80,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 30",
				flightPath: "Path 30",
			}
		),
		createUAVLocation(
			[52.225, 20.945],
			"warning",
			{
				id: "31",
				name: "Western Patrol 2",
				coordinates: "52.2250, 20.9450",
				status: "low signal",
				battery: "good",
				batteryPercentage: 80,
				signal: "intermittent",
				signalPercentage: 50,
				description: "Low Signal UAV",
				mission: "Mission 31",
				flightPath: "Path 31",
			}
		),
		createUAVLocation(
			[52.23, 20.94],
			"online",
			{
				id: "32",
				name: "Western Boundary",
				coordinates: "52.2300, 20.9400",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 32",
				flightPath: "Path 32",
			}
		),
		createUAVLocation(
			[52.26, 21.04],
			"warning",
			{
				id: "33",
				name: "Roaming Unit Alpha",
				coordinates: "52.2600, 21.0400",
				status: "battery warning",
				battery: "low",
				batteryPercentage: 20,
				signal: "strong",
				signalPercentage: 100,
				description: "Battery Warning UAV",
				mission: "Mission 33",
				flightPath: "Path 33",
			}
		),
		createUAVLocation(
			[52.19, 21.06],
			"online",
			{
				id: "34",
				name: "Mobile Unit Beta",
				coordinates: "52.1900, 21.0600",
				status: "active",
				battery: "good",
				batteryPercentage: 80,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 34",
				flightPath: "Path 34",
			}
		),
		createUAVLocation(
			[52.255, 20.98],
			"offline",
			{
				id: "35",
				name: "Reserve Unit Gamma",
				coordinates: "52.2550, 20.9800",
				status: "standby",
				signal: "none",
				signalPercentage: 0,
				description: "Standby UAV",
				mission: "Mission 35",
				flightPath: "Path 35",
			}
		),
		createUAVLocation(
			[52.205, 21.05],
			"online",
			{
				id: "36",
				name: "Patrol Unit Delta",
				coordinates: "52.2050, 21.0500",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 36",
				flightPath: "Path 36",
			}
		),
		createUAVLocation(
			[52.245, 21.0],
			"warning",
			{
				id: "37",
				name: "Support Unit Echo",
				coordinates: "52.2450, 21.0000",
				status: "low battery",
				battery: "critical",
				batteryPercentage: 10,
				signal: "weak",
				signalPercentage: 20,
				description: "Low Battery UAV",
				mission: "Mission 37",
				flightPath: "Path 37",
			}
		),
		// Remote monitoring stations
		createUAVLocation(
			[52.3, 21.1],
			"online",
			{
				id: "38",
				name: "Monitor Station North",
				coordinates: "52.3000, 21.1000",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 38",
				flightPath: "Path 38",
			}
		),
		createUAVLocation(
			[52.15, 20.9],
			"warning",
			{
				id: "39",
				name: "Monitor Station South",
				coordinates: "52.1500, 20.9000",
				status: "signal issues",
				battery: "good",
				batteryPercentage: 80,
				signal: "intermittent",
				signalPercentage: 50,
				description: "Signal Issues UAV",
				mission: "Mission 39",
				flightPath: "Path 39",
			}
		),
		createUAVLocation(
			[52.2, 21.15],
			"offline",
			{
				id: "40",
				name: "Monitor Station East",
				coordinates: "52.2000, 21.1500",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 40",
				flightPath: "Path 40",
			}
		),
		createUAVLocation(
			[52.25, 20.85],
			"online",
			{
				id: "41",
				name: "Monitor Station West",
				coordinates: "52.2500, 20.8500",
				status: "active",
				battery: "good",
				batteryPercentage: 80,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 41",
				flightPath: "Path 41",
			}
		),
	];

	// Track cluster group reference for proper event handling
	const clusterGroupRef = React.useRef<any>(null);

	// Monitor cluster state changes
	useEffect(() => {
		if (!mapRef.current || !showIndicators) return;

		const updateClusterState = () => {
			if (!clusterGroupRef.current) return;

			const newClusteredIds = new Set<string>();

			try {
				// Get all clusters from the cluster group
				const clusterGroup = clusterGroupRef.current;
				if (clusterGroup.getLayers) {
					const layers = clusterGroup.getLayers();

					layers.forEach((layer: any) => {
						// Check if this layer is a cluster (has multiple child markers)
						if (layer.getAllChildMarkers && layer.getChildCount() > 1) {
							const childMarkers = layer.getAllChildMarkers();
							childMarkers.forEach((marker: any) => {
								if (marker.options && marker.options.uavId) {
									newClusteredIds.add(marker.options.uavId.toString());
								}
							});
						}
					});
				}
			} catch (error) {
				// Fallback: if we can't access cluster data, don't hide any paths
				console.log('Cluster detection error:', error);
			}

			setClusteredUAVIds(newClusteredIds);
		};

		// Set up periodic monitoring of cluster state
		const interval = setInterval(updateClusterState, 500);

		// Also listen to map events
		const map = mapRef.current;
		map.on('zoomend', updateClusterState);
		map.on('moveend', updateClusterState);

		// Initial check
		setTimeout(updateClusterState, 100);

		return () => {
			clearInterval(interval);
			if (mapRef.current) {
				mapRef.current.off('zoomend', updateClusterState);
				mapRef.current.off('moveend', updateClusterState);
			}
		};
	}, [showIndicators, clusterGroupRef]);

	const handleProviderChange = (providerName: string, url: string) => {
		setTileUrl(url);
		// Set attribution based on provider
		let newAttribution = "";
		switch (providerName) {
			case "Satellite":
				newAttribution = "&copy; Esri";
				break;
			case "Dark":
				newAttribution = "&copy; CartoDB";
				break;
			case "Terrain":
				newAttribution = "&copy; OpenTopoMap";
				break;
			default:
				newAttribution = "&copy; CartoDB, &copy; OpenStreetMap contributors";
		}
		setAttribution(newAttribution);
	};

	const handleUAVDetailClick = (id: string | number) => {
		setSelectedUAVs((prev) => [...prev, id as string | number]);
	};

	const handleCloseUAVModal = (id: number) => {
		setSelectedUAVs((prev) => prev.filter((uav) => uav !== id));
	};

	return (
		<>
			<div>
				{/* UAV Detail Modal */}
				{selectedUAVs.length > 0 &&
					uavLocations.map((uav) =>
						selectedUAVs.map((el) => {
							if (uav.data.id === el) {
								return (
									<UAVDetailModal
										key={uav.data.id}
										data={uav.data}
										onClose={() => handleCloseUAVModal(uav.data.id as number)}
									/>
								);
							}
							return null;
						})
					)}
			</div>
			<div className="fixed top-0 left-0 w-screen h-screen bg-[#222631] z-[1]">
				<LeafletMap
					center={warsawCenter}
					zoom={12}
					style={{ height: "100%", width: "100%" }}
					zoomControl={false}
					ref={mapRef}
				>
					<TileLayer url={tileUrl} attribution={attribution} />

					{/* Flight Paths - only on homepage when showFlightPaths is true, hide for clustered UAVs */}
					{showIndicators && showFlightPaths && (
						<>
							{uavLocations
								.filter(uav => !clusteredUAVIds.has(uav.data.id.toString()))
								.map((uav) => (
									<FlightPath
										key={`flight-path-${uav.data.id}`}
										coordinates={uav.flightPath}
										color={uav.flightPathColor}
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
							{uavLocations.map((uav, index) => (
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
							{filteredDetections.map((detection) => (
								<DetectionMarker
									key={detection.clusterId}
									position={[detection.lat, detection.lon]}
									detection={detection}
									isSelected={selectedDetection?.clusterId === detection.clusterId}
									onClick={setSelectedDetection}
								/>
							))}
						</>
					)}
				</LeafletMap>

				{/* Map Provider Switcher - only on homepage */}
				{showIndicators && (
					<MapProviderSwitcher onProviderChange={handleProviderChange} />
				)}
			</div>
		</>
	);
};

export default MapContainer;
