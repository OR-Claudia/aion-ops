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
}

export const PointTag: FC<PointTagProps> = memo((props) => {
	const { angle, length, style, children, className, detailStyle } = props;
	const [open, setOpen] = useState<boolean>(false);
	const close = useCallback(() => setOpen(false), []);

	return (
		<div
			style={style}
			className={cn(
				"relative rounded-[4px] w-[8px] h-[8px] bg-[#00C6B8] cursor-pointer",
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
