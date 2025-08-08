import React from "react";

interface SectionHeaderProps {
	title: string;
	showArrow?: boolean;
	width?: string;
	className?: string;
	onClick?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
	title,
	showArrow = true,
	width = "w-[326px]",
	className = "",
	onClick,
}) => {
	return (
		<div
			className={`flex h-10 px-5 justify-between items-center rounded-[0px_6px_6px_6px] bg-[#00C6B8] box-border ${width} ${className}`}
		>
			<span className="text-[#1F2630] font-ubuntu text-xl font-normal leading-normal">
				{title}
			</span>
			{showArrow && (
				<span
					className="text-[#1F2630] text-xl font-normal leading-normal cursor-pointer hover:text-[#1F2630] transition-colors duration-200"
					onClick={onClick}
				>
					&#x2192; {/* Right arrow icon */}
				</span>
			)}
		</div>
	);
};

export default SectionHeader;
