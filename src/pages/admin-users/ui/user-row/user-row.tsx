import { useTranslation } from "react-i18next";

import { UserAvatar } from "@entities/user";

import { UserRole, type SessionUser } from "@shared/api";
import { formatDate } from "@shared/lib";

import { Badge } from "@id-app/shadcn";

import { UserActionsMenu } from "../user-actions-menu/user-actions-menu";
import s from "./user-row.module.scss";

interface UserRowProps {
  user: SessionUser;
}

export const UserRow = ({ user }: UserRowProps) => {
  const { t, i18n } = useTranslation();
  const role = user.roles.includes(UserRole.Admin) ? UserRole.Admin : user.roles[0];

  return (
    <tr>
      <td>
        <UserAvatar avatar={user.avatar} className={s.avatar} />
      </td>
      <td title={user.name}>{user.name}</td>
      <td title={user.surname}>{user.surname}</td>
      <td title={user.email}>{user.email}</td>
      <td>
        {role !== undefined ? (
          <Badge className={s.badge} variant="outline">
            {t(`adminUsers.roles.${role}`, { defaultValue: role })}
          </Badge>
        ) : (
          t("profile.unavailable")
        )}
      </td>
      <td>
        <Badge className={s.badge} variant={user.emailConfirmed ? "secondary" : "outline"}>
          {t(user.emailConfirmed ? "profile.confirmed" : "profile.unconfirmed")}
        </Badge>
      </td>
      <td>
        <Badge className={s.badge} variant={user.blocked ? "destructive" : "secondary"}>
          {t(user.blocked ? "adminUsers.blocked" : "adminUsers.active")}
        </Badge>
      </td>
      <td>
        <time dateTime={user.createdAt}>
          {formatDate(user.createdAt, { language: i18n.language, fallback: t("profile.unavailable") })}
        </time>
      </td>
      <td className={s.actions}>
        <UserActionsMenu user={user} />
      </td>
    </tr>
  );
};
