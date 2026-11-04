import { useTranslation } from "react-i18next";

import { AppsEmptyIllustration } from "../illustrations/apps-empty-illustration";
import s from "./apps-empty.module.scss";

export const AppsEmpty = () => {
  const { t } = useTranslation();

  return (
    <div className={s.empty}>
      <AppsEmptyIllustration />
      <h2 className={s.title}>{t("apps.emptyTitle")}</h2>
      <p className={s.description}>{t("apps.empty")}</p>
    </div>
  );
};
