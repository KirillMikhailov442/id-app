import type { FC } from "react";

import { ILLUSTRATION_INK } from "./illustration.const";
import { outlineStyle } from "./outline";

interface LockProps {
  fill: string;
  strokeWidth?: number;
  shackleWidth?: number;
  shadowOffset?: number;
}

export const Lock: FC<LockProps> = ({ fill, strokeWidth = 4, shackleWidth = 12, shadowOffset = 8 }) => {
  return (
    <g>
      <rect
        fill={ILLUSTRATION_INK}
        height={80}
        rx={16}
        style={outlineStyle(strokeWidth)}
        transform={`translate(${shadowOffset} ${shadowOffset})`}
        width={100}
        x={-50}
        y={-10}
      />
      <path d="M-28-10V-34a28 28 0 0 1 56 0V-10" fill="none" style={outlineStyle(shackleWidth)} />
      <rect fill={fill} height={80} rx={16} style={outlineStyle(strokeWidth)} width={100} x={-50} y={-10} />
      <circle cx={0} cy={26} fill={ILLUSTRATION_INK} r={9} />
      <rect fill={ILLUSTRATION_INK} height={20} rx={3} width={7} x={-3.5} y={30} />
    </g>
  );
};
