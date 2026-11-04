import {
  Envelope,
  FingerprintDisc,
  ILLUSTRATION_COLORS,
  ILLUSTRATION_WHITE,
  outlineStyle,
  Plus,
  SpeechBubble,
  Star,
} from "@shared/ui";

const { blue, green, red, yellow, purple } = ILLUSTRATION_COLORS;

export const RegisterIllustrationRight = () => (
  <svg aria-hidden="true" preserveAspectRatio="xMaxYMid meet" viewBox="0 0 380 760" xmlns="http://www.w3.org/2000/svg">
    <circle cx={300} cy={580} fill={yellow} opacity={0.26} r={140} />
    <circle cx={120} cy={150} fill={red} opacity={0.2} r={80} />
    <path d="M240 60q15-20 30 0t30 0t30 0" fill="none" style={outlineStyle(4)} />
    <Plus size={28} x={50} y={330} />
    <g transform="translate(210 200) rotate(7) scale(1.12)">
      <Envelope badgeFill={green} fill={purple} />
    </g>
    <g transform="translate(150 440) rotate(-6)">
      <SpeechBubble fill={red} />
    </g>
    <g transform="translate(250 630)">
      <FingerprintDisc fill={blue} iconColor={ILLUSTRATION_WHITE} iconScale={3} />
    </g>
    <Star fill={green} size={44} x={40} y={560} />
    <circle cx={40} cy={190} fill="none" r={14} style={outlineStyle(4)} />
    <circle cx={335} cy={400} fill={yellow} r={10} style={outlineStyle(4)} />
    <Plus size={26} x={320} y={720} />
  </svg>
);
