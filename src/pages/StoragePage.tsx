import React, { useState } from "react";
import { Layout } from "../components/layout";
import {
	SectionHeader,
	FilterControls,
	StorageList,
	StorageDetailPanel,
} from "../components/ui";
import type { StorageData } from "../components/ui/StorageItem";
import type {
	FilterConfig,
	FilterState,
} from "../components/ui/FilterControls";
import { cn } from "../lib/utils";
import DetectionsModal from "../components/ui/Modals/DetectionsModal";
import { detections as detectionsData } from "../assets/mock-data/data.ts";
import FlightPathModal from "../components/ui/Modals/FlightPathModal.tsx";

const StoragePage: React.FC = () => {
	const [filteredRecords, setFilteredRecords] = useState<StorageData[]>([]);
	const [selectedRecord, setSelectedRecord] = useState<StorageData | null>(
		null
	);
	const [detectionsOpen, setDetectionsOpen] = useState<boolean>(false);
	const [flightPathOpen, setFlightpathOpen] = useState<boolean>(false);

	// Filter configurations for the storage list
	const filterConfigs: FilterConfig[] = [
		{
			key: "uav",
			label: "UAV",
			options: ["UAV 22456", "20037 Mavic air", "UAV 33450", "Drone XYZ"],
		},
		{
			key: "status",
			label: "Status",
			options: ["Success", "Failed", "In Progress"],
		},
		{
			key: "missionType",
			label: "Mission type",
			options: ["Recon", "Combat", "Tactical"],
		},
	];

	// Mock storage data based on the design
	const storageData: StorageData[] = [
		{
			id: "1",
			title: "Recon Patrol - 02/14/2025",
			date: "13.02.2025 06:39AM",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/8c45012e7e0d9fc53fa827e203dab5c8f541002a?width=288",
			uav: "UAV 22456",
			missionType: "Recon",
			flightDuration: "1h33m",
			operator: "Charles Xavier",
			status: "Success",
			description:
				"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
			coordinates: "-14.936, 178.9866",
			videoUrl:
				"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
			mission: "Recon",
			flightDatetime: "25/03/2025 13:33",
			operatorId: "EMP101",
			keyEvents: "N/A",
			missionDescription:
				"Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
			flightPath: [
				{
					lat: 52.229774,
					lon: 21.0123,
				},
				{
					lat: 52.23001,
					lon: 21.012274,
				},
				{
					lat: 52.230014,
					lon: 21.012315,
				},
				{
					lat: 52.229216,
					lon: 21.012063,
				},
				{
					lat: 52.229016,
					lon: 21.012134,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228829,
					lon: 21.011978,
				},
				{
					lat: 52.22861,
					lon: 21.012108,
				},
			],
			detected: detectionsData,
		},
		{
			id: "2",
			title: "Recon Patrol - 05/05/2024",
			date: "13.02.2025 06:39AM",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/1e9ff41e8c0533a88b02f5714433fb8c2b0a8cf4?width=288",
			uav: "20037 Mavic air",
			missionType: "Recon",
			flightDuration: "1h33m",
			operator: "Emma U. Brown",
			status: "Success",
			description:
				"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
			coordinates: "-14.936, 178.9866",
			videoUrl:
				"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
			mission: "Recon",
			flightDatetime: "05/05/2024 13:33",
			operatorId: "EMP102",
			keyEvents: "N/A",
			missionDescription:
				"Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
			flightPath: [
				{
					lat: 52.229774,
					lon: 21.0123,
				},
				{
					lat: 52.23001,
					lon: 21.012274,
				},
				{
					lat: 52.230014,
					lon: 21.012315,
				},
				{
					lat: 52.229216,
					lon: 21.012063,
				},
				{
					lat: 52.229016,
					lon: 21.012134,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228829,
					lon: 21.011978,
				},
				{
					lat: 52.22861,
					lon: 21.012108,
				},
			],
			detected: detectionsData,
		},
		{
			id: "3",
			title: "Recon Patrol - 12/22/2024",
			date: "13.02.2025 06:39AM",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/eb10590cd8cf7c4a72ce0f0c52e5e1a3e96b8308?width=288",
			uav: "UAV 22456",
			missionType: "Recon",
			flightDuration: "1h33m",
			operator: "Luke P. Bailey",
			status: "Success",
			description:
				"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
			coordinates: "-14.936, 178.9866",
			videoUrl:
				"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
			mission: "Recon",
			flightDatetime: "12/22/2024 13:33",
			operatorId: "EMP103",
			keyEvents: "N/A",
			missionDescription:
				"Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
			flightPath: [
				{
					lat: 52.229774,
					lon: 21.0123,
				},
				{
					lat: 52.23001,
					lon: 21.012274,
				},
				{
					lat: 52.230014,
					lon: 21.012315,
				},
				{
					lat: 52.229216,
					lon: 21.012063,
				},
				{
					lat: 52.229016,
					lon: 21.012134,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228829,
					lon: 21.011978,
				},
				{
					lat: 52.22861,
					lon: 21.012108,
				},
			],
			detected: detectionsData,
		},
		{
			id: "4",
			title: "Recon Patrol - 12/18/2024",
			date: "13.02.2025 06:39AM",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/e7e3ad66214149785e55acfa7a8aecd4c0f82268?width=288",
			uav: "UAV 33450",
			missionType: "Recon",
			flightDuration: "1h33m",
			operator: "Jaxon Z. Fisher",
			status: "Success",
			description:
				"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
			coordinates: "-14.936, 178.9866",
			videoUrl:
				"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
			mission: "Recon",
			flightDatetime: "12/18/2024 13:33",
			operatorId: "EMP104",
			keyEvents: "N/A",
			missionDescription:
				"Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
			flightPath: [
				{
					lat: 52.229774,
					lon: 21.0123,
				},
				{
					lat: 52.23001,
					lon: 21.012274,
				},
				{
					lat: 52.230014,
					lon: 21.012315,
				},
				{
					lat: 52.229216,
					lon: 21.012063,
				},
				{
					lat: 52.229016,
					lon: 21.012134,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228829,
					lon: 21.011978,
				},
				{
					lat: 52.22861,
					lon: 21.012108,
				},
			],
			detected: detectionsData,
		},
		{
			id: "5",
			title: "Recon Patrol - 01/18/2025",
			date: "13.02.2025 06:39AM",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/e1433ad1a1b2b1e4d7cc343c61d9b6d847aa2a77?width=288",
			uav: "UAV 33450",
			missionType: "Recon",
			flightDuration: "1h33m",
			operator: "William D. White",
			status: "Success",
			description:
				"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
			coordinates: "-14.936, 178.9866",
			videoUrl:
				"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
			mission: "Recon",
			flightDatetime: "01/18/2025 13:33",
			operatorId: "EMP105",
			keyEvents: "N/A",
			missionDescription:
				"Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
			flightPath: [
				{
					lat: 52.229774,
					lon: 21.0123,
				},
				{
					lat: 52.23001,
					lon: 21.012274,
				},
				{
					lat: 52.230014,
					lon: 21.012315,
				},
				{
					lat: 52.229216,
					lon: 21.012063,
				},
				{
					lat: 52.229016,
					lon: 21.012134,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228829,
					lon: 21.011978,
				},
				{
					lat: 52.22861,
					lon: 21.012108,
				},
			],
			detected: detectionsData,
		},
		{
			id: "6",
			title: "Recon Patrol - 02/16/2025",
			date: "13.02.2025 06:39AM",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/eb10590cd8cf7c4a72ce0f0c52e5e1a3e96b8308?width=288",
			uav: "20037 Mavic air",
			missionType: "Recon",
			flightDuration: "1h33m",
			operator: "Henry L. Scott",
			status: "Success",
			description:
				"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
			coordinates: "-14.936, 178.9866",
			videoUrl:
				"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
			mission: "Recon",
			flightDatetime: "02/16/2025 13:33",
			operatorId: "EMP106",
			keyEvents: "N/A",
			missionDescription:
				"Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
			flightPath: [
				{
					lat: 52.229774,
					lon: 21.0123,
				},
				{
					lat: 52.23001,
					lon: 21.012274,
				},
				{
					lat: 52.230014,
					lon: 21.012315,
				},
				{
					lat: 52.229216,
					lon: 21.012063,
				},
				{
					lat: 52.229016,
					lon: 21.012134,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228829,
					lon: 21.011978,
				},
				{
					lat: 52.22861,
					lon: 21.012108,
				},
			],
			detected: detectionsData,
		},
		{
			id: "7",
			title: "Recon Patrol - 02/18/2025",
			date: "13.02.2025 06:39AM",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/5a8295c6f9a5352be5b2c5500f3fe7548476c906?width=288",
			uav: "UAV 33450",
			missionType: "Recon",
			flightDuration: "1h33m",
			operator: "Charles Xavier",
			status: "Success",
			description:
				"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
			coordinates: "-14.936, 178.9866",
			videoUrl:
				"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
			mission: "Recon",
			flightDatetime: "02/18/2025 13:33",
			operatorId: "EMP101",
			keyEvents: "N/A",
			missionDescription:
				"Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
			flightPath: [
				{
					lat: 52.229774,
					lon: 21.0123,
				},
				{
					lat: 52.23001,
					lon: 21.012274,
				},
				{
					lat: 52.230014,
					lon: 21.012315,
				},
				{
					lat: 52.229216,
					lon: 21.012063,
				},
				{
					lat: 52.229016,
					lon: 21.012134,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228829,
					lon: 21.011978,
				},
				{
					lat: 52.22861,
					lon: 21.012108,
				},
			],
			detected: detectionsData,
		},
		{
			id: "8",
			title: "Recon Patrol - 02/16/2025",
			date: "13.02.2025 06:39AM",
			image:
				"https://api.builder.io/api/v1/image/assets/TEMP/eb10590cd8cf7c4a72ce0f0c52e5e1a3e96b8308?width=288",
			uav: "Drone XYZ",
			missionType: "Recon",
			flightDuration: "1h33m",
			operator: "Charles Xavier",
			status: "Success",
			description:
				"The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
			coordinates: "-14.936, 178.9866",
			videoUrl:
				"https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
			mission: "Recon",
			flightDatetime: "02/16/2025 13:33",
			operatorId: "EMP101",
			keyEvents: "N/A",
			missionDescription:
				"Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
			flightPath: [
				{
					lat: 52.229774,
					lon: 21.0123,
				},
				{
					lat: 52.23001,
					lon: 21.012274,
				},
				{
					lat: 52.230014,
					lon: 21.012315,
				},
				{
					lat: 52.229216,
					lon: 21.012063,
				},
				{
					lat: 52.229016,
					lon: 21.012134,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228984,
					lon: 21.011908,
				},
				{
					lat: 52.228829,
					lon: 21.011978,
				},
				{
					lat: 52.22861,
					lon: 21.012108,
				},
			],
			detected: detectionsData,
		},
	];

	// Initialize with all records
	React.useEffect(() => {
		setFilteredRecords(storageData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleFilterChange = (filters: FilterState) => {
		let filtered = storageData;

		if (filters.uav) {
			filtered = filtered.filter((record) =>
				record.uav.toLowerCase().includes(filters.uav.toLowerCase())
			);
		}

		if (filters.status) {
			filtered = filtered.filter((record) => record.status === filters.status);
		}

		if (filters.missionType) {
			filtered = filtered.filter(
				(record) => record.missionType === filters.missionType
			);
		}
		setFilteredRecords(filtered);
	};

	const handleRecordClick = (record: StorageData) => {
		setSelectedRecord(record);
	};

	const handleCloseDetail = () => {
		setSelectedRecord(null);
	};

	return (
		<Layout>
			<div className="w-full flex justify-center pt-15">
				<div className="w-[80%]  flex flex-col">
					{/* Header and Filter Row */}
					<div className="flex-shrink-0 px-6 mb-1">
						<div className="flex items-center gap-8">
							<SectionHeader
								title="Storage"
								showArrow={false}
								width="w-[267px]"
							/>
							<div className="w-[54px] h-10 -ml-3">
								<FilterControls
									filters={filterConfigs}
									onFilterChange={handleFilterChange}
								/>
							</div>
						</div>
					</div>

					{/* Main Content Area */}
					<div className="flex items-start gap-2 px-6 pb-6">
						{/* Storage List Container */}
						<div
							className={cn(
								"relative z-20 rounded-[0_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/50 backdrop-blur-[5px] h-[calc(100vh-320px)] pt-[16px] mt-[16px] transition-all duration-300",
								{
									"w-[60%]": selectedRecord, // Leave exactly 500px + 12px gap for detail panel
									"w-full": !selectedRecord, // Full width when no detail panel
								}
							)}
						>
							{/* Content inside container */}
							<div className="w-full h-full overflow-hidden flex px-[20px]">
								<StorageList
									records={filteredRecords}
									selectedRecord={selectedRecord}
									onRecordClick={handleRecordClick}
									isDetailView={!!selectedRecord}
								/>
							</div>
						</div>

						{/* Detail Panel */}
						{selectedRecord && (
							<div className="flex-shrink-0 ml-[12px] mt-[16px]">
								<StorageDetailPanel
									setDetectionsOpen={setDetectionsOpen}
									setFlightPathOpen={setFlightpathOpen}
									record={selectedRecord}
									onClose={handleCloseDetail}
								/>
							</div>
						)}
						{/* Detections Modal */}
						{detectionsOpen && selectedRecord ? (
							<DetectionsModal
								isOpen={detectionsOpen}
								onClose={() => setDetectionsOpen(false)}
								record={selectedRecord}
							/>
						) : null}
						{/* Flightpath Modal */}
						{flightPathOpen && selectedRecord ? (
							<FlightPathModal
								isOpen={flightPathOpen}
								onClose={() => setFlightpathOpen(false)}
								record={selectedRecord}
							/>
						) : null}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default StoragePage;
