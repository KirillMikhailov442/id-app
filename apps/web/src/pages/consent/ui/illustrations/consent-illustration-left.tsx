import { ILLUSTRATION_COLORS } from "@shared/ui";

import s from "./consent-illustrations.module.scss";

export const ConsentIllustrationLeft = () => {
  return (
    <svg preserveAspectRatio="xMinYMid meet" viewBox="0 0 380 760">
      <circle cx="60" cy="590" fill={ILLUSTRATION_COLORS.purple} opacity=".26" r="150" />
      <circle cx="250" cy="110" fill={ILLUSTRATION_COLORS.yellow} opacity=".24" r="90" />
      <path className={s.line} d="M20 60q15-20 30 0t30 0t30 0" />
      <use height="30" href="#consent-plus" width="30" x="310" y="400" />
      <g transform="translate(190 270) rotate(-4) scale(1.02)">
        <g transform="translate(-105 0)">
          <use href="#consent-usr" />
        </g>
        <use href="#consent-arr" />
        <g transform="translate(105 0)">
          <use href="#consent-app" />
        </g>
      </g>
      <g transform="translate(200 530) rotate(6) scale(.85)">
        <use href="#consent-shd" />
      </g>
      <g transform="translate(70 690) rotate(-12) scale(.75)">
        <use className={s.outline} fill="var(--foreground)" href="#consent-key" transform="translate(8 8)" />
        <use className={s.outline} fill={ILLUSTRATION_COLORS.yellow} href="#consent-key" />
      </g>
      <use fill={ILLUSTRATION_COLORS.red} height="42" href="#consent-star" width="42" x="40" y="430" />
      <circle className={s.outline} cx="330" cy="560" fill="none" r="14" />
      <circle className={s.outline} cx="320" cy="700" fill={ILLUSTRATION_COLORS.blue} r="10" />
    </svg>
  );
};
