import React, { useState, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface MapStatusIndicatorProps {
  position: [number, number];
  type: "online" | "warning" | "offline";
  data: {
    name: string;
    coordinates: string;
    status: string;
    battery?: string;
    signal: string;
  };
}

const MapStatusIndicator: React.FC<MapStatusIndicatorProps> = ({
  position,
  type,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pixelPosition, setPixelPosition] = useState({ x: 0, y: 0 });
  const map = useMap();
  const indicatorRef = useRef<HTMLDivElement>(null);

  const updatePixelPosition = () => {
    if (map) {
      const point = map.latLngToContainerPoint(
        L.latLng(position[0], position[1]),
      );
      setPixelPosition({ x: point.x, y: point.y });
    }
  };

  useEffect(() => {
    updatePixelPosition();

    map.on("zoom move", updatePixelPosition);

    return () => {
      map.off("zoom move", updatePixelPosition);
    };
  }, [map, position]);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const getBatteryIcon = () => {
    if (!data.battery) return "🔋";
    switch (data.battery.toLowerCase()) {
      case "full":
        return "🔋";
      case "good":
        return "🔋";
      case "low":
        return "🪫";
      case "critical":
        return "🪫";
      default:
        return "🔋";
    }
  };

  const getSignalIcon = () => {
    switch (data.signal.toLowerCase()) {
      case "strong":
        return "📶";
      case "weak":
        return "📶";
      case "intermittent":
        return "📶";
      case "none":
        return "📶";
      default:
        return "📶";
    }
  };

  const getTypeClasses = () => {
    switch (type) {
      case "online":
        return "border-2 border-[#71BC2C] bg-[#212832]";
      case "warning":
        return "border-2 border-[#E09D18] bg-[#212832]";
      case "offline":
        return "border-[3px] border-[#C10000] bg-[#1F2630]";
      default:
        return "border-2 border-[#71BC2C] bg-[#212832]";
    }
  };

  const baseClasses = `flex p-2 justify-center items-center gap-[10px] cursor-pointer transition-all duration-300 pointer-events-auto z-[1000] ${getTypeClasses()}`;
  const sizeClasses = isExpanded
    ? "w-[174px] h-[35px] px-[15px] py-[6px] flex-row rounded-[1px_12px_12px_12px]"
    : "w-[35px] h-[35px] p-2 flex-col rounded-[1px_25px_25px_25px]";

  return (
    <div
      ref={indicatorRef}
      className={`${baseClasses} ${sizeClasses} hover:scale-105`}
      style={{
        position: "absolute",
        left: `${pixelPosition.x}px`,
        top: `${pixelPosition.y}px`,
        transform: "translate(-50%, -100%)",
        zIndex: 1000,
      }}
      onClick={handleClick}
    >
      {isExpanded ? (
        <>
          <span className="text-[#E3F3F2] text-base leading-normal">
            {getSignalIcon()}
          </span>
          <span className="text-[#E3F3F2] text-base leading-normal">
            {getBatteryIcon()}
          </span>
          <div className="flex flex-col justify-center items-start">
            <div className="text-[#E3F3F2] font-ubuntu text-xs font-normal leading-normal">
              {data.name}
            </div>
            <div className="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal">
              {data.coordinates}
            </div>
          </div>
        </>
      ) : (
        <span className="text-[#E3F3F2] text-base leading-normal">
          {getSignalIcon()}
        </span>
      )}
    </div>
  );
};

export default MapStatusIndicator;
