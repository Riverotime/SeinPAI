import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
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
            About Sein PAI
          </h1>

          <div className="space-y-8 text-lg text-black/60 leading-relaxed" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
            <p>
              Sein PAI was born from a simple question: What if you could capture life's moments without the friction of remembering to record them?
            </p>

            <p>
              We believe that journaling is one of the most valuable practices for self-reflection, memory preservation, and personal growth. But in our busy lives, it's often the first thing we forget to do.
            </p>

            <p>
              That's why we created Sein PAI—a wearable AI that automatically journals your day. No buttons to press, no apps to open. Just wear it, and let your story write itself.
            </p>

            <h2 className="text-2xl font-medium text-black pt-8">Our Mission</h2>
            <p>
              To help people preserve their most precious memories effortlessly, creating a legacy of moments for themselves and the people they love.
            </p>

            <h2 className="text-2xl font-medium text-black pt-8">Our Philosophy</h2>
            <p>
              We're committed to building AI that truly belongs to individuals—not to any company. Your memories, your data, your AI. We believe technology should serve people, not the other way around.
            </p>

            <h2 className="text-2xl font-medium text-black pt-8">Contact Us</h2>
            <p>
              Have questions? We'd love to hear from you.<br />
              Email us at <a href="mailto:hi@seinpai.com" className="text-black underline">hi@seinpai.com</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
