import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-lg font-medium text-black tracking-tight"
            style={{ fontFamily: "'Funnel Sans', sans-serif" }}
          >
            Sein<span className="text-black/40">PAI</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm text-black/40 hover:text-black transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-sm text-black/40 hover:text-black transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm text-black/40 hover:text-black transition-colors"
            >
              FAQ
            </button>
            <a
              href="https://book.stripe.com/7sY9ATgvM7LZg2acvPbQY0b"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
            >
              Preorder
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-black/60"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-black/5">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-black/60 hover:text-black transition-colors text-base py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left text-black/60 hover:text-black transition-colors text-base py-2"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left text-black/60 hover:text-black transition-colors text-base py-2"
              >
                FAQ
              </button>
              <a
                href="https://book.stripe.com/7sY9ATgvM7LZg2acvPbQY0b"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-5 py-3 rounded-full font-medium text-base hover:bg-black/80 transition-colors text-center mt-2"
              >
                Preorder Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
