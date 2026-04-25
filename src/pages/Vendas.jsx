import { useEffect, useState } from "react";

import HeroVendas from "../components/ComponentsVendas/HeroVendas";
import SecondSectionVendas from "../components/ComponentsVendas/SecondSectionVendas";
import CallToActionPatrocinadores from "../components/ComponentsPatrocinadores/CallToActionPatrocinadores";
import Footer from "../components/Footer";
import FormVendas from "../components/ComponentsVendas/FormVendas";
import ImpactoVendas from "../components/ComponentsVendas/ImpactoVendas";
import FAQ from "../components/FAQ"
import PassaporteVendas from "../components/ComponentsVendas/PassaporteVendas";
import PassaporteVendasMobile from "../components/ComponentsVendas/PassaporteVendasMobile";
import PassaporteGrupo from "./PassaporteGrupo";
import BigNumber from "../components/ComponentsVendas/BigNumber";
import DsxParaVoce from "../components/ComponentsVendas/DsxParaVoce";
import Temas from "../components/ComponentsVendas/Temas";
import Palcos from "../components/ComponentsVendas/Palcos";
import FAQVendas from "../components/ComponentsVendas/FAQVendas";
import RedesSociais from "../components/ComponentsVendas/RedesSociais";
import PassaporteVendasStandard from "../components/ComponentsVendas/PassaporteVendasStandard";
import PassaporteVendasStandardDesktop from "../components/ComponentsVendas/PassaporteVendasStandardDesktop";
import CallToActionVendas from "../components/ComponentsVendas/CallToActionVendas";
import BotaoWP from "../components/BotaoWP";

const Vendas = () => {
  useEffect(() => {
    const pageTitle = "Ingressos DSX 2026 | Garanta seu passaporte";
    const pageDescription =
      "Compre seu ingresso para o DSX 2026, o maior evento de negócios, marketing, vendas e inovação do Norte do Brasil. Garanta seu passaporte.";
    const pageUrl = "https://dsx.com.vc/vendas";
    const ogImage = "https://dsx.com.vc/optimized/step1/Banner-vendas-hero.webp";

    document.title = pageTitle;

    const updates = [
      { type: "name", key: "description", value: pageDescription },
      { type: "property", key: "og:type", value: "website" },
      { type: "property", key: "og:title", value: pageTitle },
      { type: "property", key: "og:description", value: pageDescription },
      { type: "property", key: "og:url", value: pageUrl },
      { type: "property", key: "og:image", value: ogImage },
      { type: "name", key: "twitter:card", value: "summary_large_image" },
      { type: "name", key: "twitter:title", value: pageTitle },
      { type: "name", key: "twitter:description", value: pageDescription },
      { type: "name", key: "twitter:image", value: ogImage },
    ];

    const previousTags = updates.map((item) => {
      const selector =
        item.type === "name"
          ? `meta[name="${item.key}"]`
          : `meta[property="${item.key}"]`;
      let tag = document.head.querySelector(selector);
      const existed = Boolean(tag);
      const previousContent = tag?.getAttribute("content");

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(item.type, item.key);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", item.value);
      return { tag, existed, previousContent };
    });

    const canonicalSelector = 'link[rel="canonical"]';
    let canonicalTag = document.head.querySelector(canonicalSelector);
    const canonicalExisted = Boolean(canonicalTag);
    const previousCanonical = canonicalTag?.getAttribute("href");

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", pageUrl);

    const iconSelector = 'link[rel="icon"]';
    let iconTag = document.head.querySelector(iconSelector);
    const iconExisted = Boolean(iconTag);
    const previousIconHref = iconTag?.getAttribute("href");

    if (!iconTag) {
      iconTag = document.createElement("link");
      iconTag.setAttribute("rel", "icon");
      iconTag.setAttribute("type", "image/png");
      document.head.appendChild(iconTag);
    }

    iconTag.setAttribute("href", "/favicon-dsx-new.png");

    return () => {
      previousTags.forEach(({ tag, existed, previousContent }) => {
        if (!existed) {
          tag.remove();
          return;
        }

        if (previousContent === null) {
          tag.removeAttribute("content");
        } else {
          tag.setAttribute("content", previousContent);
        }
      });

      if (!canonicalExisted) {
        canonicalTag?.remove();
      } else if (previousCanonical === null) {
        canonicalTag?.removeAttribute("href");
      } else {
        canonicalTag?.setAttribute("href", previousCanonical);
      }

      if (!iconExisted) {
        iconTag?.remove();
      } else if (previousIconHref === null) {
        iconTag?.removeAttribute("href");
      } else {
        iconTag?.setAttribute("href", previousIconHref);
      }
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1015);
    };

    checkIsMobile(); // checa no primeiro render

    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <>
      <section className="overflow-x-hidden">
        <div id="passaportes" className="bg-[url(/ELEMENTOS-BANNER-2.png)] bg-cover bg-no-repeat bg-cnter">
          {isMobile ? (
            <PassaporteVendasMobile />
          ) : (
            <PassaporteVendas />
          )}
        </div>
        <PassaporteGrupo />
        <HeroVendas />
        <SecondSectionVendas />
        <ImpactoVendas />
        {/*
        <BigNumber />
         */}
        <DsxParaVoce />
        {/**
        <Temas />
        
        */}
        <Palcos />


        <CallToActionVendas />
        {/*
        <FormVendas />
         */}
        <FAQ />
        <RedesSociais />
        <Footer />
      </section>
    </>
  );
};

export default Vendas;

