import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { useSession } from "@shared/api";

import { OAuthGrantService } from "../api/oauth-grant.service";
import { OAuthGrantMutationKeys } from "../model/mutation-keys.const";
import { OAuthGrantStatus } from "../model/oauth-grant-status.const";
import { OAuthGrantQueryKeys } from "../model/query-keys.const";
import type { OAuthGrant } from "../types";

export const useRevokeOwnOAuthGrant = (options?: UseMutationOptions<void, Error, string>) => {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    ...restOptions,
    mutationKey: [OAuthGrantMutationKeys.RevokeOwn],
    mutationFn: (id: string) => OAuthGrantService.revokeOwn(id),
    retry: false,
    onSuccess: async (...args) => {
      const [, id] = args;
      const queryKey = [OAuthGrantQueryKeys.GetOwn, user?.id];

      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<OAuthGrant[]>(queryKey, (grants) =>
        grants?.map((grant) =>
          grant.id === id ? { ...grant, status: OAuthGrantStatus.Revoked, revokedAt: new Date().toISOString() } : grant
        )
      );
      await queryClient.invalidateQueries({ queryKey });
      await onSuccess?.(...args);
    },
  });
};
