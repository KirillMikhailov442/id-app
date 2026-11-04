import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import { SettingsBar } from "@widgets/settings-bar";
import { StatusLayout } from "@widgets/status-layout";

import { AppRoute } from "@shared/config";

import { Button } from "@id-app/shadcn";

import { BlockedIllustration } from "./illustrations/blocked-illustration";

export const BlockedPage = () => {
  const { t } = useTranslation();

  return (
    <StatusLayout
      description={t("status.blocked.description")}
      illustration={<BlockedIllustration />}
      settings={<SettingsBar />}
      title={t("status.blocked.title")}
    >
      <Button asChild variant="outline">
        <Link to={AppRoute.Login}>
          <ArrowLeft aria-hidden="true" />
          {t("status.blocked.backToLogin")}
        </Link>
      </Button>
    </StatusLayout>
  );
};
