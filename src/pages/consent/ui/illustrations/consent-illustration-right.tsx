import { ILLUSTRATION_COLORS } from "@shared/ui";

import s from "./consent-illustrations.module.scss";

export const ConsentIllustrationRight = () => {
  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 380 760">
      <circle cx="300" cy="150" fill={ILLUSTRATION_COLORS.blue} opacity=".22" r="80" />
      <circle cx="110" cy="600" fill={ILLUSTRATION_COLORS.green} opacity=".24" r="140" />
      <path className={s.line} d="M230 720q15-20 30 0t30 0t30 0" />
      <use height="28" href="#consent-plus" width="28" x="50" y="90" />
      <g transform="translate(200 270) rotate(6) scale(1.15)">
        <use href="#consent-doc" />
      </g>
      <g transform="translate(150 560) rotate(-8) scale(.95)">
        <use href="#consent-lk" />
      </g>
      <g transform="translate(290 650) rotate(8) scale(.55)">
        <use href="#consent-app" />
      </g>
      <use fill={ILLUSTRATION_COLORS.yellow} height="44" href="#consent-star" width="44" x="40" y="440" />
      <circle className={s.outline} cx="330" cy="470" fill={ILLUSTRATION_COLORS.purple} r="12" />
      <circle className={s.outline} cx="40" cy="250" fill="none" r="14" />
    </svg>
  );
};
