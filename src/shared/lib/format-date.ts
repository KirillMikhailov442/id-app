import dayjs from "dayjs";

import { DATE_FALLBACK, DATE_FORMATS } from "./date.const";
import type { DateFormatOptions } from "./types";

export const formatDate = (
  value: string,
  { language, format = "long", utc = false, fallback = DATE_FALLBACK }: DateFormatOptions
): string => {
  const date = utc ? dayjs.utc(value) : dayjs(value);

  if (!date.isValid()) {
    return fallback;
  }

  return date.locale(language.toLowerCase().split("-")[0]).format(DATE_FORMATS[format]);
};
