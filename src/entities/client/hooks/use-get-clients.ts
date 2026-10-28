import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useSession } from "@shared/api";
import type { PaginationParams, PaginationResponse } from "@shared/types";

import { ClientService } from "../api/client.service";
import { ClientQueryKeys } from "../model/query-keys.const";
import type { ClientWithScopes } from "../types";

export const useGetClients = (
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<PaginationResponse<ClientWithScopes>, Error>, "queryKey" | "queryFn">
) => {
  const { user, isAuthenticated } = useSession();

  return useQuery({
    enabled: isAuthenticated,
    ...options,
    queryKey: [ClientQueryKeys.GetAll, user?.id, params],
    queryFn: ({ signal }) => ClientService.getAll(params, { signal }),
  });
};
