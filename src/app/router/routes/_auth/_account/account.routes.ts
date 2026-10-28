import { createRoute } from "@tanstack/react-router";

import { AccountErrorPage } from "@pages/account-error";
import { AppsPage } from "@pages/apps";
import { ClientsLoading, ClientsPage } from "@pages/clients";
import { ProfilePage } from "@pages/profile";
import { SecurityPage } from "@pages/security";

import { AppRoute } from "@shared/config";

import { accountLayoutRoute } from "./layout";

const accountPages = {
  [AppRoute.Main]: ProfilePage,
  [AppRoute.Security]: SecurityPage,
  [AppRoute.Apps]: AppsPage,
  [AppRoute.Clients]: ClientsPage,
};

const accountRoutes = [AppRoute.Main, AppRoute.Security, AppRoute.Apps, AppRoute.Clients].map((path) =>
  createRoute({
    getParentRoute: () => accountLayoutRoute,
    path,
    component: accountPages[path],
    errorComponent: AccountErrorPage,
    pendingComponent: path === AppRoute.Clients ? ClientsLoading : undefined,
  })
);

export const accountRoute = accountLayoutRoute.addChildren(accountRoutes);
