import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ZoomInIcon from "../../assets/zoom-in.svg";
import ZoomOutIcon from "../../assets/zoom-out.svg";
import ResetIcon from "../../assets/reset-icon.svg";
import ChevronRightIcon from "../../assets/chevron-right-icon.svg";
import ToolsIcon from "../../assets/tools-icon.svg";
import { useMapControls } from "../layout/MapContext";

const ExpandableToolsPanel: React.FC = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const location = useLocation();
	const isDetectionsPage = location.pathname === "/detections";
	const { zoomIn, zoomOut, resetView, showFlightPaths, setShowFlightPaths } = useMapControls();

	const mapTools = [
		{ icon: ZoomInIcon, name: "Zoom In", action: zoomIn },
		{ icon: ZoomOutIcon, name: "Zoom Out", action: zoomOut },
		{ icon: ResetIcon, name: "Reset View", action: resetView },
	];

	return (
		<div
			className={`transition-all duration-300 ${
				isExpanded
					? isDetectionsPage
						? "w-[250px] min-h-[56px]"
						: "w-[250px] h-[90px]"
					: "w-[56px] h-[56px]"
			}`}
		>
			{/* Content */}
			<div className="relative w-full h-full z-10 p-3 box-border">
				{isExpanded ? (
					<div
						className={`flex flex-col w-full h-full ${
							isDetectionsPage ? "justify-center items-center" : ""
						}`}
					>
						{/* Controls Row */}
						<div className="flex items-center justify-around w-full flex-1">
							{/* Map Tools - inline horizontally */}
							{mapTools.map((tool, index) => (
								<div
									key={index}
									className="flex justify-center items-center w-[60px] h-[60px] cursor-pointer transition-all duration-200 hover:scale-110"
									title={tool.name}
									onClick={tool.action}
								>
									<img src={tool.icon} alt={tool.name} className="w-6 h-6" />
								</div>
							))}

							{/* Minimize Button */}
							<div
								className="flex justify-center items-center w-8 h-8 cursor-pointer transition-all duration-200 hover:scale-110"
								onClick={() => setIsExpanded(false)}
								title="Minimize Tools"
							>
								<img
									src={ChevronRightIcon}
									alt="Minimize"
									className="w-4 h-4"
								/>
							</div>
						</div>

						{/* Flight Paths Toggle Row - Hidden on DetectionsPage */}
						{!isDetectionsPage && (
							<div className="flex items-center justify-between w-full h-8 px-[16px] mb-[6px]">
								<span className="text-[#E3F3F2] font-ubuntu text-sm font-medium">
									Toggle flight paths
								</span>
								<div className="flex items-center">
									<div
										className={`w-[41px] h-[21px] rounded-[10px] cursor-pointer transition-all duration-200 ${
											showFlightPaths ? "bg-[#00C6B8]" : "bg-gray-600"
										}`}
										onClick={() => setShowFlightPaths(!showFlightPaths)}
									>
										<div
											className={`w-[17px] h-[17px] bg-[#1F2630] rounded-full transition-all duration-200 mt-[2px] ${
												showFlightPaths ? "ml-[22px]" : "ml-[2px]"
											}`}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				) : (
					<div
						className="flex justify-center items-center w-full h-full cursor-pointer"
						onClick={() => setIsExpanded(true)}
						title="Expand Tools"
					>
						<img src={ToolsIcon} alt="Tools" className="w-6 h-6" />
					</div>
				)}
			</div>
		</div>
	);
};

export default ExpandableToolsPanel;
