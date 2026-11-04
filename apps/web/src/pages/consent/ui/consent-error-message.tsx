import { useTranslation } from "react-i18next";

import type { ConsentError } from "../types";
import s from "./consent-page.module.scss";

interface ConsentErrorMessageProps {
  error: ConsentError;
}

export const ConsentErrorMessage = ({ error }: ConsentErrorMessageProps) => {
  const { t } = useTranslation();

  return (
    <p className={s.error} role="alert">
      {t(`consent.${error}`)}
    </p>
  );
};
