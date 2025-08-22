import React from "react";
import { cn } from "../../lib/utils";

interface TagProps {
	text: string;
	classname?: string;
	variant?: "primary" | "secondary";
}

const Tag: React.FC<TagProps> = ({
	text,
	classname = "",
	variant = "primary",
}) => {
	const variantClasses = {
		primary: "bg-[#00C6B8] text-black font-medium",
		secondary: "bg-gray-200 text-gray-800",
	};

	return (
		<div
			className={cn(
				"text-sm rounded px-3 py-1 max-w-fit",
				variantClasses[variant],
				classname
			)}
		>
			{text}
		</div>
	);
};

export default Tag;
