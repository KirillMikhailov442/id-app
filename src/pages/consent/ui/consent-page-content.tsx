import { useTranslation } from "react-i18next";

import type { Client } from "@entities/client";

import { CardContent } from "@id-app/shadcn";

import { getClientDomain } from "../lib/get-client-domain";
import { ConsentActions } from "./consent-actions";
import { ConsentClientError } from "./consent-client-error";
import { ConsentLoading } from "./consent-loading";
import s from "./consent-page.module.scss";
import { ConsentPermissions } from "./consent-permissions";

interface ConsentPageContentProps {
  client: Client | undefined;
  clientId: string;
  scope: string;
  isError: boolean;
  isLoading: boolean;
  onRetry: () => void;
}

export const ConsentPageContent = ({
  client,
  clientId,
  scope,
  isError,
  isLoading,
  onRetry,
}: ConsentPageContentProps) => {
  const { t } = useTranslation();

  if (!clientId) {
    return <ConsentClientError />;
  }

  if (isLoading) {
    return <ConsentLoading />;
  }

  if (isError || client === undefined) {
    return <ConsentClientError onRetry={onRetry} />;
  }

  const scopes = [...new Set(scope.split(/\s+/).filter(Boolean))];
  const domain = getClientDomain(client.location) ?? t("consent.noDomain");

  return (
    <CardContent className={s.columns}>
      <section aria-labelledby="consent-title" className={s.intro}>
        <h1 className={s.title} id="consent-title">
          {t("consent.title", { app: client.name })}
        </h1>
        <span className={s.domain}>{domain}</span>
        <p className={s.fine}>{t("consent.fine", { app: client.name, domain: domain })}</p>
      </section>
      <section aria-label={t("consent.permissionsLabel")} className={s.details}>
        <p className={s.subtitle}>{t("consent.description")}</p>
        <ConsentPermissions scopes={scopes} />
      </section>
      <div className={s.footer}>
        <ConsentActions key={`${clientId}:${scope}`} />
      </div>
    </CardContent>
  );
};
