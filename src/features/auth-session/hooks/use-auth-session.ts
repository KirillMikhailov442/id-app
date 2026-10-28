import { useAtomValue } from "jotai";

import { AuthSessionService } from "../api/auth-session.service";
import { AuthSessionModel } from "../model/auth-session.model";

export const useAuthSession = () => {
  const status = useAtomValue(AuthSessionModel.statusAtom);
  const error = useAtomValue(AuthSessionModel.errorAtom);
  const isLoggingOut = useAtomValue(AuthSessionModel.isLoggingOutAtom);

  return {
    status,
    error,
    isLoggingOut,
    initialize: AuthSessionService.initialize,
    completeLogin: AuthSessionService.completeLogin,
    completeRegistration: AuthSessionService.completeRegistration,
    logout: AuthSessionService.logout,
    logoutAll: AuthSessionService.logoutAll,
  };
};
