import type { DATE_FORMATS } from "../date.const";

export interface DateFormatOptions {
  language: string;
  format?: keyof typeof DATE_FORMATS;
  utc?: boolean;
  fallback?: string;
}
