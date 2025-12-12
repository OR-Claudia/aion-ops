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
	heading?: number;
	showDirection?: boolean;

	roll?: number;
	pitch?: number;
}

export const DroneMarker = memo((props: DroneMarkerProps) => {
	const {
		position,
		size = 24,
		ringColor = "#00C6B870",
		fillColor = "rgba(0,198,185,0.30)",
		centerColor = "#00C6B8",
		zIndexOffset = 0,
		heading = 0,
		showDirection = false,
		roll = 0,
		pitch = 0,
	} = props;

	const map = useMap();
	const markerRef = useRef<L.Marker | null>(null);

	useEffect(() => {
		if (!map) return;

		// Container: circular base (HTML string instead of DOM nodes)
		// Compute sweep dimensions and attitude transforms
		const baseWidth = Math.max(6, Math.round(size * 0.35));
		const pitchClamped = Math.max(-45, Math.min(45, pitch || 0));
		const widthMod = 1 - (pitchClamped / 90) * 0.4;
		const dynamicWidth = Math.max(15, Math.round(baseWidth * widthMod)) * 3;
		const rollClamped = Math.max(-60, Math.min(60, roll || 0));
		const skewX = (rollClamped / 60) * 6;
		const dotSize = Math.max(6, Math.round(size * 0.25));
		const edgeOffset = size / 2 + 2;
		const wedgeHTML = showDirection
			? `<div style="position:absolute; left:50%; top:50%; transform-origin:50% 55%; transform: translate(-50%, -50%) rotate(${heading}deg) translate(0, -${edgeOffset}px) skewX(${skewX}deg); width:${dynamicWidth}px; height:${Math.round(
					size * 1.5
			  )}px; clip-path: polygon(45% 100%, 55% 100%, 85% 0%, 15% 0%); background: linear-gradient(180deg, transparent 0%, ${centerColor}22 25%, ${centerColor}55 50%, ${centerColor}AA 75%, ${centerColor} 100%); opacity:0.9; filter:blur(0.2px); z-index:0; pointer-events:none;"></div>`
			: "";
		const containerHTML = `<div style="width:${size}px; height:${size}px; border-radius:50%; border:2px solid ${ringColor}; background:${fillColor}; box-sizing:border-box; position:relative; pointer-events:none; isolation:isolate; overflow:visible;">
  ${wedgeHTML}
  <div style="position:absolute; left:50%; top:50%; transform: translate(-50%, -50%); width:${dotSize}px; height:${dotSize}px; border-radius:50%; background:${centerColor}; pointer-events:none; z-index:1;"></div>
</div>`;

		const icon = L.divIcon({
			className: "drone-marker-icon",
			html: containerHTML,
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
	}, [
		map,
		size,
		ringColor,
		fillColor,
		centerColor,
		zIndexOffset,
		position,
		heading,
		roll,
		pitch,
		showDirection,
	]);

	useEffect(() => {
		if (markerRef.current) {
			markerRef.current.setLatLng(position);
		}
	}, [position]);

	return null;
});

export default DroneMarker;
