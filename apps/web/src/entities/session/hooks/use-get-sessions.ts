import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useSession } from "@shared/api";

import { SessionService } from "../api/session.service";
import { SessionQueryKeys } from "../model/query-keys.const";
import type { Session } from "../types";

export const useGetSessions = (options?: Omit<UseQueryOptions<Session[], Error>, "queryKey" | "queryFn">) => {
  const { user, isAuthenticated } = useSession();

  return useQuery({
    enabled: isAuthenticated,
    ...options,
    queryKey: [SessionQueryKeys.GetAll, user?.id],
    queryFn: ({ signal }) => SessionService.getAll({ signal }),
  });
};
