import { redirect } from "@tanstack/react-router";

import { AuthSessionModel, AuthSessionService } from "@features/auth-session";

import { SessionModel } from "@shared/api";
import { AppRoute } from "@shared/config";
import { jotaiStore } from "@shared/lib";

export const authGuard = async (): Promise<void> => {
  await AuthSessionService.initialize();

  const error = jotaiStore.get(AuthSessionModel.errorAtom);

  if (error !== null) {
    throw error;
  }

  if (!jotaiStore.get(SessionModel.isAuthenticatedAtom)) {
    throw redirect({ to: AppRoute.Login });
  }
};
