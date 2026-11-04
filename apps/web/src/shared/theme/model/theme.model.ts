import { atom } from "jotai";

import { jotaiStore } from "@shared/lib";

import type { Theme } from "../types";
import { THEME_QUERY, THEME_STORAGE_KEY, THEMES } from "./theme.const";

class _ThemeModel {
  public readonly themeAtom = atom<Theme>(this.getInitialTheme());

  public setTheme = (next: Theme): void => {
    jotaiStore.set(this.themeAtom, next);
  };

  public toggleTheme = (): void => {
    const next = jotaiStore.get(this.themeAtom) === THEMES.Dark ? THEMES.Light : THEMES.Dark;

    this.setTheme(next);
  };

  private getInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);

      if (stored === THEMES.Light || stored === THEMES.Dark) {
        return stored;
      }
    } catch (error) {
      console.warn("Failed to read the saved theme", error);
    }

    return window.matchMedia(THEME_QUERY).matches ? THEMES.Dark : THEMES.Light;
  }
}

export const ThemeModel = new _ThemeModel();
