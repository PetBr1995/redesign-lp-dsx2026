import { useEffect, useRef, useState } from "react";
import Header from "./Header";

const HeroSection = ({ ctaLink = "/vendas" }) => {
  const [showHeader, setShowHeader] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setShowHeader(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => setVideoStarted(true);
    const onError = () => setVideoStarted(false);
    iframe.addEventListener("load", onLoad);
    iframe.addEventListener("error", onError);

    return () => {
      iframe.removeEventListener("load", onLoad);
      iframe.removeEventListener("error", onError);
    };
  }, []);

  return (
    <>
      <Header
        ctaLink={ctaLink}
        className={`
          transition-all duration-400 ease-out
          ${
            showHeader
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }
        `}
      />

      <section className="relative w-full pb-[56%] overflow-hidden bg-black">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1146735494?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
          className={`
            absolute inset-0 w-full h-full pointer-events-none
            transition-opacity duration-700
            ${videoStarted ? "opacity-100" : "opacity-0"}
          `}
          allow="autoplay; fullscreen; picture-in-picture"
          title="DSX Hero Video"
        />

        <picture
          className={`
            absolute inset-0
            transition-opacity duration-700
            ${videoStarted ? "opacity-0" : "opacity-100"}
          `}
        >
          <source srcSet="/optimized/hero-banner.avif" type="image/avif" />
          <img
            src="/optimized/hero-banner.jpg"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10" />
      </section>
    </>
  );
};

export default HeroSection;
