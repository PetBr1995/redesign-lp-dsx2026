import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ImpactoVendas = () => {
  const videos = [
    {
      titulo: "Expositor",
      video: "https://vimeo.com/1148163345?fl=ip&fe=ec",
      thumb: "/card-image/expositor-card-img.png",
      thumbAvif: "/optimized/step1/card-image/expositor-card-img.avif",
      thumbWebp: "/optimized/step1/card-image/expositor-card-img.webp",
    },
    {
      titulo: "Palestrante",
      video: "https://vimeo.com/1148163374?fl=ip&fe=ec",
      thumb: "/card-image/kepler-card-img.png",
      thumbAvif: "/optimized/step1/card-image/kepler-card-img.avif",
      thumbWebp: "/optimized/step1/card-image/kepler-card-img.webp",
    },
    {
      titulo: "Participante",
      video: "https://vimeo.com/1148163408?fl=ip&fe=ec",
      thumb: "/card-image/participante-card-img.png",
      thumbAvif: "/optimized/step1/card-image/participante-card-img.avif",
      thumbWebp: "/optimized/step1/card-image/participante-card-img.webp",
    },
  ];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setActive(null), 150);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toVimeoEmbed = (url) => {
    try {
      const u = new URL(url);
      const id = u.pathname.split("/").filter(Boolean)[0];

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

  return (
    <section
      className="py-12 bg-black relative overflow-hidden
      before:absolute before:inset-0 before:bg-bottom-right before:bg-cover before:bg-[url(/fundo-impacto-section.png)]
      after:absolute after:left-0 after:bottom-0 after:w-50 after:h-50 after:bg-no-repeat after:bg-center after:bg-cover after:bg-[url(/vector-30.svg)]
    "
    >
      <h2 className="relative z-10 mx-auto max-w-4xl px-4 text-center font-anton text-4xl uppercase leading-[1.08] text-white sm:text-6xl">
        O jogo muda quando você entra no ambiente certo
      </h2>

      <p className="relative z-10 mx-auto mt-4 max-w-3xl px-4 text-center font-jamjuree text-[15px] font-normal leading-relaxed tracking-[0.04em] text-[#BFB39A] uppercase md:text-[17px]">
        Confira como a 1ª edição impactou no mercado da Região Norte.
      </p>

      <div className="relative z-10 mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 md:mt-12 md:grid-cols-3">
        {videos.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setActive(item);
              setOpen(true);
            }}
            className="
              group text-left rounded-2xl p-2
              bg-gradient-to-b from-[#0A1A23] via-[#071117] to-[#050B10]
              border border-white/10
              hover:border-white/20 hover:-translate-y-0.5
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35
            "
          >
            <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black">
              <picture>
                <source srcSet={item.thumbAvif} type="image/avif" />
                <source srcSet={item.thumbWebp} type="image/webp" />
                <img
                  src={item.thumb}
                  alt={item.titulo}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </picture>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/35 transition-opacity group-hover:from-black/60" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-black/35 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M9 18V6L19 12L9 18Z" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-3 left-3">
                <p className="font-jamjuree text-xs font-semibold uppercase tracking-[0.14em] text-white sm:text-sm">
                  {item.titulo}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
            style={{ zIndex: 2147483647 }}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
              onClick={closeModal}
            />

            <div className="relative my-auto w-full max-w-4xl overflow-hidden rounded-xl border border-white/12 bg-[#0b0f14] shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 p-3">
                <span className="font-anton text-white uppercase">
                  {active?.titulo}
                </span>

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md p-1 text-xl text-white/85 hover:text-white"
                  aria-label="Fechar vídeo"
                >
                  ✕
                </button>
              </div>

              <div className="relative w-full bg-black" style={{ aspectRatio: "16 / 9" }}>
                {embedUrl && (
                  <iframe
                    key={embedUrl}
                    src={embedUrl}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    title={active?.titulo || "Vídeo"}
                  />
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default ImpactoVendas;
