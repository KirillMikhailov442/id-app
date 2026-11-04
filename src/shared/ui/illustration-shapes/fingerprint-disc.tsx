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
  "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4",
  "M14 13.12c0 2.38 0 6.38-1 8.88",
  "M17.29 21.02c.12-.6.43-2.3.5-3.02",
  "M2 12a10 10 0 0 1 18-6",
  "M2 16h.01",
  "M21.8 16c.2-2 .131-5.354 0-6",
  "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2",
  "M8.65 22c.21-.66.45-1.32.57-2",
  "M9 6.8a6 6 0 0 1 9 5.2v2",
] as const;

const FINGERPRINT_CENTER = { x: 12, y: 13 } as const;

export const FingerprintDisc: FC<FingerprintDiscProps> = ({
  fill,
  iconColor = ILLUSTRATION_INK,
  iconScale = 3.5,
  strokeWidth = 4,
  shadowOffset = 10,
}) => {
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
        transform={`translate(${-FINGERPRINT_CENTER.x * iconScale} ${-FINGERPRINT_CENTER.y * iconScale}) scale(${iconScale})`}
      >
        {FINGERPRINT_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </g>
  );
};
