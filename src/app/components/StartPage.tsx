import { ArrowLeft } from "lucide-react";

export default function StartPage() {
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-4" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
              Start
            </h1>
            <p className="text-black/40">Download the Sein PAI app to get started.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* iOS */}
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-black mb-2" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                iOS
              </h3>
              <p className="text-black/40 text-sm mb-6">Available on TestFlight</p>
              <div className="bg-white p-4 rounded-xl inline-block border border-black/10">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://testflight.apple.com/join/n6uzBvye')}`}
                  alt="iOS App QR Code"
                  className="w-[150px] h-[150px]"
                />
              </div>
              <p className="text-black/30 text-xs mt-4">Scan to download</p>
            </div>

            {/* Android */}
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-[#3DDC84] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                  <path d="M17.523 15.341c-.5 0-.906-.406-.906-.906s.406-.906.906-.906.906.406.906.906-.406.906-.906.906zm-11.046 0c-.5 0-.906-.406-.906-.906s.406-.906.906-.906.906.406.906.906-.406.906-.906.906zm11.4-6.025l1.997-3.458a.416.416 0 00-.152-.567.416.416 0 00-.567.152l-2.023 3.503a12.216 12.216 0 00-5.132-1.126c-1.88 0-3.615.406-5.132 1.126L4.845 5.443a.416.416 0 00-.567-.152.416.416 0 00-.152.567l1.997 3.458C2.688 11.27.406 14.954.406 19.125h23.188c0-4.171-2.282-7.855-5.717-9.809z"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-black mb-2" style={{ fontFamily: "'Funnel Sans', sans-serif" }}>
                Android
              </h3>
              <p className="text-black/40 text-sm mb-6">Coming Soon</p>
              <div className="bg-black/5 p-4 rounded-xl inline-flex items-center justify-center" style={{ width: '182px', height: '182px' }}>
                <p className="text-black/30 text-sm">Coming Soon</p>
              </div>
              <p className="text-black/30 text-xs mt-4">Stay tuned</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
