import { createRootRoute, Outlet } from "@tanstack/react-router";

import { AppProvider } from "@app/providers";

import { NotFoundPage } from "@pages/not-found";
import { RouteErrorPage } from "@pages/route-error";

import { LoadingScreen } from "@shared/ui";

export const rootRoute = createRootRoute({
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
