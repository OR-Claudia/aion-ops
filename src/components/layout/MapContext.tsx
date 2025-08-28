import React, { createContext, useContext, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";

interface MapContextType {
	mapRef: React.MutableRefObject<LeafletMap | null>;
	zoomIn: () => void;
	zoomOut: () => void;
	resetView: () => void;
	showMissionPaths: boolean;
	setShowMissionPaths: (show: boolean) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useMapControls = () => {
	const context = useContext(MapContext);
	if (!context) {
		throw new Error("useMapControls must be used within a MapContextProvider");
	}
	return context;
};

interface MapContextProviderProps {
	children: React.ReactNode;
}

export const MapContextProvider: React.FC<MapContextProviderProps> = ({
	children,
}) => {
	const mapRef = useRef<LeafletMap | null>(null);
	const [showMissionPaths, setShowMissionPaths] = useState(false);

	// Default map settings
	const mapCenter: [number, number] = [50.59277, 35.307222];
	const defaultZoom = 10;

	const zoomIn = () => {
		if (mapRef.current) {
			mapRef.current.zoomIn();
		}
	};

	const zoomOut = () => {
		if (mapRef.current) {
			mapRef.current.zoomOut();
		}
	};

	const resetView = () => {
		if (mapRef.current) {
			mapRef.current.setView(mapCenter, defaultZoom);
		}
	};

	const value = {
		mapRef,
		zoomIn,
		zoomOut,
		resetView,
		showMissionPaths,
		setShowMissionPaths,
	};

	return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
