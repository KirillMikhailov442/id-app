import { useAtomValue } from "jotai";

import { SessionModel } from "../session.model";

export const useSession = () => {
  const user = useAtomValue(SessionModel.userAtom);
  const accessToken = useAtomValue(SessionModel.accessTokenAtom);
  const isAuthenticated = useAtomValue(SessionModel.isAuthenticatedAtom);

  return { user, accessToken, isAuthenticated };
};
