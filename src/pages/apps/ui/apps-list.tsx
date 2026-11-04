import { useTranslation } from "react-i18next";

import { useGetOwnOAuthGrants } from "@entities/oauth-grant";

import { Card, CardContent } from "@id-app/shadcn";

import { AppsEmpty } from "./apps-empty";
import { AppsLoadError } from "./apps-load-error";
import { AppsLoading } from "./apps-loading";
import s from "./apps-page.module.scss";
import { ConnectedAppItem } from "./connected-app-item";

export const AppsList = () => {
  const { t } = useTranslation();
  const { data: grants, isPending, isError, isFetching, refetch } = useGetOwnOAuthGrants({ throwOnError: false });

  if (isPending) {
    return <AppsLoading />;
  }

  if (isError) {
    return <AppsLoadError isFetching={isFetching} onRetry={() => void refetch()} />;
  }

  if (grants.length === 0) {
    return <AppsEmpty />;
  }

  return (
    <Card className={s.card}>
      <CardContent className={s.cardContent}>
        <ul aria-label={t("apps.listLabel")} className={s.list}>
          {grants.map((app) => (
            <ConnectedAppItem key={app.id} app={app} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
