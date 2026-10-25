import { createRoute } from "@tanstack/react-router";

import { MainPage } from "@pages/main";

import { AppRoute } from "@shared/config";

import { rootRoute } from "./__root";

export const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppRoute.Main,
  component: MainPage,
});
