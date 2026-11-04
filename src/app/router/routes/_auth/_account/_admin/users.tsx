import { createRoute } from "@tanstack/react-router";

import { AccountErrorPage } from "@pages/account-error";
import { AdminUsersPage } from "@pages/admin-users";

import { AppRoute } from "@shared/config";

import { adminLayoutRoute } from "./layout";

export const adminUsersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: AppRoute.AdminUsers,
  component: AdminUsersPage,
  errorComponent: AccountErrorPage,
});
