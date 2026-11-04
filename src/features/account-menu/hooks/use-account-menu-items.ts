import { LogOut, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AppRoute } from "@shared/config";

import type { AccountMenuItemData } from "../types";
import { useAccountMenu } from "./use-account-menu";

export const useAccountMenuItems = (
  onLogout: () => Promise<void>,
  isLoggingOut: boolean,
  extraItems: readonly AccountMenuItemData[] = []
) => {
  const { t } = useTranslation();
  const { hasLogoutError, handleLogout } = useAccountMenu(onLogout);
  const items: AccountMenuItemData[] = [
    {
      id: "profile",
      title: t("settings.profile"),
      icon: UserRound,
      type: "link",
      to: AppRoute.Main,
      disabled: isLoggingOut,
    },
    ...extraItems,
    {
      id: "logout",
      title: isLoggingOut ? t("settings.loggingOut") : t("settings.logout"),
      icon: LogOut,
      type: "action",
      variant: "destructive",
      disabled: isLoggingOut,
      onSelect: (event) => {
        event.preventDefault();
        void handleLogout();
      },
    },
  ];

  return { items, hasLogoutError };
};
