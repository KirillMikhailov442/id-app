import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { MOBILE_NAVIGATION_QUERY } from "@shared/config";
import { useMediaQuery } from "@shared/lib";

import { useAccountNavigation } from "../hooks/use-account-navigation";
import s from "./account-sidebar.module.scss";
import { BottomNavigation } from "./bottom-navigation";

export const AccountSidebar = () => {
  const { t } = useTranslation();
  const groups = useAccountNavigation();
  const label = t("account.navigation");
  const isMobile = useMediaQuery(MOBILE_NAVIGATION_QUERY);

  if (isMobile) return <BottomNavigation groups={groups} label={label} />;

  return (
    <nav aria-label={label} className={s.sidebar}>
      {groups.map((group) => (
        <div key={group.id} className={s.group}>
          {groups.length > 1 && <span className={s.groupTitle}>{group.label}</span>}
          {group.items.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              activeOptions={{ exact: true }}
              activeProps={{ className: s.active }}
              className={s.link}
              to={to}
            >
              <Icon aria-hidden size={16} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};
