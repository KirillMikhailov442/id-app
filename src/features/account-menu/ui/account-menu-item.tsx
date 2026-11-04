import { Link } from "@tanstack/react-router";

import { DropdownMenuItem, DropdownMenuSeparator } from "@id-app/shadcn";

import type { AccountMenuItemData } from "../types";

interface AccountMenuItemProps {
  item: AccountMenuItemData;
}

export const AccountMenuItem = ({ item }: AccountMenuItemProps) => {
  if (item.type === "separator") {
    return <DropdownMenuSeparator />;
  }

  const { icon: Icon, title, content, disabled } = item;
  const children = content ?? (
    <>
      {Icon && <Icon aria-hidden />}
      {title}
    </>
  );

  if (item.type === "link") {
    return (
      <DropdownMenuItem aria-label={title} asChild disabled={disabled} textValue={title}>
        <Link to={item.to}>{children}</Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      aria-label={title}
      disabled={disabled}
      onSelect={item.onSelect}
      textValue={title}
      variant={item.variant}
    >
      {children}
    </DropdownMenuItem>
  );
};
