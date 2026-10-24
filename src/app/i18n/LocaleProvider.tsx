import { useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import messages from "./messages.json";
import "./locale.css";
import { LocaleContext, locales, isLocale, type ContextValue, type Locale } from "./locale-context";
export type { Locale } from "./locale-context";
const catalog = messages as Record<string, Record<Locale, string>>;
const storageKey = "sein-language";
export function translate(locale: Locale, source: string, values: Record<string, string> = {}) {
  const template = catalog[source]?.[locale] ?? catalog[source]?.en ?? source;
  return template.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
}
function initialLocale(): Locale {
  const query = new URLSearchParams(window.location.search).get("lang");
  if (isLocale(query)) return query;
  try { const saved = localStorage.getItem(storageKey); if (isLocale(saved)) return saved; } catch { /* Language selection works without storage. */ }
  for (const language of navigator.languages ?? [navigator.language]) {
    const code = language.toLowerCase().split("-")[0];
    if (isLocale(code)) return code;
  }
  return "en";
}
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>(initialLocale);
  const setLocale = useCallback((next: Locale) => {
    updateLocale(next);
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) { url.searchParams.set("lang", next); window.history.replaceState(window.history.state, "", url); }
  }, []);
  useEffect(() => { document.documentElement.lang = locales.find(item => item.code === locale)!.tag; try { localStorage.setItem(storageKey, locale); } catch { /* Storage can be unavailable in private environments. */ } }, [locale]);
  const value = useMemo<ContextValue>(() => {
    const t = (source: string, values?: Record<string, string>) => translate(locale, source, values);
    function localize<T>(input: T): T {
      if (typeof input === "string") return t(input) as T;
      if (Array.isArray(input)) return input.map(localize) as T;
      if (input && typeof input === "object") return Object.fromEntries(Object.entries(input).map(([key, val]) => [key, localize(val)])) as T;
      return input;
    }
    return { locale, setLocale, t, localize };
  }, [locale, setLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale() { const value = useContext(LocaleContext); if (!value) throw new Error("useLocale requires LocaleProvider"); return value; }
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  return <div className="language-switcher"><label className="language-label" htmlFor="site-language">{t("Language")}</label><select id="site-language" aria-label={t("Choose language")} value={locale} onChange={event => { if (isLocale(event.target.value)) setLocale(event.target.value); }}>{locales.map(item => <option key={item.code} value={item.code} lang={item.tag}>{item.label}</option>)}</select></div>;
}
