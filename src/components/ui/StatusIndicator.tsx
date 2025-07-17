import React, { useState } from "react";

interface StatusIndicatorProps {
  type: "online" | "warning" | "offline";
  size?: "small" | "large";
  icon: string;
  position: { top: number; left: number };
  children?: React.ReactNode;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  type,
  size = "small",
  icon,
  position,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(size === "large");

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`status-indicator ${type} ${isExpanded ? "large" : "small"} ${isExpanded ? "expanded" : ""}`}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onClick={handleClick}
    >
      {isExpanded ? (
        <>
          <span className={`icon-${icon}`}>{icon}</span>
          <span className="icon-battery-full">battery-full</span>
          {children}
        </>
      ) : (
        <span className={`icon-${icon}`}>{icon}</span>
      )}
    </div>
  );
};

export default StatusIndicator;
