import React from "react";

interface MapMarkerProps {
  coordinates: string;
  position?: { top: number; left: number };
  className?: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({
  coordinates,
  position,
  className = "",
}) => {
  const containerStyle = position
    ? { top: `${position.top}px`, left: `${position.left}px` }
    : {};

  return (
    <div
      className={`w-[103px] h-[34px] ${position ? "absolute" : "relative"} ${className}`}
      style={containerStyle}
    >
      {/* UAV Position Marker */}
      <svg
        className="w-4 h-[21px] absolute left-0 top-0 rotate-[-56deg] fill-black stroke-app-accent stroke-1"
        width="23"
        height="19"
        viewBox="0 0 23 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.7543 5.92062L13.3441 8.96068L13.0351 9.08685L13.0339 9.42054L12.9905 17.4308L1.62454 1.39031L20.7543 5.92062Z"
          fill="black"
          stroke="#00C6B8"
        />
      </svg>

      {/* Coordinates */}
      <div className="absolute left-[15px] top-5 w-[88px] h-[14px]">
        <span className="text-app-text font-share-tech text-xs font-normal">
          {coordinates}
        </span>
      </div>
    </div>
  );
};

export default MapMarker;
