import { createRoute } from "@tanstack/react-router";

import { AccountLayout } from "@app/layouts";

import { authLayoutRoute } from "../layout";

export const accountLayoutRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  id: "_account",
  component: AccountLayout,
});
