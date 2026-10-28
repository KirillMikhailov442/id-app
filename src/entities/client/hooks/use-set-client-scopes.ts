import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { useSession } from "@shared/api";

import { ClientService } from "../api/client.service";
import { ClientMutationKeys } from "../model/mutation-keys.const";
import { ClientQueryKeys } from "../model/query-keys.const";
import type { ClientScope, SetClientScopesVariables } from "../types";

export const useSetClientScopes = (options?: UseMutationOptions<ClientScope[], Error, SetClientScopesVariables>) => {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    ...restOptions,
    mutationKey: [ClientMutationKeys.SetScopes],
    mutationFn: (data: SetClientScopesVariables) => ClientService.setScopes(data),
    retry: false,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: [ClientQueryKeys.GetAll, user?.id] });
      await onSuccess?.(...args);
    },
  });
};
