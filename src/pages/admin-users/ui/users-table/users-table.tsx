import { useTranslation } from "react-i18next";

import type { SessionUser } from "@shared/api";

import { Skeleton } from "@id-app/shadcn";

import { ADMIN_USERS_COLUMNS, ADMIN_USERS_SKELETON_ROWS } from "../../model/admin-users.const";
import { UserRow } from "../user-row/user-row";
import s from "./users-table.module.scss";

interface UsersTableProps {
  users: SessionUser[];
  loading?: boolean;
  isFetching?: boolean;
}

export const UsersTable = ({ users, loading = false, isFetching = false }: UsersTableProps) => {
  const { t } = useTranslation();

  return (
    <div aria-label={t("adminUsers.title")} className={s.wrapper} role="region" tabIndex={0}>
      <table aria-busy={loading || isFetching} aria-label={t("adminUsers.title")} className={s.table}>
        <thead>
          <tr>
            {ADMIN_USERS_COLUMNS.map((column) => (
              <th key={column} scope="col">
                {t(`adminUsers.columns.${column}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? ADMIN_USERS_SKELETON_ROWS.map((row) => (
                <tr key={row}>
                  {ADMIN_USERS_COLUMNS.map((column) => (
                    <td key={column}>
                      <Skeleton className={s.skeleton} />
                    </td>
                  ))}
                </tr>
              ))
            : users.map((user) => <UserRow key={user.id} user={user} />)}
        </tbody>
      </table>
    </div>
  );
};
