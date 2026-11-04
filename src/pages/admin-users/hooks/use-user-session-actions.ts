import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useRevokeAllUserSessions, useRevokeUserSession, type Session } from "@entities/session";

import { SessionModel, useSession } from "@shared/api";
import { AppRoute } from "@shared/config";
import { ModalService } from "@shared/modal";

import { toast } from "@id-app/shadcn";

export const useUserSessionActions = (userId: string) => {
  const { t } = useTranslation();
  const { user } = useSession();
  const revokeAll = useRevokeAllUserSessions(userId);
  const revoke = useRevokeUserSession(userId);
  const isPending = revokeAll.isPending || revoke.isPending;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const confirmRevoke = async (session?: Session): Promise<void> => {
    if (isPending) return;

    try {
      const result = await ModalService.askConfirm({
        title: t(session === undefined ? "adminUsers.sessions.confirmAllTitle" : "adminUsers.sessions.confirmTitle"),
        description: t(
          session === undefined ? "adminUsers.sessions.confirmAllDescription" : "adminUsers.sessions.confirmDescription"
        ),
        apply: t(session === undefined ? "adminUsers.sessions.revokeAll" : "adminUsers.sessions.revoke"),
        cancel: t("modal.cancel"),
      });

      if (result !== "ok") return;

      if (session === undefined) await revokeAll.mutateAsync();
      else await revoke.mutateAsync(session);

      if (user?.id === userId && (session === undefined || session.isCurrent)) {
        await queryClient.cancelQueries();
        SessionModel.logout();
        queryClient.clear();
        await navigate({ to: AppRoute.Login, replace: true });

        return;
      }

      toast.success(t(session === undefined ? "adminUsers.sessions.revokedAll" : "adminUsers.sessions.revoked"));
    } catch {
      toast.error(t("adminUsers.sessions.actionError"));
    }
  };

  return { confirmRevoke, isPending };
};
