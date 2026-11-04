import { useTranslation } from "react-i18next";

import { Skeleton } from "@id-app/shadcn";

import { PROFILE_DETAIL_FIELDS } from "../../model/profile.const";
import s from "./profile-loading.module.scss";

export const ProfileLoading = () => {
  const { t } = useTranslation();

  return (
    <section aria-label={t("profile.title")} className={s.page}>
      <div aria-busy="true" aria-label={t("profile.loading")} className={s.profile} role="status">
        <Skeleton aria-hidden="true" className={s.avatar} />
        <div aria-hidden="true" className={s.information}>
          <div className={s.header}>
            <Skeleton className={s.name} />
            <Skeleton className={s.status} />
          </div>
          <div className={s.details}>
            <Skeleton className={s.heading} />
            <div className={s.fields}>
              {PROFILE_DETAIL_FIELDS.map((field) => (
                <div key={field} className={s.field}>
                  <Skeleton className={s.label} />
                  <Skeleton className={s.value} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
