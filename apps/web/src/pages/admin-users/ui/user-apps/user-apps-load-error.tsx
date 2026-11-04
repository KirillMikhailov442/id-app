import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import s from "./user-apps.module.scss";

interface UserAppsLoadErrorProps {
  isFetching: boolean;
  onRetry: () => void;
}

export const UserAppsLoadError = ({ isFetching, onRetry }: UserAppsLoadErrorProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.state} role="alert">
      <p>{t("adminUsers.apps.loadError")}</p>
      <Button disabled={isFetching} onClick={onRetry} type="button" variant="outline">
        {t("adminUsers.retry")}
      </Button>
    </div>
  );
};
