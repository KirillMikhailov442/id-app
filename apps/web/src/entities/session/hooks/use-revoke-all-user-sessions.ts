import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "@shared/api";

import { AdminSessionService } from "../api/admin-session.service";
import { invalidateUserSessions } from "../lib/invalidate-user-sessions";
import { SessionMutationKeys } from "../model/mutation-keys.const";

export const useRevokeAllUserSessions = (userId: string) => {
  const queryClient = useQueryClient();
  const { user } = useSession();

  return useMutation({
    mutationKey: [SessionMutationKeys.RevokeAllUserSessions, userId],
    mutationFn: () => AdminSessionService.revokeAll(userId),
    retry: false,
    onSuccess: () => {
      if (user?.id !== userId) return invalidateUserSessions(queryClient, userId);
    },
  });
};
