import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useSession } from "@shared/api";

import { OAuthGrantService } from "../api/oauth-grant.service";
import { OAuthGrantQueryKeys } from "../model/query-keys.const";
import type { OAuthGrant } from "../types";

export const useGetOwnOAuthGrants = (options?: Omit<UseQueryOptions<OAuthGrant[], Error>, "queryKey" | "queryFn">) => {
  const { user, isAuthenticated } = useSession();

  return useQuery({
    enabled: isAuthenticated,
    ...options,
    queryKey: [OAuthGrantQueryKeys.GetOwn, user?.id],
    queryFn: ({ signal }) => OAuthGrantService.getOwn({ signal }),
  });
};
