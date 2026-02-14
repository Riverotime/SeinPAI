import { ArrowLeft, Mail } from "lucide-react";

export default function ContactPage() {
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
          <h1 className="text-4xl md:text-5xl font-light text-black mb-8" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
            Contact Us
          </h1>

          <p className="text-lg text-black/60 leading-relaxed mb-12" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
            We'd love to hear from you. Whether you have a question about Sein PAI, need help with your order, or just want to say hi—we're here for you.
          </p>

          <div className="bg-white rounded-2xl p-8 max-w-md">
            <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-6">
              <Mail size={22} className="text-black/60" />
            </div>
            <h2 className="text-xl font-medium text-black mb-2" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
              Email
            </h2>
            <p className="text-black/50 mb-4">For general inquiries and support</p>
            <a href="mailto:hi@seinpai.com" className="text-black font-medium hover:underline">
              hi@seinpai.com
            </a>
          </div>

          {/* Response time */}
          <div className="mt-12 p-6 bg-white/50 rounded-xl border border-black/5">
            <p className="text-sm text-black/50 text-center">
              We typically respond within 24 hours during business days.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
