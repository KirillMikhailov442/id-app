import { Copy, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useDeleteClient, useUpdateClient, type Client } from "@entities/client";

import { ModalService } from "@shared/modal";

import { toast } from "@id-app/shadcn";

import { ClientsModel } from "../model/clients.model";

export const useClientActions = (client: Client) => {
  const { t } = useTranslation();
  const deleteClient = useDeleteClient();
  const updateClient = useUpdateClient();

  const copyId = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(client.id);
      toast.success(t("clients.idCopied"));
    } catch {
      toast.error(t("clients.copyIdError"));
    }
  };

  const remove = async (): Promise<void> => {
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

  const toggle = async (): Promise<void> => {
    try {
      await updateClient.mutateAsync({ id: client.id, data: { isActive: !client.isActive } });
      toast.success(t(client.isActive ? "clients.disabledToast" : "clients.enabledToast"));
    } catch {
      toast.error(t("clients.actionError"));
    }
  };

  const items = [
    {
      id: "copy-id",
      title: t("clients.copyId"),
      icon: Copy,
      onSelect: () => void copyId(),
      variant: "default",
    },
    {
      id: "edit",
      title: t("clients.edit"),
      icon: Pencil,
      onSelect: () => ClientsModel.openEditor(client),
      variant: "default",
    },
    {
      id: "delete",
      title: t("clients.delete"),
      icon: Trash2,
      onSelect: () => void remove(),
      variant: "destructive",
    },
  ] as const;

  return { items, toggle, isPending: deleteClient.isPending || updateClient.isPending };
};
