import { useTranslation } from "react-i18next";

import type { OAuthGrant } from "@entities/oauth-grant";

import { USER_APPS_COLUMNS } from "../../model/user-apps.const";
import { UserAppRow } from "./user-app-row";
import { UserAppsLoading } from "./user-apps-loading";
import s from "./user-apps.module.scss";

interface UserAppsTableProps {
  apps: OAuthGrant[];
  loading: boolean;
  isFetching: boolean;
}

export const UserAppsTable = ({ apps, loading, isFetching }: UserAppsTableProps) => {
  const { t } = useTranslation();

  return (
    <div aria-label={t("adminUsers.apps.title")} className={s.wrapper} role="region" tabIndex={0}>
      <table aria-busy={loading || isFetching} aria-label={t("adminUsers.apps.title")} className={s.table}>
        <thead>
          <tr>
            {USER_APPS_COLUMNS.map((column) => (
              <th key={column} scope="col">
                {t(`adminUsers.apps.columns.${column}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{loading ? <UserAppsLoading /> : apps.map((app) => <UserAppRow key={app.id} app={app} />)}</tbody>
      </table>
    </div>
  );
};
