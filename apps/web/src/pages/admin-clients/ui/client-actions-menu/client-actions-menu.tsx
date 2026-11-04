import { Ellipsis } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { Client } from "@entities/client";

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@id-app/shadcn";

import { useAdminClientActions } from "../../hooks/use-admin-client-actions";

interface ClientActionsMenuProps {
  client: Client;
}

export const ClientActionsMenu = ({ client }: ClientActionsMenuProps) => {
  const { t } = useTranslation();
  const { items, isPending } = useAdminClientActions(client);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t("adminClients.actionsLabel", { name: client.name })}
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
          <DropdownMenuItem key={id} disabled={isPending} onSelect={onSelect} variant={variant}>
            <Icon aria-hidden="true" />
            {title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
