import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); (window as any).navigate('/'); }}
            className="flex items-center gap-2 text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light text-black mb-4" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
            Privacy Policy
          </h1>
          <p className="text-black/40 mb-12">Last updated: January 2026</p>

          <div className="space-y-8 text-base text-black/60 leading-relaxed" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
            <section>
              <h2 className="text-xl font-medium text-black mb-4">Our Commitment to Privacy</h2>
              <p>
                At Sein PAI, privacy isn't just a feature—it's a fundamental principle. We believe your memories belong to you and only you. This policy explains how we protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">Audio Data</h2>
              <p className="mb-4">
                <strong className="text-black">No audio is ever stored.</strong> Sein PAI processes voice locally on the device, transcribes it, and immediately discards the audio. We never upload, store, or have access to your voice recordings.
              </p>
              <p>
                The only exception is when you explicitly choose to save an audio clip by double-tapping the device. Even then, this audio is stored locally on your device and synced only to your encrypted cloud storage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">Journal Entries</h2>
              <p>
                Your journal entries are encrypted end-to-end. This means only you can read them—not us, not anyone else. We use industry-standard AES-256 encryption, and your encryption keys never leave your devices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">Data We Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Account information (email, name) for authentication</li>
                <li>Device information for troubleshooting and improvements</li>
                <li>Usage analytics (anonymized) to improve the product</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">Data We Never Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Audio recordings (unless you explicitly save them)</li>
                <li>Location data</li>
                <li>Contents of your journal entries</li>
                <li>Biometric data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">Third Parties</h2>
              <p>
                We never sell, rent, or share your personal data with third parties for marketing purposes. We only share data with service providers essential to operating our service (e.g., cloud hosting), and they are bound by strict confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">Your Rights</h2>
              <p>
                You have the right to access, export, or delete your data at any time. Simply contact us at <a href="mailto:privacy@seinpai.com" className="text-black underline">privacy@seinpai.com</a> and we'll help you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-black mb-4">Questions?</h2>
              <p>
                If you have any questions about our privacy practices, please contact us at <a href="mailto:privacy@seinpai.com" className="text-black underline">privacy@seinpai.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
