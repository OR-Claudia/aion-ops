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
			className={`flex min-h-[40px] px-[15px] py-4 justify-between items-center rounded-[0px_6px_6px_6px] bg-[#00C6B8] box-border mr-[24px] ${width} ${className}`}
		>
			<span className="text-[#1F2630] font-ubuntu text-xl font-normal leading-normal">
				{title}
			</span>
			{showArrow && (
				<span
					className="text-[#1F2630] text-xs font-normal leading-normal cursor-pointer hover:text-[#1F2630] transition-colors duration-200"
					onClick={onClick}
				>
					→
				</span>
			)}
		</div>
	);
};

export default SectionHeader;
