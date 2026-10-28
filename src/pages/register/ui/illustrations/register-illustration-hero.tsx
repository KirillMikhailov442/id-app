import {
  CreditCard,
  Envelope,
  ILLUSTRATION_COLORS,
  Key,
  outlineStyle,
  Plus,
  SpeechBubble,
  Star,
  UserBadge,
} from "@shared/ui";

const { blue, green, red, yellow, purple } = ILLUSTRATION_COLORS;

export const RegisterIllustrationHero = () => (
  <svg aria-hidden="true" viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg">
    <circle cx={70} cy={112} fill={green} opacity={0.3} r={62} />
    <circle cx={300} cy={84} fill={blue} opacity={0.22} r={56} />
    <g transform="translate(70 104) rotate(-8) scale(0.6)">
      <CreditCard fill={yellow} strokeWidth={6.5} />
      <g transform="translate(82 -50)">
        <UserBadge fill={blue} strokeWidth={6.5} />
      </g>
    </g>
    <g transform="translate(190 92) rotate(5) scale(0.62)">
      <Envelope badgeFill={green} fill={purple} strokeWidth={6.5} />
    </g>
    <g transform="translate(296 66) rotate(-6) scale(0.5)">
      <SpeechBubble fill={red} strokeWidth={6.5} />
    </g>
    <g transform="translate(236 156) rotate(-18) scale(0.45)">
      <Key fill={yellow} shadowOffset={8} strokeWidth={8} />
    </g>
    <Star fill={red} size={26} x={116} y={14} />
    <Plus size={22} x={326} y={132} />
    <circle cx={22} cy={40} fill="none" r={9} style={outlineStyle(3)} />
    <circle cx={340} cy={176} fill={red} r={6} style={outlineStyle(3)} />
  </svg>
);
