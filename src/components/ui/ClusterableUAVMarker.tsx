import React, { useState, useEffect } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import batteryFullIcon from "../../assets/battery-full.svg";
import batteryHalfIcon from "../../assets/battery-half.svg";
import batteryEmptyIcon from "../../assets/battery-empty.svg";
import wifiFullIcon from "../../assets/wifi.svg";
import wifi2Icon from "../../assets/wifi-2.svg";
import wifi1Icon from "../../assets/wifi-1.svg";

import externalLinkIcon from "../../assets/external-link.svg";
import type { UAVDetailData } from "./Modals/UAVDetailModal";

interface ClusterableUAVMarkerProps {
	position: [number, number];
	type: "online" | "warning" | "danger";
	data: UAVDetailData;
	onDetailClick: (id: string | number) => void;
}

const ClusterableUAVMarker: React.FC<ClusterableUAVMarkerProps> = ({
	position,
	type,
	data,
	onDetailClick,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const markerRef = React.useRef<any>(null);

	const handleClick = (e: L.LeafletMouseEvent) => {
		e.originalEvent.stopPropagation();
		setIsExpanded((prev) => !prev);
	};

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
				return `<img src="${wifi1Icon}" alt="signal weak" style="width: 16px; height: 6px;" />`;
			case "intermittent":
				return `<img src="${wifi2Icon}" alt="signal intermittent" style="width: 16px; height: 16px;" />`;
			case "none":
				return `<img src="${wifi1Icon}" alt="signal none" style="width: 16px; height: 6px;" />`;
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
			case "danger":
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
			<div style="display: flex; align-items: center; gap: 8px; pointer-events: all;">
			<div class="${baseClasses} ${sizeClasses}" style="transition: all 0.2s ease; position: relative;">
				<div style="display: flex; align-items: center; pointer-events: none;">${getSignalIcon()}</div>
				<div style="display: flex; align-items: center; pointer-events: none;">${getBatteryIcon()}</div>
				<div class="flex flex-col justify-center items-start" style="min-width: 0; flex: 1; pointer-events: none;">
				<div class="text-[#E3F3F2] font-ubuntu text-xs font-normal leading-normal" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;">${
					data.name
				}</div>
				<div class="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal" style="white-space: nowrap;">${
					data.coordinates
				}</div>
				</div>
			</div>
			<button
				class="modal-btn !bg-[#1F2630] ${getTypeClasses()}"
				style="width: 35px; height: 35px; border-radius: 25px; padding: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; background: none; pointer-events: all;"
				data-detail-btn="true"
			>
				<img src="${externalLinkIcon}" alt="open details" style="width: 12px; height: 12px; opacity: 0.8;" />
			</button>
			</div>
			`;

		const collapsedContent = `
      <div class="${baseClasses} ${sizeClasses}" style="pointer-events: all; cursor: pointer;">
        <div style="display: flex; align-items: center; pointer-events: none;">${getSignalIcon()}</div>
      </div>
    `;

		return L.divIcon({
			html: isExpanded ? expandedContent : collapsedContent,
			className: "custom-uav-marker",
			iconSize: isExpanded ? [220, 35] : [35, 35],
			iconAnchor: isExpanded ? [17.5, 35] : [17.5, 35],
		});
	};

	const customIcon = React.useMemo(
		() => createCustomIcon(),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isExpanded, data, type]
	);

	// // Attach DOM event for detail button inside custom icon
	useEffect(() => {
		const markerEl = markerRef.current?.getElement?.() ?? null;
		if (!markerEl) return;

		const detailBtn = markerEl.querySelector('[data-detail-btn="true"]');
		if (detailBtn) {
			const handler = (ev: Event) => {
				ev.stopPropagation();
				onDetailClick(data.id);
				console.log("Detail button clicked, ID added to selected UAVs");
			};

			detailBtn.addEventListener("click", handler);
			return () => {
				detailBtn.removeEventListener("click", handler);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customIcon]);

	return (
		<Marker
			ref={markerRef}
			position={position}
			icon={customIcon}
			// @ts-expect-error - Add UAV ID to options for cluster tracking
			uavId={data.id}
			eventHandlers={{
				click: handleClick,
			}}
		/>
	);
};

export default ClusterableUAVMarker;
