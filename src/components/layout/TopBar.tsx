import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BarsIcon from "../../assets/bars.svg";
import ChevronLeftIcon from "../../assets/chevron-left-icon.svg";
import DefaultUserIcon from "../../assets/default-user.svg";

const TopBar: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const navigationItems = [
		{ name: "Dashboard", path: "/" },
		{ name: "Detections", path: "/detections" },
		{ name: "Active UAVs", path: "/uavs" },
		{ name: "Storage", path: "/storage" },
	];

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleNavigation = (path: string) => {
		navigate(path);
		setIsMenuOpen(false);
	};

	return (
		<div className="relative top-[47px] w-[80%] h-16 z-60 mx-auto">
			<div className="w-full h-full rounded-[10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/70 backdrop-blur-[2px] flex items-center justify-between px-[21px] py-[8px] box-border">
				{/* Left section: Hamburger Menu and Navigation */}
				<div className="flex items-center flex-1">
					{/* Hamburger Menu */}
					<div className="flex items-center">
						<img
							src={isMenuOpen ? ChevronLeftIcon : BarsIcon}
							alt={isMenuOpen ? "Close menu" : "Open menu"}
							className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform duration-200"
							onClick={handleMenuToggle}
						/>
					</div>

					{/* Navigation Menu - appears after hamburger */}
					<div
						className={`flex items-center justify-around flex-1 mx-8 transition-all duration-300 overflow-hidden ${
							isMenuOpen ? "max-w-full opacity-100" : "max-w-0 opacity-0"
						}`}
					>
						{navigationItems.map((item, index) => (
							<div
								key={index}
								onClick={() => handleNavigation(item.path)}
								className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[rgba(0,198,184,0.1)] rounded-md ${
									location.pathname === item.path
										? "bg-[rgba(0,198,184,0.2)] rounded-[5px] px-[6px]"
										: ""
								}`}
							>
								<span className="text-[#00C6B8] font-ubuntu text-base font-medium">
									{item.name}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Right section: User Details - always on the right */}
				<div className="flex items-center gap-[18px]">
					<div className="text-right">
						<div className="text-[#E3F3F2] font-ubuntu text-sm font-medium leading-normal mb-1">
							Mark Schmidt
						</div>
						<div className="text-[#E3F3F2] font-ubuntu text-[10px] font-light leading-normal">
							Level III Clearance
						</div>
					</div>
					<img src={DefaultUserIcon} alt="User" className="w-[37px] h-[37px]" />
				</div>
			</div>
		</div>
	);
};

export default TopBar;
