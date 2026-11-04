import { createRouter } from "@tanstack/react-router";

import { NotFoundPage } from "@pages/not-found";
import { RouteErrorPage } from "@pages/route-error";

import { LoadingScreen } from "@shared/ui";

import { DEFAULT_PENDING_MS } from "./router.const";
import { routeTree } from "./routes";

export const router = createRouter({
  routeTree,
  defaultPendingMs: DEFAULT_PENDING_MS,
  defaultPendingComponent: LoadingScreen,
  defaultErrorComponent: RouteErrorPage,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
