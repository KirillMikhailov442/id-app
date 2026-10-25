import { Router } from "@tanstack/react-router";

import { rootRoute } from "./routes";

export const router = new Router({
  routeTree: rootRoute,
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
