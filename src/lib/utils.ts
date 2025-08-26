import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(val: string) {
	return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function formatDetectionTimestamp(timestamp: number): string {
	const minutes = Math.floor(timestamp / 60);
	const seconds = Math.floor(timestamp % 60);
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
		2,
		"0"
	)}`;
}

// Simple reverse geocoding function
export const reverseGeocode = async (
	lat: number,
	lon: number
): Promise<string> => {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
		);
		const data = await response.json();

		if (data && data.address) {
			const city =
				data.address.city || data.address.town || data.address.village || "";
			const country = data.address.country || "";
			return city && country
				? `${city}, ${country}`
				: country || "Unknown Location";
		}
		return "Unknown Location";
	} catch (error) {
		console.error("Reverse geocoding failed:", error);
		return "Unknown Location";
	}
};
