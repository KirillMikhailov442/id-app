import { createRoute } from "@tanstack/react-router";

import { LoginPage } from "@pages/login";

import { AppRoute } from "@shared/config";

import { guestLayoutRoute } from "./layout";

export const loginRoute = createRoute({
  getParentRoute: () => guestLayoutRoute,
  path: AppRoute.Login,
  component: LoginPage,
});
