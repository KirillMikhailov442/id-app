import { ILLUSTRATION_COLORS } from "@shared/ui";

import s from "./consent-illustrations.module.scss";

export const ConsentIllustrationHero = () => {
  return (
    <svg viewBox="0 0 360 190">
      <circle cx="80" cy="100" fill={ILLUSTRATION_COLORS.purple} opacity=".3" r="62" />
      <circle cx="300" cy="90" fill={ILLUSTRATION_COLORS.green} opacity=".26" r="56" />
      <g className={s.heavy} transform="translate(180 84) rotate(-3) scale(.5)">
        <g transform="translate(-105 0)">
          <use href="#consent-usr" />
        </g>
        <use href="#consent-arr" />
        <g transform="translate(105 0)">
          <use href="#consent-app" />
        </g>
      </g>
      <g className={s.heavy} transform="translate(306 92) rotate(6) scale(.56)">
        <use href="#consent-doc" />
      </g>
      <g className={s.heavy} transform="translate(70 150) rotate(-8) scale(.45)">
        <use href="#consent-lk" />
      </g>
      <g className={s.heavy} transform="translate(150 166) rotate(-12) scale(.42)">
        <use className={s.outline} fill="var(--foreground)" href="#consent-key" transform="translate(8 8)" />
        <use className={s.outline} fill={ILLUSTRATION_COLORS.yellow} href="#consent-key" />
      </g>
      <use fill={ILLUSTRATION_COLORS.red} height="26" href="#consent-star" width="26" x="22" y="22" />
      <use height="22" href="#consent-plus" width="22" x="326" y="16" />
      <circle className={s.outline} cx="250" cy="170" fill="none" r="8" strokeWidth={3} />
    </svg>
  );
};
