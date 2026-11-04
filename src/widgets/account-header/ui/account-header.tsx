import type { ReactNode } from "react";
import { Fingerprint } from "lucide-react";
import { useTranslation } from "react-i18next";

import s from "./account-header.module.scss";

interface AccountHeaderProps {
  children: ReactNode;
}

export const AccountHeader = ({ children }: AccountHeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className={s.header}>
      <div className={s.brand}>
        <Fingerprint aria-hidden size={26} />
        <span>{t("common.brand")}</span>
      </div>
      {children}
    </header>
  );
};
