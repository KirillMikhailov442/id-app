import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { useSession } from "@shared/api";

import { ClientService } from "../api/client.service";
import { ClientMutationKeys } from "../model/mutation-keys.const";
import { ClientQueryKeys } from "../model/query-keys.const";

import type {} from "../types";

export const useDeleteClient = (options?: UseMutationOptions<void, Error, string>) => {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    ...restOptions,
    mutationKey: [ClientMutationKeys.Delete],
    mutationFn: (data: string) => ClientService.delete(data),
    retry: false,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: [ClientQueryKeys.GetAll, user?.id] });
      await onSuccess?.(...args);
    },
  });
};
