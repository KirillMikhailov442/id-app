import { useQuery } from "@tanstack/react-query";

import { AdminSessionService } from "../api/admin-session.service";
import { SessionQueryKeys } from "../model/query-keys.const";
import type { GetUserSessionsParams } from "../types";

export const useGetUserSessions = (userId: string, params: GetUserSessionsParams, enabled: boolean) =>
  useQuery({
    queryKey: [SessionQueryKeys.GetUserSessions, userId, params],
    queryFn: ({ signal }) => AdminSessionService.getAll(userId, params, { signal }),
    enabled,
    refetchOnMount: "always",
    throwOnError: false,
  });
