import type { ReactNode } from "react";
import type { LinkProps } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

interface AccountMenuItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  content?: ReactNode;
  disabled?: boolean;
}

interface AccountMenuLinkItem extends AccountMenuItemBase {
  type: "link";
  to: NonNullable<LinkProps["to"]>;
}

interface AccountMenuActionItem extends AccountMenuItemBase {
  type: "action";
  onSelect: (event: Event) => void;
  variant?: "default" | "destructive";
}

interface AccountMenuSeparatorItem {
  id: string;
  type: "separator";
}

export type AccountMenuItemData = AccountMenuLinkItem | AccountMenuActionItem | AccountMenuSeparatorItem;
