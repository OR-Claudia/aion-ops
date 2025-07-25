import React, { useState } from "react";
import FilterIcon from "../../assets/filter-icon.svg";
import ChevronDownIcon from "../../assets/chevron-down-light.svg";

export interface FilterConfig {
	key: string;
	label: string;
	options: string[];
}

interface FilterControlsProps {
	filters: FilterConfig[];
	onFilterChange?: (filters: Record<string, string>) => void;
}

export interface FilterState {
	[key: string]: string;
}

const FilterControls: React.FC<FilterControlsProps> = ({
	filters: filterConfigs,
	onFilterChange,
}) => {
	const [filters, setFilters] = useState<FilterState>(() => {
		const initialState: FilterState = {};
		filterConfigs.forEach((config) => {
			initialState[config.key] = "";
		});
		return initialState;
	});

	const [filtersActive, setFiltersActive] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

	const handleFilterUpdate = (key: string, value: string) => {
		const newFilters = { ...filters, [key]: value };
		setFilters(newFilters);
		onFilterChange?.(newFilters);
		setActiveDropdown(null); // Close dropdown after selection
	};

	const toggleFilters = () => {
		setFiltersActive(!filtersActive);
		setActiveDropdown(null); // Close any open dropdown
		if (filtersActive) {
			// Clear all filters when disabling
			const clearedFilters: FilterState = {};
			filterConfigs.forEach((config) => {
				clearedFilters[config.key] = "";
			});
			setFilters(clearedFilters);
			onFilterChange?.(clearedFilters);
		}
	};

	const toggleDropdown = (dropdownName: string) => {
		setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
	};

	return (
		<div className="inline-flex items-center gap-[12px]">
			{/* Filter toggle button */}
			<button
				onClick={toggleFilters}
				className="flex w-[54px] min-h-[40px] h-[40px] p-2 justify-center items-center rounded-[6px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/70 backdrop-blur-[2px] relative cursor-pointer hover:bg-black/80 transition-all duration-200"
			>
				<img src={FilterIcon} alt="Filter" className="w-5 h-5" />
				{filtersActive && (
					<span className="absolute text-app-accent text-lg rotate-45 translate-x-1">
						/
					</span>
				)}
			</button>

			{/* Filter dropdowns - only show when filters are active */}
			{filtersActive && (
				<div className="flex gap-[12px] transition-allduration-300">
					{filterConfigs.map((config) => (
						<div key={config.key} className="relative">
							<div
								className="flex w-[157px] min-h-[40px] h-[40px] p-[6px] justify-between items-center rounded-[6px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/70 backdrop-blur-[2px] cursor-pointer hover:bg-black/80 transition-all duration-200"
								onClick={() => toggleDropdown(config.key)}
							>
								<span className="text-app-text/70 font-ubuntu text-sm font-light">
									{filters[config.key] || config.label}
								</span>
								<img src={ChevronDownIcon} alt="Dropdown" className="w-4 h-4" />
							</div>
							{activeDropdown === config.key && (
								<div className="absolute top-[42px] left-0 w-[157px] max-h-[200px] overflow-y-auto rounded-[6px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-[#1a1a1a] z-50">
									{/* All option for resetting individual filter */}
									<div
										className="px-[6px] py-4 text-app-text/70 font-ubuntu text-sm font-light cursor-pointer hover:bg-app-primary/20 transition-all duration-200 border-b border-app-text/20"
										onClick={() => handleFilterUpdate(config.key, "")}
									>
										<em>All</em>
									</div>
									{config.options.map((option, index) => (
										<div
											key={index}
											className="px-[6px] py-4 text-app-text/70 font-ubuntu text-sm font-light cursor-pointer hover:bg-app-primary/20 transition-all duration-200"
											onClick={() => handleFilterUpdate(config.key, option)}
										>
											{option}
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FilterControls;
