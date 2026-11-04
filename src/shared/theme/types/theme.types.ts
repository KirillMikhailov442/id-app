import type { THEMES } from "../model/theme.const";

export type Theme = (typeof THEMES)[keyof typeof THEMES];
