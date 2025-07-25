import React, { useState } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { useLocation } from "react-router-dom";

import {
	MapProviderSwitcher,
	ClusterableUAVMarker,
	DetectionMarker,
	UAVDetailModal,
} from "../ui";
import type { UAVDetailData } from "../ui/UAVDetailModal";
import { generateUAVDetailData } from "./UAVData";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { allDetectionItems } from "./DetectionData";
import type { DetectionData } from "./DetectionData";
import { useMapControls } from "./MapContext";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

interface MapContainerProps {
	showIndicators?: boolean;
	onUAVDetailClick: (markerData: {
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
	const { mapRef } = useMapControls();

	const [tileUrl, setTileUrl] = useState(
		"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
	);
	const [attribution, setAttribution] = useState(
		"&copy; CartoDB, &copy; OpenStreetMap contributors"
	);

	// const [selectedUAVs, setSelectedUAVs] = useState<string | number[]>([]);
	const [selectedUAVs, setSelectedUAVs] = useState<(string | number)[]>([1]);

	// Warsaw coordinates (center remains the same)
	const warsawCenter: [number, number] = [52.2297, 21.0122];

	// Comprehensive UAV locations covering a wider area for better simulation
	const uavLocations: {
		position: [number, number];
		type: "online" | "warning" | "offline";
		data: UAVDetailData;
	}[] = [
		// Central Warsaw cluster

		{
			position: [52.235, 21.015] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},

		{
			position: [52.236, 21.014] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.237, 21.016] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.234, 21.013] as [number, number],
			type: "offline" as const,
			data: generateUAVDetailData({
				id: "4",
				name: "Raven Echo",
				coordinates: "52.2340, 21.0130",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 4",
				flightPath: "Path 4",
			}),
		},
		{
			position: [52.238, 21.017] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},
		// Southern Warsaw cluster

		{
			position: [52.236, 21.014] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.237, 21.016] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.234, 21.013] as [number, number],
			type: "offline" as const,
			data: generateUAVDetailData({
				id: "4",
				name: "Raven Echo",
				coordinates: "52.2340, 21.0130",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 4",
				flightPath: "Path 4",
			}),
		},
		{
			position: [52.238, 21.017] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},

		// Eastern cluster
		{
			position: [52.24, 21.03] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.241, 21.031] as [number, number],
			type: "offline" as const,
			data: generateUAVDetailData({
				id: "11",
				name: "Vulture Juliet",
				coordinates: "52.2410, 21.0310",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 11",
				flightPath: "Path 11",
			}),
		},
		{
			position: [52.242, 21.032] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.243, 21.028] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},

		// Western cluster
		{
			position: [52.21, 21.02] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.211, 21.021] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.212, 21.019] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.209, 21.018] as [number, number],
			type: "offline" as const,
			data: generateUAVDetailData({
				id: "17",
				name: "Stork November",
				coordinates: "52.2090, 21.0180",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 17",
				flightPath: "Path 17",
			}),
		},

		// Northern clusters
		{
			position: [52.25, 21.005] as [number, number],
			type: "offline" as const,
			data: generateUAVDetailData({
				id: "18",
				name: "Eagle Alpha",
				coordinates: "52.2500, 21.0050",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 18",
				flightPath: "Path 18",
			}),
		},
		{
			position: [52.251, 21.006] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.252, 21.008] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
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
			}),
		},

		{
			position: [52.252, 21.008] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
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
			}),
		},

		// Outlying areas - North
		{
			position: [52.27, 21.01] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.275, 21.015] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.28, 21.02] as [number, number],
			type: "offline" as const,
			data: generateUAVDetailData({
				id: "23",
				name: "Northern Base",
				coordinates: "52.2800, 21.0200",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 23",
				flightPath: "Path 23",
			}),
		},

		// Outlying areas - South
		{
			position: [52.18, 21.0] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.175, 21.005] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.17, 21.01] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
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
			}),
		},
		{
			position: [52.255, 20.98] as [number, number],
			type: "offline" as const,
			data: generateUAVDetailData({
				id: "27",
				name: "Reserve Unit Gamma",
				coordinates: "52.2550, 20.9800",
				status: "standby",
				signal: "none",
				signalPercentage: 0,
				description: "Standby UAV",
				mission: "Mission 27",
				flightPath: "Path 27",
			}),
		},
		{
			position: [52.205, 21.05] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
				id: "28",
				name: "Patrol Unit Delta",
				coordinates: "52.2050, 21.0500",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 28",
				flightPath: "Path 28",
			}),
		},
		{
			position: [52.245, 21.0] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
				id: "29",
				name: "Support Unit Echo",
				coordinates: "52.2450, 21.0000",
				status: "low battery",
				battery: "critical",
				batteryPercentage: 10,
				signal: "weak",
				signalPercentage: 20,
				description: "Low Battery UAV",
				mission: "Mission 29",
				flightPath: "Path 29",
			}),
		},

		// Outlying areas - East
		{
			position: [52.23, 21.08] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
				id: "30",
				name: "Eastern Outpost 1",
				coordinates: "52.2300, 21.0800",
				status: "signal issues",
				battery: "good",
				batteryPercentage: 80,
				signal: "weak",
				signalPercentage: 20,
				description: "Signal Issues UAV",
				mission: "Mission 30",
				flightPath: "Path 30",
			}),
		},
		{
			position: [52.235, 21.085] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
				id: "31",
				name: "Eastern Outpost 2",
				coordinates: "52.2350, 21.0850",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 31",
				flightPath: "Path 31",
			}),
		},
		{
			position: [52.24, 21.09] as [number, number],
			type: "offline" as const,
			data: generateUAVDetailData({
				id: "32",
				name: "Eastern Border",
				coordinates: "52.2400, 21.0900",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 32",
				flightPath: "Path 32",
			}),
		},

		// Outlying areas - West
		{
			position: [52.22, 20.95] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
				id: "33",
				name: "Western Patrol 1",
				coordinates: "52.2200, 20.9500",
				status: "active",
				battery: "good",
				batteryPercentage: 80,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 33",
				flightPath: "Path 33",
			}),
		},
		{
			position: [52.225, 20.945] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
				id: "34",
				name: "Western Patrol 2",
				coordinates: "52.2250, 20.9450",
				status: "low signal",
				battery: "good",
				batteryPercentage: 80,
				signal: "intermittent",
				signalPercentage: 50,
				description: "Low Signal UAV",
				mission: "Mission 34",
				flightPath: "Path 34",
			}),
		},
		{
			position: [52.23, 20.94] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
				id: "35",
				name: "Western Boundary",
				coordinates: "52.2300, 20.9400",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 35",
				flightPath: "Path 35",
			}),
		},
		// Additional scattered markers for realistic simulation
		{
			position: [52.26, 21.04] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
				id: "36",
				name: "Roaming Unit Alpha",
				coordinates: "52.2600, 21.0400",
				status: "battery warning",
				battery: "low",
				batteryPercentage: 20,
				signal: "strong",
				signalPercentage: 100,
				description: "Battery Warning UAV",
				mission: "Mission 36",
				flightPath: "Path 36",
			}),
		},
		{
			position: [52.19, 21.06] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
				id: "37",
				name: "Mobile Unit Beta",
				coordinates: "52.1900, 21.0600",
				status: "active",
				battery: "good",
				batteryPercentage: 80,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 37",
				flightPath: "Path 37",
			}),
		},
		{
			position: [52.255, 20.98] as [number, number],
			type: "offline" as const,
			data: generateUAVDetailData({
				id: "38",
				name: "Reserve Unit Gamma",
				coordinates: "52.2550, 20.9800",
				status: "standby",
				signal: "none",
				signalPercentage: 0,
				description: "Standby UAV",
				mission: "Mission 38",
				flightPath: "Path 38",
			}),
		},
		{
			position: [52.205, 21.05] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
				id: "39",
				name: "Patrol Unit Delta",
				coordinates: "52.2050, 21.0500",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 39",
				flightPath: "Path 39",
			}),
		},
		{
			position: [52.245, 21.0] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
				id: "40",
				name: "Support Unit Echo",
				coordinates: "52.2450, 21.0000",
				status: "low battery",
				battery: "critical",
				batteryPercentage: 10,
				signal: "weak",
				signalPercentage: 20,
				description: "Low Battery UAV",
				mission: "Mission 40",
				flightPath: "Path 40",
			}),
		},

		// Remote monitoring stations
		{
			position: [52.3, 21.1] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
				id: "41",
				name: "Monitor Station North",
				coordinates: "52.3000, 21.1000",
				status: "active",
				battery: "full",
				batteryPercentage: 100,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 41",
				flightPath: "Path 41",
			}),
		},
		{
			position: [52.15, 20.9] as [number, number],
			type: "warning" as const,
			data: generateUAVDetailData({
				id: "42",
				name: "Monitor Station South",
				coordinates: "52.1500, 20.9000",
				status: "signal issues",
				battery: "good",
				batteryPercentage: 80,
				signal: "intermittent",
				signalPercentage: 50,
				description: "Signal Issues UAV",
				mission: "Mission 42",
				flightPath: "Path 42",
			}),
		},
		{
			position: [52.2, 21.15] as [number, number],
			type: "offline" as const,
			data: generateUAVDetailData({
				id: "43",
				name: "Monitor Station East",
				coordinates: "52.2000, 21.1500",
				status: "offline",
				signal: "none",
				signalPercentage: 0,
				description: "Offline UAV",
				mission: "Mission 43",
				flightPath: "Path 43",
			}),
		},
		{
			position: [52.25, 20.85] as [number, number],
			type: "online" as const,
			data: generateUAVDetailData({
				id: "44",
				name: "Monitor Station West",
				coordinates: "52.2500, 20.8500",
				status: "active",
				battery: "good",
				batteryPercentage: 80,
				signal: "strong",
				signalPercentage: 100,
				description: "Active UAV",
				mission: "Mission 44",
				flightPath: "Path 44",
			}),
		},
	];

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
		// const uavDetailData = generateUAVDetailData({
		// 	id: markerData.name.replace(/\s+/g, "_").toLowerCase(),
		// 	signalPercentage: 100, // Default value, adjust as needed
		// 	name: markerData.name,
		// 	coordinates: markerData.coordinates,
		// 	status: markerData.status,
		// 	battery: markerData.battery,
		// 	signal: markerData.signal,
		// });
		// setSelectedUAVs((prev) => [...prev, markerData.id]);
		setSelectedUAVs((prev) => [...prev, id as string | number]);
	};

	const handleCloseUAVModal = (id: number) => {
		setSelectedUAVs((prev) => prev.filter((uav) => uav !== id));
		// setSelectedUAVs([]);
	};

	console.log("Selected UAVs:", selectedUAVs);

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
					zoom={9}
					style={{ height: "100%", width: "100%" }}
					zoomControl={false}
					ref={mapRef}
				>
					<TileLayer url={tileUrl} attribution={attribution} />

					{/* UAV Status Indicators as location pins with clustering - only on homepage */}
					{showIndicators && (
						<MarkerClusterGroup
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
							{allDetectionItems.map((detection: DetectionData) => (
								<DetectionMarker
									key={detection.clusterId}
									position={[detection.lat, detection.lon]}
									detection={detection}
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
