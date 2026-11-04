import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useAccountMenu } from "@features/account-menu";
import { useAuthSession } from "@features/auth-session";
import { EditProfile } from "@features/edit-profile";

import type { SessionUser } from "@shared/api";

import { Button } from "@id-app/shadcn";

import s from "./profile-actions.module.scss";

interface ProfileActionsProps {
  user: SessionUser;
}

export const ProfileActions = ({ user }: ProfileActionsProps) => {
  const { t } = useTranslation();
  const { logout, isLoggingOut } = useAuthSession();
  const { handleLogout, hasLogoutError } = useAccountMenu(logout);

  return (
    <div className={s.actions}>
      <div className={s.buttons}>
        <EditProfile disabled={isLoggingOut} user={user} />
        <Button disabled={isLoggingOut} onClick={() => void handleLogout()} type="button" variant="ghost">
          <LogOut aria-hidden="true" />
          {t(isLoggingOut ? "settings.loggingOut" : "account.logout")}
        </Button>
      </div>
      {hasLogoutError && (
        <p className={s.error} role="alert">
          {t("settings.logoutError")}
        </p>
      )}
    </div>
  );
};
