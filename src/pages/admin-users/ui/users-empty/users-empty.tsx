import { useTranslation } from "react-i18next";

import { UsersEmptyIllustration } from "../illustrations/users-empty-illustration";
import s from "./users-empty.module.scss";

interface UsersEmptyProps {
  isSearch?: boolean;
}

export const UsersEmpty = ({ isSearch = false }: UsersEmptyProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.empty}>
      <UsersEmptyIllustration />
      <h2 className={s.name}>{t(isSearch ? "adminUsers.search.emptyTitle" : "adminUsers.emptyTitle")}</h2>
      <p className={s.subtitle}>{t(isSearch ? "adminUsers.search.emptyDescription" : "adminUsers.emptyDescription")}</p>
    </div>
  );
};
