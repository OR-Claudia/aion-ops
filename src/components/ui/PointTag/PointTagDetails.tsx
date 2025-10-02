import { type FC, type ReactNode } from "react";
import { cn } from "../../../lib/utils";
import timesIcon from "../../../assets/times.svg";

type Corner = "tl" | "tr" | "br" | "bl";

interface PointTagDetailsProps {
  close?: () => void;
  style?: object;
  children: ReactNode;
}

interface PositionStyle {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
}

export const PointTagDetails: FC<PointTagDetailsProps> = (props) => {
  const { style, children } = props;

  const DEFAULT_ANGLE = 180;
  const DEFAULT_LENGTH = 50;
  const STROKE_WIDTH = 2;

  const angleInRads = DEFAULT_ANGLE * Math.PI/180;

  let anchorCorner: Corner = 'tl';
  let linePosition: PositionStyle = {
    left: `${0}px`,
    top: `${STROKE_WIDTH/2}px`,
  };

  const svgX: number = Math.sin(angleInRads) * DEFAULT_LENGTH;
  const svgY: number = Math.cos(angleInRads) * DEFAULT_LENGTH;

  if (svgX < 0 && svgY > 0) {
    anchorCorner = 'br';
    linePosition = {
      right: 0,
      top: `${-svgY - STROKE_WIDTH/2}px`,
    };
  } else if (svgX <= 0 && svgY <= 0) {
    anchorCorner = 'tr';
    linePosition = {
      right: 0,
      top: `${STROKE_WIDTH/2}px`,
    };
  } else if (svgX >= 0 && svgY >= 0) {
    anchorCorner = 'bl';
    linePosition = {
      left: `${STROKE_WIDTH/2}px`,
      bottom: `-${STROKE_WIDTH/2}px`,
    };
  }

  const cornerClass = {
    'rounded-tl-sm': anchorCorner !== "tl",
    'rounded-tr-sm': anchorCorner !== "tr",
    'rounded-br-sm': anchorCorner !== "br",
    'rounded-bl-sm': anchorCorner !== "bl",
  };

  let lineX1: number = 0;
  let lineY1: number = 0;
  let lineX2: number = 0;
  let lineY2: number = 0;

  switch(anchorCorner) {
    case 'tl':
      lineX1 = 0;
      lineY1 = 0;
      lineX2 = svgX;
      lineY2 = svgY * -1;
      break;
    case 'bl':
      lineX1 = 0;
      lineY1 = svgY;
      lineX2 = svgX;
      lineY2 = 0;
      break;
    case 'br':
      lineX1 = 0;
      lineY1 = 0;
      lineX2 = svgX * -1;
      lineY2 = svgY;
      break;
    case 'tr':
      lineX1 = 0;
      lineY1 = svgY * -1;
      lineX2 = svgX * -1;
      lineY2 = 0;
      break;
  }

  const smokePos: PositionStyle = {};

  if (anchorCorner === 'bl' || anchorCorner === 'tl') {
    smokePos.left = `${Math.abs(svgX)}px`;
  } else {
    smokePos.right = `${Math.abs(svgX)}px`;
  }

  if (anchorCorner === 'tl' || anchorCorner === 'tr') {
    smokePos.top = `${Math.abs(svgY)}px`;
  } else {
    smokePos.bottom = `${Math.abs(svgY)}px`;
  }

  return (
    <div className="absolute top-[50%] left-[50%]" style={style}>
      <svg className={`absolute z-10 overflow-visible`} style={linePosition} width={Math.abs(svgX) + STROKE_WIDTH} height={Math.abs(svgY) + STROKE_WIDTH}>
        <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke="#00C6B8" strokeWidth={STROKE_WIDTH} />
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