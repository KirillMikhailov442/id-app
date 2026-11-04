import { notFound } from "@tanstack/react-router";

import { AuthSessionService } from "@features/auth-session";

import { SessionModel, UserRole } from "@shared/api";
import { jotaiStore } from "@shared/lib";

export const adminGuard = async (): Promise<void> => {
  await AuthSessionService.initialize();

  if (!jotaiStore.get(SessionModel.rolesAtom).includes(UserRole.Admin)) {
    throw notFound({ global: true });
  }
};
