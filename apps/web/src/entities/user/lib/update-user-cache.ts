import type { QueryClient } from "@tanstack/react-query";

import { SessionModel, type SessionUser } from "@shared/api";
import { jotaiStore } from "@shared/lib";

import { UserQueryKeys } from "../model/query-keys.const";

export const updateUserCache = async (queryClient: QueryClient, user: SessionUser): Promise<void> => {
  await Promise.all([
    queryClient.cancelQueries({ queryKey: [UserQueryKeys.Profile, user.id] }),
    queryClient.cancelQueries({ queryKey: [UserQueryKeys.GetUser, user.id] }),
    queryClient.cancelQueries({ queryKey: [UserQueryKeys.GetAllUsers] }),
  ]);

  queryClient.setQueryData([UserQueryKeys.Profile, user.id], user);
  queryClient.setQueryData([UserQueryKeys.GetUser, user.id], user);

  if (jotaiStore.get(SessionModel.userAtom)?.id === user.id) {
    SessionModel.setUser(user);
  }

  await queryClient.invalidateQueries({ queryKey: [UserQueryKeys.GetAllUsers] });
};
