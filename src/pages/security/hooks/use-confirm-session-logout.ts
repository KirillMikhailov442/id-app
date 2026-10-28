import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAuthSession } from "@features/auth-session";

import { useRevokeSession, type Session } from "@entities/session";

import { AppRoute } from "@shared/config";
import { ModalService } from "@shared/modal";

import { toast } from "@id-app/shadcn";

export const useConfirmSessionLogout = () => {
  const { t } = useTranslation();
  const revokeSession = useRevokeSession();
  const { logoutAll, isLoggingOut } = useAuthSession();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isPending = revokeSession.isPending || isLoggingOut;

  const confirmLogout = async (session?: Session, device?: string): Promise<void> => {
    if (isPending) return;

    try {
      const result = await ModalService.askConfirm({
        title: t(session === undefined ? "security.confirmLogout.allTitle" : "security.confirmLogout.title"),
        description:
          session === undefined
            ? t("security.confirmLogout.allDescription")
            : t("security.confirmLogout.description", { device }),
        apply: t("security.endSession"),
        cancel: t("modal.cancel"),
      });

      if (result !== "ok") return;

      if (session === undefined) {
        await logoutAll();
        await queryClient.cancelQueries();
        queryClient.clear();
        await navigate({ to: AppRoute.Login, replace: true });

        return;
      }

      await revokeSession.mutateAsync(session);
      toast.success(t("security.sessionEnded"));

      if (session.isCurrent) {
        await navigate({ to: AppRoute.Login, replace: true });
      }
    } catch {
      toast.error(t("settings.logoutError"));
    }
  };

  return { confirmLogout, isPending };
};
