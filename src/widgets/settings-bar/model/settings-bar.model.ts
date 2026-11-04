import { atom } from "jotai";

import { getInitialLanguage, type Language } from "@shared/i18n";

class _SettingsBarModel {
  public readonly languageAtom = atom<Language>(getInitialLanguage());
}

export const SettingsBarModel = new _SettingsBarModel();
