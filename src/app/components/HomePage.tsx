import img5971 from "@/assets/0bcc29dce614ac686a033a0cb6fd6b6cb2c6b659.png";
import imgImage110382 from "@/assets/9292a0d764cafbd16b4d2ea8a6fc3c1e67a31ffe.png";
import img60D924998A035F57F4449Bcff52Deec52 from "@/assets/46ba4aeb2e54923f5b128714d60aaecdd7b4bcac.png";
// 10 lifestyle images from Frame2147229288
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
// Journal cover images
import imgConver11 from "@/assets/9efb2186dfad184e2f4b7095cf5655b6c903f496.png";
import imgCover41 from "@/assets/0793d478be9da68aa4d78d077e2ae475ea88f0e7.png";
import imgCover31 from "@/assets/261897e2457e019fa9ba9386239f449868c68e3d.png";
import imgCover21 from "@/assets/b1ddf05f0fb29cf8d1d7b5640d40f7de97f95647.png";
import imgFrame21472292871 from "@/assets/a072c6bde4e4c8a07f0d46b3f63fc64439b0084e.png";
import img5961 from "@/assets/704137cd390520dec87e5d72e3f64e6258bfce35.png";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  
  const carouselImages = [
    imgConver11,
    imgCover41,
    imgCover31,
    imgCover21,
    imgFrame21472292871
  ];

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
    { src: img10Journal1, alt: "Journal" }
  ];

  const faqs = [
    {
      question: "What's Sein PAI?",
      answer: "Sein PAI is a personal AI journaling device that captures your daily moments through voice, automatically writing down your experiences with the tone, pace, and emotion of each moment—without any tapping or manual recording."
    },
    {
      question: "Why a wearable device?",
      answer: "A wearable makes auto-journaling seamless and always accessible. Wear it as a pendant, clip, or pin—whatever fits your style. It's designed to be with you throughout your day, capturing moments as they happen."
    },
    {
      question: "Is Sein PAI always recording?",
      answer: "No. Sein PAI uses voice triggers and contextual awareness to know when to capture moments. It's designed to journal your life, not record everything. Plus, no audio is stored—only the written journal entries."
    },
    {
      question: "Does Sein PAI require a subscription?",
      answer: "No subscription is needed to start. We're including 3 months of Sein Pro on us. After that, you can continue with the free version or upgrade to Pro for additional features."
    },
    {
      question: "Do I need to press a button to record?",
      answer: "No. Sein transcribes automatically and discards audio by default. Double-tap to record and save audio—LED indicates when recording."
    },
    {
      question: "What about privacy?",
      answer: "Privacy is our top priority. No audio is stored—ever. All processing happens locally on device first. Your journal entries are encrypted and only accessible to you. We never sell or share your personal data."
    },
    {
      question: "When does it ship?",
      answer: "Sein PAI is scheduled to ship in spring 2026. All preorders are fully refundable if you change your mind."
    },
    {
      question: "What's the refund policy?",
      answer: "We offer a fully refundable preorder. If you're not satisfied or change your mind before shipping, you can get a complete refund—no questions asked."
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselImages.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);


  return (
    <div className="min-h-screen bg-[#F5F3EE] relative pb-32">
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Hero Section */}
        <section className="pt-[80px] md:pt-20 pb-[0px] pr-[0px] pl-[0px]">
          <div className="max-w-4xl">
            <div className="font-['Funnel_Sans',sans-serif] text-[#838383] text-lg md:text-xl lg:text-[28px] leading-relaxed space-y-4 bg-[rgba(0,0,0,0)] px-[0px] pt-[10px] pb-[80px]">
              <p>Do you remember the color of your first diary?</p>
              <p>When was the last time you opened an old journal—grateful you wrote it down, or sad for the moments you didn't?</p>
              <p className="text-[30px]">What if something could hold onto these moments for you—without discipline, without remembering to record?</p>
              <p>For yourself. For the people you love. For the you who wants to look back, years from now.</p>
              <p className="mt-6 pt-4">Sein PAI. Worn on you. Auto-journaling, not recording. Writing down your every day—with the tone, the pauses, the emotion of that moment.</p>
            </div>
          </div>
        </section>

        {/* Product Image Section 1 */}
        <section className="py-16 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img 
                src={img60D924998A035F57F4449Bcff52Deec52} 
                alt="Sein device" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div>
              <div className="font-['Funnel_Sans',sans-serif] font-bold text-2xl md:text-3xl leading-relaxed space-y-2 bg-[rgba(0,0,0,0)]">
                <p className="text-[rgba(10,10,10,0.56)] font-bold">No Tap.</p>
                <p className="text-[rgba(10,10,10,0.56)]">No audio stored.</p>
                <p className="text-[rgba(10,10,10,0.56)]">Just your words—the pace, the tone, the feeling.</p>
                <p className="mt-4 text-[rgba(10,10,10,0.56)]">Sometimes how you say it matters more than what you say.</p>
                <p className="mt-4">Sein PAI: Pendant, clip, or pin—your call.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle Images Grid */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {lifestyleImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setLightboxImage(index)}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxImage !== null && (
          <div
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <div className="relative max-w-[90vw] max-h-[90vh]">
              <img
                src={lifestyleImages[lightboxImage].src}
                alt={lifestyleImages[lightboxImage].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(lightboxImage > 0 ? lightboxImage - 1 : lifestyleImages.length - 1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(lightboxImage < lifestyleImages.length - 1 ? lightboxImage + 1 : 0);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ›
              </button>
            </div>
          </div>
        )}

        {/* Feature Section - Empathy */}
        <section className="py-16">
        </section>

        {/* Journal Covers Section - Click to Enlarge */}
        <section className="py-16">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 items-stretch">

            {/* 左侧大图 - 当前选中的，高度与右侧小图对齐 */}
            <div className="w-full lg:w-[55%]">
              <div
                className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 h-full flex items-center"
                onClick={() => setActiveIndex((activeIndex + 1) % carouselImages.length)}
              >
                <img
                  src={carouselImages[activeIndex]}
                  alt={`Cover design ${activeIndex + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* 右侧小图 - 其他4张，单列，决定整体高度 */}
            <div className="w-full lg:w-[13%] flex flex-row lg:flex-col gap-1">
              {carouselImages.map((img, index) => (
                index !== activeIndex && (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:shadow-lg"
                  >
                    <img src={img} alt={`Cover ${index + 1}`} className="w-full h-auto object-contain" />
                  </div>
                )
              ))}
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="ml-0">
            <h2 className="font-['Funnel_Sans',sans-serif] text-[#838383] text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8">
              FAQs
            </h2>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <div
                  className="cursor-pointer flex items-center justify-between"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <p className="font-['Funnel_Sans',sans-serif] font-bold md:text-2xl leading-relaxed font-normal text-[rgba(10,10,10,0.42)] text-[20px]">
                    {faq.question}
                  </p>
                  <svg
                    className={`w-5 h-5 transition-transform flex-shrink-0 ml-4 ${
                      openFaqIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}
                    style={{ opacity: 0.42 }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openFaqIndex === index && (
                  <p className="font-['Funnel_Sans',sans-serif] text-[#838383] md:text-base leading-relaxed mt-2 text-[15px]">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-16 pb-8">
          <div className="flex items-center justify-between">
            <p className="text-lg text-[rgba(0,0,0,0.6)] font-['SF_Pro_Rounded',system-ui,sans-serif] font-bold text-[16px]">
              © 2026 Persein
            </p>
            <div className="flex flex-wrap gap-6 text-base text-[rgba(0,0,0,0.42)] font-['SF_Pro_Rounded',system-ui,sans-serif] text-[15px]">
              <a href="#" className="hover:text-black transition-colors">About</a>
              <a href="#" className="hover:text-black transition-colors">Contact</a>
              <a href="#" className="hover:text-black transition-colors">X</a>
              <a href="#" className="hover:text-black transition-colors">IG</a>
              <a href="#" className="hover:text-black transition-colors">YT</a>
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Fixed Bottom Preorder Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F5F3EE] border-t border-gray-200 py-[42px] px-[24px] z-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          <p className="text-sm text-[rgba(0,0,0,0.3)] font-['SF_Pro_Rounded',system-ui,sans-serif] max-w-2xl font-bold">
            No subscription needed to start. 3 months Pro on us. 
            <br />
            Ships spring '26—fully refundable.
          </p>
          <a 
            href="https://book.stripe.com/7sY9ATgvM7LZg2acvPbQY0b"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-8 py-3 rounded-full font-['SF_Pro_Rounded',system-ui,sans-serif] font-medium hover:bg-gray-800 transition-colors flex items-center gap-4 whitespace-nowrap"
          >
            <span>Preorder</span>
            <span className="font-semibold">$249</span>
            <span className="text-gray-400 line-through text-sm">$299 MSRP</span>
          </a>
        </div>
      </div>
    </div>
  );
}