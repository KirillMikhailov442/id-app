import { useTranslation } from "react-i18next";

import { Button, CardContent } from "@id-app/shadcn";

interface ConsentClientErrorProps {
  onRetry?: () => void;
}

export const ConsentClientError = ({ onRetry }: ConsentClientErrorProps) => {
  const { t } = useTranslation();

  return (
    <CardContent role="alert">
      <p>{t(onRetry === undefined ? "consent.missingClient" : "consent.loadError")}</p>
      {onRetry !== undefined && (
        <Button onClick={onRetry} type="button">
          {t("consent.retry")}
        </Button>
      )}
    </CardContent>
  );
};
