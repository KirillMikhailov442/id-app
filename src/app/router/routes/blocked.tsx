import { createRoute } from "@tanstack/react-router";

import { BlockedPage } from "@pages/blocked";

import { AppRoute } from "@shared/config";

import { rootRoute } from "./__root";

export const blockedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppRoute.Blocked,
  component: BlockedPage,
});
