import { useTranslation } from "react-i18next";

import { ModalService } from "@shared/modal";

import { toast } from "@id-app/shadcn";

export const useRevokeAppAccess = () => {
  const { t } = useTranslation();

  return async (name: string): Promise<void> => {
    try {
      const result = await ModalService.askConfirm({
        title: t("apps.confirm.title"),
        description: t("apps.confirm.description", { name }),
        apply: t("apps.revoke"),
        cancel: t("modal.cancel"),
      });

      if (result !== "ok") return;

      toast.info(t("apps.revokePlaceholder"));
    } catch {
      toast.error(t("apps.revokeError"));
    }
  };
};
