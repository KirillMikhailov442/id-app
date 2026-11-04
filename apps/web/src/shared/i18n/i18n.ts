import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { LANGUAGE_STORAGE_KEY } from "@shared/config";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import type { Language } from "./types";

export const SUPPORTED_LANGUAGES = ["en", "ru"] as const;

export const DEFAULT_LANGUAGE: Language = "en";

export const getInitialLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (stored === "en" || stored === "ru") {
      return stored;
    }
  } catch (error) {
    console.warn("Failed to read the saved language", error);
  }

  return DEFAULT_LANGUAGE;
};

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  initAsync: false,
});

export { i18n };
