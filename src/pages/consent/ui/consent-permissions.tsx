import { clsx } from "clsx";
import { useTranslation } from "react-i18next";

import { CONSENT_PERMISSIONS } from "../model/consent.const";
import s from "./consent-page.module.scss";

export const ConsentPermissions = () => {
  const { t } = useTranslation();

  return (
    <ul className={s.permissions}>
      {CONSENT_PERMISSIONS.map(({ id, icon: Icon }) => (
        <li key={id} className={s.permission}>
          <span className={clsx(s.permissionIcon, s[id])}>
            <Icon aria-hidden size={20} />
          </span>
          <div>
            <strong className={s.permissionTitle}>{t(`consent.permissions.${id}.title`)}</strong>
            <span className={s.permissionDescription}>{t(`consent.permissions.${id}.description`)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
