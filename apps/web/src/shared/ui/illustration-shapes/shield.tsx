import type { FC } from "react";

import { ILLUSTRATION_INK } from "./illustration.const";
import { checkStyle, outlineStyle } from "./outline";

interface ShieldProps {
  fill: string;
  strokeWidth?: number;
  checkWidth?: number;
  checkPath?: string;
  shadowOffset?: number;
  scale?: number;
  shadowScale?: number;
}

const SHIELD_PATH = "M0-110L90-76V10C90 70 45 108 0 130C-45 108-90 70-90 10V-76Z";

const DEFAULT_CHECK_PATH = "M-38 8L-10 38L44-24";

export const Shield: FC<ShieldProps> = ({
  fill,
  strokeWidth = 4,
  checkWidth = 14,
  checkPath = DEFAULT_CHECK_PATH,
  shadowOffset = 12,
  scale = 1,
  shadowScale = 1,
}) => {
  const mainTransform = scale !== 1 ? `scale(${scale})` : undefined;
  const shadowTransform = shadowScale !== 1 ? `scale(${shadowScale})` : undefined;

  return (
    <g>
      <g transform={`translate(${shadowOffset} ${shadowOffset})`}>
        <path d={SHIELD_PATH} fill={ILLUSTRATION_INK} style={outlineStyle(strokeWidth)} transform={shadowTransform} />
      </g>
      <path d={SHIELD_PATH} fill={fill} style={outlineStyle(strokeWidth)} transform={mainTransform} />
      <path d={checkPath} fill="none" style={checkStyle(checkWidth)} />
    </g>
  );
};
