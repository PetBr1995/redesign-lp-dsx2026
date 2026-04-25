import { useEffect, useMemo, useState } from "react";

// ✅ ajuste o caminho conforme sua estrutura
import FormPatrocinadores from "./FormPatrocinadores";

const LugarPatrocinadores = () => {
  const cardInfo = [
    {
      titulo: "Palestrantes",
      video: "https://vimeo.com/1148163374?fl=ip&fe=ec",
      desc: "Vozes que subiram ao palco para compartilhar visão e cases de sucesso.",
      thumb: "card-image/kepler-card-img.png",
    },
    {
      titulo: "Expositor",
      video: "https://vimeo.com/1148163345?fl=ip&fe=ec",
      desc: "Marcas que estiveram na linha de frente, gerando conexões, oportunidades e negócios",
      thumb: "card-image/expositor-card-img.png",
    },
    {
      titulo: "Participantes",
      video: "https://vimeo.com/1148163408?fl=ip&fe=ec",
      desc: "Empresários e profissionais que viveram o DSX 2025 e saíram com uma nova direção.",
      thumb: "/card-image/participante-card-img.png",
    },
  ];

  // Modal vídeos
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // Modal patrocínio
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  // Converte vimeo.com/ID -> player.vimeo.com/video/ID (mantendo querystring)
  const toVimeoEmbed = (url) => {
    try {
      const u = new URL(url);
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (!id) return url;

      const params = new URLSearchParams(u.search);
      params.set("autoplay", "1");
      params.set("title", "0");
      params.set("byline", "0");
      params.set("portrait", "0");

      return `https://player.vimeo.com/video/${id}?${params.toString()}`;
    } catch {
      return url;
    }
  };

  const embedUrl = useMemo(() => {
    if (!active?.video) return "";
    return toVimeoEmbed(active.video);
  }, [active]);

  const closeVideoModal = () => {
    setOpen(false);
    setTimeout(() => setActive(null), 150);
  };

  // ✅ ESC: fecha o modal que estiver aberto (prioriza vídeo)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (open) closeVideoModal();
        else if (isSponsorModalOpen) setIsSponsorModalOpen(false);
      }
    };

    const anyModalOpen = open || isSponsorModalOpen;

    if (anyModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isSponsorModalOpen]);

  return (
    <section
      className="
        relative bg-black text-white overflow-hidden
        after:content-['']
        after:absolute
        after:bottom-0
        after:left-0
        after:block
        after:w-60
        after:h-60
        after:bg-[url('/vector-24.svg')]
        after:bg-no-repeat
        after:bg-cover
        after:bg-center
        after:opacity-80
        after:pointer-events-none
        after:z-0
      "
    >
      {/* TÍTULO */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-10 text-center">
        <h2 className="font-anton uppercase text-3xl sm:text-4xl">
          O LUGAR CERTO PARA SER VISTO POR QUEM DEFINE O JOGO
        </h2>
      </div>

      {/* VÍDEOS */}
      <div className="relative z-10 text-center pb-10 px-5">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cardInfo.map((item) => (
            <button
              key={item.titulo}
              type="button"
              onClick={() => {
                setActive(item);
                setOpen(true);
              }}
              className="
                group text-left rounded-2xl
                hover:cursor-pointer
                transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
              "
            >
              {/* Thumb */}
              <div className="mt-4 w-full aspect-[16/9] overflow-hidden rounded-2xl relative">
                <img
                  src={item.thumb}
                  alt={`Thumbnail ${item.titulo}`}
                  className="
                    absolute inset-0 h-full w-full object-cover
                    transition-transform duration-300
                    group-hover:scale-[1.05]
                  "
                  draggable={false}
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/35 transition-opacity group-hover:bg-black/25" />

                {/* Play */}
                <div className="absolute inset-0 grid place-items-center">
                  <div
                    className="
                      h-16 w-16
                      rounded-full
                      grid place-items-center
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  >
                    <svg
                      width="70"
                      height="70"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-60"
                    >
                      <path d="M9 18V6L19 12L9 18Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* MODAL VÍDEO */}
        {open && (
          <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
            <div className="absolute inset-0 bg-black/70" onClick={closeVideoModal} />

            <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center p-4">
              <div className="relative w-full rounded-xl bg-[#0b0f14] border border-white/10 shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <h3 className="text-white font-anton uppercase text-lg">
                    {active?.titulo}
                  </h3>

                  <button
                    type="button"
                    onClick={closeVideoModal}
                    className="
                      text-white/80 hover:text-white transition p-2
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md
                    "
                    aria-label="Fechar"
                  >
                    ✕
                  </button>
                </div>

                <div className="w-full aspect-video bg-black">
                  {embedUrl && (
                    <iframe
                      key={embedUrl}
                      src={embedUrl}
                      className="h-full w-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={active?.titulo || "Vídeo"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          onClick={() => setIsSponsorModalOpen(true)}
          className="
            h-11 px-6 rounded-xl
            bg-gradient-to-r from-[#913DE3] via-[#A83EAA] to-[#C34484]
            text-white font-semibold
            shadow-lg
            hover:scale-[1.02] hover:shadow-xl
            transition-all duration-300
            uppercase
            mt-8
          "
        >
          Quero patrocinar
        </button>
      </div>

      {/* ✅ MODAL PATROCÍNIO */}
      {isSponsorModalOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-[2px] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Formulário de Patrocínio"
          onMouseDown={(e) => {
            // fecha clicando fora
            if (e.target === e.currentTarget) setIsSponsorModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-xl">
            {/* botão fechar */}
            <button
              type="button"
              onClick={() => setIsSponsorModalOpen(false)}
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
              <div className="bg-white px-6 pt-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Quero patrocinar o DSX 2026
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Preencha os dados e nossa equipe entra em contato.
                </p>
              </div>

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

export default LugarPatrocinadores;
