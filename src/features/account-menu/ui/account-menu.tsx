import { Link } from "@tanstack/react-router";
import { LogOut, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

import { UserAvatar } from "@entities/user";

import type { SessionUser } from "@shared/api";
import { AppRoute } from "@shared/config";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@id-app/shadcn";

import { useAccountMenu } from "../hooks/use-account-menu";
import s from "./account-menu.module.scss";

interface AccountMenuProps {
  user: SessionUser;
  onLogout: () => Promise<void>;
  isLoggingOut: boolean;
}

export const AccountMenu = ({ user, onLogout, isLoggingOut }: AccountMenuProps) => {
  const { t } = useTranslation();
  const { hasLogoutError, handleLogout } = useAccountMenu(onLogout);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label={t("settings.account")} className={s.trigger} size="icon" type="button" variant="outline">
          <span className={s.avatar}>
            <UserAvatar userId={user.id} />
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
        <DropdownMenuItem asChild disabled={isLoggingOut}>
          <Link to={AppRoute.Main}>
            <UserRound aria-hidden />
            {t("settings.profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isLoggingOut}
          onSelect={(event) => {
            event.preventDefault();
            void handleLogout();
          }}
          variant="destructive"
        >
          <LogOut aria-hidden />
          {isLoggingOut ? t("settings.loggingOut") : t("settings.logout")}
        </DropdownMenuItem>
        {hasLogoutError && (
          <p className={s.error} role="alert">
            {t("settings.logoutError")}
          </p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
