import React from "react";
import { cn } from "../../lib/utils";

export interface TabItem {
	id: string;
	label: string;
	value: string;
}

interface TabsProps {
	tabs: TabItem[];
	activeTab: string;
	onTabChange: (tabId: string, value: string) => void;
	className?: string;
}

const Tabs: React.FC<TabsProps> = ({
	tabs,
	activeTab,
	onTabChange,
	className = "",
}) => {
	return (
		<div className={cn("relative", className)}>
			{/* Tab buttons container */}
			<div className="flex">
				{tabs.map((tab, index) => {
					const isActive = tab.id === activeTab;
					const isLastActive = index === tabs.length - 1 && isActive;

					return (
						<button
							key={tab.id}
							onClick={() => onTabChange(tab.id, tab.value)}
							className={cn(
								"h-[33px] w-26 px-4 font-ubuntu text-[14px] font-normal leading-normal transition-colors relative",
								{
									"bg-[#00C6B8] text-black rounded-t-[8px]": isActive,
									"bg-transparent text-white/60 hover:text-white/80": !isActive,
									"rounded-tr-[8px]": isLastActive,
								}
							)}
							style={
								isActive && index === 0
									? { borderRadius: "0 8px 0 0" }
									: isActive && index === tabs.length - 1
									? { borderRadius: "0 8px 0 0" }
									: isActive
									? { borderRadius: "0 0 0 0" }
									: {}
							}
						>
							{tab.label}
						</button>
					);
				})}
			</div>

			{/* Bottom border line */}
			<div
				className={`w-${
					tabs.length * 22
				} h-[2px] bg-[rgba(211,251,216,0.5)] -mt-[2px] relative -z-10`}
			/>
		</div>
	);
};

export default Tabs;
