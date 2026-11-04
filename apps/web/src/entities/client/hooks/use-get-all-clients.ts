import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { PaginationResponse } from "@shared/types";

import { ClientService } from "../api/client.service";
import { ClientQueryKeys } from "../model/query-keys.const";
import type { Client, GetClientsParams } from "../types";

export const useGetAllClients = (
  params?: GetClientsParams,
  options?: Omit<UseQueryOptions<PaginationResponse<Client>, Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    ...options,
    queryKey: [ClientQueryKeys.ListAll, params],
    queryFn: ({ signal }) => ClientService.listAll(params, { signal }),
  });
};
