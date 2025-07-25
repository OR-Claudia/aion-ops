import React from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
  variant: ButtonVariant;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  children,
  className = "",
  width,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#00C6B8] hover:bg-[#00E6D8] text-[#1F2630]";
      case "secondary":
        return "border border-[#00C6B8] bg-[#1F2630] hover:bg-[#00C6B8]/10 text-[#E3F3F2]";
      case "danger":
        return "border-[1.5px] border-[#C10000] bg-[#1F2630] hover:bg-[#C10000]/10 text-[#E3F3F2]";
      default:
        return "";
    }
  };

  const baseClasses =
    "flex h-[34px] px-[1rem] mr-[8px] justify-center items-center gap-2.5 rounded-[11px] transition-colors";
  const variantClasses = getVariantClasses();
  const widthClass = width ? width : "";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`}
    >
      <span className="font-ubuntu text-base font-bold">{children}</span>
    </button>
  );
};

export default Button;
