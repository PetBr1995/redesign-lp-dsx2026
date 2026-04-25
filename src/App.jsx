import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NewVendas from "./pages/NewVendas";
const PreserveUtmLinks = lazy(() => import("./components/PreserveUtmLinks"));
const RoutePageTracking = lazy(() => import("./components/RoutePageTracking"));

const HomeTeste = lazy(() => import("./pages/HomeTeste"));
const Palestrantes = lazy(() => import("./pages/Palestrantes"));
const Agradecimento = lazy(() => import("./pages/Agradecimento"));
const Patrocinadores = lazy(() => import("./pages/Patrocinadores"));
const WhatsappPage = lazy(() => import("./pages/WhatsappPage"));
const TesteAnimation = lazy(() => import("./pages/testeAnimation"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NewVendasCopy = lazy(() => import("./pages/NewVendasCopy"));
const PreCheckout = lazy(() => import("./pages/PreCheckout"));
const Vendas = lazy(() => import("./pages/Vendas"));
const LPAyla = lazy(() => import("./pages/LPAyla"));
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
            <Route path="/palestrantes" element={<Palestrantes />} />
            <Route path="/agradecimento" element={<Agradecimento />} />
            <Route path="/patrocinador" element={<Patrocinadores />} />
            <Route path="/whatsapp" element={<WhatsappPage />} />
            <Route path="/testeanimation" element={<TesteAnimation />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/precheckout" element={<PreCheckout />} />
            <Route
              path="/checkoutvendas"
              element={<Navigate to="/precheckout" replace />}
            />
            <Route
              path="/checkoutVendas"
              element={<Navigate to="/precheckout" replace />}
            />
            <Route path="/vendas-leads" element={<NewVendasCopy />} />
            <Route path="/lpayla" element={<LPAyla />} />
            <Route path="/lp/segmento/:slug" element={<SpeakerLandingPage />} />
            <Route path="/lp/:slug" element={<SpeakerLandingPage />} />
            <Route path="/sobre" element={<HomeTeste/>} />
            <Route path="/teste" element={<Vendas />} />
            <Route path="/patrocinadores" element={<Patrocinadores/>}/> 
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
