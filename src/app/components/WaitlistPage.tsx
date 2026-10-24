import { useLocale } from "../i18n/LocaleProvider";
import { useState, type FormEvent } from "react";
import PageShell from "./PageShell";
import device from "@/assets/46ba4aeb2e54923f5b128714d60aaecdd7b4bcac.png";
export default function WaitlistPage() {
  const {
    t
  } = useLocale();
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Everyday life");
  const [opened, setOpened] = useState(false);
  const subject = t("Sein waitlist request");
  const body = t("waitlist.emailBody", { email, interest: t(interest) });
  const draft = `mailto:hi@seinpai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = draft;
    setOpened(true);
  }
  return <PageShell current="waitlist"><main className="site-waitlist"><div><p className="site-eyebrow">{t("JUST Sein / STAY CLOSE")}</p><h1>{t("A little closer")}<br />{t("to what's next.")}</h1><p className="site-lead">{t("Join the waitlist for Sein availability updates. No payment or purchase required.")}</p><form className="site-form" onSubmit={submit}><label htmlFor="waitlist-email">{t("Your email")}</label><input id="waitlist-email" type="email" autoComplete="email" required value={email} onChange={e => {
            setEmail(e.target.value);
            setOpened(false);
          }} placeholder="you@example.com" /><label htmlFor="waitlist-interest">{t("What brings you here?")}</label><select id="waitlist-interest" value={interest} onChange={e => setInterest(e.target.value)}>{["Everyday life", "Parenting", "Relationships", "Work & ideas", "Creating a professional skill"].map(x => <option key={x} value={x}>{t(x)}</option>)}</select><p className="site-form-note">{t("We currently take waitlist requests by email. This opens a draft to hi@seinpai.com. Send it from your email app to request a place.")}</p><button className="site-button" type="submit">{t("Request to join by email ↗")}</button><p className="site-form-note">{"" + t("Your details are included only in the email you choose to send.") + " "}<a href="/privacy">{t("Privacy policy")}</a></p>{opened && <p className="site-form-status" role="status">{t("Your email draft has been requested. You are not enrolled yet—please send the email. If your mail app didn't open, email hi@seinpai.com with the subject “Sein waitlist request”.")}</p>}</form></div><div className="site-product-art"><img src={device} alt={t("Sein held between two fingers")} /></div></main></PageShell>;
}
