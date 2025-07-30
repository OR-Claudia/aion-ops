import React from "react";

interface StatusBarProps {
	percentage: number;
	color: string;
	width?: number;
	height?: number;
}

const StatusBar: React.FC<StatusBarProps> = ({
	percentage,
	color,
	width = 77,
	height = 15,
}) => {
	const fillWidth = Math.max(0, Math.min(100, percentage));
	const actualFillWidth = (fillWidth / 100) * (width - 4); // Account for border

	return (
		<div
			className="relative border border-[#E3F3F2] bg-transparent"
			style={{
				width: `${width}px`,
				height: `${height}px`,
				borderRadius: "22px",
			}}
		>
			<div
				className="absolute top-[2px] left-[2px] rounded-[22px]"
				style={{
					width: `${actualFillWidth}px`,
					height: `${height - 5}px`,
					backgroundColor: color,
				}}
			/>
		</div>
	);
};

export default StatusBar;
