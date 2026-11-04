import { useTranslation } from "react-i18next";

import { ClientsEmptyIllustration } from "../illustrations/clients-empty-illustration";
import s from "./clients-empty.module.scss";

export const ClientsEmpty = () => {
  const { t } = useTranslation();

  return (
    <div className={s.empty}>
      <ClientsEmptyIllustration />
      <h2 className={s.name}>{t("clients.emptyTitle")}</h2>
      <p className={s.subtitle}>{t("clients.emptyDescription")}</p>
    </div>
  );
};
