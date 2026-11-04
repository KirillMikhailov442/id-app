import { Outlet } from "@tanstack/react-router";

import { AccountHeader } from "@widgets/account-header";
import { AccountSidebar } from "@widgets/account-sidebar";
import { SettingsBar } from "@widgets/settings-bar";

import { AccountMenu } from "@features/account-menu";
import { useAuthSession } from "@features/auth-session";

import { useSession } from "@shared/api";

import s from "./account-layout.module.scss";

export const AccountLayout = () => {
  const { user } = useSession();
  const { logout, isLoggingOut } = useAuthSession();

  return (
    <div className={s.layout}>
      <AccountHeader>
        <SettingsBar variant="header">
          {user !== null && <AccountMenu isLoggingOut={isLoggingOut} onLogout={logout} user={user} />}
        </SettingsBar>
      </AccountHeader>
      <div className={s.shell}>
        <AccountSidebar />
        <main className={s.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
