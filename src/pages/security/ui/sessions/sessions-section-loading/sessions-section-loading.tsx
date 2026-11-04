import { useTranslation } from "react-i18next";

import { Spinner } from "@shared/ui";

import { Card, CardContent } from "@id-app/shadcn";

import s from "../sessions-section.module.scss";

export const SessionsSectionLoading = () => {
  const { t } = useTranslation();

  return (
    <Card className={s.card}>
      <CardContent className={s.cardContent}>
        <h2 className={s.heading}>{t("security.sessions")}</h2>
        <div className={s.state} role="status">
          <Spinner />
          {t("security.loading")}
        </div>
      </CardContent>
    </Card>
  );
};
