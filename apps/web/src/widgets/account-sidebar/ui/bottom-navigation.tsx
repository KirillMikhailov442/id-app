import { Link } from "@tanstack/react-router";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@id-app/shadcn";

import { useBottomNavigationItems } from "../hooks/use-bottom-navigation-items";
import type { SidebarNavigationGroup } from "../types";
import s from "./bottom-navigation.module.scss";

interface BottomNavigationProps {
  groups: readonly SidebarNavigationGroup[];
  label: string;
}

export const BottomNavigation = ({ groups, label }: BottomNavigationProps) => {
  const items = useBottomNavigationItems(groups);

  return (
    <nav aria-label={label} className={s.sidebar}>
      {items.map((item) => {
        const { icon: Icon, label: itemLabel } = item;

        if (item.type === "link") {
          return (
            <Link
              key={item.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: s.active }}
              className={s.link}
              to={item.to}
            >
              <Icon aria-hidden size={16} />
              <span>{itemLabel}</span>
            </Link>
          );
        }

        return (
          <DropdownMenu key={item.id}>
            <DropdownMenuTrigger asChild>
              <button className={s.link} type="button">
                <Icon aria-hidden size={16} />
                <span>{itemLabel}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top">
              {item.items.map(({ to, label: linkLabel, icon: LinkIcon }) => (
                <DropdownMenuItem key={to} asChild>
                  <Link to={to}>
                    <LinkIcon aria-hidden size={16} />
                    {linkLabel}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </nav>
  );
};
