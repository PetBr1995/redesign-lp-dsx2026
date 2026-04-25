import { useEffect, useMemo, useState } from "react";
import useScrollToHash from "../hooks/useScrollToHash";

import NewVendasSpeakersSlider from "../components/NewVendas/NewVendasSpeakersSlider";
import ContentSection from "../components/ContentSection";
import DsxConsolidation from "../components/DscConsolidation";
import FaleConosco from "../components/FaleConosco";
import Footer from "../components/Footer";
import FormSection from "../components/FormSection";
import HeroSection from "../components/HeroSection";
import NewTimerHeader from "../components/NewTimerHeader";
import SecondSection from "../components/SecondSection";
import HeroSectionV2 from "../components/HeroSectionV2";
import SlideFaixa from "../components/SlideFaixa";
import Depoimentos from "../components/Depoimentos";
import PublicoDSX from "../components/PublicoDSX";
import FAQ from "../components/FAQ";
import BannerSection from "../components/BannerSection";
import CondicoesGrupos from "../components/CondicoesGrupos";
import BotaoWP from "../components/BotaoWP";


const Home = () => {
  const [showTimerHeader, setShowTimerHeader] = useState(false);
  const midnightToday = useMemo(() => {
    const date = new Date();
    date.setHours(24, 0, 0, 0);
    return date;
  }, []);

  // ✅ garante scroll ao chegar com /#form, /#faleconosco etc.
  useScrollToHash(90); // 90px = altura do header (ajuste)

  useEffect(() => {
    const onScroll = () => setShowTimerHeader(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" className="bg-black pb-43 md:pb-18 overflow-x-hidden">
      <section id="home-novos-palestrantes" data-section="home-novos-palestrantes">
        <NewVendasSpeakersSlider />
      </section>

      <section id="home-hero" data-section="home-hero">
        <HeroSection />
      </section>

      <section id="home-destaques" data-section="home-destaques">
        <HeroSectionV2 />
      </section>

      <section id="home-faixa" data-section="home-faixa">
        <SlideFaixa />
      </section>

      <section id="home-timer-header" data-section="home-timer-header">
        <NewTimerHeader
          isVisible={showTimerHeader}
          headerText="O terceiro lote começa em:"
          ctaTitle="Segundo lote disponível"
          targetDate={midnightToday}
        />
      </section>

      <section id="home-content" data-section="home-content">
        <ContentSection />
      </section>

      <section id="home-depoimentos" data-section="home-depoimentos">
        <Depoimentos />
      </section>

      <section id="home-publico" data-section="home-publico">
        <PublicoDSX />
      </section>

      <section id="home-banner" data-section="home-banner">
        <BannerSection />
      </section>

      <section id="home-condicoes-grupos" data-section="home-condicoes-grupos">
        <CondicoesGrupos />
      </section>

      <section id="home-form" data-section="home-form">
        <FormSection />
      </section>

      <section id="home-fale-conosco" data-section="home-fale-conosco">
        <FaleConosco />
      </section>

      <section id="home-faq" data-section="home-faq">
        <FAQ />
      </section>

      <section id="home-footer" data-section="home-footer">
        <Footer />
      </section>

      <section id="home-whatsapp-button" data-section="home-whatsapp-button">
        <BotaoWP />
      </section>
    </section>
  );
};

export default Home;
