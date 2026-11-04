import { createRoute, Outlet } from "@tanstack/react-router";

import { AppRoute } from "@shared/config";

import { accountLayoutRoute } from "../layout";

export const adminLayoutRoute = createRoute({
  getParentRoute: () => accountLayoutRoute,
  id: AppRoute.Admin,
  component: Outlet,
});
