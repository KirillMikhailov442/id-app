import { Boxes, Grid2X2, KeyRound, Shield, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { useTranslation } from "react-i18next";

import { UserRole, useSession } from "@shared/api";
import { AppRoute } from "@shared/config";

import type { SidebarNavigationGroup } from "../types";

export const useAccountNavigation = (): SidebarNavigationGroup[] => {
  const { t } = useTranslation();
  const { roles } = useSession();
  const groups: SidebarNavigationGroup[] = [
    {
      id: "account",
      label: t("account.groups.account"),
      items: [
        { to: AppRoute.Main, label: t("account.profile"), icon: UserRound },
        { to: AppRoute.Security, label: t("account.security"), icon: ShieldCheck },
        { to: AppRoute.Apps, label: t("account.apps"), icon: Grid2X2 },
        { to: AppRoute.Clients, label: t("account.clients"), icon: KeyRound },
      ],
    },
  ];

  if (roles.includes(UserRole.Admin)) {
    groups.push({
      id: "administration",
      label: t("account.groups.administration"),
      dropdownIcon: Shield,
      items: [
        { to: AppRoute.AdminUsers, label: t("account.users"), icon: UsersRound },
        { to: AppRoute.AdminClients, label: t("account.adminClients"), icon: Boxes },
      ],
    });
  }

  return groups;
};
