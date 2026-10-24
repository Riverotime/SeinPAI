import { useEffect, useState } from "react";
import SuixinpeiPage from "@/app/components/SuixinpeiPage";
import HomePage from "@/app/components/HomePageLassie.tsx";
import ReferPage from "@/app/components/ReferPage.tsx";
import AboutPage from "@/app/components/AboutPage.tsx";
import ContactPage from "@/app/components/ContactPage.tsx";
import PrivacyPage from "@/app/components/PrivacyPage.tsx";
import StartPage from "@/app/components/StartPage.tsx";

import { buyLink } from "@/app/links";

import { LocaleProvider, useLocale } from "./i18n/LocaleProvider";

export default function App() { return <LocaleProvider><AppContent /></LocaleProvider>; }

function AppContent() {
  const { locale, t } = useLocale();
  const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
  const [currentPath, setCurrentPath] = useState(normalizePath(window.location.pathname));

  useEffect(() => {
    const pages: Record<string, string> = { "/": "Expert guidance, everyday presence", "/about": "About", "/contact": "Contact", "/privacy": "Privacy", "/start": "Get the app", "/refer": "Share" };
    document.title = currentPath === "/suixinpei" ? "随心佩 · 你的随身 AI 顾问 | Sein" : `Sein | ${t(pages[currentPath] ?? pages["/"])}`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", currentPath === "/suixinpei" ? "随心佩，一枚常伴左右的赛博挂件。轻轻一戴，记录生活、整理思绪、发现自己。" : t("Skills created by professionals, connected to your everyday life. Explore Sein."));
  }, [currentPath, locale, t]);

  // Listen to browser navigation
  window.onpopstate = () => {
    setCurrentPath(normalizePath(window.location.pathname));
  };

  // Simple routing function
  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(normalizePath(path));
    window.scrollTo(0, 0);
  };

  // Provide navigate function to child components via window
  (window as any).navigate = navigate;

  // Render page based on current path
  const renderPage = () => {
    switch (currentPath) {
      case "/suixinpei":
        return <SuixinpeiPage />;
      case "/waitlist":
        window.location.replace(buyLink);
        return null;
      case "/refer":
        return <ReferPage />;
      case "/about":
        return <AboutPage />;
      case "/contact":
        return <ContactPage />;
      case "/privacy":
        return <PrivacyPage />;
      case "/start":
        return <StartPage />;
      default:
        return <HomePage />;
    }
  };

  return <>{renderPage()}</>;
}
