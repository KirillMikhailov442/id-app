import { FingerprintDisc, ILLUSTRATION_COLORS, Key, Lock, outlineStyle, Plus, Shield, Star } from "@shared/ui";

const { blue, green, red, yellow, purple } = ILLUSTRATION_COLORS;

export const LoginIllustrationHero = () => (
  <svg aria-hidden="true" viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg">
    <circle cx={70} cy={112} fill={purple} opacity={0.3} r={62} />
    <circle cx={300} cy={84} fill={yellow} opacity={0.3} r={56} />
    <g transform="translate(66 100) rotate(-8) scale(0.62)">
      <Lock fill={red} shackleWidth={10} strokeWidth={6.5} />
    </g>
    <g transform="translate(180 96) rotate(5) scale(0.64)">
      <Shield
        checkPath="M-36 7L-9 36L42-23"
        fill={blue}
        scale={1.1}
        shadowOffset={11}
        shadowScale={1.1}
        strokeWidth={6}
      />
    </g>
    <g transform="translate(232 152) rotate(-18) scale(0.5)">
      <Key fill={yellow} shadowOffset={8} strokeWidth={7} />
    </g>
    <g transform="translate(300 62) scale(0.5)">
      <FingerprintDisc fill={green} strokeWidth={7} />
    </g>
    <Star fill={green} size={26} x={112} y={20} />
    <Plus size={22} x={326} y={132} />
    <circle cx={24} cy={40} fill="none" r={9} style={outlineStyle(3)} />
    <circle cx={338} cy={176} fill={red} r={6} style={outlineStyle(3)} />
  </svg>
);
