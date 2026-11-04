import { createRootRoute, Outlet } from "@tanstack/react-router";

import { AppProvider } from "@app/providers";

import { NotFoundPage } from "@pages/not-found";
import { RouteErrorPage } from "@pages/route-error";

import { AppRoute } from "@shared/config";
import { LoadingScreen } from "@shared/ui";

import { adminGuard } from "../guards";

export const rootRoute = createRootRoute({
  beforeLoad: async ({ location }) => {
    if (location.pathname === AppRoute.Admin || location.pathname.startsWith(`${AppRoute.Admin}/`)) {
      await adminGuard();
    }
  },
  pendingComponent: () => (
    <AppProvider>
      <LoadingScreen />
    </AppProvider>
  ),
  errorComponent: (props) => (
    <AppProvider>
      <RouteErrorPage {...props} />
    </AppProvider>
  ),
  notFoundComponent: NotFoundPage,
  component: () => {
    return (
      <AppProvider>
        <Outlet />
      </AppProvider>
    );
  },
});
