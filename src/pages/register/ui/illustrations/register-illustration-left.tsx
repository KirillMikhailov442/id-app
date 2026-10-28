import { CreditCard, ILLUSTRATION_COLORS, Key, outlineStyle, Plus, Shield, Star, UserBadge } from "@shared/ui";

const { blue, green, red, yellow, purple } = ILLUSTRATION_COLORS;

export const RegisterIllustrationLeft = () => (
  <svg aria-hidden="true" preserveAspectRatio="xMinYMid meet" viewBox="0 0 380 760" xmlns="http://www.w3.org/2000/svg">
    <circle cx={60} cy={570} fill={green} opacity={0.26} r={150} />
    <circle cx={260} cy={130} fill={blue} opacity={0.22} r={90} />
    <path d="M20 50q15-20 30 0t30 0t30 0" fill="none" style={outlineStyle(4)} />
    <Plus size={30} x={310} y={300} />
    <g transform="translate(190 240) rotate(-6) scale(1.12)">
      <CreditCard fill={yellow} />
      <g transform="translate(84 -52)">
        <UserBadge fill={blue} />
      </g>
    </g>
    <g transform="translate(130 500) rotate(8) scale(0.8)">
      <Shield checkPath="M-34 8L-8 34L38-22" fill={red} shadowOffset={11} strokeWidth={5} />
    </g>
    <g transform="translate(80 670) rotate(-14) scale(0.8)">
      <Key fill={blue} shadowOffset={8} strokeWidth={5} />
    </g>
    <Star fill={yellow} size={42} x={40} y={400} />
    <circle cx={320} cy={470} fill="none" r={15} style={outlineStyle(4)} />
    <circle cx={310} cy={640} fill={purple} r={10} style={outlineStyle(4)} />
    <Plus size={26} x={300} y={710} />
  </svg>
);
