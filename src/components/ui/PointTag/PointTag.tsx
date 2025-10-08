import {
	useCallback,
	useState,
	type FC,
	type ReactNode,
	type CSSProperties,
	memo,
} from "react";
import { PointTagDetails } from "./PointTagDetails";
import { pointTagCtx } from "./ctx";
import { cn } from "../../../lib/utils";

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
}

export const PointTag: FC<PointTagProps> = memo((props) => {
	const { angle, length, style, children, className, detailStyle, position, pointSize = 10 } = props;
	const [open, setOpen] = useState<boolean>(false);
	const close = useCallback(() => setOpen(false), []);

	let topStyle: CSSProperties = {
		left: position[0],
		top: position[1],
		transform: 'translate(-50%, -50%)',
		width: pointSize,
		height: pointSize,
	};

	if (style) {
		topStyle = {...style, ...topStyle};
	}

	return (
		<div
			style={topStyle}
			className={cn(
				"absolute rounded-[50%] bg-[rgba(0,198,185,0.30)] border-[#00C6B8] border-1 cursor-pointer",
				className
			)}
			onClick={() => {
				// open/close
				setOpen((prev) => !prev);
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
