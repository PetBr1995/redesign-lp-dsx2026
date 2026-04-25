import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import CTAButton from "../../components/Mascaras/CTAButton";

const HeroVendas = () => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const info = [
    { number: "+2.000", title: "Participantes" },
    { number: "+30", title: "Expositores" },
    { number: "+40", title: "Palestrantes" },
  ];

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    const END_TIME = 97; // 1:37 = 97 segundos

    const onLoaded = () => setIsReady(true);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    // corta o vídeo em 1:37 e volta pro início (loop "cortado")
    const onTimeUpdate = (data) => {
      if (data?.seconds >= END_TIME) {
        player
          .setCurrentTime(0)
          .then(() => player.play())
          .catch(() => {});
      }
    };

    player.on("loaded", onLoaded);
    player.on("play", onPlay);
    player.on("pause", onPause);
    player.on("timeupdate", onTimeUpdate);

    return () => {
      player.off("loaded", onLoaded);
      player.off("play", onPlay);
      player.off("pause", onPause);
      player.off("timeupdate", onTimeUpdate);
      player.unload?.().catch(() => {});
    };
  }, []);

  const handlePlay = async () => {
    try {
      const player = playerRef.current;
      if (!player) return;

      await player.setMuted(false).catch(() => {});
      await player.setVolume(1).catch(() => {});
      await player.play();
    } catch {
      try {
        const player = playerRef.current;
        if (!player) return;
        await player.setMuted(true);
        await player.play();
      } catch {}
    }
  };

  return (
    <section
      className="
      relative pt-10 sm:pt-20 md:pt-30
      bg-[url('/optimized/step1/Banner-vendas-hero.webp')]
      bg-center bg-cover bg-no-repeat
  
      after:content-['']
      after:absolute
      after:inset-auto
      after:-bottom-32
      after:right-0
      after:bg-[url('/vector-33.svg')]
      after:bg-no-repeat
      after:bg-contain
      after:w-150
      after:h-150
      after:z-[1]
      after:opacity-40 sm:after:opacity-60 md:after:opacity-85
    "
      style={{
        backgroundImage:
          "image-set(url('/optimized/step1/Banner-vendas-hero.avif') type('image/avif'), url('/optimized/step1/Banner-vendas-hero.webp') type('image/webp'))",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex flex-col items-center px-4">
                <picture>
          <source
            srcSet="/optimized/step1/DSX-2026-icon-1.avif"
            type="image/avif"
          />
          <source
            srcSet="/optimized/step1/DSX-2026-icon-1.webp"
            type="image/webp"
          />
          <img
            src="/DSX-2026-icon-1.png"
            className="mb-10 w-40 md:w-70"
            alt="logo-dsx"
          />
        </picture>

        <h2 className="max-w-7xl text-center font-anton uppercase text-white text-3xl sm:text-4xl md:text-6xl mb-10">
          O MAIOR EVENTO DE NEGÃ“CIOS, MARKETING, VENDAS E INOVAÃ‡ÃƒO DO NORTE
        </h2>

        {/* ðŸ”¥ VIDEO */}
        <div className="mt-12 w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">
              <iframe
                ref={iframeRef}
                title="Video Evento Vendas"
                // OBS: autoplay com som (muted=0) costuma ser bloqueado por navegadores
                // Se precisar garantir autoplay, troque muted=1
                src="https://player.vimeo.com/video/1146735494?autoplay=1&muted=1&loop=0&controls=0&title=0&byline=0&portrait=0&playsinline=1&quality=1080p&dnt=1"
                className="
                  absolute inset-0 w-full h-full
                  [transform:translateZ(0)]
                  [backface-visibility:hidden]
                  will-change-transform
                "
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />

              {/*
              Se quiser voltar com o overlay de play, é só descomentar.
              {!isPlaying && (
                <div className="absolute inset-0 grid place-items-center bg-black/45 backdrop-blur-[2px]">
                  <button
                    onClick={handlePlay}
                    disabled={!isReady}
                    className="h-14 w-14 flex items-center justify-start disabled:opacity-60"
                  >
                    <img src="/play.svg" alt="play" className="w-20" />
                  </button>
                </div>
              )}
              */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mt-6">
          {info.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <h2 className="font-anton text-7xl bg-gradient-to-r from-[#F5D247] to-[#E9A741] bg-clip-text text-transparent">
                {item.number}
              </h2>
              <p className="uppercase text-xl font-extralight text-[#F5D247]">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="py-8">
          <CTAButton titulo="Quero meu passaporte" link="#passaportes" />
        </div>
      </div>
    </section>
  );
};

export default HeroVendas;

