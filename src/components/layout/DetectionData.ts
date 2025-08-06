// This file now only exports types for backward compatibility
// The actual data has been moved to the detection store

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

// Deprecated: Data has been moved to useDetectionStore
// This export is kept for backward compatibility only
export const allDetectionItems: DetectionData[] = [];
