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
	const { zoomIn, zoomOut, resetView, showFlightPaths, setShowFlightPaths } =
		useMapControls();

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
						? "w-[250px] h-16"
						: "w-[250px] h-25"
					: "w-16 h-16"
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
						<div className="flex items-center justify-around w-full gap-1 flex-1">
							{/* Map Tools - inline horizontally */}
							{mapTools.map((tool, index) => (
								<div
									key={index}
									className="flex justify-center items-center cursor-pointer transition-all duration-200 hover:scale-110 w-30"
									title={tool.name}
									onClick={tool.action}
								>
									<img src={tool.icon} alt={tool.name} className="" />
								</div>
							))}

							{/* Minimize Button */}
							<div
								className="flex justify-center items-center cursor-pointer transition-all duration-200 hover:scale-110 w-30"
								onClick={() => setIsExpanded(false)}
								title="Minimize Tools"
							>
								<img src={ChevronRightIcon} alt="Minimize" />
							</div>
						</div>

						{/* Flight Paths Toggle Row - Hidden on DetectionsPage */}
						{!isDetectionsPage && (
							<div className="flex items-center justify-between w-full h-[30px] px-4 mt-2">
								<span className="text-[#E3F3F2] font-ubuntu text-sm font-se">
									Toggle flight paths
								</span>
								<div className="flex items-center">
									<div
										className={`w-[41px]  rounded-[10px] cursor-pointer transition-all duration-200 ${
											showFlightPaths
												? "h-[21px] bg-[#00C6B8]"
												: "h-[23px] border-1 border-[rgba(211,251,216,0.5)]"
										}`}
										onClick={() => setShowFlightPaths(!showFlightPaths)}
									>
										<div
											className={`w-[17px] h-[17px] bg-[#1F2630] rounded-full transition-all duration-200 mt-[2px] ${
												showFlightPaths
													? "ml-[22px]"
													: "ml-[2px] border-2 border-[#00C6B8]"
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
						<img src={ToolsIcon} alt="Tools" className="w-8 h-8" />
					</div>
				)}
			</div>
		</div>
	);
};

export default ExpandableToolsPanel;
