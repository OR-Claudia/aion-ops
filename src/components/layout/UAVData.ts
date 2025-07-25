import type { UAVDetailData } from "../ui/UAVDetailModal";

// Helper function to generate UAV detail data from basic marker data
export const generateUAVDetailData = (basicData: {
	id: string | number;
	batteryPercentage?: number;
	signalPercentage: number;
	name: string;
	coordinates: string;
	status: string;
	battery?: string;
	description?: string;
	mission?: string;
	signal: string;
	flightPath?: string;
}): UAVDetailData => {
	// Extract coordinates for the live coordinates display - format to match design
	const coords = basicData.coordinates.includes(",")
		? basicData.coordinates.trim()
		: basicData.coordinates.replace(/[,\s]+/g, ", ");

	// Convert status to proper type
	const getStatus = (status: string): UAVDetailData["status"] => {
		const lowercaseStatus = status.toLowerCase();
		if (lowercaseStatus.includes("active")) return "active";
		if (lowercaseStatus.includes("damage")) return "damage";
		if (
			lowercaseStatus.includes("standby") ||
			lowercaseStatus.includes("warning")
		)
			return "standby";
		if (lowercaseStatus.includes("destroyed")) return "destroyed";
		if (lowercaseStatus.includes("engaged")) return "engaged";
		return "offline";
	};

	// Convert signal to proper type
	const getSignal = (signal: string): UAVDetailData["signal"] => {
		const lowercaseSignal = signal.toLowerCase();
		if (lowercaseSignal === "strong") return "strong";
		if (lowercaseSignal === "weak") return "weak";
		if (lowercaseSignal === "intermittent") return "intermittent";
		return "none";
	};

	// Convert battery to proper type
	const getBattery = (battery?: string): UAVDetailData["battery"] => {
		if (!battery) return "good";
		const lowercaseBattery = battery.toLowerCase();
		if (lowercaseBattery === "full") return "full";
		if (lowercaseBattery === "good") return "good";
		if (lowercaseBattery === "low") return "low";
		if (lowercaseBattery === "critical") return "critical";
		return "good";
	};

	// Generate percentages based on status
	const getSignalPercentage = (signal: UAVDetailData["signal"]): number => {
		switch (signal) {
			case "strong":
				return 99;
			case "weak":
				return 25;
			case "intermittent":
				return 60;
			default:
				return 0;
		}
	};

	const getBatteryPercentage = (battery: UAVDetailData["battery"]): number => {
		switch (battery) {
			case "full":
				return 100;
			case "good":
				return 76;
			case "low":
				return 35;
			case "critical":
				return 15;
			case "empty":
				return 5;
			default:
				return 0;
		}
	};

	// Generate descriptions based on UAV name/type
	const getDescription = (name: string): string => {
		if (name.includes("UAV 22456")) {
			return "The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.";
		}
		if (name.includes("Kolibri")) {
			return "Multi-purpose surveillance drone conducting routine patrol operations. Current mission involves area monitoring and threat assessment. All systems operational within normal parameters.";
		}
		if (name.includes("Shark")) {
			return "Advanced tactical reconnaissance unit deployed for high-priority surveillance. Equipped with enhanced sensor packages for detailed environmental analysis and target identification.";
		}
		if (name.includes("Bobr")) {
			return "Heavy-duty surveillance platform optimized for extended flight operations. Currently monitoring designated sector for unusual activity patterns and potential security threats.";
		}
		return "Standard surveillance drone conducting routine monitoring operations. Mission parameters include area reconnaissance, target tracking, and real-time intelligence gathering for command analysis.";
	};

	const getMission = (name: string): string => {
		if (name.includes("UAV 22456")) return "Recon";
		if (name.includes("Kolibri")) return "Patrol";
		if (name.includes("Shark")) return "Surveillance";
		if (name.includes("Bobr")) return "Area Monitor";
		return "Reconnaissance";
	};

	const getFlightPath = (name: string): string => {
		if (name.includes("UAV 22456")) return "Map";
		if (name.includes("Kolibri")) return "Route Alpha";
		if (name.includes("Shark")) return "Grid 7-Alpha";
		if (name.includes("Bobr")) return "Sector North";
		return "Standard Pattern";
	};

	// Generate some mock detections for demonstration
	const getDetections = (name: string) => {
		if (name.includes("UAV 22456")) {
			return [
				{
					id: "396",
					type: "Rosomok",
					confidence: 68,
					bounds: { x: 82, y: 153, width: 79, height: 48 },
				},
				{
					id: "003",
					type: "Civilians",
					confidence: 98,
					bounds: { x: 123, y: 167, width: 61, height: 34 },
				},
				{
					id: "647",
					type: "Civilian",
					confidence: 77,
					bounds: { x: 267, y: 156, width: 36, height: 48 },
				},
				{
					id: "277",
					type: "F52",
					confidence: 98,
					bounds: { x: 403, y: 154, width: 76, height: 28 },
				},
			];
		}
		return undefined;
	};

	const status = getStatus(basicData.status);
	const signal = getSignal(basicData.signal);
	const battery = getBattery(basicData.battery);

	return {
		id: basicData.id,
		name: basicData.name,
		coordinates: coords,
		status,
		signal,
		battery,
		batteryPercentage: getBatteryPercentage(battery),
		signalPercentage: getSignalPercentage(signal),
		description: getDescription(basicData.name),
		mission: getMission(basicData.name),
		missionLink: "/missions",
		flightPath: getFlightPath(basicData.name),
		flightPathLink: "/flight-paths",
		detections: getDetections(basicData.name),
	};
};
