import { type FC, type ReactNode, type CSSProperties } from "react";
import { cn } from "../../../lib/utils";
import timesIcon from "../../../assets/times.svg";

type Corner = "tl" | "tr" | "br" | "bl";

interface PointTagDetailsProps {
  angle?: number;
  length?: number;
  close?: () => void;
  style?: CSSProperties;
  children: ReactNode;
}

export const PointTagDetails: FC<PointTagDetailsProps> = (props) => {
  const { angle, length, style, children } = props;

  const DEFAULT_ANGLE = 45;
  const DEFAULT_LENGTH = 50;
  const _angle = angle || DEFAULT_ANGLE;
  const _length = length || DEFAULT_LENGTH;
  const STROKE_WIDTH = 1;

  const angleInRads = _angle * Math.PI/180;

  let anchorCorner: Corner = 'tl';
  const posX: number = Math.sin(angleInRads) * _length;
  const posY: number = Math.cos(angleInRads) * _length;

  if (posX < 0 && posY > 0) {
    anchorCorner = 'br';
  } else if (posX <= 0 && posY <= 0) {
    anchorCorner = 'tr';
  } else if (posX >= 0 && posY >= 0) {
    anchorCorner = 'bl';
  }

  const cornerClass = {
    'rounded-tl-sm': anchorCorner !== "tl",
    'rounded-tr-sm': anchorCorner !== "tr",
    'rounded-br-sm': anchorCorner !== "br",
    'rounded-bl-sm': anchorCorner !== "bl",
  };

  const smokePos: CSSProperties = {};

  if (anchorCorner === 'bl' || anchorCorner === 'tl') {
    smokePos.left = `${Math.abs(posX)}px`;
  } else {
    smokePos.right = `${Math.abs(posX)}px`;
  }

  if (anchorCorner === 'tl' || anchorCorner === 'tr') {
    smokePos.top = `${Math.abs(posY)}px`;
  } else {
    smokePos.bottom = `${Math.abs(posY)}px`;
  }

  return (
    <div className="absolute top-[50%] left-[50%]" style={style}>
      <svg className={`absolute z-10 overflow-visible`} style={{transformOrigin: `0 0`, rotate: `${_angle + 180}deg`}} width={STROKE_WIDTH} height={_length + 1}>
        <line x1={0} y1={0} x2={0} y2={_length + 1} stroke="#00C6B8" strokeWidth={STROKE_WIDTH} />
      </svg>
      <div className={cn(cornerClass, `absolute bg-[#00C6B8] text-[#000]`)} style={smokePos}>
        <button className="absolute right-1 top-1 w-[8px] h-[8px]" type="button" onClick={close}>
          <img className="w-[5px] h-[5px]" src={timesIcon} color="#000" />
        </button>
        {children}
      </div>
    </div>
  );
};