import { useTranslation } from "react-i18next";

import { PasswordSection } from "./password";
import s from "./security-page.module.scss";
import { SessionsSection } from "./sessions";

export const SecurityPage = () => {
  const { t } = useTranslation();

  return (
    <div className={s.page}>
      <header>
        <h1 className={s.title}>{t("account.security")}</h1>
      </header>
      <PasswordSection />
      <SessionsSection />
    </div>
  );
};
