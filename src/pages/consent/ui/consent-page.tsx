import { Fingerprint } from "lucide-react";
import { useTranslation } from "react-i18next";

import { SettingsBar } from "@widgets/settings-bar";

import { AccountMenu } from "@features/account-menu";
import { useAuthSession } from "@features/auth-session";

import { useSession } from "@shared/api";

import { Card, CardContent } from "@id-app/shadcn";

import { CONSENT_CLIENT } from "../model/consent.const";
import { ConsentActions } from "./consent-actions";
import { ConsentAppIcon } from "./consent-app-icon";
import s from "./consent-page.module.scss";
import { ConsentPermissions } from "./consent-permissions";
import { ConsentIllustrations } from "./illustrations/consent-illustrations";

export const ConsentPage = () => {
  const { t } = useTranslation();
  const { user } = useSession();
  const { logout, isLoggingOut } = useAuthSession();

  return (
    <>
      <SettingsBar>
        {user !== null && <AccountMenu isLoggingOut={isLoggingOut} onLogout={logout} user={user} />}
      </SettingsBar>
      <main className={s.page}>
        <ConsentIllustrations />
        <div className={s.content}>
          <header className={s.logo}>
            <Fingerprint aria-hidden size={34} />
            <span>{t("common.brand")}</span>
          </header>
          <Card className={s.card}>
            <CardContent className={s.columns}>
              <section aria-labelledby="consent-title" className={s.intro}>
                <ConsentAppIcon />
                <h1 className={s.title} id="consent-title">
                  {t("consent.title", { app: CONSENT_CLIENT.name })}
                </h1>
                <p className={s.subtitle}>{t("consent.description")}</p>
                <span className={s.domain}>{CONSENT_CLIENT.domain}</span>
              </section>
              <section aria-label={t("consent.permissionsLabel")} className={s.details}>
                <ConsentPermissions />
                <ConsentActions />
                <p className={s.fine}>
                  {t("consent.fine", { app: CONSENT_CLIENT.name, domain: CONSENT_CLIENT.domain })}
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};
