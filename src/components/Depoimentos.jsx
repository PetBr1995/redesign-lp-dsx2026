import { useEffect, useMemo, useState } from "react"
import CTAButton from "./Mascaras/CTAButton"

const Depoimentos = ({ ctaLink = "/vendas" }) => {
  const cardInfo = [
    {
      titulo: "Palestrantes",
      video: "https://vimeo.com/1148163374?fl=ip&fe=ec",
      desc: "Vozes que subiram ao palco para compartilhar visão e cases de sucesso.",
      thumb: "card-image/kepler-card-img.png",
      thumbAvif: "/optimized/step1/card-image/kepler-card-img.avif",
      thumbWebp: "/optimized/step1/card-image/kepler-card-img.webp",
    },
    {
      titulo: "Expositor",
      video: "https://vimeo.com/1148163345?fl=ip&fe=ec",
      desc: "Marcas que estiveram na linha de frente, gerando conexões, oportunidades e negócios",
      thumb: "card-image/expositor-card-img.png",
      thumbAvif: "/optimized/step1/card-image/expositor-card-img.avif",
      thumbWebp: "/optimized/step1/card-image/expositor-card-img.webp",
    },
    {
      titulo: "Participantes",
      video: "https://vimeo.com/1148163408?fl=ip&fe=ec",
      desc: "Empresários e profissionais que viveram o DSX 2025 e saíram com uma nova direção.",
      thumb: "/card-image/participante-card-img.png",
      thumbAvif: "/optimized/step1/card-image/participante-card-img.avif",
      thumbWebp: "/optimized/step1/card-image/participante-card-img.webp",
    },
  ]

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  // Converte vimeo.com/ID -> player.vimeo.com/video/ID (mantendo querystring)
  const toVimeoEmbed = (url) => {
    try {
      const u = new URL(url)
      const id = u.pathname.split("/").filter(Boolean)[0]
      if (!id) return url

      const params = new URLSearchParams(u.search)
      params.set("autoplay", "1")
      params.set("title", "0")
      params.set("byline", "0")
      params.set("portrait", "0")

      return `https://player.vimeo.com/video/${id}?${params.toString()}`
    } catch {
      return url
    }
  }

  const embedUrl = useMemo(() => {
    if (!active?.video) return ""
    return toVimeoEmbed(active.video)
  }, [active])

  const closeModal = () => {
    setOpen(false)
    // desmonta o iframe após fechar (para parar o vídeo)
    setTimeout(() => setActive(null), 150)
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal()
    }
    if (open) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", onKeyDown)
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <section className="bg-black text-center pt-10 pb-10 px-5 no-section-transition">
      <h2 className="font-anton text-white text-3xl sm:text-4xl uppercase">
        O DSX mudou o jogo para quem participou
      </h2>

      <h4 className="font-jamjuree text-white/90 text-base sm:text-xl uppercase mt-2">
        Confira os depoimentos de quem viveu os dois dias e acelerou decisões.
      </h4>

      {/* Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {cardInfo.map((item) => (
          <button
            key={item.titulo}
            type="button"
            onClick={() => {
              setActive(item)
              setOpen(true)
            }}
            className="
              group text-left rounded-2xl px-4 py-10 sm:px-4 sm:py:10
              bg-gradient-to-b from-[#001622] to-[#001019]
              border border-white/10
              hover:border-white/20 hover:cursor-pointer
              transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
            "
          >
            <h3 className="text-white font-jamjuree text-xl sm:text-2xl font-medium uppercase">
              {item.titulo}
            </h3>

            {/* Thumb */}
            <div className="mt-4 w-full aspect-video overflow-hidden rounded-xl relative">
              <picture>
                <source srcSet={item.thumbAvif} type="image/avif" />
                <source srcSet={item.thumbWebp} type="image/webp" />
                <img
                  src={item.thumb}
                  alt={`Thumbnail ${item.titulo}`}
                  loading="lazy"
                  decoding="async"
                  className="
                    absolute inset-0 h-full w-full object-cover
                    transition-transform duration-300
                    group-hover:scale-[1.03]
                  "
                  draggable={false}
                />
              </picture>

              {/* overlay */}
              <div className="absolute inset-0 bg-black/35 transition-opacity group-hover:bg-black/25" />

              {/* Play */}
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="
                    h-14 w-14 rounded-full
                    grid place-items-center
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                >
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="opacity-50"
                  >
                    <path d="M9 18V6L19 12L9 18Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="mt-4 text-white/90 text-sm leading-relaxed font-roboto font-extralight">
              {item.desc}
            </p>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />

          {/* modal content */}
          <div className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center p-4">
            <div className="relative w-full rounded-xl bg-[#0b0f14] border border-white/10 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <h3 className="text-white font-anton uppercase text-lg">
                  {active?.titulo}
                </h3>

                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    text-white/80 hover:text-white transition p-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md
                  "
                  aria-label="Fechar"
                >
                  ✕
                </button>
              </div>

              {/* vídeo */}
              <div className="w-full aspect-video bg-black">
                {embedUrl && (
                  <iframe
                    key={embedUrl} // garante unmount/remount ao trocar de vídeo
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
      <div className="py-10">
        <CTAButton titulo="Compre agora" link={ctaLink} />
      </div>
    </section>
  )
}

export default Depoimentos
