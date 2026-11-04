import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import s from "./admin-users.module.scss";

interface UsersLoadErrorProps {
  isFetching: boolean;
  onRetry: () => void;
}

export const UsersLoadError = ({ isFetching, onRetry }: UsersLoadErrorProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.error} role="alert">
      <p>{t("adminUsers.loadError")}</p>
      <Button disabled={isFetching} onClick={onRetry} type="button" variant="outline">
        {t("adminUsers.retry")}
      </Button>
    </div>
  );
};
