import type { StorageData } from "../ui/StorageItem";

// Helper function to generate realistic Storage Detail data
export const generateStorageDetailData = ({
	id,
	title,
	date,
	image,
	uav,
	missionType,
	flightDuration,
	operator,
	status,
	description,
	coordinates,
	videoUrl,
	mission,
	flightDatetime,
	operatorId,
	keyEvents,
	missionDescription,
	MissionPath,
}: {
	id: string;
	title: string;
	date: string;
	image: string;
	uav: string;
	missionType: string;
	flightDuration: string;
	operator: string;
	status: string;
	description: string;
	coordinates: string;
	videoUrl: string;
	mission: string;
	flightDatetime: string;
	operatorId: string;
	keyEvents: string;
	missionDescription: string;
	MissionPath: { lat: number; lon: number }[];
}): StorageData => {
	return {
		id,
		title,
		date,
		image,
		uav,
		missionType,
		flightDuration,
		operator,
		status,
		description,
		coordinates,
		videoUrl,
		mission,
		flightDatetime,
		operatorId,
		keyEvents,
		missionDescription,
		MissionPath,
	};
};
