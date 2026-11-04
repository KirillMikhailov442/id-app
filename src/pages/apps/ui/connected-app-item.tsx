import { useTranslation } from "react-i18next";

import { OAuthGrantStatus, type OAuthGrant } from "@entities/oauth-grant";

import { formatDate } from "@shared/lib";

import { Badge, Button } from "@id-app/shadcn";

import { useRevokeAppAccess } from "../hooks/use-revoke-app-access";
import { APP_PERMISSIONS } from "../model/apps.const";
import s from "./apps-page.module.scss";

interface ConnectedAppItemProps {
  app: OAuthGrant;
}

export const ConnectedAppItem = ({ app }: ConnectedAppItemProps) => {
  const { t, i18n } = useTranslation();
  const { revokeAccess, isPending } = useRevokeAppAccess();
  const permissions = app.scopes
    .map((scope) => {
      const permission = APP_PERMISSIONS.find((item) => item.scope === scope);

      return permission === undefined ? scope : t(`apps.permissions.${permission.id}`);
    })
    .join(", ");

  return (
    <li className={s.item}>
      <span aria-hidden="true" className={s.icon}>
        {app.clientName.charAt(0)}
      </span>
      <div className={s.details}>
        <div className={s.heading}>
          <h2 className={s.name}>{app.clientName}</h2>
          <Badge variant="secondary">{t(`apps.status.${app.status}`)}</Badge>
        </div>
        <p className={s.description}>{t("apps.access", { permissions })}</p>
        <p className={s.date}>
          {t("apps.connectedSince")}{" "}
          <time dateTime={app.createdAt}>
            {formatDate(app.createdAt, { language: i18n.language, format: "short" })}
          </time>
        </p>
      </div>
      {app.status === OAuthGrantStatus.Active && (
        <Button
          aria-label={t("apps.revokeLabel", { name: app.clientName })}
          className={s.revoke}
          disabled={isPending}
          onClick={() => void revokeAccess(app)}
          type="button"
          variant="outline"
        >
          {t(isPending ? "apps.revoking" : "apps.revoke")}
        </Button>
      )}
    </li>
  );
};
