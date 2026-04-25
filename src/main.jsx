import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop.jsx";

if (typeof window !== "undefined" && typeof document !== "undefined") {
  let hasEnabledAnimations = false;
  let fallbackId = null;

  const enableAnimations = () => {
    if (hasEnabledAnimations) return;
    hasEnabledAnimations = true;
    document.documentElement.classList.add("nv-animations-ready");
    if (fallbackId) {
      window.clearTimeout(fallbackId);
      fallbackId = null;
    }
    window.removeEventListener("pointerdown", enableAnimations, true);
    window.removeEventListener("keydown", enableAnimations, true);
    window.removeEventListener("scroll", enableAnimations, true);
  };

  window.addEventListener("pointerdown", enableAnimations, { once: true, capture: true, passive: true });
  window.addEventListener("keydown", enableAnimations, { once: true, capture: true });
  window.addEventListener("scroll", enableAnimations, { once: true, capture: true, passive: true });

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(
      () => enableAnimations(),
      { timeout: 2000 },
    );
  }

  fallbackId = window.setTimeout(enableAnimations, 2200);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop/>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
