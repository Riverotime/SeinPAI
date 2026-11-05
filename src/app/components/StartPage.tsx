import { buyLink } from "@/app/links";
import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { useLocale } from "../i18n/LocaleProvider";
import PageShell from "./PageShell";
import iosQR from "@/assets/sein/ios-download.svg";
import androidQR from "@/assets/sein/android-download.svg";

const downloads = [
  { name: "iOS", status: "Available on TestFlight", action: "Open TestFlight", url: "https://testflight.apple.com/join/n6uzBvye", qr: iosQR, alt: "iOS App QR Code" },
  { name: "Android", status: "Beta Preview", action: "Download Android APK", url: "http://image.voice.51biaotai.com/Sein-0.87-202611042319.apk", qr: androidQR, alt: "Android APK QR Code" },
];

function PlatformIcon({ platform }: { platform: string }) {
  return <span className="site-platform-icon" aria-hidden="true">
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {platform === "iOS" ? <>
        <rect x="8.5" y="3.5" width="15" height="25" rx="4" />
        <path d="M14 6.5h4" strokeWidth="2.5" />
        <path d="M13 25.5h6" />
      </> : <>
        <path d="m9 8-2-3m16 3 2-3M5 18a11 11 0 0 1 22 0v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
        <circle cx="11" cy="16" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="21" cy="16" r="1.2" fill="currentColor" stroke="none" />
      </>}
    </svg>
  </span>;
}

export default function StartPage() {
  const { t } = useLocale();
  const [qrPlatform, setQrPlatform] = useState<string | null>(null);
  const [isMobile] = useState(() => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
  const toggleQR = (platform: string) => setQrPlatform(current => current === platform ? null : platform);
  return <PageShell current="start">
    <main className="site-download-page">
      <section className="site-download-hero" aria-labelledby="download-title">
        <p className="site-eyebrow">{t("Expert guidance. Everyday presence.")}</p>
        <h1 id="download-title">{t("Download Sein.")}</h1>
        <p className="site-download-lead">{t("On your phone today. On your computer, soon.")}</p>
        <a className="site-button" href="#platforms">{t("Choose your platform")}</a>
      </section>
      <div className="site-platforms" id="platforms">
        <section className="site-platform-card site-platform-desktop" aria-labelledby="desktop-title">
          <Monitor className="site-category-icon" size={28} strokeWidth={1.3} aria-hidden="true" />
          <h2 id="desktop-title">{t("Desktop")}</h2>
          <p className="site-platform-description">{t("A little more presence, wherever you work.")}</p>
          <div className="site-platform-rows">
            {["macOS", "Windows"].map(name => <div className="site-platform-row" key={name}><span>{name}</span><span className="site-coming-soon">Coming soon</span></div>)}
          </div>
        </section>
        <section className="site-platform-card site-platform-mobile" aria-labelledby="mobile-title">
          <Smartphone className="site-category-icon" size={28} strokeWidth={1.3} aria-hidden="true" />
          <h2 id="mobile-title">{t("Mobile")}</h2>
          <p className="site-platform-description">{t("Keep Sein close, wherever life takes you.")}</p>
          <div className="site-platform-rows">
            {downloads.map(item => <div className="site-mobile-platform" key={item.name}>
              <div className="site-platform-row"><div className="site-platform-label"><PlatformIcon platform={item.name} /><div><span>{item.name}</span><small>{t(item.status)}</small></div></div>{isMobile ? <a className="site-platform-download" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={t(item.action)}>{t("Download")}</a> : <button type="button" className="site-platform-download" aria-label={`${item.name} · ${t("Scan to download")}`} aria-expanded={qrPlatform === item.name} aria-controls={`download-qr-${item.name}`} onClick={() => toggleQR(item.name)}>{t("Download")}</button>}</div>
              {!isMobile && <div className="site-platform-qr-panel" id={`download-qr-${item.name}`} hidden={qrPlatform !== item.name}><img src={item.qr} width="144" height="144" alt={t(item.alt)} /><p>{t("Scan to download")}</p></div>}
            </div>)}
          </div>
        </section>
      </div>
      <div className="site-download-invitation"><p>{t("Be part of what comes next.")}</p><a className="site-text-link" href={buyLink}>{t("Buy now")}</a></div>
    </main>
  </PageShell>;
}
