export interface DetectionData {
	clusterId: string;
	coordinates: string;
	detectionInterval: string;
	objectsType: string;
	responsibleUAV: string;
	area: number; // Size in meters for map circle radius
	lat: number;
	lon: number;
	description: string;
	mission: string;
	missionSummary: string;
	objectsTypeDetailed: string;
	recording: string;
	uavLink: string;
}

// Helper function to generate enhanced data
const generateClusterData = (
	base: Omit<
		DetectionData,
		| "description"
		| "mission"
		| "missionSummary"
		| "objectsTypeDetailed"
		| "recording"
		| "uavLink"
	>
): DetectionData => {
	const descriptions = {
		mixed:
			"This cluster captures an area under surveillance, showing both civilians and equipment. It consolidates observations of movements, interactions, and positioning for efficient analysis. No hostile activity is detected.",
		vehicle:
			"Vehicle cluster showing organized movement patterns. Multiple vehicles detected with coordinated routes suggesting logistical or patrol operations.",
		personnel:
			"Personnel cluster showing organized group movement. Multiple individuals detected with coordinated behavior patterns suggesting military or security operations.",
		unknown:
			"Unknown object cluster requiring further analysis. Anomalous signatures detected that don't match standard classification patterns.",
	};

	const missions = {
		mixed: "Area Surveillance",
		vehicle: "Vehicle Tracking",
		personnel: "Personnel Monitoring",
		unknown: "Investigation",
	};

	const missionSummaries = {
		mixed:
			"The drone mission focuses on comprehensive area surveillance, monitoring all types of activity including vehicles, personnel, and equipment movements for complete situational awareness.",
		vehicle:
			"Specialized vehicle tracking mission focused on monitoring transportation routes, convoy movements, and vehicle-based activities in the surveillance zone.",
		personnel:
			"Personnel tracking mission designed to monitor individual and group movements, behavior patterns, and activity analysis for security assessment.",
		unknown:
			"Investigative mission to identify and classify unknown objects or activities that require further analysis and classification.",
	};

	const objectsTypeDetailed = {
		mixed: "mixed (civilians, vehicles, equipment)",
		vehicle: "vehicles (transport, patrol)",
		personnel: "personnel (military/civilian)",
		unknown: "unknown (requires analysis)",
	};

	return {
		...base,
		description: descriptions[base.objectsType as keyof typeof descriptions],
		mission: missions[base.objectsType as keyof typeof missions],
		missionSummary:
			missionSummaries[base.objectsType as keyof typeof missionSummaries],
		objectsTypeDetailed:
			objectsTypeDetailed[base.objectsType as keyof typeof objectsTypeDetailed],
		recording: `${missions[base.objectsType as keyof typeof missions]} - ${
			base.detectionInterval.split(" ")[0]
		}`,
		uavLink: base.responsibleUAV,
	};
};

// Export detection data for use in other components
export const allDetectionItems: DetectionData[] = [
	generateClusterData({
		clusterId: "Cluster 2248",
		coordinates: "Lat: 52.245 Lon: 21.035",
		detectionInterval: "13.02.2025 07:00 - 09:34",
		objectsType: "mixed",
		responsibleUAV: "20037 Mavic air",
		area: 150,
		lat: 52.245,
		lon: 21.035,
	}),
	{
		clusterId: "Cluster 87443",
		coordinates: "Lat: 52.198 Lon: 20.945",
		detectionInterval: "13.02.2025 08:15 - 10:22",
		objectsType: "vehicle",
		responsibleUAV: "UAV 22456",
		area: 75,
		lat: 52.198,
		lon: 20.945,
		description:
			"This cluster captures an open field under surveillance, showing civilians and tanks. It consolidates observations of movements, interactions, and positioning for efficient analysis. No hostile activity is detected.",
		mission: "Recon.",
		missionSummary:
			"The drone mission focuses on aerial reconnaissance, surveying a designated area for activity, terrain analysis, and object detection. It collects real-time footage to enhance situational awareness, track movements, and identify potential threats or points of interest.",
		objectsTypeDetailed: "mixed (civilians, warfare machinery)",
		recording: "Recon Patrol - 13/03/2025",
		uavLink: "UAV 22456",
	},
	generateClusterData({
		clusterId: "Cluster 5346",
		coordinates: "Lat: 52.267 Lon: 21.098",
		detectionInterval: "13.02.2025 06:45 - 08:12",
		objectsType: "personnel",
		responsibleUAV: "20037 Mavic air",
		area: 250,
		lat: 52.267,
		lon: 21.098,
	}),
	generateClusterData({
		clusterId: "Cluster 3461",
		coordinates: "Lat: 52.189 Lon: 20.987",
		detectionInterval: "13.02.2025 09:30 - 11:45",
		objectsType: "unknown",
		responsibleUAV: "UAV 335663",
		area: 120,
		lat: 52.189,
		lon: 20.987,
	}),
	generateClusterData({
		clusterId: "Cluster 2048",
		coordinates: "Lat: 52.278 Lon: 21.056",
		detectionInterval: "13.02.2025 10:15 - 12:30",
		objectsType: "mixed",
		responsibleUAV: "Kolibri 7",
		area: 90,
		lat: 52.278,
		lon: 21.056,
	}),
	generateClusterData({
		clusterId: "Cluster 0048",
		coordinates: "Lat: 52.156 Lon: 20.934",
		detectionInterval: "13.02.2025 05:20 - 07:45",
		objectsType: "vehicle",
		responsibleUAV: "20037 Mavic air",
		area: 300,
		lat: 52.156,
		lon: 20.934,
	}),
	generateClusterData({
		clusterId: "Cluster 23455",
		coordinates: "Lat: 52.312 Lon: 21.145",
		detectionInterval: "13.02.2025 11:00 - 13:15",
		objectsType: "personnel",
		responsibleUAV: "UAV 22456",
		area: 45,
		lat: 52.312,
		lon: 21.145,
	}),
	generateClusterData({
		clusterId: "Cluster 5533",
		coordinates: "Lat: 52.201 Lon: 20.889",
		detectionInterval: "13.02.2025 12:45 - 14:30",
		objectsType: "mixed",
		responsibleUAV: "UAV 335663",
		area: 180,
		lat: 52.201,
		lon: 20.889,
	}),
	generateClusterData({
		clusterId: "Cluster 9876",
		coordinates: "Lat: 52.520 Lon: 13.405",
		detectionInterval: "13.02.2025 14:20 - 16:45",
		objectsType: "vehicle",
		responsibleUAV: "Kolibri 7",
		area: 65,
		lat: 50.064,
		lon: 19.944,
	}),
	generateClusterData({
		clusterId: "Cluster 1234",
		coordinates: "Lat: 50.075 Lon: 14.437",
		detectionInterval: "13.02.2025 16:00 - 18:15",
		objectsType: "unknown",
		responsibleUAV: "20037 Mavic air",
		area: 200,
		lat: 54.372,
		lon: 18.638,
	}),
	generateClusterData({
		clusterId: "Cluster 7890",
		coordinates: "Lat: 13.789 Lon: 186.523",
		detectionInterval: "13.02.2025 17:30 - 19:45",
		objectsType: "personnel",
		responsibleUAV: "UAV 22456",
		area: 110,
		lat: 51.107,
		lon: 17.038,
	}),
	generateClusterData({
		clusterId: "Cluster 4567",
		coordinates: "Lat: 17.634 Lon: 174.567",
		detectionInterval: "13.02.2025 18:15 - 20:30",
		objectsType: "mixed",
		responsibleUAV: "UAV 335663",
		area: 85,
		lat: 52.406,
		lon: 16.925,
	}),
	generateClusterData({
		clusterId: "Cluster 8901",
		coordinates: "Lat: 12.756 Lon: 184.290",
		detectionInterval: "13.02.2025 19:45 - 21:20",
		objectsType: "vehicle",
		responsibleUAV: "Kolibri 7",
		area: 140,
		lat: 51.759,
		lon: 19.455,
	}),
	generateClusterData({
		clusterId: "Cluster 3456",
		coordinates: "Lat: 20.523 Lon: 176.189",
		detectionInterval: "13.02.2025 20:30 - 22:45",
		objectsType: "unknown",
		responsibleUAV: "20037 Mavic air",
		area: 320,
		lat: 50.264,
		lon: 19.023,
	}),
	generateClusterData({
		clusterId: "Cluster 6789",
		coordinates: "Lat: 15.278 Lon: 182.845",
		detectionInterval: "13.02.2025 21:15 - 23:30",
		objectsType: "personnel",
		responsibleUAV: "UAV 22456",
		area: 55,
		lat: 51.246,
		lon: 22.568,
	}),
	generateClusterData({
		clusterId: "Cluster 11234",
		coordinates: "Lat: 9.192 Lon: 179.567",
		detectionInterval: "14.02.2025 06:30 - 08:45",
		objectsType: "vehicle",
		responsibleUAV: "Kolibri 7",
		area: 95,
		lat: 53.132,
		lon: 23.164,
	}),
	generateClusterData({
		clusterId: "Cluster 22456",
		coordinates: "Lat: 21.234 Lon: 173.623",
		detectionInterval: "14.02.2025 07:15 - 09:30",
		objectsType: "mixed",
		responsibleUAV: "UAV 22456",
		area: 160,
		lat: 53.428,
		lon: 14.553,
	}),
	generateClusterData({
		clusterId: "Cluster 44567",
		coordinates: "Lat: 18.456 Lon: 186.734",
		detectionInterval: "14.02.2025 09:45 - 12:00",
		objectsType: "unknown",
		responsibleUAV: "UAV 335663",
		area: 280,
		lat: 53.778,
		lon: 20.495,
	}),
	generateClusterData({
		clusterId: "Cluster 55890",
		coordinates: "Lat: 11.723 Lon: 175.156",
		detectionInterval: "14.02.2025 10:30 - 12:45",
		objectsType: "vehicle",
		responsibleUAV: "Kolibri 7",
		area: 125,
		lat: 50.041,
		lon: 21.999,
	}),
	generateClusterData({
		clusterId: "Cluster 66123",
		coordinates: "Lat: 16.189 Lon: 184.189",
		detectionInterval: "14.02.2025 11:15 - 13:30",
		objectsType: "mixed",
		responsibleUAV: "20037 Mavic air",
		area: 190,
		lat: 50.671,
		lon: 17.926,
	}),
	generateClusterData({
		clusterId: "Cluster 88234",
		coordinates: "Lat: 22.289 Lon: 177.623",
		detectionInterval: "14.02.2025 13:45 - 16:00",
		objectsType: "unknown",
		responsibleUAV: "UAV 335663",
		area: 240,
		lat: 53.013,
		lon: 18.598,
	}),
	generateClusterData({
		clusterId: "Cluster 10123",
		coordinates: "Lat: 8.967 Lon: 183.734",
		detectionInterval: "14.02.2025 15:15 - 17:30",
		objectsType: "mixed",
		responsibleUAV: "20037 Mavic air",
		area: 350,
		lat: 49.299,
		lon: 19.949,
	}),
	generateClusterData({
		clusterId: "Cluster 16789",
		coordinates: "Lat: 52.172 Lon: 20.982",
		detectionInterval: "14.02.2025 20:30 - 22:45",
		objectsType: "vehicle",
		responsibleUAV: "UAV 22456",
		area: 180,
		lat: 52.172,
		lon: 20.982,
	}),
	generateClusterData({
		clusterId: "Cluster 17234",
		coordinates: "Lat: 52.258 Lon: 21.127",
		detectionInterval: "14.02.2025 21:15 - 23:30",
		objectsType: "mixed",
		responsibleUAV: "20037 Mavic air",
		area: 95,
		lat: 52.258,
		lon: 21.127,
	}),
	generateClusterData({
		clusterId: "Cluster 18567",
		coordinates: "Lat: 52.213 Lon: 20.856",
		detectionInterval: "15.02.2025 06:00 - 08:15",
		objectsType: "personnel",
		responsibleUAV: "UAV 335663",
		area: 220,
		lat: 52.213,
		lon: 20.856,
	}),
	generateClusterData({
		clusterId: "Cluster 19345",
		coordinates: "Lat: 52.291 Lon: 21.045",
		detectionInterval: "15.02.2025 07:30 - 09:45",
		objectsType: "unknown",
		responsibleUAV: "Kolibri 7",
		area: 75,
		lat: 52.291,
		lon: 21.045,
	}),
	generateClusterData({
		clusterId: "Cluster 20456",
		coordinates: "Lat: 52.178 Lon: 21.198",
		detectionInterval: "15.02.2025 08:45 - 11:00",
		objectsType: "mixed",
		responsibleUAV: "UAV 22456",
		area: 340,
		lat: 52.178,
		lon: 21.198,
	}),
	generateClusterData({
		clusterId: "Cluster 21789",
		coordinates: "Lat: 52.264 Lon: 20.943",
		detectionInterval: "15.02.2025 10:00 - 12:15",
		objectsType: "vehicle",
		responsibleUAV: "20037 Mavic air",
		area: 125,
		lat: 52.264,
		lon: 20.943,
	}),
	generateClusterData({
		clusterId: "Cluster 22134",
		coordinates: "Lat: 52.207 Lon: 21.089",
		detectionInterval: "15.02.2025 11:30 - 13:45",
		objectsType: "personnel",
		responsibleUAV: "UAV 335663",
		area: 165,
		lat: 52.207,
		lon: 21.089,
	}),
];
