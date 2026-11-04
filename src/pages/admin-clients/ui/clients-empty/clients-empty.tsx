import { useTranslation } from "react-i18next";

import { ClientsEmptyIllustration } from "../illustrations/clients-empty-illustration";
import s from "./clients-empty.module.scss";

interface ClientsEmptyProps {
  isSearch?: boolean;
}

export const ClientsEmpty = ({ isSearch = false }: ClientsEmptyProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.empty}>
      <ClientsEmptyIllustration />
      <h2 className={s.name}>{t(isSearch ? "adminClients.search.emptyTitle" : "adminClients.emptyTitle")}</h2>
      <p className={s.subtitle}>
        {t(isSearch ? "adminClients.search.emptyDescription" : "adminClients.emptyDescription")}
      </p>
    </div>
  );
};
