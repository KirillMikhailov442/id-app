import { Link } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

import { SettingsBar } from "@widgets/settings-bar";
import { StatusLayout } from "@widgets/status-layout";

import { AppRoute } from "@shared/config";

import { Button } from "@id-app/shadcn";

import { useNetworkErrorRetry } from "../hooks/use-network-error-retry";
import { NetworkErrorIllustration } from "./illustrations/network-error-illustration";

export const NetworkErrorPage = () => {
  const { t } = useTranslation();
  const { retry, isRetrying, hasRetryError } = useNetworkErrorRetry();

  return (
    <StatusLayout
      description={t("status.networkError.description")}
      illustration={<NetworkErrorIllustration />}
      settings={<SettingsBar />}
      title={t("status.networkError.title")}
    >
      <Button disabled={isRetrying} onClick={retry}>
        <RotateCcw aria-hidden="true" />
        {t(isRetrying ? "status.networkError.retrying" : "status.networkError.retry")}
      </Button>
      <Button asChild variant="outline">
        <Link to={AppRoute.Main}>{t("status.home")}</Link>
      </Button>
      {hasRetryError && <p role="alert">{t("status.networkError.description")}</p>}
    </StatusLayout>
  );
};
