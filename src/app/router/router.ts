import { createRouter } from "@tanstack/react-router";

import { LoadingPage } from "@pages/loading";
import { NotFoundPage } from "@pages/not-found";
import { RouteErrorPage } from "@pages/route-error";

import { routeTree } from "./routes";

export const router = createRouter({
  routeTree,
  defaultPendingComponent: LoadingPage,
  defaultErrorComponent: RouteErrorPage,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
