import { useEffect } from "react";
import { useAtomValue } from "jotai";

import { THEME_DARK_CLASS, THEME_STORAGE_KEY, THEMES } from "../model/theme.const";
import { ThemeModel } from "../model/theme.model";

export const useTheme = () => {
  const theme = useAtomValue(ThemeModel.themeAtom);

  useEffect(() => {
    document.documentElement.classList.toggle(THEME_DARK_CLASS, theme === THEMES.Dark);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn("Failed to save the theme", error);
    }
  }, [theme]);

  return {
    isDark: theme === THEMES.Dark,
    setTheme: ThemeModel.setTheme,
    theme,
    toggleTheme: ThemeModel.toggleTheme,
  };
};
