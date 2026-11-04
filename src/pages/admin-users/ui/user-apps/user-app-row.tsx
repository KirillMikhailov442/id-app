import { useTranslation } from "react-i18next";

import { OAuthGrantStatus, type OAuthGrant } from "@entities/oauth-grant";

import { formatDate } from "@shared/lib";

import { Badge } from "@id-app/shadcn";

import { USER_APP_DATE_FIELDS } from "../../model/user-apps.const";

interface UserAppRowProps {
  app: OAuthGrant;
}

export const UserAppRow = ({ app }: UserAppRowProps) => {
  const { t, i18n } = useTranslation();
  const permissions = app.scopes.join(", ") || t("profile.unavailable");

  return (
    <tr>
      <td title={app.clientName}>{app.clientName}</td>
      <td title={permissions}>{permissions}</td>
      {USER_APP_DATE_FIELDS.map((field) => {
        const value = app[field];

        return (
          <td key={field}>
            {value === null ? (
              t("profile.unavailable")
            ) : (
              <time dateTime={value} title={value}>
                {formatDate(value, { language: i18n.language, format: "dateTime", fallback: t("profile.unavailable") })}
              </time>
            )}
          </td>
        );
      })}
      <td>
        <Badge variant={app.status === OAuthGrantStatus.Active ? "secondary" : "outline"}>
          {t(`apps.status.${app.status}`)}
        </Badge>
      </td>
    </tr>
  );
};
