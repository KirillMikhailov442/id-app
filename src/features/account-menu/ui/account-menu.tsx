import { useTranslation } from "react-i18next";

import { UserAvatar } from "@entities/user";

import type { SessionUser } from "@shared/api";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@id-app/shadcn";

import { useAccountMenuItems } from "../hooks/use-account-menu-items";
import type { AccountMenuItemData } from "../types";
import { AccountMenuItem } from "./account-menu-item";
import s from "./account-menu.module.scss";

interface AccountMenuProps {
  user: SessionUser;
  onLogout: () => Promise<void>;
  isLoggingOut: boolean;
  extraItems?: readonly AccountMenuItemData[];
}

export const AccountMenu = ({ user, onLogout, isLoggingOut, extraItems }: AccountMenuProps) => {
  const { t } = useTranslation();
  const { items, hasLogoutError } = useAccountMenuItems(onLogout, isLoggingOut, extraItems);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label={t("settings.account")} className={s.trigger} size="icon" type="button" variant="outline">
          <span className={s.avatar}>
            <UserAvatar avatar={user.avatar} />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={s.panel}>
        <DropdownMenuLabel>
          <strong className={s.name}>
            {user.name} {user.surname}
          </strong>
          <span className={s.email}>{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <AccountMenuItem key={item.id} item={item} />
        ))}
        {hasLogoutError && (
          <p className={s.error} role="alert">
            {t("settings.logoutError")}
          </p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
