import React from "react";
import { cn } from "../../../lib/utils";

interface VideoProgressBarProps {
	played: number;
	onSeek: (played: number) => void;
	className?: string;
}

const VideoProgressBar: React.FC<VideoProgressBarProps> = ({
	played,
	onSeek,
	className,
}) => {
	const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const width = rect.width;
		const seekValue = x / width;
		onSeek(seekValue);
	};

	return (
		<div
			className={cn(
				"w-full h-1 bg-gray-200 rounded-full cursor-pointer",
				className
			)}
			onClick={handleSeek}
		>
			<div
				className="h-1 bg-blue-500 rounded-full"
				style={{ width: `${played * 100}%` }}
			/>
		</div>
	);
};

export default VideoProgressBar;
