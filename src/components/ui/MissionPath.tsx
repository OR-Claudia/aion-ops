import React from "react";
import { Polyline } from "react-leaflet";

interface MissionPathProps {
	coordinates: [number, number][];
	color: string;
	uavId: string;
}

const MissionPath: React.FC<MissionPathProps> = ({
	coordinates,
	color,
	uavId,
}) => {
	if (coordinates.length < 2) {
		return null;
	}

	return (
		<Polyline
			key={`flight-path-${uavId}`}
			positions={coordinates}
			pathOptions={{
				color: color,
				weight: 2,
				opacity: 0.8,
				dashArray: "4, 4",
				lineCap: "round",
				lineJoin: "round",
			}}
		/>
	);
};

export default MissionPath;
