import type { FC } from "react";

import { ILLUSTRATION_INK } from "./illustration.const";
import { outlineStyle } from "./outline";

interface FingerprintDiscProps {
  fill: string;
  iconColor?: string;
  iconScale?: number;
  strokeWidth?: number;
  shadowOffset?: number;
}

const FINGERPRINT_PATHS = [
  "M4 11a8 8 0 0 1 16 0v3",
  "M7 14v-3a5 5 0 0 1 10 0v6",
  "M12 11v7",
  "M9 20v-6",
  "M15 21v-4",
] as const;

const FINGERPRINT_BASE_SIZE = 24;

export const FingerprintDisc: FC<FingerprintDiscProps> = ({
  fill,
  iconColor = ILLUSTRATION_INK,
  iconScale = 3.5,
  strokeWidth = 4,
  shadowOffset = 10,
}) => {
  const iconOffset = -(FINGERPRINT_BASE_SIZE * iconScale) / 2;

  return (
    <g>
      <circle cx={shadowOffset} cy={shadowOffset} fill={ILLUSTRATION_INK} r={64} style={outlineStyle(strokeWidth)} />
      <circle fill={fill} r={64} style={outlineStyle(strokeWidth)} />
      <g
        fill="none"
        stroke={iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        transform={`translate(${iconOffset} ${iconOffset}) scale(${iconScale})`}
      >
        {FINGERPRINT_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </g>
  );
};
