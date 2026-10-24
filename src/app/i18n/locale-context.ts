import { createContext } from "react";
export const locales = [
  { code: "zh", tag: "zh-CN", label: "中文" },
  { code: "en", tag: "en", label: "EN" },
  { code: "ja", tag: "ja", label: "日本語" },
  { code: "ko", tag: "ko", label: "한국어" },
  { code: "fr", tag: "fr", label: "Français" },
  { code: "de", tag: "de", label: "Deutsch" },
  { code: "es", tag: "es", label: "Español" },
] as const;
export type Locale = typeof locales[number]["code"];
export function isLocale(value: string | null): value is Locale {
  return locales.some(item => item.code === value);
}
export type ContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (source: string, values?: Record<string, string>) => string; localize: <T>(value: T) => T };
export const LocaleContext = createContext<ContextValue | null>(null);
