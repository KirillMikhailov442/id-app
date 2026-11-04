import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useSession } from "@shared/api";

import { ScopeService } from "../api/scope.service";
import { ScopeQueryKeys } from "../model/query-keys.const";
import type { Scope } from "../types";

export const useGetAllScopes = (options?: Omit<UseQueryOptions<Scope[], Error>, "queryKey" | "queryFn">) => {
  const { user, isAuthenticated } = useSession();

  return useQuery({
    enabled: isAuthenticated,
    ...options,
    queryKey: [ScopeQueryKeys.GetAll, user?.id],
    queryFn: ({ signal }) => ScopeService.getAll({ signal }),
  });
};
