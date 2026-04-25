import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

// ✅ ajuste o path conforme sua estrutura
import FormPatrocinadores from "./FormPatrocinadores";

const VideoSectionPatrocinadores = () => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    const onLoaded = () => setIsReady(true);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    player.on("loaded", onLoaded);
    player.on("play", onPlay);
    player.on("pause", onPause);

    player.on("error", () => {
      setIsReady(false);
      setIsPlaying(false);
    });

    return () => {
      player.off("loaded", onLoaded);
      player.off("play", onPlay);
      player.off("pause", onPause);
      player.unload?.().catch(() => {});
    };
  }, []);

  // ✅ trava scroll e fecha com ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  const handleStart = async () => {
    try {
      const player = playerRef.current;
      if (!player) return;

      await player.setMuted(false).catch(() => {});
      await player.setVolume(1).catch(() => {});
      await player.play();
    } catch (e) {
      try {
        const player = playerRef.current;
        if (!player) return;
        await player.setMuted(true);
        await player.play();
      } catch {}
    }
  };

  return (
    <section className="bg-black py-12">
      <div className="mx-auto max-w-6xl px-4 grid gap-6">
        {/* Container 16:9 */}
        <div className="relative w-[85%] mx-auto aspect-video overflow-hidden rounded-2xl bg-black">
          {/* Iframe */}
          <iframe
            ref={iframeRef}
            title="Video Patrocinadores"
            src="https://player.vimeo.com/video/1146735494?autoplay=0&muted=0&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
          />

          {/* Overlay com CTA (só aparece quando não está tocando) */}
          {!isPlaying && (
            <div className="absolute inset-0 grid place-items-center bg-black/45 backdrop-blur-[2px]">
              <button
                type="button"
                onClick={handleStart}
                disabled={!isReady}
                className="
                  cursor-pointer
                  h-12 px-6 rounded-xl
                  text-white font-semibold
                  shadow-lg
                  hover:scale-[1.02] hover:shadow-xl
                  transition-all duration-300
                  uppercase
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                <img src="/play.svg" alt="play-icon" />
              </button>
            </div>
          )}
        </div>

        {/* Botão de patrocínio */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="
              cursor-pointer
              h-11 px-6 rounded-xl
              bg-gradient-to-r from-[#913DE3] via-[#A83EAA] to-[#C34484]
              text-white font-semibold
              shadow-lg
              hover:scale-[1.02] hover:shadow-xl
              transition-all duration-300
              uppercase
            "
          >
            Quero patrocinar
          </button>
        </div>
      </div>

      {/* ✅ MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-[2px] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Formulário de Patrocínio"
          onMouseDown={(e) => {
            // fecha clicando fora
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-xl">
            {/* botão fechar */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="
                absolute -top-3 -right-3
                w-10 h-10 rounded-full
                bg-white text-black
                shadow-lg
                grid place-items-center
                hover:scale-105 transition
              "
              aria-label="Fechar"
            >
              ✕
            </button>

            {/* conteúdo */}
            <div className="rounded-2xl overflow-hidden">
              {/* Opcional: header */}
              <div className="bg-white px-6 pt-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Quero patrocinar o DSX 2026
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Preencha os dados e nossa equipe entra em contato.
                </p>
              </div>

              {/* Form */}
              <div className="bg-white px-6 pb-6 pt-4">
                <FormPatrocinadores />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSectionPatrocinadores;
