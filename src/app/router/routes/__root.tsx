import { createRootRoute, Outlet } from "@tanstack/react-router";

import { AppProvider } from "@app/providers";

import { LoadingPage } from "@pages/loading";
import { NotFoundPage } from "@pages/not-found";
import { RouteErrorPage } from "@pages/route-error";

export const rootRoute = createRootRoute({
  pendingComponent: () => (
    <AppProvider>
      <LoadingPage />
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
