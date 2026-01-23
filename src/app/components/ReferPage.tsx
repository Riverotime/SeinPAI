import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function ReferPage() {
  const [email, setEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setConfirmedEmail(email);
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    const link = `https://book.stripe.com/9B6aEXdjAferg2a9jDbQY0f?email=${encodeURIComponent(confirmedEmail)}`;
    setReferralLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              (window as any).navigate('/');
            }}
            className="text-sm text-[rgba(0,0,0,0.6)] hover:text-black transition-colors font-['SF_Pro_Rounded',system-ui,sans-serif]"
          >
            ← Back to Home
          </a>
        </div>

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="text-black"
          >
            <path
              d="M40 10C23.4 10 10 23.4 10 40s13.4 30 30 30 30-13.4 30-30S56.6 10 40 10z"
              fill="currentColor"
            />
          </svg>
        </div>

        {!referralLink ? (
          <>
            {/* Title */}
            <h1 className="text-2xl font-['SF_Pro_Rounded',system-ui,sans-serif] font-semibold text-black mb-2">
              Recipient Email
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-[rgba(0,0,0,0.6)] font-['SF_Pro_Rounded',system-ui,sans-serif] mb-8">
              They get $15 off. You get $15 or 1 months Pro—your pick.
            </p>

            {!showConfirm ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-['SF_Pro_Rounded',system-ui,sans-serif] text-[rgba(0,0,0,0.6)] mb-2"
                  >
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="recipient@gmail.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg font-['SF_Pro_Rounded',system-ui,sans-serif] text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-['SF_Pro_Rounded',system-ui,sans-serif] font-semibold text-base hover:bg-gray-800 transition-colors"
                >
                  Refer a friend
                </button>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-0.5"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-[rgba(0,0,0,0.5)] font-['SF_Pro_Rounded',system-ui,sans-serif]"
                  >
                    By clicking continue, I agree to Sein's{" "}
                    <a href="#" className="underline">Terms of Service</a>,{" "}
                    <a href="#" className="underline">Privacy Policy</a>, and{" "}
                    <a href="#" className="underline">Biometric Data Policy</a>.
                  </label>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Confirmation */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-['SF_Pro_Rounded',system-ui,sans-serif] text-[rgba(0,0,0,0.6)] mb-2">
                    Confirm email address:
                  </p>
                  <p className="text-base font-['SF_Pro_Rounded',system-ui,sans-serif] font-semibold text-black">
                    {confirmedEmail}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowConfirm(false);
                      setConfirmedEmail("");
                    }}
                    className="flex-1 bg-gray-200 text-black py-4 rounded-full font-['SF_Pro_Rounded',system-ui,sans-serif] font-semibold text-base hover:bg-gray-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 bg-black text-white py-4 rounded-full font-['SF_Pro_Rounded',system-ui,sans-serif] font-semibold text-base hover:bg-gray-800 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Success State */}
            <h1 className="text-2xl font-['SF_Pro_Rounded',system-ui,sans-serif] font-semibold text-black mb-2">
              Your Referral Link
            </h1>

            <p className="text-sm text-[rgba(0,0,0,0.6)] font-['SF_Pro_Rounded',system-ui,sans-serif] mb-8">
              Share this link with {confirmedEmail}
            </p>

            <div className="space-y-4">
              {/* Referral Link Display */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 break-all">
                <p className="text-sm font-['SF_Pro_Rounded',system-ui,sans-serif] text-black">
                  {referralLink}
                </p>
              </div>

              {/* Copy Button */}
              <button
                onClick={copyToClipboard}
                className="w-full bg-black text-white py-4 rounded-full font-['SF_Pro_Rounded',system-ui,sans-serif] font-semibold text-base hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </button>

              {/* Create Another */}
              <button
                onClick={() => {
                  setEmail("");
                  setConfirmedEmail("");
                  setShowConfirm(false);
                  setReferralLink("");
                }}
                className="w-full bg-white text-black py-4 rounded-full font-['SF_Pro_Rounded',system-ui,sans-serif] font-semibold text-base hover:bg-gray-100 transition-colors border border-gray-200"
              >
                Refer Another Friend
              </button>
            </div>
          </>
        )}

        {/* Support Text */}
        <p className="text-xs text-[rgba(0,0,0,0.4)] font-['SF_Pro_Rounded',system-ui,sans-serif] text-center mt-8">
          For support, email us at hi@seinpai.com
        </p>
      </div>
    </div>
  );
}
