import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Mic, Shield, PenLine, Sparkles, Clock, Heart, ChevronDown, Twitter, Instagram, Youtube } from "lucide-react";
import img60D924998A035F57F4449Bcff52Deec52 from "@/assets/46ba4aeb2e54923f5b128714d60aaecdd7b4bcac.png";
import img1Expecting1 from "@/assets/9d7e53572b328d4399f242954cd93336f071028d.png";
import img2WithKids1 from "@/assets/8a250fef6b7394ac221237cbc3275b1f3991b611.png";
import img3Driving1 from "@/assets/01143d992d42df511f3f1ee4b93a759f351ecd8c.png";
import img4Capture1 from "@/assets/e3e3598b1dabc5ab12f65981fc04d237bf3dbced.png";
import img5Mood1 from "@/assets/0f61705140081cd8233be3e9c40faf881edc1236.png";
import img6NoAudio1 from "@/assets/a1caec64e319fbd80b3b2a3059370a5e7fb1c833.png";
import img7Coffee1 from "@/assets/d705a77bdbb56d27bead2973827da1ff99167073.png";
import img8Walk1 from "@/assets/9cdb6686ea43b66a3051eb8d816e31a001b27d77.png";
import img9Work1 from "@/assets/979c9c445552d810fb1dceee7d75c334a662503c.png";
import img10Journal1 from "@/assets/69c58058d3083bb08ff0b13d397a90552d94896c.png";
import imgConver11 from "@/assets/9efb2186dfad184e2f4b7095cf5655b6c903f496.png";
import imgCover41 from "@/assets/0793d478be9da68aa4d78d077e2ae475ea88f0e7.png";
import imgCover31 from "@/assets/261897e2457e019fa9ba9386239f449868c68e3d.png";
import imgCover21 from "@/assets/b1ddf05f0fb29cf8d1d7b5640d40f7de97f95647.png";
import imgFrame21472292871 from "@/assets/a072c6bde4e4c8a07f0d46b3f63fc64439b0084e.png";
import Header from "./Header";

// Animation wrapper component
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const carouselImages = [imgConver11, imgCover41, imgCover31, imgCover21, imgFrame21472292871];

  const lifestyleImages = [
    { src: img1Expecting1, alt: "Expecting" },
    { src: img2WithKids1, alt: "With Kids" },
    { src: img3Driving1, alt: "Driving" },
    { src: img4Capture1, alt: "Capture" },
    { src: img5Mood1, alt: "Mood" },
    { src: img6NoAudio1, alt: "No Audio" },
    { src: img7Coffee1, alt: "Coffee" },
    { src: img8Walk1, alt: "Walk" },
    { src: img9Work1, alt: "Work" },
    { src: img10Journal1, alt: "Journal" },
  ];

  const features = [
    { icon: Mic, title: "Auto-Journaling", description: "No tapping required. Captures through voice triggers and contextual awareness." },
    { icon: Shield, title: "Privacy First", description: "No audio stored—ever. Processing happens locally. Encrypted and only yours." },
    { icon: PenLine, title: "Emotional Capture", description: "Preserves tone, pauses, and emotion—not just words." },
    { icon: Sparkles, title: "AI-Powered", description: "Smart transcription that understands context beautifully." },
    { icon: Clock, title: "Always Ready", description: "Pendant, clip, or pin. Always with you, ready to capture." },
    { icon: Heart, title: "For Those You Love", description: "Lasting memories for you, your family, and future you." },
  ];

  const faqs = [
    { question: "What's Sein PAI?", answer: "Sein PAI is a personal AI journaling device that captures your daily moments through voice, automatically writing down your experiences with the tone, pace, and emotion of each moment—without any tapping or manual recording." },
    { question: "Why a wearable device?", answer: "A wearable makes auto-journaling seamless and always accessible. Wear it as a pendant, clip, or pin—whatever fits your style. It's designed to be with you throughout your day, capturing moments as they happen." },
    { question: "Is Sein PAI always recording?", answer: "No. Sein PAI uses voice triggers and contextual awareness to know when to capture moments. It's designed to journal your life, not record everything. Plus, no audio is stored—only the written journal entries." },
    { question: "Does it require a subscription?", answer: "No subscription is needed to start. We're including 3 months of Sein Pro on us. After that, you can continue with the free version or upgrade to Pro for additional features." },
    { question: "Do I need to press a button?", answer: "No. Sein transcribes automatically and discards audio by default. Double-tap to record and save audio—LED indicates when recording." },
    { question: "What about privacy?", answer: "Privacy is our top priority. No audio is stored—ever. All processing happens locally on device first. Your journal entries are encrypted and only accessible to you." },
    { question: "When does it ship?", answer: "Sein PAI ships spring 2026. All preorders are fully refundable." },
    { question: "Refund policy?", answer: "Fully refundable preorder. Change your mind before shipping? Complete refund—no questions asked." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const scrollToContent = () => {
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] relative">
      <Header />

      {/* HERO SECTION - Full viewport, centered */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base tracking-[0.2em] uppercase text-black/40 mb-6 font-medium"
          >
            The Wearable Personal AI
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-black mb-8 tracking-tight leading-[0.9]"
            style={{ fontFamily: "'Funnel Sans', sans-serif" }}
          >
            Your life,
            <br />
            <span className="font-normal">written down.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-black/50 mb-12 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Funnel Sans', sans-serif" }}
          >
            Auto-journaling, not recording. Capturing your moments—the tone, the pauses, the emotion.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <span className="text-sm text-black/30">Ships Spring '26 · Fully Refundable</span>
            <a
              href="https://book.stripe.com/7sY9ATgvM7LZg2acvPbQY0b"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-10 py-4 rounded-full text-base font-medium hover:bg-black/80 transition-all duration-300 inline-flex items-center gap-3"
            >
              Preorder
              <span className="text-white/60">$249</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-black/30 hover:text-black/50 transition-colors cursor-pointer"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </motion.section>

      {/* INTRO SECTION */}
      <section id="intro" className="py-32 md:py-40 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="space-y-8 text-xl md:text-2xl text-black/40 leading-relaxed" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
              <p>Do you remember the color of your first diary?</p>
              <p>When was the last time you opened an old journal—grateful you wrote it down, or sad for the moments you didn't?</p>
              <p>What if something could hold onto these moments for you—without discipline, without remembering to record?</p>
              <p className="text-black/70 font-medium pt-4">
                For yourself. For the people you love. For the you who wants to look back, years from now.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="py-24 md:py-32 px-6 bg-[#FAFAF8]" id="features">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Product Image */}
              <div className="relative order-2 lg:order-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <img
                    src={img60D924998A035F57F4449Bcff52Deec52}
                    alt="Sein PAI device"
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>

              {/* Text Content */}
              <div className="order-1 lg:order-2 space-y-6" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">
                  No tap.<br />
                  No audio stored.<br />
                  <span className="text-black/40">Just your words.</span>
                </h2>
                <p className="text-lg text-black/50 leading-relaxed max-w-md">
                  The pace, the tone, the feeling. Sometimes how you say it matters more than what you say.
                </p>
                <p className="text-base text-black/80 font-medium">
                  Sein PAI: Pendant, clip, or pin—your call.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FEATURES - Bento Grid */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-black mb-4" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                Why Sein PAI
              </h2>
            </div>
          </AnimatedSection>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Large card - spans 4 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-4 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group"
            >
              <div className="relative z-10">
                <Mic size={32} strokeWidth={1.5} className="mb-6 text-white/80" />
                <h3 className="text-2xl md:text-3xl font-medium mb-4" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                  Auto-Journaling
                </h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-md">
                  No tapping. No remembering. Sein captures your moments through voice triggers and contextual awareness—automatically.
                </p>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500" />
            </motion.div>

            {/* Small card - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 bg-[#FAFAF8] rounded-3xl p-8 group hover:bg-[#F5F5F0] transition-all duration-300"
            >
              <Shield size={28} strokeWidth={1.5} className="mb-6 text-black/60 group-hover:text-black transition-colors" />
              <h3 className="text-xl font-medium mb-2 text-black" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                Privacy First
              </h3>
              <p className="text-black/50 text-sm leading-relaxed">
                No audio stored—ever. Processing happens locally. Encrypted and only yours.
              </p>
            </motion.div>

            {/* Small card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 bg-[#FAFAF8] rounded-3xl p-8 group hover:bg-[#F5F5F0] transition-all duration-300"
            >
              <PenLine size={28} strokeWidth={1.5} className="mb-6 text-black/60 group-hover:text-black transition-colors" />
              <h3 className="text-xl font-medium mb-2 text-black" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                Emotional Capture
              </h3>
              <p className="text-black/50 text-sm leading-relaxed">
                Preserves tone, pauses, and emotion—not just words.
              </p>
            </motion.div>

            {/* Medium card - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 bg-[#FAFAF8] rounded-3xl p-8 group hover:bg-[#F5F5F0] transition-all duration-300"
            >
              <Sparkles size={28} strokeWidth={1.5} className="mb-6 text-black/60 group-hover:text-black transition-colors" />
              <h3 className="text-xl font-medium mb-2 text-black" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                AI-Powered
              </h3>
              <p className="text-black/50 text-sm leading-relaxed">
                Smart transcription that understands context beautifully.
              </p>
            </motion.div>

            {/* Small card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-2 bg-[#FAFAF8] rounded-3xl p-8 group hover:bg-[#F5F5F0] transition-all duration-300"
            >
              <Clock size={28} strokeWidth={1.5} className="mb-6 text-black/60 group-hover:text-black transition-colors" />
              <h3 className="text-xl font-medium mb-2 text-black" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                Always Ready
              </h3>
              <p className="text-black/50 text-sm leading-relaxed">
                Pendant, clip, or pin. Always with you.
              </p>
            </motion.div>

            {/* Heart card with accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="md:col-span-2 bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-8 group"
            >
              <Heart size={28} strokeWidth={1.5} className="mb-6 text-rose-400" />
              <h3 className="text-xl font-medium mb-2 text-black" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                For Those You Love
              </h3>
              <p className="text-black/50 text-sm leading-relaxed">
                Lasting memories for you, your family, and future you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE GALLERY */}
      <section className="py-24 md:py-32 px-6 bg-[#FAFAF8]" id="gallery">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-black mb-4" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                Moments worth remembering
              </h2>
              <p className="text-black/40 max-w-lg mx-auto">
                From morning coffee to bedtime stories, capture what matters most.
              </p>
            </div>
          </AnimatedSection>

          {/* Two Row Layout - Natural Aspect Ratios */}
          <div className="space-y-4">
            {/* Row 1 - 5 images */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {lifestyleImages.slice(0, 5).map((image, index) => (
                <motion.div
                  key={index}
                  onClick={() => setLightboxImage(index)}
                  className="flex-shrink-0 cursor-pointer relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-[280px] md:h-[360px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 2 - 5 images */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {lifestyleImages.slice(5, 10).map((image, index) => (
                <motion.div
                  key={index + 5}
                  onClick={() => setLightboxImage(index + 5)}
                  className="flex-shrink-0 cursor-pointer relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-[280px] md:h-[360px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl w-full"
          >
            <img
              src={lifestyleImages[lightboxImage].src}
              alt={lifestyleImages[lightboxImage].alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white text-sm tracking-widest uppercase"
            >
              Close
            </button>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxImage(lightboxImage > 0 ? lightboxImage - 1 : lifestyleImages.length - 1); }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxImage(lightboxImage < lifestyleImages.length - 1 ? lightboxImage + 1 : 0); }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto"
              >
                ›
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* JOURNAL COVERS - Product Features */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-black mb-4" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                How Sein PAI works
              </h2>
              <p className="text-black/40">See how your daily moments become beautiful journal entries.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            {/* Horizontal Scroll Gallery */}
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {carouselImages.map((img, index) => (
                <motion.div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                    index === activeIndex
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-90"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <img
                    src={img}
                    alt={`Feature ${index + 1}`}
                    className="h-[400px] md:h-[500px] w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-black w-6" : "bg-black/20 hover:bg-black/40"
                  }`}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6 bg-[#FAFAF8]" id="faq">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-black mb-4" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                Questions
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-300 ${
                    openFaqIndex === index ? "bg-white shadow-sm" : "bg-white/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-black" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaqIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-black/30 text-xl"
                    >
                      +
                    </motion.span>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaqIndex === index ? "auto" : 0,
                      opacity: openFaqIndex === index ? 1 : 0,
                      marginTop: openFaqIndex === index ? 12 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-black/50 leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 bg-white border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-medium text-black mb-4" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                Sein<span className="text-black/40">PAI</span>
              </h3>
              <p className="text-sm text-black/40 leading-relaxed max-w-sm">
                Auto-journaling for the moments that matter. Worn on you, always capturing—never recording.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-medium text-black mb-4">Company</h4>
              <div className="flex flex-col gap-3">
                <a
                  href="/about"
                  onClick={(e) => { e.preventDefault(); (window as any).navigate('/about'); }}
                  className="text-sm text-black/40 hover:text-black transition-colors"
                >
                  About
                </a>
                <a
                  href="/contact"
                  onClick={(e) => { e.preventDefault(); (window as any).navigate('/contact'); }}
                  className="text-sm text-black/40 hover:text-black transition-colors"
                >
                  Contact
                </a>
                <a
                  href="/privacy"
                  onClick={(e) => { e.preventDefault(); (window as any).navigate('/privacy'); }}
                  className="text-sm text-black/40 hover:text-black transition-colors"
                >
                  Privacy
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-medium text-black mb-4">Follow</h4>
              <div className="flex gap-3">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all">
                  <Twitter size={16} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all">
                  <Instagram size={16} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all">
                  <Youtube size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-black/30">© 2026 Persein. All rights reserved.</p>
            <p className="text-xs text-black/30">Made with care for those who want to remember.</p>
          </div>
        </div>
      </footer>

      {/* FIXED PREORDER BAR */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-black/5 py-4 px-6 z-50"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:block">
            <p className="text-sm text-black/70 font-medium">
              3 months Pro included. <span className="text-black/40">Ships Spring '26 — fully refundable.</span>
            </p>
          </div>
          <p className="md:hidden text-xs text-black/50 flex-1">
            3 months Pro free. Ships Spring '26.
          </p>
          <a
            href="https://book.stripe.com/7sY9ATgvM7LZg2acvPbQY0b"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-all duration-300 flex items-center gap-3 whitespace-nowrap"
          >
            <span>Preorder</span>
            <span className="font-semibold">$249</span>
            <span className="text-white/50 line-through text-xs">$299</span>
          </a>
        </div>
      </motion.div>

      {/* Bottom padding for fixed bar */}
      <div className="h-20" />
    </div>
  );
}
