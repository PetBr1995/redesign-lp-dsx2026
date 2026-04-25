import { useEffect, useRef, useState } from "react";

const SeconcSectionWhatsAppPage = () => {
 
  const [videoStarted, setVideoStarted] = useState(false);
  const iframeRef = useRef(null);


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
          title="DSX WhatsApp Video"
        />

        {/* POSTER (some com fade quando o vídeo começar) */}
        <img
          src="/optimized/hero-banner.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-700
            ${videoStarted ? "opacity-0" : "opacity-100"}
          `}
        />

        {/* (Opcional) acabamento com gradiente */}
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10" />
      </section>
    </>
  );
};

export default SeconcSectionWhatsAppPage
