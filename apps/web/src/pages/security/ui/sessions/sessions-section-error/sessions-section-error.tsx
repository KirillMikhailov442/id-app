import { useTranslation } from "react-i18next";

import { Button, Card, CardContent } from "@id-app/shadcn";

import s from "../sessions-section.module.scss";

interface SessionsSectionErrorProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export const SessionsSectionError = ({ isRetrying, onRetry }: SessionsSectionErrorProps) => {
  const { t } = useTranslation();

  return (
    <Card className={s.card}>
      <CardContent className={s.cardContent}>
        <h2 className={s.heading}>{t("security.sessions")}</h2>
        <div className={s.state} role="alert">
          <p>{t("security.loadError")}</p>
          <Button disabled={isRetrying} onClick={onRetry} type="button" variant="outline">
            {t("security.retry")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
