import { useTranslation } from "react-i18next";

import { UserAvatar } from "@entities/user";

import type { SessionUser } from "@shared/api";
import { formatDate } from "@shared/lib";
import { ModalActions, ResponsiveModal } from "@shared/modal";

import { Badge, Button } from "@id-app/shadcn";

import { ADMIN_USER_DETAIL_DATES, ADMIN_USER_DETAIL_FIELDS } from "../../model/admin-users.const";
import { AdminUsersModel } from "../../model/admin-users.model";
import { UserDetailField } from "./user-detail-field";
import s from "./user-details.module.scss";

interface UserDetailsProps {
  user: SessionUser;
  open: boolean;
  onExitComplete: () => void;
}

export const UserDetails = ({ user, open, onExitComplete }: UserDetailsProps) => {
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveModal
      description={t("adminUsers.detailsDescription", { email: user.email })}
      onClose={AdminUsersModel.closeDetails}
      onExitComplete={onExitComplete}
      open={open}
      title={t("adminUsers.detailsTitle")}
    >
      <dl className={s.fields}>
        <UserDetailField label={t("adminUsers.columns.avatar")}>
          <UserAvatar avatar={user.avatar} className={s.avatar} />
        </UserDetailField>
        {ADMIN_USER_DETAIL_FIELDS.map((field) => (
          <UserDetailField key={field} label={t(`profile.${field}`)}>
            {user[field] || t("profile.unavailable")}
          </UserDetailField>
        ))}
        <UserDetailField label={t("adminUsers.columns.roles")}>
          <div className={s.roles}>
            {user.roles.length > 0
              ? user.roles.map((role) => (
                  <Badge key={role} variant="outline">
                    {t(`adminUsers.roles.${role}`, { defaultValue: role })}
                  </Badge>
                ))
              : t("profile.unavailable")}
          </div>
        </UserDetailField>
        <UserDetailField label={t("adminUsers.columns.emailStatus")}>
          <Badge variant={user.emailConfirmed ? "secondary" : "outline"}>
            {t(user.emailConfirmed ? "profile.confirmed" : "profile.unconfirmed")}
          </Badge>
        </UserDetailField>
        <UserDetailField label={t("adminUsers.columns.blockedStatus")}>
          <Badge variant={user.blocked ? "destructive" : "secondary"}>
            {t(user.blocked ? "adminUsers.blocked" : "adminUsers.active")}
          </Badge>
        </UserDetailField>
        {ADMIN_USER_DETAIL_DATES.map((field) => (
          <UserDetailField key={field} label={t(`profile.${field}`)}>
            <time dateTime={user[field]} title={user[field]}>
              {formatDate(user[field], { language: i18n.language, fallback: t("profile.unavailable") })}
            </time>
          </UserDetailField>
        ))}
      </dl>
      <ModalActions>
        <Button onClick={AdminUsersModel.closeDetails} type="button" variant="outline">
          {t("modal.close")}
        </Button>
      </ModalActions>
    </ResponsiveModal>
  );
};
