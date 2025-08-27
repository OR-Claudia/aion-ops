import React from "react";
import Modal from "./Modal";

interface AnalysisModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose }) => {
	const systemStatus =
		"Battery at 73% with 1.8 hours remaining flight time. WiFi connectivity excellent at -42 dBm, maintaining secure data link with zero interruptions. All critical systems operating within normal parameters.";
	const missionProgress =
		"Currently 68% complete on designated 12km² patrol route covering agricultural and woodland terrain. Navigation waypoints hit on schedule at 150m altitude. Weather conditions optimal with clear visibility extending 8+ kilometers.";
	const operationalSummary =
		"Area assessment proceeding as planned with no significant anomalies detected. Reconnaissance data collection on target, with 847 MB transmitted successfully. Rural activity patterns consistent with intelligence briefings. Mission continuing toward scheduled completion with all safety protocols active.";

	return (
		<Modal
			maxHeight={"740px"}
			title={`Analysis Result`}
			isOpen={isOpen}
			onClose={onClose}
			width={"540px"}
			className="!z-60"
		>
			<div className="mb-4">
				<div className="text-lg font-bold text-[#D3FBD8]">System Status:</div>
				<div>{systemStatus}</div>
			</div>
			<div className="mb-4">
				<div className="text-lg font-bold text-[#D3FBD8]">
					Mission Progress:
				</div>
				<div>{missionProgress}</div>
			</div>
			<div className="mb-4">
				<div className="text-lg font-bold text-[#D3FBD8]">
					Operational Summary:
				</div>
				<div>{operationalSummary}</div>
			</div>
		</Modal>
	);
};

export default AnalysisModal;
