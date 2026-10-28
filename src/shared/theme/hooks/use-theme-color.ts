import { useEffect, useRef, useState } from "react";

import { THEME_BACKGROUND_PROPERTY } from "../model/theme.const";
import type { Theme } from "../types";

export const useThemeColor = (theme: Theme) => {
  const metaRef = useRef<HTMLMetaElement>(null);
  const [color, setColor] = useState<string>();

  useEffect(() => {
    if (metaRef.current === null) {
      return;
    }

    setColor(getComputedStyle(metaRef.current).getPropertyValue(THEME_BACKGROUND_PROPERTY).trim());
  }, [theme]);

  return { color, metaRef };
};
