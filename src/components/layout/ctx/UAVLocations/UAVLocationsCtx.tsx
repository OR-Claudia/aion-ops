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
			// update current position (used by DroneMarker)
			setCurrentById((prev) => ({ ...prev, [idKey]: [lat, lon] }));
			// append to path if changed
			setPathsById((prev) => {
				const prevArr = prev[idKey] || [];
				const last = prevArr[prevArr.length - 1];
				if (
					!last ||
					Math.abs(last.lat - lat) > 1e-6 ||
					Math.abs(last.lon - lon) > 1e-6
				) {
					return { ...prev, [idKey]: [...prevArr, { lat, lon }] };
				}
				return prev;
			});
			// also keep uavLocations in sync for id 2 if present
			setUAVLocations((prevLocations: UAVLocation[]) =>
				prevLocations.map((uav: UAVLocation) => {
					if (String(uav.data.id) === "2") {
						return { ...uav, position: [lat, lon] as [number, number] };
					}
					return uav;
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
