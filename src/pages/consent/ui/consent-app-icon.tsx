import s from "./consent-page.module.scss";

export const ConsentAppIcon = () => {
  return (
    <svg aria-hidden className={s.appIcon} fill="none" viewBox="0 0 64 64">
      <rect className={s.appIconShadow} height="52" rx="14" width="52" x="9" y="9" />
      <rect className={s.appIconTile} height="52" rx="14" width="52" x="3" y="3" />
      <rect fill="#fff" height="13" rx="4" width="13" x="12" y="12" />
      <rect fill="#fff" height="13" rx="4" width="13" x="33" y="12" />
      <rect fill="#fff" height="13" rx="4" width="13" x="12" y="33" />
      <rect className={s.appIconAccent} height="13" rx="4" width="13" x="33" y="33" />
    </svg>
  );
};
