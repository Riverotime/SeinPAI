import { useState } from "react";
import HomePage from "@/app/components/HomePage.tsx";
import ReferPage from "@/app/components/ReferPage.tsx";

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
  };

  // Provide navigate function to child components via window
  (window as any).navigate = navigate;

  return (
    <>
      {currentPath === "/refer" ? <ReferPage /> : <HomePage />}
    </>
  );
}
