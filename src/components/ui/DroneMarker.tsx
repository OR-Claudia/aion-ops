import { memo, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export interface DroneMarkerProps {
	position: [number, number];
	size?: number;
	ringColor?: string;
	fillColor?: string;
	centerColor?: string;
	zIndexOffset?: number;
}

export const DroneMarker = memo((props: DroneMarkerProps) => {
	const {
		position,
		size = 24,
		ringColor = "#00C6B870",
		fillColor = "rgba(0,198,185,0.30)",
		centerColor = "#00C6B8",
		zIndexOffset = 0,
	} = props;

	const map = useMap();
	const markerRef = useRef<L.Marker | null>(null);

	useEffect(() => {
		if (!map) return;

		const container = document.createElement("div");
		container.style.width = `${size}px`;
		container.style.height = `${size}px`;
		container.style.borderRadius = "50%";
		container.style.border = `2px solid ${ringColor}`;
		container.style.background = fillColor;
		container.style.boxSizing = "border-box";
		container.style.position = "relative";
		// Ensure PointTags (other markers) remain clickable above this marker
		container.style.pointerEvents = "none";

		const centerDot = document.createElement("div");
		centerDot.style.width = `${Math.max(6, Math.round(size * 0.25))}px`;
		centerDot.style.height = `${Math.max(6, Math.round(size * 0.25))}px`;
		centerDot.style.borderRadius = "50%";
		centerDot.style.background = centerColor;
		centerDot.style.position = "absolute";
		centerDot.style.left = "50%";
		centerDot.style.top = "50%";
		centerDot.style.transform = "translate(-50%, -50%)";
		centerDot.style.pointerEvents = "none";
		container.appendChild(centerDot);

		const icon = L.divIcon({
			className: "drone-marker-icon",
			html: container,
			iconSize: [size, size],
			iconAnchor: [size / 2, size / 2],
		});

		const marker = L.marker(position, { icon, zIndexOffset });
		marker.addTo(map);
		markerRef.current = marker;

		return () => {
			if (markerRef.current) {
				map.removeLayer(markerRef.current);
				markerRef.current = null;
			}
		};
	}, [map, size, ringColor, fillColor, centerColor, zIndexOffset, position]);

	useEffect(() => {
		if (markerRef.current) {
			markerRef.current.setLatLng(position);
		}
	}, [position]);

	return null;
});

export default DroneMarker;
