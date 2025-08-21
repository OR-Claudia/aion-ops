import React from "react";
import Modal from "./Modal";
import type { StorageData } from "../StorageItem";

interface FlightPathModalProps {
	isOpen: boolean;
	onClose: () => void;
	record: StorageData;
}

const FlightPathModal: React.FC<FlightPathModalProps> = ({
	isOpen,
	onClose,
	record,
}) => {
	const numberOfDetections = record.detected?.detections?.length;

	return (
		<Modal
			maxHeight={"700px"}
			title={"Flight path"}
			isOpen={isOpen}
			onClose={onClose}
			// width={"640px"}
		>
			<div className="max-h-[550px] overflow-y-auto py-3 mb-3"></div>
			<div className="flex place-content-between mt-5">
				<span className="text-xl font-bold">{`Current detections:`}</span>
				<span className="text-2xl font-normal">{numberOfDetections}</span>
			</div>
		</Modal>
	);
};

export default FlightPathModal;
