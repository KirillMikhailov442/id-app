import { useTranslation } from "react-i18next";

import type { Session } from "@entities/session";

import { formatDate } from "@shared/lib";

import { Badge, Button } from "@id-app/shadcn";

import { useConfirmSessionLogout } from "../../../../hooks/use-confirm-session-logout";
import { SessionIcon } from "../session-icon";
import s from "./session-item.module.scss";

interface SessionItemProps {
  session: Session;
}

export const SessionItem = ({ session }: SessionItemProps) => {
  const { t, i18n } = useTranslation();
  const { confirmLogout, isPending } = useConfirmSessionLogout();
  const deviceType = session.deviceType?.trim().replace(/^./, (character) => character.toUpperCase());
  const browser = [session.browser, deviceType].filter(Boolean).join(" ");
  const device = [browser, session.os].filter(Boolean).join(" · ") || t("security.unknownDevice");

  return (
    <li className={s.item}>
      <SessionIcon browser={session.browser} os={session.os} />
      <div className={s.details}>
        <div className={s.heading}>
          <h3 className={s.name}>{device}</h3>
          {session.isCurrent && <Badge>{t("security.current")}</Badge>}
        </div>
        <p className={s.date}>
          {t("security.createdAt")}
          {": "}
          <time dateTime={session.createdAt}>
            {formatDate(session.createdAt, { language: i18n.language, format: "short" })}
          </time>
        </p>
        <p className={s.date}>
          {t("security.lastUsedAt")}
          {": "}
          <time dateTime={session.lastUsedAt}>
            {formatDate(session.lastUsedAt, { language: i18n.language, format: "short" })}
          </time>
        </p>
      </div>
      {!session.isCurrent && (
        <Button
          aria-label={t("security.endSessionLabel", { device })}
          className={s.logout}
          disabled={isPending}
          onClick={() => void confirmLogout(session, device)}
          type="button"
          variant="outline"
        >
          {t(isPending ? "settings.loggingOut" : "security.endSession")}
        </Button>
      )}
    </li>
  );
};
