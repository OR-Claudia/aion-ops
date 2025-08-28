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
		coordinates: "Lat: 50.625 Lon: 35.285",
		detectionInterval: "13.02.2025 07:00 - 09:34",
		objectsType: "mixed",
		responsibleUAV: "20037 Mavic air",
		area: 150,
		lat: 50.625,
		lon: 35.285,
	}),
	{
		clusterId: "Cluster 87443",
		coordinates: "Lat: 50.548 Lon: 35.342",
		detectionInterval: "13.02.2025 08:15 - 10:22",
		objectsType: "vehicle",
		responsibleUAV: "UAV 22456",
		area: 75,
		lat: 50.548,
		lon: 35.342,
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
		coordinates: "Lat: 50.665 Lon: 35.398",
		detectionInterval: "13.02.2025 06:45 - 08:12",
		objectsType: "personnel",
		responsibleUAV: "20037 Mavic air",
		area: 250,
		lat: 50.665,
		lon: 35.398,
	}),
	generateClusterData({
		clusterId: "Cluster 3461",
		coordinates: "Lat: 50.521 Lon: 35.256",
		detectionInterval: "13.02.2025 09:30 - 11:45",
		objectsType: "unknown",
		responsibleUAV: "UAV 335663",
		area: 120,
		lat: 50.521,
		lon: 35.256,
	}),
	generateClusterData({
		clusterId: "Cluster 2048",
		coordinates: "Lat: 50.678 Lon: 35.325",
		detectionInterval: "13.02.2025 10:15 - 12:30",
		objectsType: "mixed",
		responsibleUAV: "Kolibri 7",
		area: 90,
		lat: 50.678,
		lon: 35.325,
	}),
	generateClusterData({
		clusterId: "Cluster 0048",
		coordinates: "Lat: 50.507 Lon: 35.198",
		detectionInterval: "13.02.2025 05:20 - 07:45",
		objectsType: "vehicle",
		responsibleUAV: "20037 Mavic air",
		area: 300,
		lat: 50.507,
		lon: 35.198,
	}),
	generateClusterData({
		clusterId: "Cluster 23455",
		coordinates: "Lat: 50.696 Lon: 35.415",
		detectionInterval: "13.02.2025 11:00 - 13:15",
		objectsType: "personnel",
		responsibleUAV: "UAV 22456",
		area: 45,
		lat: 50.696,
		lon: 35.415,
	}),
	generateClusterData({
		clusterId: "Cluster 5533",
		coordinates: "Lat: 50.555 Lon: 35.178",
		detectionInterval: "13.02.2025 12:45 - 14:30",
		objectsType: "mixed",
		responsibleUAV: "UAV 335663",
		area: 180,
		lat: 50.555,
		lon: 35.178,
	}),
	generateClusterData({
		clusterId: "Cluster 9876",
		coordinates: "Lat: 50.612 Lon: 35.368",
		detectionInterval: "13.02.2025 14:20 - 16:45",
		objectsType: "vehicle",
		responsibleUAV: "Kolibri 7",
		area: 65,
		lat: 50.612,
		lon: 35.368,
	}),
	generateClusterData({
		clusterId: "Cluster 1234",
		coordinates: "Lat: 50.534 Lon: 35.234",
		detectionInterval: "13.02.2025 16:00 - 18:15",
		objectsType: "unknown",
		responsibleUAV: "20037 Mavic air",
		area: 200,
		lat: 50.534,
		lon: 35.234,
	}),
	generateClusterData({
		clusterId: "Cluster 7890",
		coordinates: "Lat: 50.642 Lon: 35.389",
		detectionInterval: "13.02.2025 17:30 - 19:45",
		objectsType: "personnel",
		responsibleUAV: "UAV 22456",
		area: 110,
		lat: 50.642,
		lon: 35.389,
	}),
	generateClusterData({
		clusterId: "Cluster 4567",
		coordinates: "Lat: 50.589 Lon: 35.295",
		detectionInterval: "13.02.2025 18:15 - 20:30",
		objectsType: "mixed",
		responsibleUAV: "UAV 335663",
		area: 85,
		lat: 50.589,
		lon: 35.295,
	}),
	generateClusterData({
		clusterId: "Cluster 8901",
		coordinates: "Lat: 50.659 Lon: 35.356",
		detectionInterval: "13.02.2025 19:45 - 21:20",
		objectsType: "vehicle",
		responsibleUAV: "Kolibri 7",
		area: 140,
		lat: 50.659,
		lon: 35.356,
	}),
	generateClusterData({
		clusterId: "Cluster 3456",
		coordinates: "Lat: 50.515 Lon: 35.212",
		detectionInterval: "13.02.2025 20:30 - 22:45",
		objectsType: "unknown",
		responsibleUAV: "20037 Mavic air",
		area: 320,
		lat: 50.515,
		lon: 35.212,
	}),
	generateClusterData({
		clusterId: "Cluster 6789",
		coordinates: "Lat: 50.673 Lon: 35.423",
		detectionInterval: "13.02.2025 21:15 - 23:30",
		objectsType: "personnel",
		responsibleUAV: "UAV 22456",
		area: 55,
		lat: 50.673,
		lon: 35.423,
	}),
	generateClusterData({
		clusterId: "Cluster 11234",
		coordinates: "Lat: 50.598 Lon: 35.318",
		detectionInterval: "14.02.2025 06:30 - 08:45",
		objectsType: "vehicle",
		responsibleUAV: "Kolibri 7",
		area: 95,
		lat: 50.598,
		lon: 35.318,
	}),
	generateClusterData({
		clusterId: "Cluster 22456",
		coordinates: "Lat: 50.628 Lon: 35.378",
		detectionInterval: "14.02.2025 07:15 - 09:30",
		objectsType: "mixed",
		responsibleUAV: "UAV 22456",
		area: 160,
		lat: 50.628,
		lon: 35.378,
	}),
	generateClusterData({
		clusterId: "Cluster 44567",
		coordinates: "Lat: 50.571 Lon: 35.267",
		detectionInterval: "14.02.2025 09:45 - 12:00",
		objectsType: "unknown",
		responsibleUAV: "UAV 335663",
		area: 280,
		lat: 50.571,
		lon: 35.267,
	}),
	generateClusterData({
		clusterId: "Cluster 55890",
		coordinates: "Lat: 50.604 Lon: 35.345",
		detectionInterval: "14.02.2025 10:30 - 12:45",
		objectsType: "vehicle",
		responsibleUAV: "Kolibri 7",
		area: 125,
		lat: 50.604,
		lon: 35.345,
	}),
	generateClusterData({
		clusterId: "Cluster 66123",
		coordinates: "Lat: 50.651 Lon: 35.289",
		detectionInterval: "14.02.2025 11:15 - 13:30",
		objectsType: "mixed",
		responsibleUAV: "20037 Mavic air",
		area: 190,
		lat: 50.651,
		lon: 35.289,
	}),
	generateClusterData({
		clusterId: "Cluster 88234",
		coordinates: "Lat: 50.687 Lon: 35.405",
		detectionInterval: "14.02.2025 13:45 - 16:00",
		objectsType: "unknown",
		responsibleUAV: "UAV 335663",
		area: 240,
		lat: 50.687,
		lon: 35.405,
	}),
	generateClusterData({
		clusterId: "Cluster 10123",
		coordinates: "Lat: 50.526 Lon: 35.245",
		detectionInterval: "14.02.2025 15:15 - 17:30",
		objectsType: "mixed",
		responsibleUAV: "20037 Mavic air",
		area: 350,
		lat: 50.526,
		lon: 35.245,
	}),
	generateClusterData({
		clusterId: "Cluster 16789",
		coordinates: "Lat: 50.583 Lon: 35.324",
		detectionInterval: "14.02.2025 20:30 - 22:45",
		objectsType: "vehicle",
		responsibleUAV: "UAV 22456",
		area: 180,
		lat: 50.583,
		lon: 35.324,
	}),
	generateClusterData({
		clusterId: "Cluster 17234",
		coordinates: "Lat: 50.614 Lon: 35.371",
		detectionInterval: "14.02.2025 21:15 - 23:30",
		objectsType: "mixed",
		responsibleUAV: "20037 Mavic air",
		area: 95,
		lat: 50.614,
		lon: 35.371,
	}),
	generateClusterData({
		clusterId: "Cluster 18567",
		coordinates: "Lat: 50.562 Lon: 35.189",
		detectionInterval: "15.02.2025 06:00 - 08:15",
		objectsType: "personnel",
		responsibleUAV: "UAV 335663",
		area: 220,
		lat: 50.562,
		lon: 35.189,
	}),
	generateClusterData({
		clusterId: "Cluster 19345",
		coordinates: "Lat: 50.669 Lon: 35.312",
		detectionInterval: "15.02.2025 07:30 - 09:45",
		objectsType: "unknown",
		responsibleUAV: "Kolibri 7",
		area: 75,
		lat: 50.669,
		lon: 35.312,
	}),
	generateClusterData({
		clusterId: "Cluster 20456",
		coordinates: "Lat: 50.538 Lon: 35.428",
		detectionInterval: "15.02.2025 08:45 - 11:00",
		objectsType: "mixed",
		responsibleUAV: "UAV 22456",
		area: 340,
		lat: 50.538,
		lon: 35.428,
	}),
	generateClusterData({
		clusterId: "Cluster 21789",
		coordinates: "Lat: 50.636 Lon: 35.223",
		detectionInterval: "15.02.2025 10:00 - 12:15",
		objectsType: "vehicle",
		responsibleUAV: "20037 Mavic air",
		area: 125,
		lat: 50.636,
		lon: 35.223,
	}),
	generateClusterData({
		clusterId: "Cluster 22134",
		coordinates: "Lat: 50.579 Lon: 35.356",
		detectionInterval: "15.02.2025 11:30 - 13:45",
		objectsType: "personnel",
		responsibleUAV: "UAV 335663",
		area: 165,
		lat: 50.579,
		lon: 35.356,
	}),
];
