import type { FC } from "react";

import { ILLUSTRATION_INK, ILLUSTRATION_WHITE } from "./illustration.const";
import { outlineStyle } from "./outline";

interface SpeechBubbleProps {
  fill: string;
  strokeWidth?: number;
  shadowOffset?: number;
}

const BUBBLE_PATH =
  "M-52-46H52a28 28 0 0 1 28 28V18a28 28 0 0 1-28 28H-20L-52 74V46a28 28 0 0 1-28-28V-18A28 28 0 0 1-52-46Z";

export const SpeechBubble: FC<SpeechBubbleProps> = ({ fill, strokeWidth = 4, shadowOffset = 9 }) => {
  return (
    <g>
      <path
        d={BUBBLE_PATH}
        fill={ILLUSTRATION_INK}
        style={outlineStyle(strokeWidth)}
        transform={`translate(${shadowOffset} ${shadowOffset})`}
      />
      <path d={BUBBLE_PATH} fill={fill} style={outlineStyle(strokeWidth)} />
      <circle cx={-30} cy={0} fill={ILLUSTRATION_WHITE} r={9} />
      <circle cx={0} cy={0} fill={ILLUSTRATION_WHITE} r={9} />
      <circle cx={30} cy={0} fill={ILLUSTRATION_WHITE} r={9} />
    </g>
  );
};
