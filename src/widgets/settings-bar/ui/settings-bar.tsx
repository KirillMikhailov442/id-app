import type { FC, ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useTheme } from "@shared/theme";

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@id-app/shadcn";

import { useLanguage } from "../hooks/use-language";
import s from "./settings-bar.module.scss";

interface SettingsBarProps {
  children?: ReactNode;
  variant?: "floating" | "header";
}

export const SettingsBar: FC<SettingsBarProps> = ({ children, variant = "floating" }) => {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { changeLanguage, language } = useLanguage();

  return (
    <div className={variant === "header" ? `${s.bar} ${s.header}` : s.bar}>
      <Select onValueChange={(value) => changeLanguage(value as typeof language)} value={language}>
        <SelectTrigger aria-label={t("settings.language")} className={s.language}>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ru">Русский</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>

      <Button aria-label={t("settings.theme")} className={s.theme} onClick={toggleTheme} size="icon" variant="outline">
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
      {children}
    </div>
  );
};
