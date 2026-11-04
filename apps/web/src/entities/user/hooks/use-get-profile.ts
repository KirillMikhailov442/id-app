import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useSession, type SessionUser } from "@shared/api";

import { UserService } from "../api/user.service";
import { UserQueryKeys } from "../model/query-keys.const";

export const useGetProfile = (options?: Omit<UseQueryOptions<SessionUser, Error>, "queryKey" | "queryFn">) => {
  const { user, isAuthenticated } = useSession();

  return useQuery({
    enabled: isAuthenticated,
    ...options,
    queryKey: [UserQueryKeys.Profile, user?.id],
    queryFn: ({ signal }) => UserService.getProfile({ signal }),
  });
};
