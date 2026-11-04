import { Skeleton } from "@id-app/shadcn";

import { ADMIN_USERS_SKELETON_ROWS } from "../../model/admin-users.const";
import { USER_SESSIONS_COLUMNS } from "../../model/user-sessions.const";
import { UserSessionsTableLayout } from "./user-sessions-table-layout";
import s from "./user-sessions.module.scss";

export const UserSessionsLoading = () => (
  <UserSessionsTableLayout isBusy>
    {ADMIN_USERS_SKELETON_ROWS.map((row) => (
      <tr key={row}>
        {USER_SESSIONS_COLUMNS.map((column) => (
          <td key={column}>
            <Skeleton className={s.skeleton} />
          </td>
        ))}
      </tr>
    ))}
  </UserSessionsTableLayout>
);
