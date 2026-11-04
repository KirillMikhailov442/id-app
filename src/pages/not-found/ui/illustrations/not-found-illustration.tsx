import { ILLUSTRATION_COLORS, outlineStyle, Plus, SpeechBubble, Star } from "@shared/ui";

import s from "./not-found-illustration.module.scss";

const { blue, purple, yellow, green } = ILLUSTRATION_COLORS;

export const NotFoundIllustration = () => (
  <svg aria-hidden="true" className={s.illustration} viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
    <circle cx={82} cy={94} fill={purple} opacity={0.3} r={62} />
    <circle cx={210} cy={64} fill={yellow} opacity={0.3} r={42} />
    <g transform="translate(132 86) rotate(-8) scale(0.8)">
      <SpeechBubble fill={blue} strokeWidth={4} />
    </g>
    <Star fill={green} size={24} x={54} y={32} />
    <Plus size={20} x={228} y={122} />
    <circle cx={42} cy={134} fill={yellow} r={7} style={outlineStyle(3)} />
    <circle cx={228} cy={25} fill="none" r={7} style={outlineStyle(3)} />
  </svg>
);
