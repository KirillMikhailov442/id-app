import { createRoute } from "@tanstack/react-router";

import { AuthLayout } from "@app/layouts";

import { rootRoute } from "../__root";
import { authGuard } from "../../guards";

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_auth",
  component: AuthLayout,
  beforeLoad: authGuard,
});
