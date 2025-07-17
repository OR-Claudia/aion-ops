import React, { useState } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import batteryFullIcon from "../../assets/battery-full.svg";
import batteryHalfIcon from "../../assets/battery-half.svg";
import batteryEmptyIcon from "../../assets/battery-empty.svg";
import wifiFullIcon from "../../assets/wifi.svg";
import wifi2Icon from "../../assets/wifi-2.svg";
import wifi1Icon from "../../assets/wifi-1.svg";

interface ClusterableUAVMarkerProps {
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

const ClusterableUAVMarker: React.FC<ClusterableUAVMarkerProps> = ({
  position,
  type,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBatteryIcon = () => {
    if (!data.battery)
      return `<img src="${batteryFullIcon}" alt="battery" style="width: 16px; height: 16px;" />`;
    switch (data.battery.toLowerCase()) {
      case "full":
        return `<img src="${batteryFullIcon}" alt="battery full" style="width: 16px; height: 16px;" />`;
      case "good":
        return `<img src="${batteryHalfIcon}" alt="battery good" style="width: 16px; height: 16px;" />`;
      case "low":
        return `<img src="${batteryHalfIcon}" alt="battery low" style="width: 16px; height: 16px;" />`;
      case "critical":
        return `<img src="${batteryEmptyIcon}" alt="battery critical" style="width: 16px; height: 16px;" />`;
      default:
        return `<img src="${batteryFullIcon}" alt="battery" style="width: 16px; height: 16px;" />`;
    }
  };

  const getSignalIcon = () => {
    switch (data.signal.toLowerCase()) {
      case "strong":
        return `<img src="${wifiFullIcon}" alt="signal strong" style="width: 16px; height: 16px;" />`;
      case "weak":
        return `<img src="${wifi1Icon}" alt="signal weak" style="width: 5px; height: 5px;" />`;
      case "intermittent":
        return `<img src="${wifi2Icon}" alt="signal intermittent" style="width: 16px; height: 16px;" />`;
      case "none":
        return `<img src="${wifi1Icon}" alt="signal none" style="width: 5px; height: 5px;" />`;
      default:
        return `<img src="${wifiFullIcon}" alt="signal" style="width: 16px; height: 16px;" />`;
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

  // Create custom icon for the marker
  const createCustomIcon = () => {
    const baseClasses = `flex p-2 justify-center items-center gap-[10px] cursor-pointer transition-all duration-300 ${getTypeClasses()}`;
    const sizeClasses = isExpanded
      ? "w-[174px] h-[35px] px-[15px] py-[6px] flex-row rounded-[1px_12px_12px_12px]"
      : "w-[35px] h-[35px] p-2 flex-col rounded-[1px_25px_25px_25px]";

    const expandedContent = `
      <div class="${baseClasses} ${sizeClasses} hover:scale-105" style="pointer-events: auto;">
        <div style="display: flex; align-items: center;">${getSignalIcon()}</div>
        <div style="display: flex; align-items: center;">${getBatteryIcon()}</div>
        <div class="flex flex-col justify-center items-start" style="min-width: 0; flex: 1;">
          <div class="text-[#E3F3F2] font-ubuntu text-xs font-normal leading-normal" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;">${data.name}</div>
          <div class="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal" style="white-space: nowrap;">${data.coordinates}</div>
        </div>
      </div>
    `;

    const collapsedContent = `
      <div class="${baseClasses} ${sizeClasses} hover:scale-105" style="pointer-events: auto;">
        <div style="display: flex; align-items: center;">${getSignalIcon()}</div>
      </div>
    `;

    return L.divIcon({
      html: isExpanded ? expandedContent : collapsedContent,
      className: "custom-uav-marker",
      iconSize: isExpanded ? [174, 35] : [35, 35],
      iconAnchor: isExpanded ? [87, 35] : [17.5, 35],
    });
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Marker
      position={position}
      icon={createCustomIcon()}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
};

export default ClusterableUAVMarker;
