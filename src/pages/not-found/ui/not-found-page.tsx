import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { SettingsBar } from "@widgets/settings-bar";
import { StatusLayout } from "@widgets/status-layout";

import { AppRoute } from "@shared/config";

import { Button } from "@id-app/shadcn";

import { NotFoundIllustration } from "./illustrations/not-found-illustration";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <StatusLayout
      description={t("status.notFound.description")}
      illustration={<NotFoundIllustration />}
      settings={<SettingsBar />}
      title={t("status.notFound.title")}
    >
      <Button asChild>
        <Link to={AppRoute.Main}>{t("status.home")}</Link>
      </Button>
    </StatusLayout>
  );
};
