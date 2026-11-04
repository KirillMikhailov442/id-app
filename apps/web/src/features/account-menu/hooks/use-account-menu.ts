import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { AppRoute } from "@shared/config";

export const useAccountMenu = (logout: () => Promise<void>) => {
  const navigate = useNavigate();
  const [hasLogoutError, setHasLogoutError] = useState(false);

  const handleLogout = async (): Promise<void> => {
    try {
      setHasLogoutError(false);
      await logout();
      await navigate({ to: AppRoute.Login });
    } catch {
      setHasLogoutError(true);
    }
  };

  return { hasLogoutError, handleLogout };
};
