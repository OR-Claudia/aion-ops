import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import type { DetectionData } from "../layout/DetectionData";

interface DetectionMarkerProps {
  position: [number, number];
  detection: DetectionData;
  isSelected?: boolean;
  onClick?: (detection: DetectionData) => void;
}

const DetectionMarker: React.FC<DetectionMarkerProps> = ({
  position,
  detection,
  isSelected = false,
  onClick,
}) => {
  // Calculate marker size based on area (scale for map display)
  const calculateMarkerSize = (area: number) => {
    // Scale area (45-350) to marker size (20-80px) for map
    return Math.round(((area - 45) / (350 - 45)) * 60 + 20);
  };

  // Calculate opacity based on area and type
  const calculateOpacity = (area: number, objectsType: string) => {
    if (area > 250) return 0.8; // Large areas high opacity
    if (area > 150) return 0.6; // Medium areas 60% opacity
    if (objectsType === "unknown") return 0.7; // Unknown objects more visible
    return 0.5; // Default 50% opacity
  };

  // Get color - using primary teal for all markers
  const getTypeColor = () => {
    return "#00C6B8"; // Primary teal for all detection markers
  };

  // Create custom detection icon
  const createDetectionIcon = () => {
    const size = calculateMarkerSize(detection.area);
    const opacity = calculateOpacity(detection.area, detection.objectsType);
    const color = getTypeColor();
    const border = isSelected ? "3px solid #E3F3F2" : "1px solid rgba(0, 0, 0, 0.2)";
    const selectedOpacity = isSelected ? 1 : opacity;

    return L.divIcon({
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background-color: ${color};
          opacity: ${selectedOpacity};
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          border: ${border};
          transition: all 0.2s ease;
        "></div>
      `,
      className: "custom-detection-marker",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const handleClick = (e: L.LeafletMouseEvent) => {
    e.originalEvent.stopPropagation();
    e.originalEvent.preventDefault();
    if (onClick) {
      onClick(detection);
    }
  };

  return (
    <Marker
      position={position}
      icon={createDetectionIcon()}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
};

export default DetectionMarker;
