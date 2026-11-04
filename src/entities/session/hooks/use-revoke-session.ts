import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { SessionModel, useSession } from "@shared/api";

import { SessionService } from "../api/session.service";
import { SessionMutationKeys } from "../model/mutation-keys.const";
import { SessionQueryKeys } from "../model/query-keys.const";
import type { Session } from "../types";

export const useRevokeSession = (options?: UseMutationOptions<void, Error, Session>) => {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    ...restOptions,
    mutationKey: [SessionMutationKeys.Revoke],
    mutationFn: (session: Session) => SessionService.revoke(session.id),
    retry: false,
    onSuccess: async (...args) => {
      const [, session] = args;
      const queryKey = [SessionQueryKeys.GetAll, user?.id];

      await queryClient.cancelQueries({ queryKey });

      if (session.isCurrent) {
        SessionModel.logout();
        queryClient.removeQueries({ queryKey });
      } else {
        queryClient.setQueryData<Session[]>(queryKey, (sessions) => sessions?.filter(({ id }) => id !== session.id));
        await queryClient.invalidateQueries({ queryKey });
      }

      await onSuccess?.(...args);
    },
  });
};
