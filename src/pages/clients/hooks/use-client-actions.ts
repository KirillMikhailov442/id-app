import { useTranslation } from "react-i18next";

import { useDeleteClient, useUpdateClient, type ClientWithScopes } from "@entities/client";

import { ModalService } from "@shared/modal";

import { toast } from "@id-app/shadcn";

import { ClientsModel } from "../model/clients.model";

export const useClientActions = () => {
  const { t } = useTranslation();
  const deleteClient = useDeleteClient();
  const updateClient = useUpdateClient();

  const remove = async (client: ClientWithScopes): Promise<void> => {
    try {
      const result = await ModalService.askConfirm({
        title: t("clients.deleteTitle"),
        description: t("clients.deleteDescription", { name: client.name }),
        apply: t("clients.delete"),
        cancel: t("modal.cancel"),
      });

      if (result !== "ok") return;

      await deleteClient.mutateAsync(client.id);
      toast.success(t("clients.deleted"));
    } catch {
      toast.error(t("clients.actionError"));
    }
  };

  const toggle = async (client: ClientWithScopes): Promise<void> => {
    try {
      await updateClient.mutateAsync({ id: client.id, data: { isActive: !client.isActive } });
      toast.success(t(client.isActive ? "clients.disabledToast" : "clients.enabledToast"));
    } catch {
      toast.error(t("clients.actionError"));
    }
  };

  return { remove, toggle, edit: ClientsModel.openEditor, isPending: deleteClient.isPending || updateClient.isPending };
};
