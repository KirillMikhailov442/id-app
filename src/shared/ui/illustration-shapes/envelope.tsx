import type { FC } from "react";

import { ILLUSTRATION_INK } from "./illustration.const";
import { checkStyle, outlineStyle } from "./outline";

interface EnvelopeProps {
  fill: string;
  badgeFill: string;
  strokeWidth?: number;
  shadowOffset?: number;
  checkWidth?: number;
}

export const Envelope: FC<EnvelopeProps> = ({
  fill,
  badgeFill,
  strokeWidth = 4,
  shadowOffset = 10,
  checkWidth = 9,
}) => {
  return (
    <g>
      <rect
        fill={ILLUSTRATION_INK}
        height={100}
        rx={16}
        style={outlineStyle(strokeWidth)}
        transform={`translate(${shadowOffset} ${shadowOffset})`}
        width={144}
        x={-72}
        y={-50}
      />
      <rect fill={fill} height={100} rx={16} style={outlineStyle(strokeWidth)} width={144} x={-72} y={-50} />
      <path d="M-72-42L0 14L72-42" fill="none" style={outlineStyle(strokeWidth)} />
      <g transform="translate(66 44)">
        <circle fill={badgeFill} r={28} style={outlineStyle(strokeWidth)} />
        <path d="M-12 1L-3 10L13-8" fill="none" style={checkStyle(checkWidth)} />
      </g>
    </g>
  );
};
