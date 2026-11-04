import { useTranslation } from "react-i18next";

import type { Session } from "@entities/session";

import { SessionsEmpty } from "../sessions-empty";
import { SessionItem } from "./session-item";
import s from "./sessions-list.module.scss";

interface SessionsListProps {
  sessions: Session[];
}

export const SessionsList = ({ sessions }: SessionsListProps) => {
  const { t } = useTranslation();

  if (sessions.length === 0) return <SessionsEmpty />;

  return (
    <ul aria-label={t("security.sessions")} className={s.list}>
      {sessions.map((session) => (
        <SessionItem key={session.id} session={session} />
      ))}
    </ul>
  );
};
