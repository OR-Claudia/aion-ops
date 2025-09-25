export type MissionTypeColor = "online" | "warning" | "danger"

export type Coordinates = {lat: number, lon: number};

export interface UAVLocation {
  position: [number, number];
  type: MissionTypeColor;
  MissionPath: Coordinates[];
  MissionPathColor: string;
  data: {
    id: string | number;
    name: string;
    coordinates: string;
    status: string;
    battery?: string;
    batteryPercentage?: number,
		signal: string,
		signalPercentage: number,
		description?: string,
		mission?: string,
		MissionPath?: string,
    missionPathCoordinates: Coordinates[],
  };
}