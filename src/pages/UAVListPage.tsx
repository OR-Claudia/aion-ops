import React, { useState, useMemo } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getUAVList } from "../api/uav";

const UAVListPage: React.FC = () => {
	const [selectedUAV, setSelectedUAV] = useState<UAVData | null>(null);
	const [filters, setFilters] = useState<FilterState>({});

	// Filter configurations for the UAV list (tak jak poprzednio)
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

	// Pobierz dane UAV z mockowanego API (useQuery)
	const { data, isLoading, isError } = useQuery<UAVData[]>({
		queryKey: ["uavList"],
		queryFn: getUAVList,
	});

	// Filtrowanie po stronie clienta na podstawie fetchowanych danych
	const filteredUAVs = useMemo(() => {
		if (!data) return [];
		let result = data;

		if (filters.brand) {
			result = result.filter((uav) =>
				uav.name.toLowerCase().includes(filters.brand.toLowerCase())
			);
		}
		if (filters.status) {
			result = result.filter((uav) => uav.status === filters.status);
		}
		if (filters.missionType) {
			result = result.filter((uav) => uav.type === filters.missionType);
		}
		return result;
	}, [data, filters]);

	const handleFilterChange = (newFilters: FilterState) => {
		setFilters(newFilters);
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
						className={cn("mb-4 z-30", {
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
					<div className="flex justify-center items-start gap-2">
						{/* UAV List Container */}
						<div
							className={cn(
								"relative z-20 rounded-[0_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/50 backdrop-blur-[5px] h-[69dvh]",
								{
									["w-[40%]"]: selectedUAV,
									["w-[90%]"]: !selectedUAV,
								}
							)}
						>
							{/* Content inside container */}
							<div
								className={cn(
									"overflow-hidden items-center h-full max-h-[68dvh] pt-3 justify-center flex"
								)}
							>
								{/* UAV Grid */}
								<div
									className={cn(
										"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-y-6 sm:gap-x-5 gap-y-3 h-full items-start overflow-y-auto overflow-x-hidden pt-5 px-6 justify-center",
										selectedUAV ? "lg:!grid-cols-2 !grid-cols-1" : ""
									)}
								>
									{isLoading && (
										<div className="text-white">Loading UAVs...</div>
									)}
									{isError && (
										<div className="text-red-500">Failed to load UAVs.</div>
									)}
									{!isLoading &&
										!isError &&
										filteredUAVs.map((uav) => (
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
