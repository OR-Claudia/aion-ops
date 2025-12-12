import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import LoadingSpinner from "../LoadingSpinner";

interface AnalysisModalProps {
	isOpen: boolean;
	systemStatus: string;
	missionProgress: string;
	operationalSummary: string;
	onClose: () => void;
}

interface StreamingText {
	title: string;
	fullText: string;
	displayedText: string;
	isComplete: boolean;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({
	isOpen,
	onClose,
	systemStatus,
	missionProgress,
	operationalSummary,
}) => {
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const [currentSection, setCurrentSection] = useState(0);
	const [sections, setSections] = useState<StreamingText[]>([
		{
			title: "System Status:",
			fullText: systemStatus ?? "",
			displayedText: "",
			isComplete: false,
		},
		{
			title: "Mission Progress:",
			fullText: missionProgress ?? "",
			displayedText: "",
			isComplete: false,
		},
		{
			title: "Operational Summary:",
			fullText: operationalSummary ?? "",
			displayedText: "",
			isComplete: false,
		},
	]);

	// Reset state when modal opens or when incoming texts change
	useEffect(() => {
		if (isOpen) {
			setIsInitialLoading(true);
			setCurrentSection(0);
			setSections([
				{
					title: "System Status:",
					fullText: systemStatus ?? "",
					displayedText: "",
					isComplete: false,
				},
				{
					title: "Mission Progress:",
					fullText: missionProgress ?? "",
					displayedText: "",
					isComplete: false,
				},
				{
					title: "Operational Summary:",
					fullText: operationalSummary ?? "",
					displayedText: "",
					isComplete: false,
				},
			]);

			// Initial loading delay (AI processing simulation)
			const initialTimer = setTimeout(() => {
				setIsInitialLoading(false);
			}, 2500);

			return () => clearTimeout(initialTimer);
		}
	}, [isOpen, systemStatus, missionProgress, operationalSummary]);

	// Streaming text effect
	useEffect(() => {
		if (!isInitialLoading && currentSection < sections.length) {
			const section = sections[currentSection];

			if (
				!section.isComplete &&
				section.displayedText.length < section.fullText.length
			) {
				const streamTimer = setTimeout(() => {
					const nextCharIndex = section.displayedText.length;
					const nextChar = section.fullText[nextCharIndex];

					setSections((prev) =>
						prev.map((s, index) =>
							index === currentSection
								? { ...s, displayedText: s.displayedText + nextChar }
								: s
						)
					);
				}, 10); // 30-70ms per character for smooth streaming

				return () => clearTimeout(streamTimer);
			} else if (
				!section.isComplete &&
				section.displayedText.length === section.fullText.length
			) {
				// Section complete
				setSections((prev) =>
					prev.map((s, index) =>
						index === currentSection ? { ...s, isComplete: true } : s
					)
				);

				// Move to next section after a brief pause
				setTimeout(() => {
					setCurrentSection((prev) => prev + 1);
				}, 500);
			}
		}
	}, [isInitialLoading, currentSection, sections]);

	// Typing cursor component
	const TypingCursor = () => (
		<span className="inline-block w-2 h-5 bg-[#00C6B8] ml-1 animate-pulse"></span>
	);

	return (
		<Modal
			maxHeight={"850px"}
			title={`AI Analysis Result`}
			isOpen={isOpen}
			onClose={onClose}
			width={"630px"}
			className="!z-60"
		>
			{isInitialLoading ? (
				<LoadingSpinner message="Generating AI Analysis..." />
			) : (
				<div className="space-y-6">
					{sections.map((section, index) => (
						<div key={index} className="mb-4">
							{index <= currentSection && (
								<>
									<div className="text-lg font-bold text-[#D3FBD8] mb-2">
										{section.title}
									</div>
									<div className="text-[#E3F3F2] leading-relaxed">
										{section.displayedText}
										{index === currentSection && !section.isComplete && (
											<TypingCursor />
										)}
									</div>
								</>
							)}
						</div>
					))}

					{/* Show completion indicator when all sections are done */}
					{currentSection >= sections.length && (
						<div className="pt-4 border-t border-[#00C6B8]/20">
							<div className="flex items-center text-[#00C6B8] text-sm">
								<div className="w-2 h-2 bg-[#00C6B8] rounded-full mr-2"></div>
								Analysis Complete
							</div>
						</div>
					)}
				</div>
			)}
		</Modal>
	);
};

export default AnalysisModal;
