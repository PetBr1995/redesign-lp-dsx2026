import { useMemo, useState, useEffect } from "react";

const ImpactoVendas = () => {
  const videos = [
    {
      titulo: "Expositor",
      video: "https://vimeo.com/1148163345?fl=ip&fe=ec",
      thumb: "/card-image/expositor-card-img.png", // <- coloque no /public/thumbs/
    },
    {
      titulo: "Palestrante",
      video: "https://vimeo.com/1148163374?fl=ip&fe=ec",
      thumb: "/card-image/kepler-card-img.png",
    },
    {
      titulo: "Participante",
      video: "https://vimeo.com/1148163408?fl=ip&fe=ec",
      thumb: "/card-image/participante-card-img.png",
    },
  ];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // 🔒 Bloqueia scroll quando modal abre
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 🔗 Converte link do Vimeo em embed
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

      {/* GRID */}
      <div className="relative z-10 mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:mt-12 md:grid-cols-3">
        {videos.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActive(item);
              setOpen(true);
            }}
            className="group relative rounded-2xl overflow-hidden focus:outline-none"
          >
            {/* CARD com altura padronizada para casar com Speakers */}
            <div className="relative h-[260px] bg-black ">
              {item.thumb && (
                <img
                  src={item.thumb}
                  alt={item.titulo}
                  className="absolute inset-0 w-full h-full object-contain object-center"
                  loading="lazy"
                  draggable="false"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition" />

              {/* Play */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="white">
                    <path d="M9 18V6L19 12L9 18Z" />
                  </svg>
                </div>
              </div>

              {/* Texto */}
              <div className="absolute bottom-4 left-4">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-white sm:text-base">
                  {item.titulo}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-4xl mx-4 bg-black rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b border-white/10">
              <span className="text-white uppercase font-anton">
                {active?.titulo}
              </span>

              <button
                onClick={() => setOpen(false)}
                className="text-white text-xl hover:opacity-70 transition"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-black">
              {embedUrl && (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                  title="Vídeo"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImpactoVendas;
