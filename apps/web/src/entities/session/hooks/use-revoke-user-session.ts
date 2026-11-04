import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AdminSessionService } from "../api/admin-session.service";
import { invalidateUserSessions } from "../lib/invalidate-user-sessions";
import { SessionMutationKeys } from "../model/mutation-keys.const";
import type { Session } from "../types";

export const useRevokeUserSession = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [SessionMutationKeys.RevokeUserSession, userId],
    mutationFn: (session: Session) => AdminSessionService.revoke(userId, session.id),
    retry: false,
    onSuccess: (_, session) => {
      if (!session.isCurrent) return invalidateUserSessions(queryClient, userId);
    },
  });
};
