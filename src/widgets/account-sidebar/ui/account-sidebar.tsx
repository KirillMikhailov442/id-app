import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ACCOUNT_NAVIGATION } from "../model/account-sidebar.const";
import s from "./account-sidebar.module.scss";

export const AccountSidebar = () => {
  const { t } = useTranslation();

  return (
    <nav aria-label={t("account.navigation")} className={s.sidebar}>
      {ACCOUNT_NAVIGATION.map(({ to, label, icon: Icon }) => (
        <Link key={to} activeOptions={{ exact: true }} activeProps={{ className: s.active }} className={s.link} to={to}>
          <Icon aria-hidden size={16} />
          <span>{t(label)}</span>
        </Link>
      ))}
    </nav>
  );
};
