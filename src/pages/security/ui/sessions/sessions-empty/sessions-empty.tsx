import { useTranslation } from "react-i18next";

import s from "./sessions-empty.module.scss";

export const SessionsEmpty = () => {
  const { t } = useTranslation();

  return (
    <p className={s.empty} role="status">
      {t("security.empty")}
    </p>
  );
};
