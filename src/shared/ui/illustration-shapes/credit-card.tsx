import type { FC } from "react";

import { ILLUSTRATION_CARD_BG, ILLUSTRATION_INK } from "./illustration.const";
import { outlineStyle } from "./outline";

interface CreditCardProps {
  fill: string;
  strokeWidth?: number;
  shadowOffset?: number;
}

export const CreditCard: FC<CreditCardProps> = ({ fill, strokeWidth = 4, shadowOffset = 10 }) => {
  return (
    <g>
      <rect
        fill={ILLUSTRATION_INK}
        height={108}
        rx={18}
        style={outlineStyle(strokeWidth)}
        transform={`translate(${shadowOffset} ${shadowOffset})`}
        width={168}
        x={-84}
        y={-54}
      />
      <rect fill={fill} height={108} rx={18} style={outlineStyle(strokeWidth)} width={168} x={-84} y={-54} />
      <circle cx={-42} cy={-12} fill={ILLUSTRATION_CARD_BG} r={18} style={outlineStyle(strokeWidth)} />
      <path d="M-72 38a30 22 0 0 1 60 0z" fill={ILLUSTRATION_CARD_BG} style={outlineStyle(strokeWidth)} />
      <path d="M-8-22H60M-8-4H46M-8 14H60" fill="none" style={outlineStyle(strokeWidth)} />
    </g>
  );
};
