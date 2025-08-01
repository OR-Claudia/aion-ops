import React from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant = "primary" | "secondary" | "danger" | "underline";

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
					"bg-[#00C6B8] hover:bg-[#00E6D8] text-[#1F2630] border-none",
					{ ["text-gray-500"]: disabled }
				);
			case "secondary":
				return cn(
					"border border-[#00C6B8] bg-[#1F2630] hover:bg-[#00C6B8]/10 text-[#E3F3F2]",
					{ ["text-gray-500"]: disabled }
				);
			case "danger":
				return cn(
					"border-[1.5px] border-[#C10000] bg-[#1F2630] hover:bg-[#C10000]/10 text-[#E3F3F2]",
					{ ["text-gray-500"]: disabled }
				);
			case "underline":
				return cn(
					" text-[#00C6B8] border-none bg-transparent font-ubuntu text-[14px] underline hover:text-[#00D6C8] transition-colors",
					{ ["text-gray-500"]: disabled }
				);
			default:
				return "";
		}
	};

	const baseClasses =
		"flex h-[34px] px-[1rem] mr-[8px] justify-center items-center gap-2.5 rounded-[12px] transition-colors";
	const variantClasses = getVariantClasses();
	const widthClass = width ? width : "";

	return (
		<button
			onClick={onClick}
			className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`}
			disabled={disabled}
		>
			<div className="font-ubuntu text-base font-bold flex items-center gap-[6px]">
				{children}
			</div>
		</button>
	);
};

export default Button;
