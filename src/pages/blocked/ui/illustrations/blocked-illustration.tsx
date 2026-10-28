import { ILLUSTRATION_CARD_BG, ILLUSTRATION_COLORS, Lock, outlineStyle, Plus, Star } from "@shared/ui";

import s from "./blocked-illustration.module.scss";

const { blue, purple, red, yellow, green } = ILLUSTRATION_COLORS;

export const BlockedIllustration = () => (
  <svg aria-hidden="true" className={s.illustration} viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
    <circle cx={96} cy={92} fill={purple} opacity={0.3} r={66} />
    <circle cx={211} cy={63} fill={yellow} opacity={0.3} r={40} />
    <g transform="translate(117 87) rotate(-12)">
      <rect fill={blue} height={100} rx={16} style={outlineStyle(3)} width={126} x={-59} y={-42} />
      <rect fill={ILLUSTRATION_CARD_BG} height={100} rx={16} style={outlineStyle(3)} width={126} x={-65} y={-48} />
      <circle cx={-26} cy={-15} fill={purple} r={13} style={outlineStyle(3)} />
      <path d="M-47 23a21 21 0 0 1 42 0Z" fill={purple} style={outlineStyle(3)} />
      <path d="M3-22h37M3-9h24" fill="none" style={outlineStyle(3)} />
    </g>
    <g transform="translate(185 103) rotate(9) scale(0.62)">
      <Lock fill={red} strokeWidth={5} />
    </g>
    <Star fill={green} size={24} x={48} y={29} />
    <Plus size={18} x={237} y={134} />
    <circle cx={42} cy={140} fill={yellow} r={7} style={outlineStyle(3)} />
    <circle cx={233} cy={26} fill="none" r={6} style={outlineStyle(3)} />
  </svg>
);
