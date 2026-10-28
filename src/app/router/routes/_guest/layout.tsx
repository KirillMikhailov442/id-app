import { createRoute } from "@tanstack/react-router";

import { GuestLayout } from "@app/layouts";

import { rootRoute } from "../__root";
import { guestGuard } from "../../guards";

export const guestLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_guest",
  component: GuestLayout,
  beforeLoad: guestGuard,
});
