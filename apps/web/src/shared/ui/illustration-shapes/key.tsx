import type { FC } from "react";

import { ILLUSTRATION_INK } from "./illustration.const";
import { outlineStyle } from "./outline";

interface KeyProps {
  fill: string;
  strokeWidth?: number;
  shadowOffset?: number;
}

interface KeyShapeProps {
  fill: string;
  strokeWidth: number;
}

const KEY_PATH = "M-32 0a32 32 0 1 0 64 0a32 32 0 1 0-64 0ZM-10 0a10 10 0 1 1 20 0a10 10 0 1 1-20 0Z";

const KeyShape: FC<KeyShapeProps> = ({ fill, strokeWidth }) => {
  return (
    <g fill={fill} style={outlineStyle(strokeWidth)}>
      <path d={KEY_PATH} fillRule="evenodd" />
      <rect height={22} rx={6} width={150} x={28} y={-11} />
      <rect height={28} rx={4} width={18} x={128} y={9} />
      <rect height={20} rx={4} width={14} x={154} y={9} />
    </g>
  );
};

export const Key: FC<KeyProps> = ({ fill, strokeWidth = 4, shadowOffset = 7 }) => {
  return (
    <g>
      <g transform={`translate(${shadowOffset} ${shadowOffset})`}>
        <KeyShape fill={ILLUSTRATION_INK} strokeWidth={strokeWidth} />
      </g>
      <KeyShape fill={fill} strokeWidth={strokeWidth} />
    </g>
  );
};
