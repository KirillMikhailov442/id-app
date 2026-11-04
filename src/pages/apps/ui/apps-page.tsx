import { useTranslation } from "react-i18next";

import { AppsList } from "./apps-list";
import s from "./apps-page.module.scss";

export const AppsPage = () => {
  const { t } = useTranslation();

  return (
    <div className={s.page}>
      <header>
        <h1 className={s.title}>{t("account.apps")}</h1>
        <p className={s.subtitle}>{t("apps.description")}</p>
      </header>
      <AppsList />
    </div>
  );
};
