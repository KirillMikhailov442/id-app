import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { ClientWithScopes } from "@entities/client";

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@id-app/shadcn";

import { useClientActions } from "../../hooks/use-client-actions";
import s from "./client-actions-menu.module.scss";

interface ClientActionsMenuProps {
  client: ClientWithScopes;
}

export const ClientActionsMenu = ({ client }: ClientActionsMenuProps) => {
  const { t } = useTranslation();
  const { edit, remove, isPending } = useClientActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t("clients.actionsLabel", { name: client.name })}
          className={s.action}
          disabled={isPending}
          size="icon"
          type="button"
          variant="ghost"
        >
          <Ellipsis aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className={s.menuItem} onSelect={() => edit(client)}>
          <Pencil aria-hidden="true" />
          {t("clients.edit")}
        </DropdownMenuItem>
        <DropdownMenuItem className={s.menuItem} onSelect={() => void remove(client)} variant="destructive">
          <Trash2 aria-hidden="true" />
          {t("clients.delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
