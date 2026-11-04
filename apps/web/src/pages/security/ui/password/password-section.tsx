import { LockKeyhole } from "lucide-react";
import { useTranslation } from "react-i18next";

import { ChangePassword } from "@features/change-password";

import { Card, CardContent } from "@id-app/shadcn";

import s from "./password-section.module.scss";

export const PasswordSection = () => {
  const { t } = useTranslation();

  return (
    <Card className={s.card}>
      <CardContent className={s.cardContent}>
        <div className={s.item}>
          <span className={s.icon}>
            <LockKeyhole aria-hidden="true" size={20} />
          </span>
          <div className={s.details}>
            <h2 className={s.label}>{t("security.password.label")}</h2>
            <p className={s.description}>{t("security.password.description")}</p>
          </div>
          <div className={s.passwordAction}>
            <ChangePassword />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
