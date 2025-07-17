import React, { useState } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { useLocation } from "react-router-dom";
import {
  MapProviderSwitcher,
  ClusterableUAVMarker,
  DetectionMarker,
} from "../ui";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { allDetectionItems } from "./DetectionsSidebar";
import { useMapControls } from "./MapContext";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

interface MapContainerProps {
  showIndicators?: boolean;
}

const MapContainer: React.FC<MapContainerProps> = ({
  showIndicators = false,
}) => {
  const location = useLocation();
  const isDetectionsPage = location.pathname === "/detections";
  const { mapRef } = useMapControls();

  const [tileUrl, setTileUrl] = useState(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  );
  const [attribution, setAttribution] = useState(
    "&copy; CartoDB, &copy; OpenStreetMap contributors",
  );

  // Warsaw coordinates (center remains the same)
  const warsawCenter: [number, number] = [52.2297, 21.0122];

  // Comprehensive UAV locations covering a wider area for better simulation
  const uavLocations = [
    // Central Warsaw cluster
    {
      position: [52.235, 21.015] as [number, number],
      type: "online" as const,
      data: {
        name: "UAV 22456",
        coordinates: "52.2350, 21.0150",
        status: "Active",
        battery: "Full",
        signal: "Strong",
      },
    },
    {
      position: [52.236, 21.014] as [number, number],
      type: "warning" as const,
      data: {
        name: "Hawk Delta",
        coordinates: "52.2360, 21.0140",
        status: "Low Battery",
        battery: "Low",
        signal: "Strong",
      },
    },
    {
      position: [52.237, 21.016] as [number, number],
      type: "online" as const,
      data: {
        name: "Falcon Gamma",
        coordinates: "52.2370, 21.0160",
        status: "Active",
        battery: "Good",
        signal: "Strong",
      },
    },
    {
      position: [52.234, 21.013] as [number, number],
      type: "offline" as const,
      data: {
        name: "Raven Echo",
        coordinates: "52.2340, 21.0130",
        status: "Maintenance",
        signal: "None",
      },
    },
    {
      position: [52.238, 21.017] as [number, number],
      type: "online" as const,
      data: {
        name: "Osprey Foxtrot",
        coordinates: "52.2380, 21.0170",
        status: "Active",
        battery: "Full",
        signal: "Strong",
      },
    },

    // Southern Warsaw cluster
    {
      position: [52.22, 21.0] as [number, number],
      type: "offline" as const,
      data: {
        name: "Kolibri 7 (ID:4452)",
        coordinates: "52.2200, 21.0000",
        status: "Offline",
        signal: "None",
      },
    },
    {
      position: [52.219, 21.001] as [number, number],
      type: "warning" as const,
      data: {
        name: "Condor Hotel",
        coordinates: "52.2190, 21.0010",
        status: "Signal Issues",
        battery: "Good",
        signal: "Weak",
      },
    },
    {
      position: [52.221, 21.003] as [number, number],
      type: "online" as const,
      data: {
        name: "Sparrow India",
        coordinates: "52.2210, 21.0030",
        status: "Active",
        battery: "Good",
        signal: "Strong",
      },
    },
    {
      position: [52.218, 20.998] as [number, number],
      type: "warning" as const,
      data: {
        name: "Crow Zulu",
        coordinates: "52.2180, 20.9980",
        status: "Low Signal",
        battery: "Good",
        signal: "Weak",
      },
    },

    // Eastern cluster
    {
      position: [52.24, 21.03] as [number, number],
      type: "warning" as const,
      data: {
        name: "Shark (ID:3456)",
        coordinates: "52.2400, 21.0300",
        status: "Warning",
        battery: "Low",
        signal: "Weak",
      },
    },
    {
      position: [52.241, 21.031] as [number, number],
      type: "offline" as const,
      data: {
        name: "Vulture Juliet",
        coordinates: "52.2410, 21.0310",
        status: "Offline",
        signal: "None",
      },
    },
    {
      position: [52.242, 21.032] as [number, number],
      type: "online" as const,
      data: {
        name: "Kestrel Kilo",
        coordinates: "52.2420, 21.0320",
        status: "Active",
        battery: "Full",
        signal: "Strong",
      },
    },
    {
      position: [52.243, 21.028] as [number, number],
      type: "online" as const,
      data: {
        name: "Eagle Prime",
        coordinates: "52.2430, 21.0280",
        status: "Active",
        battery: "Good",
        signal: "Strong",
      },
    },

    // Western cluster
    {
      position: [52.21, 21.02] as [number, number],
      type: "online" as const,
      data: {
        name: "Bobr UJ26 (ID:9931)",
        coordinates: "52.2100, 21.0200",
        status: "Active",
        battery: "Good",
        signal: "Strong",
      },
    },
    {
      position: [52.211, 21.021] as [number, number],
      type: "warning" as const,
      data: {
        name: "Albatross Lima",
        coordinates: "52.2110, 21.0210",
        status: "Fuel Low",
        battery: "Critical",
        signal: "Intermittent",
      },
    },
    {
      position: [52.212, 21.019] as [number, number],
      type: "online" as const,
      data: {
        name: "Pelican Mike",
        coordinates: "52.2120, 21.0190",
        status: "Active",
        battery: "Good",
        signal: "Strong",
      },
    },
    {
      position: [52.209, 21.018] as [number, number],
      type: "offline" as const,
      data: {
        name: "Stork November",
        coordinates: "52.2090, 21.0180",
        status: "Maintenance",
        signal: "None",
      },
    },

    // Northern clusters
    {
      position: [52.25, 21.005] as [number, number],
      type: "offline" as const,
      data: {
        name: "Eagle Alpha",
        coordinates: "52.2500, 21.0050",
        status: "Offline",
        signal: "None",
      },
    },
    {
      position: [52.251, 21.006] as [number, number],
      type: "online" as const,
      data: {
        name: "Phoenix Beta",
        coordinates: "52.2510, 21.0060",
        status: "Active",
        battery: "Full",
        signal: "Strong",
      },
    },
    {
      position: [52.252, 21.008] as [number, number],
      type: "warning" as const,
      data: {
        name: "Raven Omega",
        coordinates: "52.2520, 21.0080",
        status: "Low Battery",
        battery: "Low",
        signal: "Strong",
      },
    },

    // Outlying areas - North
    {
      position: [52.27, 21.01] as [number, number],
      type: "online" as const,
      data: {
        name: "Northern Scout 1",
        coordinates: "52.2700, 21.0100",
        status: "Active",
        battery: "Good",
        signal: "Strong",
      },
    },
    {
      position: [52.275, 21.015] as [number, number],
      type: "warning" as const,
      data: {
        name: "Northern Scout 2",
        coordinates: "52.2750, 21.0150",
        status: "Signal Issues",
        battery: "Good",
        signal: "Intermittent",
      },
    },
    {
      position: [52.28, 21.02] as [number, number],
      type: "offline" as const,
      data: {
        name: "Northern Base",
        coordinates: "52.2800, 21.0200",
        status: "Maintenance",
        signal: "None",
      },
    },

    // Outlying areas - South
    {
      position: [52.18, 21.0] as [number, number],
      type: "online" as const,
      data: {
        name: "Southern Guard 1",
        coordinates: "52.1800, 21.0000",
        status: "Active",
        battery: "Full",
        signal: "Strong",
      },
    },
    {
      position: [52.175, 21.005] as [number, number],
      type: "warning" as const,
      data: {
        name: "Southern Guard 2",
        coordinates: "52.1750, 21.0050",
        status: "Low Battery",
        battery: "Critical",
        signal: "Weak",
      },
    },
    {
      position: [52.17, 21.01] as [number, number],
      type: "online" as const,
      data: {
        name: "Southern Perimeter",
        coordinates: "52.1700, 21.0100",
        status: "Active",
        battery: "Good",
        signal: "Strong",
      },
    },

    // Outlying areas - East
    {
      position: [52.23, 21.08] as [number, number],
      type: "warning" as const,
      data: {
        name: "Eastern Outpost 1",
        coordinates: "52.2300, 21.0800",
        status: "Signal Issues",
        battery: "Good",
        signal: "Weak",
      },
    },
    {
      position: [52.235, 21.085] as [number, number],
      type: "online" as const,
      data: {
        name: "Eastern Outpost 2",
        coordinates: "52.2350, 21.0850",
        status: "Active",
        battery: "Full",
        signal: "Strong",
      },
    },
    {
      position: [52.24, 21.09] as [number, number],
      type: "offline" as const,
      data: {
        name: "Eastern Border",
        coordinates: "52.2400, 21.0900",
        status: "Offline",
        signal: "None",
      },
    },

    // Outlying areas - West
    {
      position: [52.22, 20.95] as [number, number],
      type: "online" as const,
      data: {
        name: "Western Patrol 1",
        coordinates: "52.2200, 20.9500",
        status: "Active",
        battery: "Good",
        signal: "Strong",
      },
    },
    {
      position: [52.225, 20.945] as [number, number],
      type: "warning" as const,
      data: {
        name: "Western Patrol 2",
        coordinates: "52.2250, 20.9450",
        status: "Low Signal",
        battery: "Good",
        signal: "Intermittent",
      },
    },
    {
      position: [52.23, 20.94] as [number, number],
      type: "online" as const,
      data: {
        name: "Western Boundary",
        coordinates: "52.2300, 20.9400",
        status: "Active",
        battery: "Full",
        signal: "Strong",
      },
    },

    // Additional scattered markers for realistic simulation
    {
      position: [52.26, 21.04] as [number, number],
      type: "warning" as const,
      data: {
        name: "Roaming Unit Alpha",
        coordinates: "52.2600, 21.0400",
        status: "Battery Warning",
        battery: "Low",
        signal: "Strong",
      },
    },
    {
      position: [52.19, 21.06] as [number, number],
      type: "online" as const,
      data: {
        name: "Mobile Unit Beta",
        coordinates: "52.1900, 21.0600",
        status: "Active",
        battery: "Good",
        signal: "Strong",
      },
    },
    {
      position: [52.255, 20.98] as [number, number],
      type: "offline" as const,
      data: {
        name: "Reserve Unit Gamma",
        coordinates: "52.2550, 20.9800",
        status: "Standby",
        signal: "None",
      },
    },
    {
      position: [52.205, 21.05] as [number, number],
      type: "online" as const,
      data: {
        name: "Patrol Unit Delta",
        coordinates: "52.2050, 21.0500",
        status: "Active",
        battery: "Full",
        signal: "Strong",
      },
    },
    {
      position: [52.245, 21.0] as [number, number],
      type: "warning" as const,
      data: {
        name: "Support Unit Echo",
        coordinates: "52.2450, 21.0000",
        status: "Low Battery",
        battery: "Critical",
        signal: "Weak",
      },
    },

    // Remote monitoring stations
    {
      position: [52.3, 21.1] as [number, number],
      type: "online" as const,
      data: {
        name: "Monitor Station North",
        coordinates: "52.3000, 21.1000",
        status: "Active",
        battery: "Full",
        signal: "Strong",
      },
    },
    {
      position: [52.15, 20.9] as [number, number],
      type: "warning" as const,
      data: {
        name: "Monitor Station South",
        coordinates: "52.1500, 20.9000",
        status: "Signal Issues",
        battery: "Good",
        signal: "Intermittent",
      },
    },
    {
      position: [52.2, 21.15] as [number, number],
      type: "offline" as const,
      data: {
        name: "Monitor Station East",
        coordinates: "52.2000, 21.1500",
        status: "Maintenance",
        signal: "None",
      },
    },
    {
      position: [52.25, 20.85] as [number, number],
      type: "online" as const,
      data: {
        name: "Monitor Station West",
        coordinates: "52.2500, 20.8500",
        status: "Active",
        battery: "Good",
        signal: "Strong",
      },
    },
  ];

  const handleProviderChange = (providerName: string, url: string) => {
    setTileUrl(url);
    // Set attribution based on provider
    let newAttribution = "";
    switch (providerName) {
      case "Satellite":
        newAttribution = "&copy; Esri";
        break;
      case "Dark":
        newAttribution = "&copy; CartoDB";
        break;
      case "Terrain":
        newAttribution = "&copy; OpenTopoMap";
        break;
      default:
        newAttribution = "&copy; CartoDB, &copy; OpenStreetMap contributors";
    }
    setAttribution(newAttribution);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#222631] z-[1]">
      <LeafletMap
        center={warsawCenter}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer url={tileUrl} attribution={attribution} />

        {/* UAV Status Indicators as location pins with clustering - only on homepage */}
        {showIndicators && (
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={(cluster: any) => {
              const childCount = cluster.getChildCount();
              return L.divIcon({
                html: `<div style="
                  background-color: #00C6B8;
                  border-radius: 50%;
                  width: 40px;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #1F2630;
                  font-family: Ubuntu, sans-serif;
                  font-weight: 500;
                  font-size: 14px;
                  border: 2px solid #00C6B8;
                  box-shadow: 0 2px 8px rgba(0, 198, 184, 0.3);
                ">${childCount}</div>`,
                className: "custom-cluster-icon",
                iconSize: L.point(40, 40, true),
              });
            }}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
            maxClusterRadius={50}
          >
            {uavLocations.map((uav, index) => (
              <ClusterableUAVMarker
                key={index}
                position={uav.position}
                type={uav.type}
                data={uav.data}
              />
            ))}
          </MarkerClusterGroup>
        )}

        {/* Detection Markers - only on detections page */}
        {isDetectionsPage && (
          <>
            {allDetectionItems.map((detection) => (
              <DetectionMarker
                key={detection.clusterId}
                position={[detection.lat, detection.lon]}
                detection={detection}
              />
            ))}
          </>
        )}
      </LeafletMap>

      {/* Map Provider Switcher - only on homepage */}
      {showIndicators && (
        <MapProviderSwitcher onProviderChange={handleProviderChange} />
      )}
    </div>
  );
};

export default MapContainer;
