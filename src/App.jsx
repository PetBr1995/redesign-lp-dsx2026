import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NewVendas from "./pages/NewVendas";
const PreserveUtmLinks = lazy(() => import("./components/PreserveUtmLinks"));
const RoutePageTracking = lazy(() => import("./components/RoutePageTracking"));

const PreCheckout = lazy(() => import("./pages/PreCheckout"));
const SpeakerLandingPage = lazy(
  () => import("./features/SpeakerLanding/SpeakerLandingPage"),
);

const App = () => {
  const [shouldLoadTracking, setShouldLoadTracking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(
        () => setShouldLoadTracking(true),
        { timeout: 1200 },
      );
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(() => setShouldLoadTracking(true), 300);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      {shouldLoadTracking ? (
        <Suspense fallback={null}>
          <PreserveUtmLinks />
          <RoutePageTracking />
        </Suspense>
      ) : null}
      <div id="main-content" tabIndex={-1}>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Routes>
            <Route path="/" element={<NewVendas />} />
            <Route path="/precheckout" element={<PreCheckout />} />
            <Route path="/lp/segmento/:slug" element={<SpeakerLandingPage />} />
            <Route path="/lp/:slug" element={<SpeakerLandingPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
