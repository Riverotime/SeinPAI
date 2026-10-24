import { useLocale } from "../i18n/LocaleProvider";
import PageShell from "./PageShell";
export default function ContactPage() {
  const {
    t
  } = useLocale();
  return <PageShell><main className="site-contact"><p className="site-eyebrow">{t("JUST Sein / CONTACT")}</p><h1>{t("Let's talk.")}</h1><p className="site-lead">{t("A question, an idea, or a skill you'd like to bring to life. We'd love to hear from you.")}</p><div className="site-contact-grid"><article><span className="site-eyebrow">{t("SAY HELLO")}</span><h2>{t("For the everyday")}<br />{t("and the unexpected.")}</h2><p>{t("Product questions, support, and general inquiries.")}</p><a className="site-text-link" href="mailto:hi@seinpai.com">hi@seinpai.com ↗</a></article><article><span className="site-eyebrow">{t("BUILD WITH US")}</span><h2>{t("Bring your expertise")}<br />{t("into real life.")}</h2><p>{t("Interested in contributing a professional skill or collaborating with Sein?")}</p><a className="site-text-link" href="mailto:hi@seinpai.com?subject=Skill%20collaboration">{t("Start a conversation ↗")}</a></article></div></main></PageShell>;
}
