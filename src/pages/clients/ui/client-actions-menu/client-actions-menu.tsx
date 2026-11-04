import { Ellipsis } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { Client } from "@entities/client";

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@id-app/shadcn";

import { useClientActions } from "../../hooks/use-client-actions";
import s from "./client-actions-menu.module.scss";

interface ClientActionsMenuProps {
  client: Client;
}

export const ClientActionsMenu = ({ client }: ClientActionsMenuProps) => {
  const { t } = useTranslation();
  const { items, isPending } = useClientActions(client);

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
        {items.map(({ id, title, icon: Icon, onSelect, variant }) => (
          <DropdownMenuItem key={id} className={s.menuItem} onSelect={onSelect} variant={variant}>
            <Icon aria-hidden="true" />
            {title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
