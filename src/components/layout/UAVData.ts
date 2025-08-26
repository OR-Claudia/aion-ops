import type { UAVDetailData } from "../ui/Modals/UAVDetailModal";

export const generateMissionCoordinates = (): [number, number][] => {
	const basePosition: [number, number] = [50.590833, 35.307222];

	const uavId = "UAV-1";
	const type: "online" | "warning" | "offline" = "online";

	const [baseLat, baseLng] = basePosition;
	const coordinates: [number, number][] = [];

	const isOffline = (
		type: "online" | "warning" | "offline"
	): type is "offline" => type === "offline";
	const pathLength = isOffline(type) ? 4 : Math.floor(Math.random() * 6) + 6;
	const radius = 0.01;

	const startOffsetLat = (Math.random() - 0.5) * radius * 1.5;
	const startOffsetLng = (Math.random() - 0.5) * radius * 1.5;
	coordinates.push([baseLat + startOffsetLat, baseLng + startOffsetLng]);

	for (let i = 1; i < pathLength - 1; i++) {
		const t = i / (pathLength - 1);

		let lat: number, lng: number;

		if (uavId.includes("KUNA")) {
			const angle = t * Math.PI * 3;
			const currentRadius = radius * (1 - t) * 0.7;
			lat =
				baseLat + startOffsetLat * (1 - t) + Math.cos(angle) * currentRadius;
			lng =
				baseLng + startOffsetLng * (1 - t) + Math.sin(angle) * currentRadius;
		} else if (uavId.includes("Hawk")) {
			const angle = t * Math.PI * 2;
			lat = baseLat + startOffsetLat * (1 - t) + Math.sin(angle) * radius * 0.4;
			lng =
				baseLng + startOffsetLng * (1 - t) + Math.sin(angle * 2) * radius * 0.3;
		} else if (uavId.includes("Falcon")) {
			lat =
				baseLat +
				startOffsetLat * (1 - t) +
				Math.sin(t * Math.PI * 4) * radius * 0.2;
			lng = baseLng + startOffsetLng * (1 - t) + (t - 0.5) * radius * 0.6;
		} else if (uavId.includes("Kolibri")) {
			lat =
				baseLat +
				startOffsetLat * (1 - t) +
				Math.sin(t * Math.PI * 6) * radius * 0.2;
			lng =
				baseLng +
				startOffsetLng * (1 - t) +
				Math.cos(t * Math.PI * 3) * radius * 0.5;
		} else if (uavId.includes("Shark")) {
			const angle = t * Math.PI * 2.5;
			lat = baseLat + startOffsetLat * (1 - t) + Math.cos(angle) * radius * 0.5;
			lng = baseLng + startOffsetLng * (1 - t) + Math.sin(angle) * radius * 0.5;
		} else {
			const prevLat = coordinates[i - 1][0];
			const prevLng = coordinates[i - 1][1];
			const stepLat = (Math.random() - 0.5) * radius * 0.25;
			const stepLng = (Math.random() - 0.5) * radius * 0.25;
			const progressWeight = t * 0.3;
			const towardsBaseLat = (baseLat - prevLat) * progressWeight;
			const towardsBaseLng = (baseLng - prevLng) * progressWeight;
			lat = prevLat + stepLat + towardsBaseLat;
			lng = prevLng + stepLng + towardsBaseLng;
		}

		coordinates.push([lat, lng]);
	}

	coordinates.push(basePosition);

	return coordinates;
};

export const getMissionPathColor = (
	type: "online" | "warning" | "danger"
): string => {
	switch (type) {
		case "online":
			return "#71BC2C";
		case "warning":
			return "#E09D18";
		case "danger":
			return "#C10000";
		default:
			return "#71BC2C";
	}
};

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
	MissionPath?: string;
}): UAVDetailData => {
	const coords = basicData.coordinates.includes(",")
		? basicData.coordinates.trim()
		: basicData.coordinates.replace(/[,\s]+/g, ", ");

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

	const getSignal = (signal: string): UAVDetailData["signal"] => {
		const lowercaseSignal = signal.toLowerCase();
		if (lowercaseSignal === "strong") return "strong";
		if (lowercaseSignal === "weak") return "weak";
		if (lowercaseSignal === "intermittent") return "intermittent";
		return "none";
	};

	const getBattery = (battery?: string): UAVDetailData["battery"] => {
		if (!battery) return "good";
		const lowercaseBattery = battery.toLowerCase();
		if (lowercaseBattery === "full") return "full";
		if (lowercaseBattery === "good") return "good";
		if (lowercaseBattery === "low") return "low";
		if (lowercaseBattery === "critical") return "critical";
		return "good";
	};

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

	const getDescription = (name: string): string => {
		if (name.includes("KUNA")) {
			return "Kuna is a versatile, tracked terrain drone—a hybrid UGV featuring autonomous navigation, modular adaptability, robust mobility, optional armament, and aerial support via the Raven UAV—conceived to meet modern military needs.";
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

	const getMissionPath = (name: string): string => {
		if (name.includes("UAV 22456")) return "Map";
		if (name.includes("Kolibri")) return "Route Alpha";
		if (name.includes("Shark")) return "Grid 7-Alpha";
		if (name.includes("Bobr")) return "Sector North";
		return "Standard Pattern";
	};

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

	const getDroneType = (name: string): string => {
		if (name.includes("KUNA")) return "Kuna";
		if (name.includes("Kolibri")) return "Kolibri";
		if (name.includes("Shark")) return "Athlon Furia";
		if (name.includes("Bobr")) return "Bobr UJ26";
		if (name.includes("Hawk")) return "Hawk";
		if (name.includes("Falcon")) return "Falcon";
		return "Unknown";
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
		MissionPath: getMissionPath(basicData.name),
		MissionPathLink: "/flight-paths",
		droneType: getDroneType(basicData.name),
		detections: getDetections(basicData.name),
	};
};
