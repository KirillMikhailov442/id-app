import { useTheme } from "../hooks/use-theme";
import { useThemeColor } from "../hooks/use-theme-color";

export const ThemeMetadata = () => {
  const { theme } = useTheme();
  const { color, metaRef } = useThemeColor(theme);

  return (
    <>
      <meta ref={metaRef} content={color} name="theme-color" />
      <meta content={theme} name="color-scheme" />
    </>
  );
};
