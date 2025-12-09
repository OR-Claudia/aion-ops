import {
	useCallback,
	useEffect,
	useState,
	type FC,
	type ReactNode,
	type CSSProperties,
	memo,
	useContext,
} from "react";
import { PointTagDetails } from "./PointTagDetails";
import { pointTagCtx } from "./ctx";
import { cn, MetaDataCtx } from "../../../lib/utils";

const PointTagCtxProvider = pointTagCtx.Provider;

interface PointTagProps {
	children: ReactNode;
	style?: CSSProperties;
	angle?: number;
	length?: number;
	className?: string;
	detailStyle?: CSSProperties;
	position: [number, number];
	pointSize?: number;
	trackId?: number;
}

export const PointTag: FC<PointTagProps> = memo((props) => {
	const {
		angle,
		length,
		style,
		children,
		className,
		detailStyle,
		position,
		pointSize = 10,
		trackId,
	} = props;

	const [{ selectedDetection }, updateMetaData] = useContext(MetaDataCtx);

	const [open, setOpen] = useState<boolean>(selectedDetection === trackId);
	useEffect(() => {
		setOpen(selectedDetection === trackId);
	}, [selectedDetection, trackId]);

	const close = useCallback(() => {
		setOpen(false);
		updateMetaData({ selectedDetection: null });
	}, [updateMetaData]);

	// console.log(trackId);

	let topStyle: CSSProperties = {
		left: position[0],
		top: position[1],
		transform: "translate(-50%, -50%)",
		width: pointSize,
		height: pointSize,
	};

	if (style) {
		topStyle = { ...topStyle, ...style };
	}

	return (
		<div
			style={topStyle}
			className={cn(
				"absolute rounded-[50%] bg-[rgba(0,198,185,0.30)] border-[#00C6B8] border-1 cursor-pointer",
				className
			)}
			onClick={(ev) => {
				// sync global selection to avoid ID jumping across map/video/list
				ev.stopPropagation?.();
				if (typeof trackId !== "undefined") {
					const willSelect = selectedDetection !== trackId;
					// Immediate local UI feedback, independent of async ctx propagation
					setOpen(willSelect);
					updateMetaData({
						selectedDetection: willSelect ? trackId : null,
					});
				}
			}}
		>
			{open ? (
				<>
					<PointTagDetails
						pointSize={pointSize}
						style={detailStyle}
						angle={angle}
						length={length}
						close={close}
					>
						<PointTagCtxProvider value={{ setOpen, close }}>
							{children}
						</PointTagCtxProvider>
					</PointTagDetails>
				</>
			) : null}
		</div>
	);
});
