import { ILLUSTRATION_COLORS } from "@shared/ui";

import s from "./consent-illustrations.module.scss";

export const ConsentIllustrationDefs = () => {
  return (
    <svg aria-hidden="true" className={s.definitions} height="0" width="0">
      <defs>
        <path d="M0-110L90-76V10C90 70 45 108 0 130C-45 108-90 70-90 10V-76Z" id="consent-shield" />
        <g id="consent-key">
          <path
            d="M-32 0a32 32 0 1 0 64 0a32 32 0 1 0-64 0ZM-10 0a10 10 0 1 1 20 0a10 10 0 1 1-20 0Z"
            fillRule="evenodd"
          />
          <rect height="22" rx="6" width="150" x="28" y="-11" />
          <rect height="28" rx="4" width="18" x="128" y="9" />
          <rect height="20" rx="4" width="14" x="154" y="9" />
        </g>
        <rect height="100" id="consent-tile" rx="26" width="100" x="-50" y="-50" />
        <rect height="80" id="consent-lockb" rx="16" width="100" x="-50" y="-10" />
        <rect height="160" id="consent-docr" rx="16" width="120" x="-60" y="-80" />
        <symbol id="consent-plus" viewBox="-12 -12 24 24">
          <path className={s.line} d="M0-9V9M-9 0H9" />
        </symbol>
        <symbol id="consent-star" viewBox="-20 -20 40 40">
          <path className={s.outline} d="M0-17Q3-3 17 0Q3 3 0 17Q-3 3-17 0Q-3-3 0-17Z" />
        </symbol>
        <g id="consent-usr">
          <use className={s.outline} fill="var(--foreground)" href="#consent-tile" transform="translate(10 10)" />
          <use className={s.outline} fill={ILLUSTRATION_COLORS.yellow} href="#consent-tile" />
          <circle className={s.outline} cy="-12" fill="#fff" r="16" />
          <path className={s.outline} d="M-30 32a30 22 0 0 1 60 0z" fill="#fff" />
        </g>
        <g id="consent-app">
          <use className={s.outline} fill="var(--foreground)" href="#consent-tile" transform="translate(10 10)" />
          <use className={s.outline} fill={ILLUSTRATION_COLORS.blue} href="#consent-tile" />
          <rect fill="#fff" height="23" rx="7" width="23" x="-28" y="-28" />
          <rect fill="#fff" height="23" rx="7" width="23" x="5" y="-28" />
          <rect fill="#fff" height="23" rx="7" width="23" x="-28" y="5" />
          <rect fill={ILLUSTRATION_COLORS.yellow} height="23" rx="7" width="23" x="5" y="5" />
        </g>
        <g id="consent-arr">
          <path className={s.line} d="M-40-14H36M20-30L38-14L20 2" />
          <path className={s.line} d="M40 22H-36M-20 6L-38 22L-20 38" />
        </g>
        <g id="consent-doc">
          <use className={s.outline} fill="var(--foreground)" href="#consent-docr" transform="translate(10 10)" />
          <use className={s.outline} fill={ILLUSTRATION_COLORS.purple} href="#consent-docr" />
          <g strokeLinecap="round" strokeLinejoin="round">
            <circle className={s.outline} cx="-30" cy="-44" fill={ILLUSTRATION_COLORS.green} r="12" strokeWidth={3} />
            <path d="M-36-44L-31-39L-23-49" fill="none" stroke="#fff" strokeWidth="4" />
            <path className={s.line} d="M-8-44H40" />
            <circle className={s.outline} cx="-30" cy="-4" fill={ILLUSTRATION_COLORS.green} r="12" strokeWidth={3} />
            <path d="M-36-4L-31 1L-23-9" fill="none" stroke="#fff" strokeWidth="4" />
            <path className={s.line} d="M-8-4H40" />
            <circle className={s.outline} cx="-30" cy="36" fill={ILLUSTRATION_COLORS.green} r="12" strokeWidth={3} />
            <path d="M-36 36L-31 41L-23 31" fill="none" stroke="#fff" strokeWidth="4" />
            <path className={s.line} d="M-8 36H30" />
          </g>
        </g>
        <g id="consent-lk">
          <use className={s.outline} fill="var(--foreground)" href="#consent-lockb" transform="translate(8 8)" />
          <path className={s.line} d="M-28-10V-34a28 28 0 0 1 56 0V-10" />
          <use className={s.outline} fill={ILLUSTRATION_COLORS.red} href="#consent-lockb" />
          <circle cy="26" fill="var(--foreground)" r="9" />
          <rect fill="var(--foreground)" height="20" rx="3" width="7" x="-3.5" y="30" />
        </g>
        <g id="consent-shd">
          <use className={s.outline} fill="var(--foreground)" href="#consent-shield" transform="translate(11 11)" />
          <use className={s.outline} fill={ILLUSTRATION_COLORS.green} href="#consent-shield" />
          <path className={s.check} d="M-34 8L-8 34L38-22" />
        </g>
      </defs>
    </svg>
  );
};
