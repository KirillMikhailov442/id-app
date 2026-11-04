import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import s from "./user-sessions.module.scss";

interface UserSessionsLoadErrorProps {
  isFetching: boolean;
  onRetry: () => void;
}

export const UserSessionsLoadError = ({ isFetching, onRetry }: UserSessionsLoadErrorProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.state} role="alert">
      <p>{t("adminUsers.sessions.loadError")}</p>
      <Button disabled={isFetching} onClick={onRetry} type="button" variant="outline">
        {t("adminUsers.retry")}
      </Button>
    </div>
  );
};
