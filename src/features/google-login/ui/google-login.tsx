import { useTranslation } from "react-i18next";

import { GOOGLE_LOGIN_URL } from "@entities/auth";

import { Button } from "@id-app/shadcn";

import googleIcon from "../assets/google.svg";
import s from "./google-login.module.scss";

interface GoogleLoginProps {
  disabled?: boolean;
}

export const GoogleLogin = ({ disabled = false }: GoogleLoginProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.root}>
      <div className={s.separator}>{t("googleLogin.or")}</div>

      <Button
        className={s.button}
        disabled={disabled}
        onClick={() => window.location.assign(GOOGLE_LOGIN_URL)}
        type="button"
        variant="outline"
      >
        <img alt="" aria-hidden className={s.icon} src={googleIcon} />
        {t("googleLogin.submit")}
      </Button>
    </div>
  );
};
