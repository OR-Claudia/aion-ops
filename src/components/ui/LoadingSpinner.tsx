import React from "react";

interface LoadingSpinnerProps {
	message?: string;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
	message = "Loading...", 
	size = "md",
	className = ""
}) => {
	// Size configurations
	const sizeConfig = {
		sm: {
			spinner: "w-8 h-8",
			text: "text-xs"
		},
		md: {
			spinner: "w-12 h-12", 
			text: "text-sm"
		},
		lg: {
			spinner: "w-16 h-16",
			text: "text-base"
		}
	};

	const config = sizeConfig[size];

	return (
		<div className={`flex flex-col items-center justify-center py-12 ${className}`}>
			<div className="relative">
				<div className={`${config.spinner} border-4 border-[#00C6B8]/20 rounded-full`}></div>
				<div className={`absolute top-0 left-0 ${config.spinner} border-4 border-transparent border-t-[#00C6B8] rounded-full animate-spin`}></div>
			</div>
			{message && (
				<div className={`mt-4 text-[#E3F3F2] font-ubuntu ${config.text} opacity-80`}>
					{message}
				</div>
			)}
		</div>
	);
};

export default LoadingSpinner;
