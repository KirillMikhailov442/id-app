import { ILLUSTRATION_COLORS, outlineStyle, Plus, Shield, Star } from "@shared/ui";

import s from "./clients-error-illustration.module.scss";

const { purple, red, yellow, green } = ILLUSTRATION_COLORS;

export const ClientsErrorIllustration = () => (
  <svg aria-hidden="true" className={s.illustration} viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
    <circle cx={82} cy={94} fill={purple} opacity={0.3} r={62} />
    <circle cx={210} cy={64} fill={yellow} opacity={0.3} r={42} />
    <g transform="translate(135 82) rotate(-8) scale(0.52)">
      <Shield checkPath="M-24-18L24 30M24-18L-24 30" checkWidth={12} fill={red} strokeWidth={6} />
    </g>
    <Star fill={green} size={24} x={54} y={32} />
    <Plus size={20} x={228} y={122} />
    <circle cx={42} cy={134} fill={yellow} r={7} style={outlineStyle(3)} />
    <circle cx={228} cy={25} fill="none" r={7} style={outlineStyle(3)} />
  </svg>
);
