import type { StorageData } from "../components/ui/StorageItem";
import rgbKuna from "../assets/videos/kuna_rgb.mp4";
import thermoKuna from "../assets/videos/thermo_kuna.mp4";
import aerialVideo from "../assets/videos/aerial.mp4";
import mavicThumbnail from "../assets/thumbnails/aerial.png";
import kunaThumbnail from "../assets/thumbnails/kuna.png";

// Mocked storage data
const storageData: StorageData[] = [
	{
		id: "1",
		title: "Ground Patrol - 02/14/2025",
		date: "14.02.2025 02:13PM",
		image: kunaThumbnail,
		// image:
		// 	"https://api.builder.io/api/v1/image/assets/TEMP/8c45012e7e0d9fc53fa827e203dab5c8f541002a?width=288",
		uav: "KUNA",
		missionType: "Tactical",
		flightDuration: "0h24m",
		operator: "Amanda Magiera",
		status: "Success",
		description:
			"Aerial capture revealed increased activity along the gravel road running parallel to the forest edge. Automated classifiers identified four vehicles—two stationary near the treeline and two moving eastbound at moderate speed. Elevated presence of armed personnel detected: approximately seven individuals exhibiting soldier-class characteristics distributed along both road edges and partial canopy cover. Civilians observed in smaller numbers with non-coordinated movement patterns. Thermal signatures and movement indicators suggest heightened activity relative to prior pass. Recorded dataset reached 3.6 GB, including wide-area scans and multi-spectrum surveillance. All systems performing within mission parameters.",
		coordinates: "50.59227, 35.307322",
		videoUrl:
			"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
		mission: "Tactical",
		flightDatetime: "02/14/2025 13:33",
		tabs: [
			{
				id: "rgb",
				label: "RGB",
				value: rgbKuna,
			},
			{
				id: "thermo",
				label: "Thermo",
				value: thermoKuna,
			},
		],
		operatorId: "EMP101",
		keyEvents: "N/A",
		analysisResult: {
			systemStatusText:
				"Battery at 54% with 1.3 hours of remaining operational reserve. Signal integrity maintained at -39 dBm, encrypted uplink showing stable throughput and no detected interference. Navigation, thermal imaging, and object-tracking subsystems functioning within nominal operational thresholds.",

			missionProgressText:
				"Patrol sweep reached 67% completion of assigned 10km forest-corridor segment. Flight path remained stable at an average altitude of 120m above mixed conifer woodland. Visibility held at 5.8km under light overcast conditions. Minor wind shear detected but within acceptable compensation limits.",

			operationalSummaryText:
				"Live feed captured activity along a gravel service path. Autonomous tagging identified two moving vehicles traveling northeast at approx. 38–42 km/h. Additional detections included six civilians dispersed along the pathway and three armed individuals categorized as soldier-class entities based on equipment signatures. Movement patterns indicate no immediate hostile interaction. Multi-spectral capture logged 2.4 GB of environmental and activity-focused data. System maintaining continuous observation without anomalies.",
		},
		missionDescription:
			"Live feed captured activity along a gravel service path. Autonomous tagging identified two moving vehicles traveling northeast at approx. 38–42 km/h. Additional detections included six civilians dispersed along the pathway and three armed individuals categorized as soldier-class entities based on equipment signatures. Movement patterns indicate no immediate hostile interaction. Multi-spectral capture logged 2.4 GB of environmental and activity-focused data. System maintaining continuous observation without anomalies.",
		MissionPath: [
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
		],
	},
	{
		id: "2",
		title: "Air Patrol - 02/14/2025",
		date: "14.02.2025 02:36PM",
		image: mavicThumbnail,
		// image: "https://api.builder.io/api/v1/image/assets/TEMP/1e9ff41e8c0533a88b02f5714433fb8c2b0a8cf4?width=288",
		uav: "Mavic air 2",
		missionType: "Reconnaissance",
		flightDuration: "1h33m",
		operator: "Dagmara Popowska",
		status: "Success",
		description:
			"The footage documents an air tactical operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
		coordinates: "50.59277, 35.307322",
		videoUrl:
			"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
		mission: "Reconnaissance",
		flightDatetime: "02/14/2025 13:33",
		tabs: [
			{
				id: "rgb",
				label: "RGB",
				value: aerialVideo,
			},
			{
				id: "thermo",
				label: "Thermo",
				value: "",
			},
		],
		operatorId: "EMP102",
		keyEvents: "N/A",
		analysisResult: {
			systemStatusText:
				"Battery holding at 63% with projected 1.7 hours of continued operational endurance. Long-range transmission link stabilized at -42 dBm, maintaining clean encrypted throughput with no detected frame degradation. Aerial imaging suite functioning optimally across optical, thermal, and motion-tracking subsystems.",

			missionProgressText:
				"Current sweep achieved 74% completion of the designated forest-perimeter grid segment. Aerial altitude maintained at 210m, providing extended visibility over canopy openings and adjacent gravel access roads. Air conditions steady with 6.4km visibility and mild upper-level turbulence.",

			operationalSummaryText:
				"Aerial capture revealed increased activity along the gravel road running parallel to the forest edge. Automated classifiers identified four vehicles—two stationary near the treeline and two moving eastbound at moderate speed. Elevated presence of armed personnel detected: approximately seven individuals exhibiting soldier-class characteristics distributed along both road edges and partial canopy cover. Civilians observed in smaller numbers with non-coordinated movement patterns. Thermal signatures and movement indicators suggest heightened activity relative to prior pass. Recorded dataset reached 3.6 GB, including wide-area scans and multi-spectrum surveillance. All systems performing within mission parameters.",
		},
		missionDescription:
			"Silent running protocols active with noise signature minimized for covert movement. Raven UAV maintaining overwatch while UGV conducts close-proximity intelligence collection on vehicle movements and personnel activity. Multi-spectrum passive detection systems monitoring both uniformed military personnel and irregular civilian combatants without active emission signatures.Mission proceeding under strict stealth parameters with zero detection incidents recorded. Intelligence collection ongoing while maintaining tactical advantage through concealment.",
		MissionPath: [
			{
				lat: 50.59457,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
		],
	},
	{
		id: "3",
		title: "Border Patrol - 12/22/2024",
		date: "13.02.2025 01:22PM",
		image:
			"https://api.builder.io/api/v1/image/assets/TEMP/eb10590cd8cf7c4a72ce0f0c52e5e1a3e96b8308?width=288",
		uav: "UkrJet Bobr UJ26",
		missionType: "Reconnaissance",
		flightDuration: "1h12m",
		operator: "Kamil Kisielewski",
		status: "Success",
		description:
			"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
		coordinates: "50.59277, 35.307322",
		videoUrl:
			"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
		mission: "Reconnaissance",
		flightDatetime: "12/22/2024 13:33",
		operatorId: "EMP103",
		keyEvents: "N/A",
		analysisResult: {
			systemStatusText:
				"Battery concluded at 62% capacity with 1.9 hours reserve remaining. WiFi connectivity maintained stable performance at -41 dBm throughout operation, with encrypted data transmission experiencing zero packet loss. All critical systems operated within normal parameters for mission duration.",
			missionProgressText:
				"Successfully completed 81% of designated 18km² patrol grid covering mixed terrain including agricultural zones, woodland sectors, and rural settlements. Navigation maintained precise waypoint execution at 150m altitude. Weather conditions remained favorable with 7km visibility and moderate crosswinds from southwest.",

			operationalSummaryText:
				"Standard reconnaissance proceeded with systematic grid coverage. Sensor array collected multi-spectrum imagery totaling 3.1 GB transmitted data. Area assessment revealed expected forest and mixed terrain infrastructure patterns. Mission timeline concluded as scheduled. All safety protocols observed with no anomalies.",
		},
		missionDescription:
			"Silent running protocols active with noise signature minimized for covert movement. Raven UAV maintaining overwatch while UGV conducts close-proximity intelligence collection on vehicle movements and personnel activity. Multi-spectrum passive detection systems monitoring both uniformed military personnel and irregular civilian combatants without active emission signatures.Mission proceeding under strict stealth parameters with zero detection incidents recorded. Intelligence collection ongoing while maintaining tactical advantage through concealment.",
		MissionPath: [
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
			{
				lat: 50.59277,
				lon: 35.307222,
			},
		],
	},
	{
		id: "4",
		title: "Reconnaissance Patrol - 12/18/2024",
		date: "13.02.2025 08:48AM",
		image:
			"https://api.builder.io/api/v1/image/assets/TEMP/e7e3ad66214149785e55acfa7a8aecd4c0f82268?width=288",
		uav: "KUNA",
		missionType: "Tactical",
		flightDuration: "0h46m",
		operator: "Maria Ivanova",
		status: "Success",
		description:
			"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
		coordinates: "50.639567, 35.407889",
		videoUrl:
			"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
		mission: "Tactical",
		flightDatetime: "12/18/2024 13:33",
		operatorId: "EMP104",
		keyEvents: "N/A",
		missionDescription:
			"Silent running protocols active with noise signature minimized for covert movement. Raven UAV maintaining overwatch while UGV conducts close-proximity intelligence collection on vehicle movements and personnel activity. Multi-spectrum passive detection systems monitoring both uniformed military personnel and irregular civilian combatants without active emission signatures.Mission proceeding under strict stealth parameters with zero detection incidents recorded. Intelligence collection ongoing while maintaining tactical advantage through concealment.",
		MissionPath: [
			{
				lat: 50.590833,
				lon: 35.307222,
			},
			{
				lat: 50.595124,
				lon: 35.315678,
			},
			{
				lat: 50.601456,
				lon: 35.328945,
			},
			{
				lat: 50.608234,
				lon: 35.343267,
			},
			{
				lat: 50.615789,
				lon: 35.358912,
			},
			{
				lat: 50.623456,
				lon: 35.375634,
			},
			{
				lat: 50.631923,
				lon: 35.392156,
			},
			{
				lat: 50.639567,
				lon: 35.407889,
			},
		],
	},
	{
		id: "5",
		title: "Intel gathering - 01/18/2025",
		date: "13.02.2025 06:39AM",
		image:
			"https://api.builder.io/api/v1/image/assets/TEMP/e1433ad1a1b2b1e4d7cc343c61d9b6d847aa2a77?width=288",
		uav: "KUNA",
		missionType: "Reconnaissance",
		flightDuration: "3h09m",
		operator: "Leopold Bartczak",
		status: "Success",
		description:
			"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
		coordinates: "50.410123, 35.091456",
		videoUrl:
			"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
		mission: "Reconnaissance",
		flightDatetime: "01/18/2025 13:33",
		operatorId: "EMP105",
		keyEvents: "N/A",
		missionDescription:
			"Silent running protocols active with noise signature minimized for covert movement. Raven UAV maintaining overwatch while UGV conducts close-proximity intelligence collection on vehicle movements and personnel activity. Multi-spectrum passive detection systems monitoring both uniformed military personnel and irregular civilian combatants without active emission signatures. Mission proceeding under strict stealth parameters with zero detection incidents recorded. Intelligence collection ongoing while maintaining tactical advantage through concealment.",
		MissionPath: [
			{
				lat: 50.590833,
				lon: 35.307222,
			},
			{
				lat: 50.582456,
				lon: 35.298765,
			},
			{
				lat: 50.571234,
				lon: 35.285432,
			},
			{
				lat: 50.557891,
				lon: 35.268901,
			},
			{
				lat: 50.542345,
				lon: 35.249567,
			},
			{
				lat: 50.524789,
				lon: 35.227234,
			},
			{
				lat: 50.505123,
				lon: 35.202678,
			},
			{
				lat: 50.483567,
				lon: 35.176234,
			},
			{
				lat: 50.460234,
				lon: 35.148567,
			},
			{
				lat: 50.435678,
				lon: 35.120123,
			},
			{
				lat: 50.410123,
				lon: 35.091456,
			},
		],
	},
	{
		id: "6",
		title: "Active Conflict Patrol - 02/16/2025",
		date: "13.02.2025 08:12AM",
		image:
			"https://api.builder.io/api/v1/image/assets/TEMP/eb10590cd8cf7c4a72ce0f0c52e5e1a3e96b8308?width=288",
		uav: "Mavic air",
		missionType: "Combat",
		flightDuration: "0h56m",
		operator: "Izydor Gall",
		status: "Success",
		description:
			"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
		coordinates: "50.703456, 35.256789",
		videoUrl:
			"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
		mission: "Combat",
		flightDatetime: "02/16/2025 13:33",
		operatorId: "EMP106",
		keyEvents: "N/A",
		missionDescription:
			"Silent running protocols active with noise signature minimized for covert movement. Raven UAV maintaining overwatch while UGV conducts close-proximity intelligence collection on vehicle movements and personnel activity. Multi-spectrum passive detection systems monitoring both uniformed military personnel and irregular civilian combatants without active emission signatures. Mission proceeding under strict stealth parameters with zero detection incidents recorded. Intelligence collection ongoing while maintaining tactical advantage through concealment.",
		MissionPath: [
			{
				lat: 50.590833,
				lon: 35.307222,
			},
			{
				lat: 50.612345,
				lon: 35.301567,
			},
			{
				lat: 50.634567,
				lon: 35.294123,
			},
			{
				lat: 50.657234,
				lon: 35.284678,
			},
			{
				lat: 50.680123,
				lon: 35.272345,
			},
			{
				lat: 50.703456,
				lon: 35.256789,
			},
		],
	},
	{
		id: "7",
		title: "Reconnaissance Patrol - 02/18/2025",
		date: "13.02.2025 05:19AM",
		image:
			"https://api.builder.io/api/v1/image/assets/TEMP/5a8295c6f9a5352be5b2c5500f3fe7548476c906?width=288",
		uav: "Athlon Furia",
		missionType: "Reconnaissance",
		flightDuration: "1h33m",
		operator: "Amanda Magiera",
		status: "Success",
		description:
			"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
		coordinates: "50.414567, 35.762789",
		videoUrl:
			"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
		mission: "Reconnaissance",
		flightDatetime: "02/18/2025 13:33",
		operatorId: "EMP101",
		keyEvents: "N/A",
		missionDescription:
			"Silent running protocols active with noise signature minimized for covert movement. Raven UAV maintaining overwatch while UGV conducts close-proximity intelligence collection on vehicle movements and personnel activity. Multi-spectrum passive detection systems monitoring both uniformed military personnel and irregular civilian combatants without active emission signatures. Mission proceeding under strict stealth parameters with zero detection incidents recorded. Intelligence collection ongoing while maintaining tactical advantage through concealment.",
		MissionPath: [
			{
				lat: 50.590833,
				lon: 35.307222,
			},
			{
				lat: 50.583456,
				lon: 35.325678,
			},
			{
				lat: 50.574234,
				lon: 35.347891,
			},
			{
				lat: 50.563567,
				lon: 35.374123,
			},
			{
				lat: 50.551234,
				lon: 35.404567,
			},
			{
				lat: 50.537891,
				lon: 35.438234,
			},
			{
				lat: 50.523456,
				lon: 35.475123,
			},
			{
				lat: 50.507789,
				lon: 35.515678,
			},
			{
				lat: 50.491234,
				lon: 35.559234,
			},
			{
				lat: 50.473567,
				lon: 35.605789,
			},
			{
				lat: 50.454891,
				lon: 35.655123,
			},
			{
				lat: 50.435234,
				lon: 35.707456,
			},
			{
				lat: 50.414567,
				lon: 35.762789,
			},
		],
	},
	{
		id: "8",
		title: "Reconnaissance Patrol - 02/16/2025",
		date: "13.02.2025 08:29PM",
		image:
			"https://api.builder.io/api/v1/image/assets/TEMP/eb10590cd8cf7c4a72ce0f0c52e5e1a3e96b8308?width=288",
		uav: "Mavic air",
		missionType: "Reconnaissance",
		flightDuration: "1h33m",
		operator: "Amanda Magiera",
		status: "Success",
		description:
			"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
		coordinates: "50.231456, 35.752891",
		videoUrl:
			"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
		mission: "Reconnaissance",
		flightDatetime: "02/16/2025 13:33",
		operatorId: "EMP101",
		keyEvents: "N/A",
		missionDescription:
			"Silent running protocols active with noise signature minimized for covert movement. Raven UAV maintaining overwatch while UGV conducts close-proximity intelligence collection on vehicle movements and personnel activity. Multi-spectrum passive detection systems monitoring both uniformed military personnel and irregular civilian combatants without active emission signatures.Mission proceeding under strict stealth parameters with zero detection incidents recorded. Intelligence collection ongoing while maintaining tactical advantage through concealment.",
		MissionPath: [
			{
				lat: 50.590833,
				lon: 35.307222,
			},
			{
				lat: 50.578234,
				lon: 35.319567,
			},
			{
				lat: 50.563456,
				lon: 35.334891,
			},
			{
				lat: 50.546789,
				lon: 35.353234,
			},
			{
				lat: 50.528123,
				lon: 35.374567,
			},
			{
				lat: 50.507456,
				lon: 35.398891,
			},
			{
				lat: 50.484789,
				lon: 35.426234,
			},
			{
				lat: 50.460123,
				lon: 35.456567,
			},
			{
				lat: 50.433456,
				lon: 35.489891,
			},
			{
				lat: 50.404789,
				lon: 35.526234,
			},
			{
				lat: 50.374123,
				lon: 35.565567,
			},
			{
				lat: 50.341456,
				lon: 35.607891,
			},
			{
				lat: 50.306789,
				lon: 35.653234,
			},
			{
				lat: 50.270123,
				lon: 35.701567,
			},
			{
				lat: 50.231456,
				lon: 35.752891,
			},
		],
	},
];

// Simulate API delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Get list of storage facilities
 */
export async function getStorageList(): Promise<StorageData[]> {
	await delay(600);
	return storageData;
}

/**
 * Get storage facility details by ID
 */
export async function getStorageById(
	id: string
): Promise<StorageData | undefined> {
	await delay(250);
	return storageData.find((storage) => storage.id === id);
}
