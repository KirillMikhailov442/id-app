import type { BottomNavigationItem, SidebarNavigationGroup } from "../types";

export const useBottomNavigationItems = (groups: readonly SidebarNavigationGroup[]): BottomNavigationItem[] =>
  groups.flatMap<BottomNavigationItem>(({ id, label, items, dropdownIcon }) => {
    if (dropdownIcon === undefined) {
      return items.map((item) => ({ ...item, type: "link" }));
    }

    return [{ type: "dropdown", id, label, icon: dropdownIcon, items }];
  });
