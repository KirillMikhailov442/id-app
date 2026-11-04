import { ShieldQuestionMark } from "lucide-react";
import { useTranslation } from "react-i18next";

import { CONSENT_PERMISSIONS } from "../model/consent.const";
import s from "./consent-page.module.scss";

interface ConsentPermissionsProps {
  scopes: string[];
}

export const ConsentPermissions = ({ scopes }: ConsentPermissionsProps) => {
  const { t } = useTranslation();

  return (
    <ul className={s.permissions}>
      {scopes.map((scope) => {
        const permission = CONSENT_PERMISSIONS.find((item) => item.scope === scope);
        const id = permission?.id;
        const Icon = permission?.icon ?? ShieldQuestionMark;

        return (
          <li key={scope} className={s.permission}>
            <Icon aria-hidden className={s.permissionIcon} />
            <div>
              <strong className={s.permissionTitle}>{id ? t(`consent.permissions.${id}.title`) : scope}</strong>
              <span className={s.permissionDescription}>
                {id ? t(`consent.permissions.${id}.description`) : t("consent.unknownScope")}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
