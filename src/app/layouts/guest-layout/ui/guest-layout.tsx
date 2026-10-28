import { Outlet } from "@tanstack/react-router";

import { SettingsBar } from "@widgets/settings-bar";

export const GuestLayout = () => {
  return (
    <>
      <SettingsBar />
      <Outlet />
    </>
  );
};
