import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { SessionUser } from "@shared/api";

import { UserService } from "../api/user.service";
import { UserQueryKeys } from "../model/query-keys.const";

export const useGetUser = (id: string, options?: Omit<UseQueryOptions<SessionUser, Error>, "queryKey" | "queryFn">) => {
  return useQuery({
    enabled: id.length > 0,
    ...options,
    queryKey: [UserQueryKeys.GetUser, id],
    queryFn: ({ signal }) => UserService.getById(id, { signal }),
  });
};
