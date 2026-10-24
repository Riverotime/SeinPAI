import { useLocale } from "../i18n/LocaleProvider";
import PageShell from "./PageShell";
export default function PrivacyPage() {
  const {
    t
  } = useLocale();
  return <PageShell>      <main className="site-document">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light text-black mb-4">{t("Privacy Policy")}

        </h1>
          <p className="text-black/40 mb-12">{t("Last updated: January 2026")}</p>

          <div className="space-y-8 text-base text-black/60 leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-black mb-4">{t("Our Commitment to Privacy")}</h2>
              <p>{t("At Sein PAI, privacy isn't just a feature—it's a fundamental principle. We believe your memories belong to you and only you. This policy explains how we protect your data.")}

            </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">{t("Audio Data")}</h2>
              <p className="mb-4">
                <strong className="text-black">{t("No audio is ever stored.")}</strong>{t("Sein PAI processes voice locally on the device, transcribes it, and immediately discards the audio. We never upload, store, or have access to your voice recordings.")}
            </p>
              <p>{t("The only exception is when you explicitly choose to save an audio clip by double-tapping the device. Even then, this audio is stored locally on your device and synced only to your encrypted cloud storage.")}

            </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">{t("Journal Entries")}</h2>
              <p>{t("Your journal entries are encrypted end-to-end. This means only you can read them—not us, not anyone else. We use industry-standard AES-256 encryption, and your encryption keys never leave your devices.")}

            </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">{t("Data We Collect")}</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>{t("Account information (email, name) for authentication")}</li>
                <li>{t("Device information for troubleshooting and improvements")}</li>
                <li>{t("Usage analytics (anonymized) to improve the product")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">{t("Data We Never Collect")}</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>{t("Audio recordings (unless you explicitly save them)")}</li>
                <li>{t("Location data")}</li>
                <li>{t("Contents of your journal entries")}</li>
                <li>{t("Biometric data")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">{t("Third Parties")}</h2>
              <p>{t("We never sell, rent, or share your personal data with third parties for marketing purposes. We only share data with service providers essential to operating our service (e.g., cloud hosting), and they are bound by strict confidentiality agreements.")}

            </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">{t("Your Rights")}</h2>
              <p>{t("You have the right to access, export, or delete your data at any time. Simply contact us at")}
              <a href="mailto:privacy@seinpai.com" className="text-black underline">privacy@seinpai.com</a>{t("and we'll help you.")}
            </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">{t("Questions?")}</h2>
              <p>{t("If you have any questions about our privacy practices, please contact us at")}
              <a href="mailto:privacy@seinpai.com" className="text-black underline">privacy@seinpai.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main></PageShell>;
}
