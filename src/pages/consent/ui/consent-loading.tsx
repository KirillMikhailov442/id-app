import { useTranslation } from "react-i18next";

import { Spinner } from "@shared/ui";

import { CardContent } from "@id-app/shadcn";

import s from "./consent-page.module.scss";

export const ConsentLoading = () => {
  const { t } = useTranslation();

  return (
    <CardContent aria-busy="true" aria-label={t("status.loading.title")} className={s.loading} role="status">
      <Spinner />
    </CardContent>
  );
};
