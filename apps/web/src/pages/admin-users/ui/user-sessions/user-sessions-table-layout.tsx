import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { USER_SESSIONS_COLUMNS } from "../../model/user-sessions.const";
import s from "./user-sessions.module.scss";

interface UserSessionsTableLayoutProps {
  children: ReactNode;
  isBusy: boolean;
}

export const UserSessionsTableLayout = ({ children, isBusy }: UserSessionsTableLayoutProps) => {
  const { t } = useTranslation();

  return (
    <div aria-label={t("adminUsers.sessions.title")} className={s.wrapper} role="region" tabIndex={0}>
      <table aria-busy={isBusy} aria-label={t("adminUsers.sessions.title")} className={s.table}>
        <thead>
          <tr>
            {USER_SESSIONS_COLUMNS.map((column) => (
              <th key={column} scope="col">
                {t(`adminUsers.sessions.columns.${column}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
