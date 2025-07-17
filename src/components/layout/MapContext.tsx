import React, { createContext, useContext, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

interface MapContextType {
  mapRef: React.MutableRefObject<LeafletMap | null>;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

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

  // Default map settings
  const warsawCenter: [number, number] = [52.2297, 21.0122];
  const defaultZoom = 9;

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
      mapRef.current.setView(warsawCenter, defaultZoom);
    }
  };

  const value = {
    mapRef,
    zoomIn,
    zoomOut,
    resetView,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
