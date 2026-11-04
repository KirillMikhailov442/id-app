import { useTranslation } from "react-i18next";

import { OAuthGrantStatus, useRevokeOwnOAuthGrant, type OAuthGrant } from "@entities/oauth-grant";

import { ModalService } from "@shared/modal";

import { toast } from "@id-app/shadcn";

export const useRevokeAppAccess = () => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useRevokeOwnOAuthGrant();

  const revokeAccess = async (app: OAuthGrant): Promise<void> => {
    if (isPending || app.status !== OAuthGrantStatus.Active) return;

    try {
      const result = await ModalService.askConfirm({
        title: t("apps.confirm.title"),
        description: t("apps.confirm.description", { name: app.clientName }),
        apply: t("apps.revoke"),
        cancel: t("modal.cancel"),
      });

      if (result !== "ok") return;

      await mutateAsync(app.id);
      toast.success(t("apps.revoked"));
    } catch {
      toast.error(t("apps.revokeError"));
    }
  };

  return { revokeAccess, isPending };
};
