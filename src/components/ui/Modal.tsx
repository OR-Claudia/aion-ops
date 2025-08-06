import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import timesIcon from "../../assets/times.svg";
import windowMinimizeIcon from "../../assets/window-minimize.svg";

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	subtitle?: string;
	children: ReactNode;
	width?: string;
	minHeight?: string;
	isDraggable?: boolean;
	className?: string;
	headerContent?: ReactNode;
	showCloseButton?: boolean;
	minimizable?: boolean;
	onMinimize?: () => void;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	subtitle,
	children,
	width = "auto",
	minimizable = false,
	onMinimize,
	minHeight = "auto",
	isDraggable = true,
	className = "",
	headerContent,
	showCloseButton = true,
}) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const modalRef = useRef<HTMLDivElement>(null);

	// Center the modal when it first opens
	useEffect(() => {
		if (isOpen && modalRef.current) {
			const modal = modalRef.current;
			const rect = modal.getBoundingClientRect();
			setPosition({
				x: window.innerWidth / 2 - rect.width / 2,
				y: window.innerHeight / 2 - rect.height / 2,
			});
		}
	}, [isOpen]);

	// Handle dragging logic (only if draggable)
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!isDraggable) return;

		e.preventDefault();
		setIsDragging(true);
		setDragStart({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isDragging || !isDraggable) return;

			// Add basic constraints to keep modal on screen
			const newX = e.clientX - dragStart.x;
			const newY = e.clientY - dragStart.y;

			setPosition({
				x: Math.max(0, Math.min(newX, window.innerWidth - 400)), // Basic constraint
				y: Math.max(0, Math.min(newY, window.innerHeight - 200)), // Basic constraint
			});
		},
		[isDragging, isDraggable, dragStart]
	);

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	useEffect(() => {
		if (isDragging && isDraggable) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [isDragging, dragStart, isDraggable, handleMouseMove]);

	// Handle escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 pointer-events-auto">
			{/* Modal backdrop */}
			<div
				className="fixed inset-0 backdrop-blur-sm bg-black/20"
				onClick={onClose}
			/>

			{/* Modal content */}
			<div
				ref={modalRef}
				className={`absolute rounded-[0px_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/90 backdrop-blur-[16px] ${className}`}
				style={{
					left: `${position.x}px`,
					top: `${position.y}px`,
					width,
					minHeight,
				}}
			>
				{/* Header with controls - draggable area */}
				<div
					className={`flex items-start justify-between px-[24px] pt-[12px] mb-[17px] select-none ${
						isDraggable ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
					}`}
					onMouseDown={handleMouseDown}
				>
					<div className="flex-1 min-w-0">
						<h2 className="text-white font-ubuntu text-2xl font-bold leading-none mb-0">
							{title}
						</h2>
						{subtitle && (
							<p className="text-[#E3F3F2] font-ubuntu text-sm font-normal leading-none mt-1 mb-0">
								{subtitle}
							</p>
						)}
						{headerContent && <div className="mt-2">{headerContent}</div>}
					</div>
					<div className="flex gap-[12px] mt-[12px]">
						{minimizable && (
							<button
								onClick={onMinimize}
								className="bg-transparent border-none hover:opacity-75 transition-opacity"
							>
								<img
									src={windowMinimizeIcon}
									alt="minimize"
									className="w-[18px] h-[18px]"
								/>
							</button>
						)}
						{showCloseButton && (
							<button
								onClick={onClose}
								className="ml-4 w-[21px] h-[23px] text-[#E3F3F2] hover:text-white transition-colors flex items-center justify-center border-none bg-transparent cursor-pointer"
							>
								<img
									src={timesIcon}
									alt="close"
									className="w-[14px] h-[14px]"
								/>
							</button>
						)}
					</div>
				</div>

				{/* Modal body */}
				<div className="px-[24px] pb-[24px]">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
