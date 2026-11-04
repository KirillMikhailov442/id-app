import { useTranslation } from "react-i18next";

import { Spinner } from "@shared/ui";

import s from "./apps-page.module.scss";

export const AppsLoading = () => {
  const { t } = useTranslation();

  return (
    <div className={s.state} role="status">
      <Spinner />
      {t("apps.loading")}
    </div>
  );
};
