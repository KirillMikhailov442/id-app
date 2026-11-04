import { ILLUSTRATION_CARD_BG, ILLUSTRATION_COLORS, ILLUSTRATION_INK, Key, outlineStyle, Plus, Star } from "@shared/ui";

import s from "./clients-empty-illustration.module.scss";

const { blue, purple, red, yellow, green } = ILLUSTRATION_COLORS;

export const ClientsEmptyIllustration = () => (
  <svg aria-hidden="true" className={s.illustration} viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
    <circle cx={82} cy={94} fill={purple} opacity={0.3} r={62} />
    <circle cx={210} cy={64} fill={yellow} opacity={0.3} r={42} />
    <g>
      <g transform="translate(80 40) rotate(-8 64 46)">
        <rect fill={ILLUSTRATION_INK} height={92} rx={14} width={128} x={5} y={6} />
        <rect fill={ILLUSTRATION_CARD_BG} height={92} rx={14} style={outlineStyle(3)} width={128} />
        <path d="M0 28H128" fill="none" style={outlineStyle(3)} />
        <circle cx={15} cy={14} fill={red} r={3} />
        <circle cx={27} cy={14} fill={yellow} r={3} />
        <circle cx={39} cy={14} fill={green} r={3} />
        <rect fill={blue} height={28} rx={7} style={outlineStyle(3)} width={28} x={16} y={44} />
        <path d="M58 49H106M58 62H90" fill="none" style={outlineStyle(3)} />
      </g>
      <g transform="translate(112 126) rotate(-24) scale(0.55)">
        <Key fill={yellow} strokeWidth={5} />
      </g>
    </g>
    <Star fill={green} size={24} x={54} y={32} />
    <Plus size={20} x={228} y={122} />
    <circle cx={42} cy={134} fill={yellow} r={7} style={outlineStyle(3)} />
    <circle cx={228} cy={25} fill="none" r={7} style={outlineStyle(3)} />
  </svg>
);
