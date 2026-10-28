import { useTranslation } from "react-i18next";

import { Spinner } from "@shared/ui";

import s from "./loading-page.module.scss";

export const LoadingPage = () => {
  const { t } = useTranslation();

  return (
    <main aria-busy="true" aria-label={t("status.loading.title")} className={s.page} role="status">
      <Spinner />
    </main>
  );
};
