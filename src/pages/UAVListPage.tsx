import React, { useState } from "react";
import { Layout } from "../components/layout";
import {
	UAVCard,
	SectionHeader,
	UAVDetailPanel,
	FilterControls,
} from "../components/ui";
import type { UAVData } from "../components/ui/UAVCard";
import type {
	FilterConfig,
	FilterState,
} from "../components/ui/FilterControls";
import { cn } from "../lib/utils";

const UAVListPage: React.FC = () => {
	const [filteredUAVs, setFilteredUAVs] = useState<UAVData[]>([]);
	const [selectedUAV, setSelectedUAV] = useState<UAVData | null>(null);
	const [hasFilters, setHasFilters] = useState(false);

	// Filter configurations for the UAV list
	const filterConfigs: FilterConfig[] = [
		{
			key: "brand",
			label: "Brand",
			options: [
				"UAV 22456",
				"Athlon Furia",
				"Parrot AR 2.0",
				"UkrJet Bobr",
				"Kolibri 7",
				"UkrSpecSystems Shark",
				"Mavic air",
				"Global Hawk RQ-4",
			],
		},
		{
			key: "status",
			label: "Status",
			options: [
				"active",
				"damage",
				"standby",
				"destroyed",
				"engaged",
				"offline",
			],
		},
		{
			key: "missionType",
			label: "Mission type",
			options: ["tactical", "combat", "recon"],
		},
	];

	// Enhanced UAV data with all fields populated
	const uavData: UAVData[] = [
		{
			id: "78239",
			name: "Athlon Furia (ID:78239)",
			type: "tactical",
			status: "damage",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/4f096b02ea6202e65bd14e12c238cb997a8a618d?width=554",
			lastContact: "15/03/2025 06:27 pm",
			readyForFlight: "Yes",
			lastKnownLocation: "N/A",
			location: "Hangar H6",
			signalPercentage: 92,
			batteryPercentage: 76,
			description:
				"Medium-range tactical UAV used for reconnaissance and artillery adjustment.",
			controlUnit: "Charles Xavier (EMP101)",
			mission: "Reconnaissance",
			keyEvents: "Battery replaced 14/03/2025",
			totalFlightTime: "337h",
			timeSinceLastContact: "2h",
			droneType: "tactical",
		},
		{
			id: "22456",
			name: "UAV 22456 (ID:22456)",
			type: "combat",
			status: "active",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/f476cc02d51fe1eb0607cb92d090efc91a3f3cf6?width=554",
			lastContact: "N/A",
			readyForFlight: "Yes",
			lastKnownLocation: "N/A",
			location: "Hangar H6",
			signalPercentage: 100,
			batteryPercentage: 98,
			description: "Combat UAV with advanced targeting systems.",
			controlUnit: "Sarah Connor (EMP102)",
			mission: "Combat Air Patrol",
			keyEvents: "Mission completed 14/03/2025",
			totalFlightTime: "412h",
			timeSinceLastContact: "N/A",
			droneType: "combat",
		},
		{
			id: "274",
			name: "Parrot AR 2.0 (ID:274)",
			type: "tactical",
			status: "standby",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/309b73395a37595a2f2e74d4e6787fbbcdf00765?width=554",
			lastContact: "Yesterday 08:44 am",
			readyForFlight: "Yes",
			lastKnownLocation: "N/A",
			location: "Hangar H6",
			signalPercentage: 85,
			batteryPercentage: 60,
			description: "Lightweight UAV for short-range tactical operations.",
			controlUnit: "Ivan Petrov (EMP103)",
			mission: "Standby",
			keyEvents: "Software update 13/03/2025",
			totalFlightTime: "120h",
			timeSinceLastContact: "1d",
			droneType: "tactical",
		},
		{
			id: "9931",
			name: "UkrJet Bobr UJ26 (ID:9931)",
			type: "combat",
			status: "destroyed",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/e11088e3e85ed9a71bb357fdf440abc0184c8908?width=552",
			lastContact: "Today 05:31 am",
			readyForFlight: "No",
			lastKnownLocation: "lon 14.936 lat 178.9866",
			location: "N/A",
			signalPercentage: 0,
			batteryPercentage: 0,
			description: "Destroyed combat UAV, last seen over hostile territory.",
			controlUnit: "N/A",
			mission: "Reconnaissance",
			keyEvents: "Lost signal 15/03/2025",
			totalFlightTime: "210h",
			timeSinceLastContact: "12h",
			droneType: "combat",
		},
		{
			id: "4452",
			name: "Kolibri 7 (ID:4452)",
			type: "tactical",
			status: "damage",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/4c287b89be0c407640c8f81eebc78453161de70a?width=554",
			lastContact: "Yesterday 08:44 am",
			readyForFlight: "Yes",
			lastKnownLocation: "Hangar H6",
			location: "N/A",
			signalPercentage: 67,
			batteryPercentage: 45,
			description: "Small tactical UAV, currently under repair.",
			controlUnit: "Maria Ivanova (EMP104)",
			mission: "Tactical Support",
			keyEvents: "Crash landing 13/03/2025",
			totalFlightTime: "98h",
			timeSinceLastContact: "1d",
			droneType: "tactical",
		},
		{
			id: "3456",
			name: "UkrSpecSystems Shark (ID:3456)",
			type: "combat",
			status: "engaged",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/668c75c5c826b3fd84337434710142918b6a9c7e?width=554",
			lastContact: "29/03/2025 08:44 am",
			readyForFlight: "Yes",
			lastKnownLocation: "Hangar H6",
			location: "lon 14.936 lat 178.9866",
			signalPercentage: 88,
			batteryPercentage: 80,
			description: "Combat UAV currently engaged in mission.",
			controlUnit: "John Doe (EMP105)",
			mission: "Engagement",
			keyEvents: "Engaged hostile 29/03/2025",
			totalFlightTime: "300h",
			timeSinceLastContact: "1h",
			droneType: "combat",
		},
		{
			id: "33450",
			name: "UAV 33450 (ID:33450)",
			type: "combat",
			status: "offline",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/c88d5aaf8fcbbac5b9b290c77f03d8e89504a97f?width=554",
			lastContact: "08/03/2025 08:44 am",
			readyForFlight: "Yes",
			lastKnownLocation: "N/A",
			location: "Hangar W5",
			signalPercentage: 0,
			batteryPercentage: 0,
			description: "Offline combat UAV awaiting maintenance.",
			controlUnit: "N/A",
			mission: "Standby",
			keyEvents: "Powered down 08/03/2025",
			totalFlightTime: "150h",
			timeSinceLastContact: "20d",
			droneType: "combat",
		},
		{
			id: "20037",
			name: "Mavic air (ID:20037)",
			type: "tactical",
			status: "engaged",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/cdbb50c6cf6bfd1fb926deb3b4187dc355868f6c?width=554",
			lastContact: "Today 04:48 pm",
			readyForFlight: "Yes",
			lastKnownLocation: "N/A",
			location: "Serbia",
			signalPercentage: 95,
			batteryPercentage: 90,
			description: "Light tactical UAV, currently in operation.",
			controlUnit: "Elena Petrova (EMP106)",
			mission: "Reconnaissance",
			keyEvents: "Mission started 15/03/2025",
			totalFlightTime: "60h",
			timeSinceLastContact: "10m",
			droneType: "tactical",
		},
		{
			id: "global-hawk",
			name: "Global Hawk RQ-4",
			type: "recon",
			status: "active",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/666fff2ac2853f8097ba262a6c17a165b9b4da09?width=554",
			lastContact: "Yesterday 08:44 am",
			readyForFlight: "Yes",
			lastKnownLocation: "Hangar H6",
			location: "Hangar H6",
			signalPercentage: 99,
			batteryPercentage: 100,
			description: "High-altitude, long-endurance reconnaissance UAV.",
			controlUnit: "James Bond (EMP107)",
			mission: "Reconnaissance",
			keyEvents: "Surveillance mission 14/03/2025",
			totalFlightTime: "1200h",
			timeSinceLastContact: "1d",
			droneType: "recon",
		},
		{
			id: "55789",
			name: "Athlon Furia (ID:55789)",
			type: "recon",
			status: "active",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/4f096b02ea6202e65bd14e12c238cb997a8a618d?width=554",
			lastContact: "Today 07:15 am",
			readyForFlight: "Yes",
			lastKnownLocation: "lon 15.244 lat 179.1122",
			location: "Field Base Alpha",
			signalPercentage: 97,
			batteryPercentage: 88,
			description: "Recon UAV for field base operations.",
			controlUnit: "Alex Murphy (EMP108)",
			mission: "Recon Patrol",
			keyEvents: "Patrol started 16/03/2025",
			totalFlightTime: "210h",
			timeSinceLastContact: "30m",
			droneType: "recon",
		},
		{
			id: "44321",
			name: "UAV 44321 (ID:44321)",
			type: "tactical",
			status: "standby",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/f476cc02d51fe1eb0607cb92d090efc91a3f3cf6?width=554",
			lastContact: "Today 06:22 am",
			readyForFlight: "Yes",
			lastKnownLocation: "N/A",
			location: "Hangar B2",
			signalPercentage: 80,
			batteryPercentage: 70,
			description: "Tactical UAV on standby for deployment.",
			controlUnit: "Nina Sokolova (EMP109)",
			mission: "Standby",
			keyEvents: "Awaiting orders",
			totalFlightTime: "50h",
			timeSinceLastContact: "2h",
			droneType: "tactical",
		},
		{
			id: "88901",
			name: "Parrot AR 2.0 (ID:88901)",
			type: "combat",
			status: "offline",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/309b73395a37595a2f2e74d4e6787fbbcdf00765?width=554",
			lastContact: "12/03/2025 03:15 pm",
			readyForFlight: "No",
			lastKnownLocation: "N/A",
			location: "Maintenance Bay 3",
			signalPercentage: 0,
			batteryPercentage: 0,
			description: "Combat UAV offline for maintenance.",
			controlUnit: "N/A",
			mission: "Maintenance",
			keyEvents: "Offline since 12/03/2025",
			totalFlightTime: "80h",
			timeSinceLastContact: "3d",
			droneType: "combat",
		},
		{
			id: "77654",
			name: "UkrJet Bobr UJ26 (ID:77654)",
			type: "recon",
			status: "engaged",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/e11088e3e85ed9a71bb357fdf440abc0184c8908?width=552",
			lastContact: "Today 08:45 am",
			readyForFlight: "Yes",
			lastKnownLocation: "lon 16.455 lat 180.2366",
			location: "Sector 7 Patrol",
			signalPercentage: 90,
			batteryPercentage: 85,
			description: "Recon UAV currently engaged in patrol.",
			controlUnit: "Viktor Hreb (EMP110)",
			mission: "Patrol",
			keyEvents: "Patrol ongoing",
			totalFlightTime: "140h",
			timeSinceLastContact: "15m",
			droneType: "recon",
		},
		{
			id: "99123",
			name: "Kolibri 7 (ID:99123)",
			type: "combat",
			status: "active",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/4c287b89be0c407640c8f81eebc78453161de70a?width=554",
			lastContact: "Today 05:12 am",
			readyForFlight: "Yes",
			lastKnownLocation: "lon 13.122 lat 177.8911",
			location: "Forward Operating Base",
			signalPercentage: 93,
			batteryPercentage: 77,
			description: "Combat UAV stationed at forward base.",
			controlUnit: "Oleh Ivanenko (EMP111)",
			mission: "Base Defense",
			keyEvents: "Routine check 15/03/2025",
			totalFlightTime: "180h",
			timeSinceLastContact: "1h",
			droneType: "combat",
		},
		{
			id: "66543",
			name: "UkrSpecSystems Shark (ID:66543)",
			type: "tactical",
			status: "damage",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/668c75c5c826b3fd84337434710142918b6a9c7e?width=554",
			lastContact: "Yesterday 11:30 pm",
			readyForFlight: "No",
			lastKnownLocation: "N/A",
			location: "Repair Facility A",
			signalPercentage: 10,
			batteryPercentage: 5,
			description: "Damaged tactical UAV in repair facility.",
			controlUnit: "N/A",
			mission: "Repair",
			keyEvents: "Crash 14/03/2025",
			totalFlightTime: "60h",
			timeSinceLastContact: "1d",
			droneType: "tactical",
		},
		{
			id: "11987",
			name: "UAV 11987 (ID:11987)",
			type: "recon",
			status: "standby",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/c88d5aaf8fcbbac5b9b290c77f03d8e89504a97f?width=554",
			lastContact: "Today 04:33 am",
			readyForFlight: "Yes",
			lastKnownLocation: "N/A",
			location: "Hangar C4",
			signalPercentage: 75,
			batteryPercentage: 60,
			description: "Recon UAV on standby in hangar.",
			controlUnit: "Petro Shevchenko (EMP112)",
			mission: "Standby",
			keyEvents: "Ready for deployment",
			totalFlightTime: "40h",
			timeSinceLastContact: "3h",
			droneType: "recon",
		},
		{
			id: "33456",
			name: "Mavic air (ID:33456)",
			type: "combat",
			status: "destroyed",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/cdbb50c6cf6bfd1fb926deb3b4187dc355868f6c?width=554",
			lastContact: "10/03/2025 02:14 pm",
			readyForFlight: "No",
			lastKnownLocation: "lon 12.677 lat 176.3345",
			location: "N/A",
			signalPercentage: 0,
			batteryPercentage: 0,
			description: "Destroyed combat UAV.",
			controlUnit: "N/A",
			mission: "N/A",
			keyEvents: "Destroyed 10/03/2025",
			totalFlightTime: "30h",
			timeSinceLastContact: "15d",
			droneType: "combat",
		},
		{
			id: "44567",
			name: "Global Hawk RQ-4 (ID:44567)",
			type: "tactical",
			status: "engaged",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/666fff2ac2853f8097ba262a6c17a165b9b4da09?width=554",
			lastContact: "Today 09:18 am",
			readyForFlight: "Yes",
			lastKnownLocation: "lon 17.899 lat 181.4567",
			location: "Mission Zone Delta",
			signalPercentage: 98,
			batteryPercentage: 95,
			description: "Tactical UAV engaged in mission zone.",
			controlUnit: "Maksym Bondarenko (EMP113)",
			mission: "Engagement",
			keyEvents: "Mission ongoing",
			totalFlightTime: "500h",
			timeSinceLastContact: "10m",
			droneType: "tactical",
		},
		{
			id: "55432",
			name: "Athlon Furia (ID:55432)",
			type: "combat",
			status: "offline",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/4f096b02ea6202e65bd14e12c238cb997a8a618d?width=554",
			lastContact: "11/03/2025 07:55 pm",
			readyForFlight: "No",
			lastKnownLocation: "N/A",
			location: "Storage Facility B",
			signalPercentage: 0,
			batteryPercentage: 0,
			description: "Combat UAV in storage, offline.",
			controlUnit: "N/A",
			mission: "Storage",
			keyEvents: "Stored 11/03/2025",
			totalFlightTime: "10h",
			timeSinceLastContact: "10d",
			droneType: "combat",
		},
		{
			id: "78902",
			name: "UAV 78902 (ID:78902)",
			type: "recon",
			status: "active",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/f476cc02d51fe1eb0607cb92d090efc91a3f3cf6?width=554",
			lastContact: "Today 10:42 am",
			readyForFlight: "Yes",
			lastKnownLocation: "lon 18.234 lat 182.1123",
			location: "Reconnaissance Patrol",
			signalPercentage: 99,
			batteryPercentage: 97,
			description: "Recon UAV on patrol.",
			controlUnit: "Svitlana Koval (EMP114)",
			mission: "Recon Patrol",
			keyEvents: "Patrol ongoing",
			totalFlightTime: "300h",
			timeSinceLastContact: "5m",
			droneType: "recon",
		},
		{
			id: "12345",
			name: "Parrot AR 2.0 (ID:12345)",
			type: "tactical",
			status: "damage",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/309b73395a37595a2f2e74d4e6787fbbcdf00765?width=554",
			lastContact: "Yesterday 01:22 pm",
			readyForFlight: "No",
			lastKnownLocation: "N/A",
			location: "Maintenance Dock 5",
			signalPercentage: 20,
			batteryPercentage: 10,
			description: "Damaged tactical UAV in maintenance.",
			controlUnit: "N/A",
			mission: "Repair",
			keyEvents: "Crash 13/03/2025",
			totalFlightTime: "25h",
			timeSinceLastContact: "1d",
			droneType: "tactical",
		},
	];

	// Initialize with all UAVs
	React.useEffect(() => {
		setFilteredUAVs(uavData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleFilterChange = (filters: FilterState) => {
		let filtered = uavData;

		if (filters.brand) {
			filtered = filtered.filter((uav) =>
				uav.name.toLowerCase().includes(filters.brand.toLowerCase())
			);
		}

		if (filters.status) {
			filtered = filtered.filter((uav) => uav.status === filters.status);
		}

		if (filters.missionType) {
			filtered = filtered.filter((uav) => uav.type === filters.missionType);
		}

		if (filters.hasFilters) {
			setHasFilters(true);
		} else {
			setHasFilters(false);
		}

		setFilteredUAVs(filtered);
	};

	const handleUAVClick = (uav: UAVData) => {
		setSelectedUAV(uav);
	};

	const handleCloseDetail = () => {
		setSelectedUAV(null);
	};

	const baseClasses = "w-full pt-[64px] mx-[10%]";
	const expandedClasses = "w-full pt-[64px]";

	return (
		<Layout>
			<div className="flex justify-center">
				<div
					className={cn(
						"relative",
						selectedUAV ? expandedClasses : baseClasses
					)}
				>
					{/* Header and Filter Row */}
					<div
						className={cn("mb-[16px] z-30", {
							["px-[10%]"]: selectedUAV,
						})}
					>
						<div className="flex items-center gap-8">
							<SectionHeader
								title="Active UAVs"
								showArrow={false}
								width="w-[267px]"
							/>
							<div className="w-[54px] h-10">
								<FilterControls
									filters={filterConfigs}
									onFilterChange={handleFilterChange}
								/>
							</div>
						</div>
					</div>

					{/* Main Content Area */}
					<div className="flex justify-center items-start gap-[8px]">
						{/* UAV List Container */}
						<div
							className={cn(
								"relative z-20 rounded-[0_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/50 backdrop-blur-[5px] h-[638px]",

								{
									["w-[40%]"]: selectedUAV,
									["w-[80%]"]: !selectedUAV,
								}
							)}
						>
							{/* Scrollbar */}
							{/* <div className="absolute right-[14px] top-5 w-1 h-[143px] rounded-[3px] opacity-30 bg-white" /> */}

							{/* Content inside container */}
							<div className="w-full h-full overflow-hidden pt-[20px] justify-center flex px-[10%]">
								{/* UAV Grid */}
								<div
									className={cn(
										"flex flex-wrap gap-x-[32px] gap-y-[12px] h-full overflow-y-auto pt-[24px]",
										{
											["justify-start"]: !hasFilters,
											["justify-center"]: hasFilters,
										}
									)}
								>
									{filteredUAVs.map((uav) => (
										<UAVCard
											key={uav.id}
											uav={uav}
											selected={selectedUAV?.id === uav.id}
											onClick={handleUAVClick}
										/>
									))}
								</div>
							</div>
						</div>

						{/* Detail Panel */}
						{selectedUAV && (
							<UAVDetailPanel uav={selectedUAV} onClose={handleCloseDetail} />
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default UAVListPage;
