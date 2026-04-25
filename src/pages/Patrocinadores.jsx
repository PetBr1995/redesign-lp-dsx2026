import { useEffect } from "react";

import AmbientesPatrocinadores from "../components/ComponentsPatrocinadores/AmbientesPatrocinadores";
import BigNumberPatrocinadores from "../components/ComponentsPatrocinadores/BigNumberPatrocinadores";
import CallToActionPatrocinadores from "../components/ComponentsPatrocinadores/CallToActionPatrocinadores";
import FAQpatrocinadores from "../components/ComponentsPatrocinadores/FAQPatrocinadores";
import HeroPatrocinadores from "../components/ComponentsPatrocinadores/HeroPatrocinadores";
import LugarPatrocinadores from "../components/ComponentsPatrocinadores/LugarPatrocinadores";
import MarcasPatrocinadores from "../components/ComponentsPatrocinadores/MarcasPatrocinadores";
import NoticiasDSXPatrocinadores from "../components/ComponentsPatrocinadores/NoticiasDSXPatrocinadores";
import ReferenciasPatrocinadores from "../components/ComponentsPatrocinadores/ReferenciasPatrocinadores";
import VideoSectionPatrocinadores from "../components/ComponentsPatrocinadores/VideoSectionPatrocinadores";
import Footer from "../components/Footer";
import BotaoWP from "../components/BotaoWP";

const Patrocinadores = () => {
    useEffect(() => {
        const pageTitle = "Patrocine o DSX 2026 | Maior evento de negócios do Norte do Brasil";
        const pageDescription =
            "Associe sua marca ao maior evento de negócios, marketing, vendas e inovação do Norte do Brasil. Conheça as cotas de patrocínio do DSX 2026.";
        const pageUrl = "https://dsx.com.vc/patrocinador";
        const ogImage = "https://dsx.com.vc/optimized/step1/banner-patrocinador.webp";

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
        };
    }, []);

    return (
        <>
            <div className="overflow-x-hidden">
                <HeroPatrocinadores />
                <BigNumberPatrocinadores />
                <VideoSectionPatrocinadores />
                <ReferenciasPatrocinadores />
                <AmbientesPatrocinadores />
                <LugarPatrocinadores />
                <NoticiasDSXPatrocinadores />
                <MarcasPatrocinadores />
                <CallToActionPatrocinadores />
                <FAQpatrocinadores />
                <Footer />
            </div>
        </>
    );
};

export default Patrocinadores;
