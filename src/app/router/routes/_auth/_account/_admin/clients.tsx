import { createRoute } from "@tanstack/react-router";

import { AccountErrorPage } from "@pages/account-error";
import { AdminClientsPage } from "@pages/admin-clients";

import { AppRoute } from "@shared/config";

import { adminLayoutRoute } from "./layout";

export const adminClientsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: AppRoute.AdminClients,
  component: AdminClientsPage,
  errorComponent: AccountErrorPage,
});
