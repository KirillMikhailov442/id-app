import { ILLUSTRATION_COLORS, Key, Lock, outlineStyle, Plus, Shield, Star } from "@shared/ui";

const { blue, green, red, yellow, purple } = ILLUSTRATION_COLORS;

export const LoginIllustrationLeft = () => (
  <svg aria-hidden="true" preserveAspectRatio="xMinYMid meet" viewBox="0 0 380 760" xmlns="http://www.w3.org/2000/svg">
    <circle cx={60} cy={560} fill={purple} opacity={0.28} r={150} />
    <circle cx={250} cy={140} fill={yellow} opacity={0.28} r={90} />
    <path d="M20 40q15-20 30 0t30 0t30 0" fill="none" style={outlineStyle(4)} />
    <Plus size={30} x={300} y={40} />
    <g transform="translate(110 150) rotate(-8)">
      <Lock fill={red} />
    </g>
    <g transform="translate(190 380) rotate(6)">
      <Shield fill={blue} scale={1.15} shadowOffset={12} />
    </g>
    <g transform="translate(60 650) rotate(-24)">
      <Key fill={yellow} />
    </g>
    <circle cx={330} cy={560} fill="none" r={16} style={outlineStyle(4)} />
    <circle cx={320} cy={290} fill={green} r={10} style={outlineStyle(4)} />
    <Star fill={green} size={40} x={40} y={300} />
    <Plus size={28} x={320} y={680} />
    <circle cx={280} cy={705} fill={red} r={7} style={outlineStyle(4)} />
  </svg>
);
