import { useAtomValue } from "jotai";

import { SessionModel } from "../model/session.model";

export const useSession = () => {
  const user = useAtomValue(SessionModel.userAtom);
  const roles = useAtomValue(SessionModel.rolesAtom);
  const accessToken = useAtomValue(SessionModel.accessTokenAtom);
  const isAuthenticated = useAtomValue(SessionModel.isAuthenticatedAtom);

  return { user, roles, accessToken, isAuthenticated };
};
