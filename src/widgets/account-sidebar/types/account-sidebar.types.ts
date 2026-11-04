import type { LucideIcon } from "lucide-react";

export interface SidebarNavigationItem {
  readonly to: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

export interface SidebarNavigationGroup {
  readonly id: string;
  readonly dropdownIcon?: LucideIcon;
  readonly label: string;
  readonly items: readonly SidebarNavigationItem[];
}
