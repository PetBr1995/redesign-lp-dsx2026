import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import Header from "./Header";

const HeroSectionLoading = () => {
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
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);

    const onPlay = () => setVideoStarted(true);

    // ✅ só libera quando o vídeo realmente iniciar
    player.on("play", onPlay);

    // fallback: não deixa travado pra sempre
    player.on("error", () => setVideoStarted(true));

    return () => {
      player.off("play", onPlay);
      player.unload?.().catch(() => {});
    };
  }, []);

  return (
    <>
      {/* OVERLAY FULLSCREEN (loading) */}
      <div
        className={`
          fixed inset-0 z-[9999] flex items-center justify-center
          bg-[url('/background-banner-2.png')] bg-cover bg-center bg-no-repeat
          transition-opacity duration-700
          ${videoStarted ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative w-[180px] h-[180px]">
            <img
              src="/loading-vector.svg"
              alt="loading"
              className="absolute inset-0 w-full h-full animate-spin [animation-duration:7s]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/logo-dsx-loading.svg" alt="logo-loading" />
            </div>
          </div>
        </div>
      </div>

      {/* HEADER (pode ficar por baixo do overlay até iniciar) */}
      <Header
        className={`
          transition-all duration-400 ease-out
          ${
            showHeader
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }
        `}
      />

      {/* HERO com Poster + fade */}
      <section className="relative w-full pb-[56%] overflow-hidden bg-black">
        {/* VÍDEO (entra com fade) */}
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1146735494?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
          className={`
            absolute inset-0 w-full h-full pointer-events-none
            transition-opacity duration-700
            ${videoStarted ? "opacity-100" : "opacity-0"}
          `}
          allow="autoplay; fullscreen; picture-in-picture"
        />

        {/* POSTER (some com fade quando o vídeo começar) */}
        <img
          src="/hero-poster.jpg"
          alt=""
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-700
            ${videoStarted ? "opacity-0" : "opacity-100"}
          `}
        />

        {/* acabamento opcional */}
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10" />
      </section>
    </>
  );
};

export default HeroSectionLoading;
