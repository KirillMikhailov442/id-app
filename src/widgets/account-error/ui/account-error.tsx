import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import s from "./account-error.module.scss";

interface AccountErrorProps {
  illustration: ReactNode;
  isRetrying: boolean;
  onRetry: () => void;
}

export const AccountError = ({ illustration, isRetrying, onRetry }: AccountErrorProps) => {
  const { t } = useTranslation();

  return (
    <section aria-busy={isRetrying} aria-label={t("status.accountError.title")} className={s.page}>
      <div className={s.content}>
        <div className={s.illustration}>{illustration}</div>
        <h1 className={s.title}>{t("status.accountError.title")}</h1>
        <p className={s.description} role="alert">
          {t("status.accountError.description")}
        </p>
        <Button className={s.retry} disabled={isRetrying} onClick={onRetry} type="button">
          <RotateCcw aria-hidden="true" />
          {t(isRetrying ? "status.networkError.retrying" : "status.networkError.retry")}
        </Button>
      </div>
    </section>
  );
};
