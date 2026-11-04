import type { FC } from "react";

import { ILLUSTRATION_WHITE } from "./illustration.const";
import { checkStyle, outlineStyle } from "./outline";

interface UserBadgeProps {
  fill: string;
  strokeWidth?: number;
}

export const UserBadge: FC<UserBadgeProps> = ({ fill, strokeWidth = 4 }) => {
  return (
    <g>
      <circle fill={fill} r={30} style={outlineStyle(strokeWidth)} />
      <circle cx={-6} cy={-8} fill={ILLUSTRATION_WHITE} r={8} />
      <path d="M-22 20a16 12 0 0 1 32 0z" fill={ILLUSTRATION_WHITE} />
      <path d="M16-12V4M8-4H24" fill="none" style={checkStyle(5)} />
    </g>
  );
};
