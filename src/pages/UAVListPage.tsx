import React from "react";
import { Layout } from "../components/layout";
import {
	UAVCard,
	SectionHeader,
	UAVDetailPanel,
	FilterControls,
} from "../components/ui";
import type {
	FilterConfig,
	FilterState,
} from "../components/ui/FilterControls";
import { cn } from "../lib/utils";
import { useUAVStore, type UAVData } from "../stores";

const UAVListPage: React.FC = () => {
	const { filteredUAVs, selectedUAV, setSelectedUAV, filterUAVs } =
		useUAVStore();

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

	const handleFilterChange = (filters: FilterState) => {
		filterUAVs({
			brand: filters.brand,
			status: filters.status,
			missionType: filters.missionType,
		});
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
								"relative z-20 rounded-[0_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/50 backdrop-blur-[5px] h-[74vh]",

								{
									["w-[40%]"]: selectedUAV,
									["w-[80%]"]: !selectedUAV,
								}
							)}
						>
							{/* Content inside container */}
							<div
								className={cn(
									"w-full overflow-hidden items-center h-full pt-[20px] justify-center flex px-[10%]"
								)}
							>
								{/* UAV Grid */}
								<div
									className={cn(
										"flex flex-wrap  gap-x-[32px] gap-y-[12px] h-full overflow-y-auto pt-[24px] justify-start mb-[12px]"
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
