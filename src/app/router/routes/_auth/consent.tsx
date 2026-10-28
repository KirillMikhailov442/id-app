import { createRoute } from "@tanstack/react-router";

import { ConsentPage } from "@pages/consent";

import { AppRoute } from "@shared/config";

import { authLayoutRoute } from "./layout";

export const consentRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: AppRoute.Consent,
  component: ConsentPage,
});
