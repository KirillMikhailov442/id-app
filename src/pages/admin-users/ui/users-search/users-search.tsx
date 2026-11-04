import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Input } from "@id-app/shadcn";

import s from "./users-search.module.scss";

interface UsersSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const UsersSearch = ({ value, onChange }: UsersSearchProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.search}>
      <div className={s.control}>
        <Search aria-hidden="true" className={s.icon} />
        <Input
          aria-label={t("adminUsers.search.label")}
          className={s.input}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("adminUsers.search.label")}
          type="search"
          value={value}
        />
      </div>
    </div>
  );
};
