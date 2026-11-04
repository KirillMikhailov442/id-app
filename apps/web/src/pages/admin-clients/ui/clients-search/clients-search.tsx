import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Input } from "@id-app/shadcn";

import s from "./clients-search.module.scss";

interface ClientsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const ClientsSearch = ({ value, onChange }: ClientsSearchProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.search}>
      <div className={s.control}>
        <Search aria-hidden="true" className={s.icon} />
        <Input
          aria-label={t("adminClients.search.label")}
          className={s.input}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("adminClients.search.label")}
          type="search"
          value={value}
        />
      </div>
    </div>
  );
};
