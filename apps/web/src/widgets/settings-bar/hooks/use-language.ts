import { useEffect } from "react";
import { useAtom } from "jotai";

import { LANGUAGE_STORAGE_KEY } from "@shared/config";
import { i18n, type Language } from "@shared/i18n";

import { SettingsBarModel } from "../model/settings-bar.model";

export const useLanguage = () => {
  const [language, setLanguage] = useAtom(SettingsBarModel.languageAtom);

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.warn("Failed to save the language", error);
    }

    void i18n.changeLanguage(language);
  }, [language]);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
  };

  return { changeLanguage, language };
};
