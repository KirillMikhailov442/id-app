import {
  checkStyle,
  CreditCard,
  Envelope,
  FingerprintDisc,
  ILLUSTRATION_COLORS,
  outlineStyle,
  Plus,
  Star,
} from "@shared/ui";

const { blue, green, red, yellow, purple } = ILLUSTRATION_COLORS;

export const LoginIllustrationRight = () => (
  <svg aria-hidden="true" preserveAspectRatio="xMaxYMid meet" viewBox="0 0 380 760" xmlns="http://www.w3.org/2000/svg">
    <circle cx={320} cy={560} fill={green} opacity={0.26} r={140} />
    <circle cx={120} cy={130} fill={blue} opacity={0.22} r={80} />
    <path d="M240 730q15-20 30 0t30 0t30 0" fill="none" style={outlineStyle(4)} />
    <Plus size={30} x={50} y={60} />
    <g transform="translate(230 170) rotate(8)">
      <CreditCard fill={green} />
    </g>
    <g transform="translate(160 410)">
      <FingerprintDisc fill={yellow} />
    </g>
    <g transform="translate(230 620) rotate(-7)">
      <Envelope badgeFill={red} fill={purple} />
    </g>
    <circle cx={330} cy={330} fill={blue} r={22} style={outlineStyle(4)} />
    <path d="M321 331L328 338L340 323" fill="none" style={checkStyle(6)} />
    <Star fill={red} size={44} x={40} y={520} />
    <circle cx={40} cy={330} fill="none" r={14} style={outlineStyle(4)} />
    <Plus size={26} x={330} y={440} />
  </svg>
);
