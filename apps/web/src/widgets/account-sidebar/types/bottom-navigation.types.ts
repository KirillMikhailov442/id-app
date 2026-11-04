import type { LucideIcon } from "lucide-react";

import type { SidebarNavigationItem } from "./account-sidebar.types";

interface BottomNavigationLink extends SidebarNavigationItem {
  type: "link";
}

interface BottomNavigationDropdown {
  type: "dropdown";
  id: string;
  label: string;
  icon: LucideIcon;
  items: readonly SidebarNavigationItem[];
}

export type BottomNavigationItem = BottomNavigationLink | BottomNavigationDropdown;
