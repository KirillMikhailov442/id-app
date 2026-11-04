import { useQuery } from "@tanstack/react-query";

import type { PaginationParams } from "@shared/types";

import { OAuthGrantService } from "../api/oauth-grant.service";
import { OAuthGrantQueryKeys } from "../model/query-keys.const";

export const useGetUserOAuthGrants = (userId: string, params: PaginationParams, enabled: boolean) =>
  useQuery({
    queryKey: [OAuthGrantQueryKeys.GetUser, userId, params],
    queryFn: ({ signal }) => OAuthGrantService.getUser(userId, params, { signal }),
    enabled,
    refetchOnMount: "always",
    throwOnError: false,
  });
