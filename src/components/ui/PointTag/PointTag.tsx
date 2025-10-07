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
	position: [number, number];
}

export const PointTag: FC<PointTagProps> = memo((props) => {
	const { angle, length, style, children, className, position } = props;
	const [open, setOpen] = useState<boolean>(false);
	const close = useCallback(() => setOpen(false), []);

	let topStyle: CSSProperties = {left: `${position[0]}px`, top: `${position[1]}px`, transform: 'translate(-50%, -50%)'};

	if (style) {
		topStyle = {...style, ...topStyle};
	}

	return (
		<div
			style={topStyle}
			className={cn(
				"absolute rounded-[4px] w-[16px] h-[16px] bg-[#00C6B8] cursor-pointer",
				className
			)}
			onClick={() => {
				// open/close
				setOpen((prev) => !prev);
			}}
		>
			{open ? (
				<>
					<PointTagDetails angle={angle} length={length} close={close}>
						<PointTagCtxProvider value={{ setOpen, close }}>
							{children}
						</PointTagCtxProvider>
					</PointTagDetails>
				</>
			) : null}
		</div>
	);
});
