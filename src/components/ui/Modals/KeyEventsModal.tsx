import React, { useState, useEffect } from "react";
import type { ModalProps } from "./Modal";
import Modal from "./Modal";
import Button from "../Button";

type KeyEventsModalProps = Omit<ModalProps, "children">;

const keyEventsDEMO = [
	{
		timestamp: "T+60s",
		event:
			"First vehicle-civilian collision event suggesting civilian population accessing or departing transport in operational area",
	},
	{
		timestamp: "T+90-94s",
		event:
			"Initial armed soldier contact sequence with sustained weapon detection over 5-second period indicating static positioning or deliberate weapon display",
	},
	{
		timestamp: "T+140s",
		event:
			"Isolated armed soldier detection indicating possible sentry or patrol element separate from initial contact group",
	},
	{
		timestamp: "T+149-164s",
		event:
			"Multiple vehicle-civilian collision events with concurrent vehicle-soldier collision at T+155s indicating mixed military-civilian transport operations or checkpoint activity",
	},
	{
		timestamp: "T+283-298s",
		event:
			"Critical escalation with simultaneous armed civilian and soldier detections showing high interaction density, suggesting coordinated mixed-force positioning",
	},
	{
		timestamp: "T+313-315s",
		event:
			"Sustained armed civilian presence without military correlation indicating possible irregular force independent positioning",
	},
	{
		timestamp: "T+355-376s",
		event:
			"Extended armed civilian activity transitioning to mixed military-civilian armed presence indicating organized joint operations or territorial control scenarios",
	},
	{
		timestamp: "T+380-388s",
		event:
			"Final sequence showing continued mixed armed presence with vehicle-civilian collision suggesting ongoing population movement under armed oversight",
	},
];

const KeyEventsModal: React.FC<KeyEventsModalProps> = ({
	isOpen,
	onClose,
	title = "Key Events",
}) => {
	const initialEvents = keyEventsDEMO.slice(0, 5);
	const delayedEvents = keyEventsDEMO.slice(5);

	// State for currently visible events and newly added ones
	const [visibleEvents, setVisibleEvents] = useState(initialEvents);
	const [newlyAddedEvents, setNewlyAddedEvents] = useState<Set<number>>(
		new Set()
	);
	const [isDetecting, setIsDetecting] = useState(true);

	// Progressive loading effect
	useEffect(() => {
		if (!isOpen) {
			// Reset when modal closes
			setVisibleEvents(initialEvents);
			setNewlyAddedEvents(new Set());
			setIsDetecting(true);
			return;
		}

		// Start detecting simulation after modal opens
		setIsDetecting(true);

		// Add delayed events one by one
		const timeouts: NodeJS.Timeout[] = [];

		delayedEvents.forEach((event, index) => {
			const delay = (index + 1) * 3000; // 3 seconds between each addition

			const timeout = setTimeout(() => {
				setVisibleEvents((prev) => {
					const newEvents = [...prev, event];
					return newEvents;
				});

				// Mark as newly added for highlight effect
				const eventIndex = initialEvents.length + index;
				setNewlyAddedEvents((prev) => new Set([...prev, eventIndex]));

				// Remove highlight after 2 seconds
				setTimeout(() => {
					setNewlyAddedEvents((prev) => {
						const newSet = new Set(prev);
						newSet.delete(eventIndex);
						return newSet;
					});
				}, 2000);

				// Stop detecting animation when all events are added
				if (index === delayedEvents.length - 1) {
					setTimeout(() => setIsDetecting(false), 3000);
				}
			}, delay);

			timeouts.push(timeout);
		});

		// Cleanup timeouts on unmount or modal close
		return () => {
			timeouts.forEach((timeout) => clearTimeout(timeout));
		};
	}, [isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={title}>
			<div className="space-y-2">
				{/* Detection status indicator */}
				{isDetecting && (
					<div className="flex items-center gap-2 mb-4 p-2 bg-[#1a2f1a] rounded-lg border border-[#00C6B8]">
						<div className="w-2 h-2 bg-[#00C6B8] rounded-full animate-pulse"></div>
						<span className="text-[#00C6B8] text-sm font-medium">
							Detection in progress...
						</span>
					</div>
				)}

				{/* Events list */}
				{visibleEvents.map((event, index) => {
					const isNewlyAdded = newlyAddedEvents.has(index);
					return (
						<div
							key={`${event.timestamp}-${index}`}
							className={`bg-[#242B2C] flex rounded-[0px_10px_10px_10px] mb-2 px-2 py-2 transition-all duration-500 ${
								isNewlyAdded
									? "border-2 border-[#00C6B8] shadow-lg shadow-[#00C6B8]/20 animate-pulse"
									: "border border-transparent"
							}`}
						>
							<div className="font-semibold min-w-[100px] text-[#E3F3F2]">
								{event.timestamp}
							</div>
							<div className="font-light text-sm text-[#E3F3F2] leading-relaxed">
								{event.event}
							</div>
							{isNewlyAdded && (
								<div className="ml-2 px-2 py-1 bg-[#00C6B8] text-black text-xs rounded font-bold">
									NEW
								</div>
							)}
						</div>
					);
				})}

				{/* Loading indicator for next event */}
				{isDetecting && visibleEvents.length < keyEventsDEMO.length && (
					<div className="bg-[#1a1a1a] border border-dashed border-[#555] rounded-[0px_10px_10px_10px] px-2 py-2 opacity-50">
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 border-2 border-[#00C6B8] border-t-transparent rounded-full animate-spin"></div>
							<span className="text-[#888] text-sm">
								Analyzing detection patterns...
							</span>
						</div>
					</div>
				)}
			</div>

			<Button variant="secondary" onClick={onClose} className="mt-4">
				OK
			</Button>
		</Modal>
	);
};

export default KeyEventsModal;
