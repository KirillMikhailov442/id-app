import { useTranslation } from "react-i18next";

import s from "./loading-screen.module.scss";
import { Spinner } from "./spinner";

export const LoadingScreen = () => {
  const { t } = useTranslation();

  return (
    <main aria-busy="true" aria-label={t("status.loading.title")} className={s.page} role="status">
      <Spinner />
    </main>
  );
};
