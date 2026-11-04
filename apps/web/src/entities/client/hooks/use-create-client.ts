import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { useSession } from "@shared/api";

import { ClientService } from "../api/client.service";
import { ClientMutationKeys } from "../model/mutation-keys.const";
import { ClientQueryKeys } from "../model/query-keys.const";
import type { Client, CreateClientRequest } from "../types";

export const useCreateClient = (options?: UseMutationOptions<Client, Error, CreateClientRequest>) => {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    ...restOptions,
    mutationKey: [ClientMutationKeys.Create],
    mutationFn: (data: CreateClientRequest) => ClientService.create(data),
    retry: false,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: [ClientQueryKeys.GetMine, user?.id] });
      await onSuccess?.(...args);
    },
  });
};
