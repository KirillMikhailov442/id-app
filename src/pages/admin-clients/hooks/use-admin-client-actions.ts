import { Power, PowerOff, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useDeleteClient, useUpdateClient, type Client } from "@entities/client";

import { ModalService } from "@shared/modal";

import { toast } from "@id-app/shadcn";

export const useAdminClientActions = (client: Client) => {
  const { t } = useTranslation();
  const deleteClient = useDeleteClient();
  const updateClient = useUpdateClient();

  const toggleActive = async (): Promise<void> => {
    try {
      const result = await ModalService.askConfirm({
        title: t(client.isActive ? "adminClients.disableTitle" : "adminClients.enableTitle"),
        description: t(client.isActive ? "adminClients.disableDescription" : "adminClients.enableDescription", {
          name: client.name,
        }),
        apply: t(client.isActive ? "adminClients.disable" : "adminClients.enable"),
        cancel: t("modal.cancel"),
      });

      if (result !== "ok") return;

      await updateClient.mutateAsync({ id: client.id, data: { isActive: !client.isActive } });
      toast.success(t(client.isActive ? "adminClients.disabledToast" : "adminClients.enabledToast"));
    } catch {
      toast.error(t("adminClients.actionError"));
    }
  };

  const remove = async (): Promise<void> => {
    try {
      const result = await ModalService.askConfirm({
        title: t("adminClients.deleteTitle"),
        description: t("adminClients.deleteDescription", { name: client.name }),
        apply: t("adminClients.delete"),
        cancel: t("modal.cancel"),
      });

      if (result !== "ok") return;

      await deleteClient.mutateAsync(client.id);
      toast.success(t("adminClients.deletedToast"));
    } catch {
      toast.error(t("adminClients.actionError"));
    }
  };

  const items = [
    {
      id: "toggle-active",
      title: t(client.isActive ? "adminClients.disable" : "adminClients.enable"),
      icon: client.isActive ? PowerOff : Power,
      onSelect: () => void toggleActive(),
      variant: client.isActive ? "destructive" : "default",
    },
    {
      id: "delete",
      title: t("adminClients.delete"),
      icon: Trash2,
      onSelect: () => void remove(),
      variant: "destructive",
    },
  ] as const;

  return { items, isPending: deleteClient.isPending || updateClient.isPending };
};
