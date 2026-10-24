import { useLocale } from "../i18n/LocaleProvider";
import { useState } from "react";
import PageShell from "./PageShell";
export default function ReferPage() {
  const {
    t
  } = useLocale();
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(new URL("/waitlist", window.location.origin).href);
      setStatus("Link copied.");
    } catch {
      setStatus("Couldn't copy automatically. You can copy the link below.");
    }
  }
  return <PageShell><main className="site-contact"><p className="site-eyebrow">{t("JUST Sein / SHARE")}</p><h1>{t("Better with")}<br />{t("someone you know.")}</h1><p className="site-lead">{t("Know someone who might be interested in Sein? Share the waitlist with them.")}</p><button className="site-button" onClick={copy}>{t("Copy waitlist link")}</button><p className="site-form-note"><a href="/waitlist">{new URL("/waitlist", window.location.origin).href}</a></p><p role="status">{t(status)}</p></main></PageShell>;
}
