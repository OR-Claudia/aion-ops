import React from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "danger"
	| "underline"
	| "video";

interface ButtonProps {
	variant: ButtonVariant;
	onClick: () => void;
	children: React.ReactNode;
	disabled?: boolean;
	className?: string;
	width?: string;
}

const Button: React.FC<ButtonProps> = ({
	variant,
	onClick,
	children,
	className = "",
	disabled,
	width,
}) => {
	const getVariantClasses = () => {
		switch (variant) {
			case "primary":
				return cn(
					"bg-[#00C6B8] px-4 hover:bg-[#00E6D8] text-[#1F2630] border-none",
					{ ["text-gray-500"]: disabled }
				);
			case "secondary":
				return cn(
					"border px-4 border-[#00C6B8] bg-[#1F2630] hover:bg-[#00C6B8]/10 text-[#E3F3F2]",
					{ ["text-gray-500"]: disabled }
				);
			case "danger":
				return cn(
					"border-2 px-4 border-[#C10000] bg-[#1F2630] hover:bg-[#C10000]/10 text-[#E3F3F2]",
					{ ["text-gray-500"]: disabled }
				);
			case "underline":
				return cn(
					"text-[#00C6B8] px-1 !h-5 border-none bg-transparent font-ubuntu text-[14px] underline hover:text-[#00D6C8] transition-colors",
					{ ["text-gray-500"]: disabled }
				);
			case "video":
				return cn("px-1 !h-5 border-none bg-transparent ");
			default:
				return "";
		}
	};

	const baseClasses =
		"flex h-9 mr-1 justify-center items-center rounded-[12px] transition-colors";
	const variantClasses = getVariantClasses();
	const widthClass = width ? width : "";

	return (
		<button
			onClick={onClick}
			className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`}
			disabled={disabled}
		>
			<div className="font-ubuntu text-base whitespace-nowrap flex items-center">
				{children}
			</div>
		</button>
	);
};

export default Button;
