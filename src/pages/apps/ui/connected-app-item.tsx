import { useTranslation } from "react-i18next";

import { formatDate } from "@shared/lib";

import { Button } from "@id-app/shadcn";

import { useRevokeAppAccess } from "../hooks/use-revoke-app-access";
import type { ConnectedApp } from "../types";
import s from "./apps-page.module.scss";

interface ConnectedAppItemProps {
  app: ConnectedApp;
}

export const ConnectedAppItem = ({ app }: ConnectedAppItemProps) => {
  const { t, i18n } = useTranslation();
  const revokeAccess = useRevokeAppAccess();
  const permissions = app.permissions.map((permission) => t(`apps.permissions.${permission}`)).join(", ");

  return (
    <li className={s.item}>
      <span aria-hidden="true" className={s.icon}>
        {app.name.charAt(0)}
      </span>
      <div className={s.details}>
        <h2 className={s.name}>{app.name}</h2>
        <p className={s.description}>{t("apps.access", { permissions })}</p>
        <p className={s.date}>
          {t("apps.connectedSince")}{" "}
          <time dateTime={app.connectedAt}>
            {formatDate(app.connectedAt, { language: i18n.language, format: "short", utc: true })}
          </time>
        </p>
      </div>
      <Button
        aria-label={t("apps.revokeLabel", { name: app.name })}
        className={s.revoke}
        onClick={() => void revokeAccess(app.name)}
        type="button"
        variant="outline"
      >
        {t("apps.revoke")}
      </Button>
    </li>
  );
};
