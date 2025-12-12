import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { allDetectionItems } from "./DetectionData";
import type { DetectionData } from "./DetectionData";

interface DetectionContextType {
	allDetections: DetectionData[];
	filteredDetections: DetectionData[];
	selectedDetection: DetectionData | null;
	isModalOpen: boolean;
	setFilteredDetections: (detections: DetectionData[]) => void;
	setSelectedDetection: (detection: DetectionData | null) => void;
	setIsModalOpen: (isOpen: boolean) => void;
	selectDetection: (detection: DetectionData) => void;
	clearSelection: () => void;
}

const DetectionContext = createContext<DetectionContextType | undefined>(
	undefined
);

interface DetectionProviderProps {
	children: ReactNode;
}

export const DetectionProvider: React.FC<DetectionProviderProps> = ({
	children,
}) => {
	const [filteredDetections, setFilteredDetections] =
		useState<DetectionData[]>(allDetectionItems);
	const [selectedDetection, setSelectedDetection] =
		useState<DetectionData | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const selectDetection = (detection: DetectionData) => {
		// console.log("selecting detection", detection);
		setSelectedDetection(detection);
		setIsModalOpen(true);
	};

	const clearSelection = () => {
		setSelectedDetection(null);
		setIsModalOpen(false);
	};

	const value: DetectionContextType = {
		allDetections: allDetectionItems,
		filteredDetections,
		selectedDetection,
		isModalOpen,
		setFilteredDetections,
		setSelectedDetection,
		setIsModalOpen,
		selectDetection,
		clearSelection,
	};

	return (
		<DetectionContext.Provider value={value}>
			{children}
		</DetectionContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDetectionContext = (): DetectionContextType => {
	const context = useContext(DetectionContext);
	if (context === undefined) {
		throw new Error(
			"useDetectionContext must be used within a DetectionProvider"
		);
	}

	return context;
};
