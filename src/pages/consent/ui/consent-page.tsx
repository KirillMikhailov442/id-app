import { useSearch } from "@tanstack/react-router";
import { Fingerprint } from "lucide-react";
import { useTranslation } from "react-i18next";

import { SettingsBar } from "@widgets/settings-bar";

import { AccountMenu } from "@features/account-menu";
import { useAuthSession } from "@features/auth-session";

import { useGetClient } from "@entities/client";

import { useSession } from "@shared/api";

import { Card } from "@id-app/shadcn";

import { CONSENT_ROUTE_ID } from "../model/consent.const";
import { ConsentPageContent } from "./consent-page-content";
import s from "./consent-page.module.scss";
import { ConsentIllustrations } from "./illustrations/consent-illustrations";

export const ConsentPage = () => {
  const { t } = useTranslation();
  const { client_id: clientId, scope } = useSearch({ from: CONSENT_ROUTE_ID });
  const { data: client, isPending, isFetching, isError, refetch } = useGetClient(clientId);
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
            <ConsentPageContent
              client={client}
              clientId={clientId}
              isError={isError}
              isLoading={isPending || isFetching}
              onRetry={() => void refetch()}
              scope={scope}
            />
          </Card>
        </div>
      </main>
    </>
  );
};
