import { Skeleton } from "@id-app/shadcn";

import { ADMIN_USERS_SKELETON_ROWS } from "../../model/admin-users.const";
import { USER_APPS_COLUMNS } from "../../model/user-apps.const";
import s from "./user-apps.module.scss";

export const UserAppsLoading = () =>
  ADMIN_USERS_SKELETON_ROWS.map((row) => (
    <tr key={row}>
      {USER_APPS_COLUMNS.map((column) => (
        <td key={column}>
          <Skeleton className={s.skeleton} />
        </td>
      ))}
    </tr>
  ));
