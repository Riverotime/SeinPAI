import { buyLink } from "@/app/links";
import { useLocale, LanguageSwitcher } from "../i18n/LocaleProvider";
import { useState, type ReactNode } from "react";
import logo from "@/assets/sein/sein-logo-mark.svg";
import "./SitePages.css";
export default function PageShell({
  children,
  current = "",
  languageControl
}: {
  children: ReactNode;
  current?: string;
  languageControl?: ReactNode;
}) {
  const {
    t
  } = useLocale();
  const [menu, setMenu] = useState(false);
  return <div className="site-page"><header className="site-header"><a className="site-brand" href="/" aria-label={t("Sein home")}><img src={logo} alt="" />Sein</a><button className="site-menu" aria-expanded={menu} aria-controls="site-navigation" onClick={() => setMenu(!menu)}>{menu ? t("Close") : t("Menu")}</button><nav id="site-navigation" className={menu ? "is-open" : ""} aria-label={t("Main navigation")}><a href="/#skills">{t("Features")}</a><a href="/about" aria-current={current === "about" ? "page" : undefined}>{t("About")}</a><a className="site-button" href={buyLink}>{t("Buy now")}</a></nav>{languageControl ?? <LanguageSwitcher />}</header>{children}<footer className="site-footer"><div><a className="site-brand" href="/"><img src={logo} alt="" />{t("JUST Sein")}</a><p>{t("Expert guidance. Everyday presence.")}</p></div><nav aria-label={t("Footer navigation")}><a href="/about">{t("About")}</a><a href="/contact">{t("Contact")}</a><a href="/help">{t("Help Center")}</a><a href="/privacy">{t("Privacy")}</a><a href="/start">{t("Get the app")}</a><a href={buyLink}>{t("Buy")}</a></nav><small>© {new Date().getFullYear()}{" " + t("Persein") + ""}</small></footer></div>;
}
