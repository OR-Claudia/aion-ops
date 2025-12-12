import {
	useState,
	type ReactNode,
	type FC,
	useEffect,
	useContext,
} from "react";
import { UAVLocationsCtx } from "./useUAVLocations";
import { type UAVLocation, type Coordinates } from "./UAVLocation";
import { MetaDataCtx, type MetaData } from "../../../../lib/utils";
import { uavLocations as initUAVLocations } from "./uavLocations";
import type { DetectedInFrame } from "../../../../lib/types";

export interface UAVLocationsContextType {
	getAllUAVLocations: () => UAVLocation[];
	getUAVLocationById: (id: string | number) => UAVLocation | null;
	getPathById: (id: string | number) => Coordinates[];
	getCurrentPositionById: (id: string | number) => [number, number] | null;
}

export const UAVLocationsCtxProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	// todo: logic for changing the marker data, replace this with react query loading the marker updates
	const [uavLocations, setUAVLocations] =
		useState<UAVLocation[]>(initUAVLocations);
	const [pathsById, setPathsById] = useState<Record<string, Coordinates[]>>({});
	const [currentById, setCurrentById] = useState<
		Record<string, [number, number]>
	>({});
	const meta = useContext(MetaDataCtx) as
		| [
				MetaData,
				(newMetaData: Partial<MetaData>) => void,
				(activeFrame: MetaData["activeFrame"]) => void
		  ]
		| null;

	useEffect(() => {
		const idKey = "2";
		const seed1 = { lat: 36.713198, lon: -4.296397 };
		const seed2 = { lat: 36.71288, lon: -4.295999 };
		const seeded = [seed1, seed2];

		setPathsById((prev) => ({ ...prev, [idKey]: seeded }));
		setCurrentById((prev) => ({
			...prev,
			[idKey]: [seed2.lat, seed2.lon],
		}));
		setUAVLocations((prevLocations: UAVLocation[]) =>
			prevLocations.map((uav: UAVLocation) => {
				if (String(uav.data.id) === idKey) {
					return {
						...uav,
						position: [seed2.lat, seed2.lon] as [number, number],
					};
				}
				return uav;
			})
		);
	}, []);

	// LIVE PATH FEED: for UAV id 2, append positions from MetaDataCtx.activeFrame after the two static seeds
	useEffect(() => {
		if (!meta) return;
		const [state] = meta;
		const frame = state.activeFrame;
		if (!frame) return;

		// Prefer detection with class_id === -1, fallback to telemetry
		const uavDet = frame.detections?.find(
			(d: DetectedInFrame) => d.class_id === -1
		);
		const lat = (uavDet?.latitude ??
			uavDet?.geo_coordinates?.latitude ??
			frame.telemetry?.latitude) as number | undefined;
		const lon = (uavDet?.longitude ??
			uavDet?.geo_coordinates?.longitude ??
			frame.telemetry?.longitude) as number | undefined;

		if (typeof lat === "number" && typeof lon === "number") {
			const idKey = "2";

			// Append new live coordinate if it differs from the last one
			setPathsById((prev) => {
				const prevArr = prev[idKey] || [];
				const last = prevArr[prevArr.length - 1];
				if (
					last &&
					Math.abs(last.lat - lat) < 1e-6 &&
					Math.abs(last.lon - lon) < 1e-6
				) {
					return prev; // no change
				}
				return { ...prev, [idKey]: [...prevArr, { lat, lon }] };
			});

			// Update current position to the latest live coordinate
			setCurrentById((prev) => ({ ...prev, [idKey]: [lat, lon] }));

			// Keep uavLocations in sync for id 2
			setUAVLocations((prevLocations: UAVLocation[]) =>
				prevLocations.map((uav: UAVLocation) => {
					if (String(uav.data.id) === "2") {
						return { ...uav, position: [lat, lon] as [number, number] };
					}
					return uav;
				})
			);
		}
	}, [meta]);

	return (
		<UAVLocationsCtx.Provider
			value={{
				getAllUAVLocations: () => uavLocations,
				getUAVLocationById: (id: string | number): UAVLocation | null => {
					for (const marker of uavLocations) {
						if (marker.data.id === id) {
							return marker;
						}
					}
					return null;
				},
				getPathById: (id: string | number): Coordinates[] => {
					return pathsById[String(id)] || [];
				},
				getCurrentPositionById: (
					id: string | number
				): [number, number] | null => {
					return currentById[String(id)] || null;
				},
			}}
		>
			{children}
		</UAVLocationsCtx.Provider>
	);
};
