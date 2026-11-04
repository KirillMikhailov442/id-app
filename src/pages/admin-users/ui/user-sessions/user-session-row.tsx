import { useTranslation } from "react-i18next";

import type { Session } from "@entities/session";

import { formatDate } from "@shared/lib";

import { Badge, Button } from "@id-app/shadcn";

import { isUserSessionActive } from "../../lib/is-user-session-active";
import { USER_SESSION_DATE_FIELDS } from "../../model/user-sessions.const";
import s from "./user-sessions.module.scss";

interface UserSessionRowProps {
  session: Session;
  disabled: boolean;
  onRevoke: (session: Session) => Promise<void>;
}

export const UserSessionRow = ({ session, disabled, onRevoke }: UserSessionRowProps) => {
  const { t, i18n } = useTranslation();
  const active = isUserSessionActive(session);
  const status = session.revokedAt !== null ? "revokedStatus" : active ? "activeStatus" : "expiredStatus";

  return (
    <tr>
      <td title={session.id}>{session.id}</td>
      <td title={session.browser ?? undefined}>{session.browser ?? t("profile.unavailable")}</td>
      <td title={session.os ?? undefined}>{session.os ?? t("profile.unavailable")}</td>
      <td title={session.deviceType ?? undefined}>{session.deviceType ?? t("profile.unavailable")}</td>
      <td title={session.ip}>{session.ip}</td>
      {USER_SESSION_DATE_FIELDS.map((field) => (
        <td key={field}>
          <time dateTime={session[field]} title={session[field]}>
            {formatDate(session[field], {
              language: i18n.language,
              format: "dateTime",
              fallback: t("profile.unavailable"),
            })}
          </time>
        </td>
      ))}
      <td>
        <div className={s.badges}>
          <Badge title={session.revokedAt ?? undefined} variant={active ? "secondary" : "outline"}>
            {t(`adminUsers.sessions.${status}`)}
          </Badge>
          {session.isCurrent && <Badge variant="outline">{t("adminUsers.sessions.current")}</Badge>}
        </div>
      </td>
      <td>
        <Button
          disabled={disabled || !active}
          onClick={() => void onRevoke(session)}
          size="sm"
          type="button"
          variant="outline"
        >
          {t("adminUsers.sessions.revoke")}
        </Button>
      </td>
    </tr>
  );
};
