import React from "react";
import { Layout } from "../components/layout";
import {
	SectionHeader,
	FilterControls,
	StorageList,
	StorageDetailPanel,
} from "../components/ui";
import type {
	FilterConfig,
	FilterState,
} from "../components/ui/FilterControls";
import { cn } from "../lib/utils";
import { useStorageStore } from "../stores";

const StoragePage: React.FC = () => {
	const {
		filteredRecords,
		selectedRecord,
		setSelectedRecord,
		filterRecords,
	} = useStorageStore();

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

	const handleFilterChange = (filters: FilterState) => {
		filterRecords({
			uav: filters.uav,
			status: filters.status,
			missionType: filters.missionType,
		});
	};

	const handleRecordClick = (record: any) => {
		setSelectedRecord(record);
	};

	const handleCloseDetail = () => {
		setSelectedRecord(null);
	};

	return (
		<Layout>
			<div className="w-full flex justify-center pt-[64px]">
				<div className="w-[75%] max-w-[1400px] flex flex-col">
					{/* Header and Filter Row */}
					<div className="flex-shrink-0 px-6 mb-4">
						<div className="flex items-center gap-8">
							<SectionHeader
								title="Storage"
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
					<div className="flex items-start gap-2 px-6 pb-6">
						{/* Storage List Container */}
						<div
							className={cn(
								"relative z-20 rounded-[0_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/50 backdrop-blur-[5px] h-[calc(100vh-300px)] pt-[16px] mt-[16px] transition-all duration-300",
								{
									"w-[calc(100%-512px)]": selectedRecord, // Leave exactly 500px + 12px gap for detail panel
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
									record={selectedRecord}
									onClose={handleCloseDetail}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default StoragePage;
