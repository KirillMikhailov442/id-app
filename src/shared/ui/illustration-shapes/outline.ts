import type { CSSProperties } from "react";

import { ILLUSTRATION_INK, ILLUSTRATION_WHITE } from "./illustration.const";

export const outlineStyle = (strokeWidth: number): CSSProperties => ({
  stroke: ILLUSTRATION_INK,
  strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export const checkStyle = (strokeWidth: number): CSSProperties => ({
  stroke: ILLUSTRATION_WHITE,
  strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});
