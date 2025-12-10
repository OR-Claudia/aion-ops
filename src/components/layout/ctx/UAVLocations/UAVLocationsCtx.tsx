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

	// Seed initial shortened path for UAV id 2 from static mission path
	useEffect(() => {
		const idKey = "2";
		const uav2 = initUAVLocations.find((u) => String(u.data.id) === idKey);
		if (uav2 && Array.isArray(uav2.MissionPath) && uav2.MissionPath.length) {
			const initial = uav2.MissionPath.slice(
				0,
				Math.min(3, uav2.MissionPath.length)
			);
			const fixed = { lat: 36.716249, lon: -4.28782 };
			const seeded = [...initial, fixed];
			setPathsById((prev) => ({ ...prev, [idKey]: seeded }));
			setCurrentById((prev) => ({
				...prev,
				[idKey]: [fixed.lat, fixed.lon],
			}));
			setUAVLocations((prevLocations: UAVLocation[]) =>
				prevLocations.map((uav: UAVLocation) => {
					if (String(uav.data.id) === idKey) {
						return {
							...uav,
							position: [fixed.lat, fixed.lon] as [number, number],
						};
					}
					return uav;
				})
			);
		}
	}, []);

	// LIVE PATH FEED: append UAV id 2 positions from MetaDataCtx.activeFrame
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
			const idKey = String(2);
			const FIX_LAT = 36.716249;
			const FIX_LON = -4.28782;
			// append to path while ensuring last coordinate is fixed live coord
			setPathsById((prev) => {
				const prevArr = prev[idKey] || [];
				const lastPrev = prevArr[prevArr.length - 1];
				let work = prevArr;
				if (
					lastPrev &&
					Math.abs(lastPrev.lat - FIX_LAT) < 1e-6 &&
					Math.abs(lastPrev.lon - FIX_LON) < 1e-6
				) {
					work = prevArr.slice(0, -1);
				}
				const last = work[work.length - 1];
				if (
					!last ||
					Math.abs(last.lat - lat) > 1e-6 ||
					Math.abs(last.lon - lon) > 1e-6
				) {
					work = [...work, { lat, lon }];
				}
				return { ...prev, [idKey]: [...work, { lat: FIX_LAT, lon: FIX_LON }] };
			});
			// update current position to fixed live coord (used by DroneMarker)
			setCurrentById((prev) => ({ ...prev, [idKey]: [FIX_LAT, FIX_LON] }));
			// also keep uavLocations in sync for id 2 if present
			setUAVLocations((prevLocations: UAVLocation[]) =>
				prevLocations.map((uav: UAVLocation) => {
					if (String(uav.data.id) === "2") {
						return { ...uav, position: [FIX_LAT, FIX_LON] as [number, number] };
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
