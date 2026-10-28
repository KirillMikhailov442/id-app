import type { SUPPORTED_LANGUAGES } from "../i18n";
import type en from "../locales/en.json";

export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export type Translation = typeof en;
