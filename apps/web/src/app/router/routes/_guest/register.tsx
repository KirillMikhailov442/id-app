import { createRoute } from "@tanstack/react-router";

import { RegisterPage } from "@pages/register";

import { AppRoute } from "@shared/config";

import { guestLayoutRoute } from "./layout";

export const registerRoute = createRoute({
  getParentRoute: () => guestLayoutRoute,
  path: AppRoute.Register,
  component: RegisterPage,
});
