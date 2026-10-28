import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { SessionUser } from "@shared/api";
import type { PaginationParams, PaginationResponse } from "@shared/types";

import { UserService } from "../api/user.service";
import { UserQueryKeys } from "../model/query-keys.const";

export const useGetAllUsers = (
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<PaginationResponse<SessionUser>, Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    ...options,
    queryKey: [UserQueryKeys.GetAllUsers, params],
    queryFn: ({ signal }) => UserService.getAll(params, { signal }),
  });
};
