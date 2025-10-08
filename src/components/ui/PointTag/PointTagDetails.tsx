import { type FC, type ReactNode, type CSSProperties, memo } from "react";
import { cn } from "../../../lib/utils";
import TimesIcon from "../../../assets/times.svg?react";

type Corner = "tl" | "tr" | "br" | "bl";

interface PointTagDetailsProps {
	angle?: number;
	length?: number;
	close?: () => void;
	style?: CSSProperties;
	children: ReactNode;
	pointSize: number;
}

export const PointTagDetails: FC<PointTagDetailsProps> = memo((props) => {
	const { angle, length, style, close, children, pointSize } = props;

	const DEFAULT_ANGLE = 45;
	const DEFAULT_LENGTH = 50;
	const _angle = angle || DEFAULT_ANGLE;
	const _length = length || DEFAULT_LENGTH;
	const STROKE_WIDTH = 1;

	const angleInRads = (_angle * Math.PI) / 180;

	let anchorCorner: Corner = "tl";
	const sinAngle = Math.sin(angleInRads);
	const cosAngle = Math.cos(angleInRads);
	const posX: number = sinAngle * _length;
	const posY: number = cosAngle * _length;

	const lineTranslation: [number, number] = [sinAngle * pointSize / 2, cosAngle * pointSize / 2 * -1];

	if (posX < 0 && posY > 0) {
		anchorCorner = "br";
	} else if (posX <= 0 && posY <= 0) {
		anchorCorner = "tr";
	} else if (posX >= 0 && posY >= 0) {
		anchorCorner = "bl";
	}

	const cornerClass = {
		"rounded-tl-sm": anchorCorner !== "tl",
		"rounded-tr-sm": anchorCorner !== "tr",
		"rounded-br-sm": anchorCorner !== "br",
		"rounded-bl-sm": anchorCorner !== "bl",
	};

	const smokePos: CSSProperties = {};
	const linePos: CSSProperties = {};

	if (anchorCorner === "bl" || anchorCorner === "tl") {
		smokePos.left = `${Math.abs(posX)}px`;
		linePos.left = `${lineTranslation[0]}px`;
	} else {
		smokePos.right = `${Math.abs(posX)}px`;
		linePos.left = `${lineTranslation[0]}px`;
	}

	if (anchorCorner === "tl" || anchorCorner === "tr") {
		smokePos.top = `${Math.abs(posY)}px`;
		linePos.top = `${lineTranslation[1]}px`;
	} else {
		smokePos.bottom = `${Math.abs(posY)}px`;
		linePos.top = `${lineTranslation[1]}px`;
	}

	const smokeStaticClasses =
		"absolute bg-[rgba(0,198,185,0.60)] border-[#00C6B8] border-1 text-[#222631] px-3 pt-2 pb-1";

	return (
		<div
			className="absolute text-sm top-[50%] left-[50%] cursor-auto"
			style={style}
			onClick={(ev) => ev.stopPropagation()}
		>
			<svg
				className="absolute z-10 overflow-visible"
				style={{ ...linePos, transformOrigin: `0 0`, rotate: `${_angle + 180}deg` }}
				width={STROKE_WIDTH}
				height={_length + 1}
			>
				<line
					x1={0}
					y1={0}
					x2={0}
					y2={_length + 1}
					stroke="#00C6B8"
					strokeWidth={STROKE_WIDTH}
				/>
			</svg>
			<div className={cn(cornerClass, smokeStaticClasses)} style={smokePos}>
				<button
					className="absolute right-1 top-1 w-[8px] h-[8px] cursor-pointer"
					type="button"
					onClick={close}
				>
					<TimesIcon className="w-[8px] h-[8px] fill-[#222631]" />
				</button>
				{children}
			</div>
		</div>
	);
});
