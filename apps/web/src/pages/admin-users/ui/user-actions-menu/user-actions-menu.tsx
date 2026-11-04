import { Ellipsis } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { SessionUser } from "@shared/api";

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@id-app/shadcn";

import { useAdminUserActions } from "../../hooks/use-admin-user-actions";

interface UserActionsMenuProps {
  user: SessionUser;
}

export const UserActionsMenu = ({ user }: UserActionsMenuProps) => {
  const { t } = useTranslation();
  const { items, isPending } = useAdminUserActions(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t("adminUsers.actionsLabel", { email: user.email })}
          disabled={isPending}
          size="icon"
          type="button"
          variant="ghost"
        >
          <Ellipsis aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map(({ id, title, icon: Icon, onSelect, disabled, variant }) => (
          <DropdownMenuItem key={id} disabled={disabled} onSelect={onSelect} variant={variant}>
            <Icon aria-hidden="true" />
            {title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
