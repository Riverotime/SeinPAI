import { useState } from "react";
import HomePage from "@/app/components/HomePage.tsx";
import ReferPage from "@/app/components/ReferPage.tsx";
import AboutPage from "@/app/components/AboutPage.tsx";
import ContactPage from "@/app/components/ContactPage.tsx";
import PrivacyPage from "@/app/components/PrivacyPage.tsx";
import StartPage from "@/app/components/StartPage.tsx";

export default function App() {
  const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
  const [currentPath, setCurrentPath] = useState(normalizePath(window.location.pathname));

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
