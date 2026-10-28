import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@id-app/shadcn";

import { DEMO_CONNECTED_APPS } from "../model/apps.const";
import s from "./apps-page.module.scss";
import { ConnectedAppItem } from "./connected-app-item";

export const AppsPage = () => {
  const { t } = useTranslation();

  return (
    <div className={s.page}>
      <header>
        <h1 className={s.title}>{t("account.apps")}</h1>
        <p className={s.subtitle}>{t("apps.description")}</p>
      </header>
      <Card className={s.card}>
        <CardContent className={s.cardContent}>
          <ul aria-label={t("apps.listLabel")} className={s.list}>
            {DEMO_CONNECTED_APPS.map((app) => (
              <ConnectedAppItem key={app.id} app={app} />
            ))}
          </ul>
        </CardContent>
      </Card>
      <p className={s.notice}>{t("apps.demoNotice")}</p>
    </div>
  );
};
