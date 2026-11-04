import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { SessionUser } from "@shared/api";
import type { PaginationResponse } from "@shared/types";

import { UserService } from "../api/user.service";
import { UserQueryKeys } from "../model/query-keys.const";
import type { GetUsersParams } from "../types";

export const useGetAllUsers = (
  params?: GetUsersParams,
  options?: Omit<UseQueryOptions<PaginationResponse<SessionUser>, Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    ...options,
    queryKey: [UserQueryKeys.GetAllUsers, params],
    queryFn: ({ signal }) => UserService.getAll(params, { signal }),
  });
};
