import { AppWindow, Ban, Eye, Monitor, Pencil, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useSetUserBlocked } from "@entities/user";

import type { SessionUser } from "@shared/api";
import { ModalService } from "@shared/modal";

import { toast } from "@id-app/shadcn";

import { AdminUsersModel } from "../model/admin-users.model";
import type { AdminUserActionItem } from "../types";

export const useAdminUserActions = (user: SessionUser) => {
  const { t } = useTranslation();
  const mutation = useSetUserBlocked();

  const toggleBlocked = async (): Promise<void> => {
    try {
      const result = await ModalService.askConfirm({
        title: t(user.blocked ? "adminUsers.unblockTitle" : "adminUsers.blockTitle"),
        description: t(user.blocked ? "adminUsers.unblockDescription" : "adminUsers.blockDescription", {
          email: user.email,
        }),
        apply: t(user.blocked ? "adminUsers.unblock" : "adminUsers.block"),
        cancel: t("modal.cancel"),
      });

      if (result !== "ok") return;

      await mutation.mutateAsync({ id: user.id, blocked: !user.blocked });
      toast.success(t(user.blocked ? "adminUsers.unblockedToast" : "adminUsers.blockedToast"));
    } catch {
      toast.error(t("adminUsers.actionError"));
    }
  };

  const { isPending } = mutation;
  const items: AdminUserActionItem[] = [
    {
      id: "details",
      title: t("adminUsers.view"),
      icon: Eye,
      onSelect: () => AdminUsersModel.openDetails(user),
    },
    {
      id: "sessions",
      title: t("adminUsers.sessions.title"),
      icon: Monitor,
      onSelect: () => AdminUsersModel.openSessions(user),
    },
    {
      id: "apps",
      title: t("adminUsers.apps.title"),
      icon: AppWindow,
      onSelect: () => AdminUsersModel.openApps(user),
    },
    {
      id: "edit",
      title: t("adminUsers.edit"),
      icon: Pencil,
      onSelect: () => AdminUsersModel.openEditor(user),
      disabled: isPending,
    },
    {
      id: "toggle-blocked",
      title: t(user.blocked ? "adminUsers.unblock" : "adminUsers.block"),
      icon: user.blocked ? ShieldCheck : Ban,
      onSelect: () => void toggleBlocked(),
      disabled: isPending,
      variant: user.blocked ? "default" : "destructive",
    },
  ];

  return { items, isPending };
};
