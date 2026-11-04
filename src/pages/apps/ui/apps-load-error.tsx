import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import s from "./apps-page.module.scss";

interface AppsLoadErrorProps {
  isFetching: boolean;
  onRetry: () => void;
}

export const AppsLoadError = ({ isFetching, onRetry }: AppsLoadErrorProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.state} role="alert">
      <p>{t("apps.loadError")}</p>
      <Button disabled={isFetching} onClick={onRetry} type="button" variant="outline">
        {t("apps.retry")}
      </Button>
    </div>
  );
};
