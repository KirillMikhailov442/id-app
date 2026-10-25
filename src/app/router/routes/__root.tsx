import { createRootRoute, Outlet } from "@tanstack/react-router";

import { AppProvider } from "@app/providers";

import { mainRoute } from "./main";

export const rootRoute = createRootRoute({
  component: () => {
    return (
      <AppProvider>
        <Outlet />
      </AppProvider>
    );
  },
});
rootRoute.addChildren([mainRoute]);
