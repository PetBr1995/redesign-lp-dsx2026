import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const NoticiasDSXPatrocinadores = () => {
  const [noticias, setNoticias] = useState([]);

  const getNoticias = () => {
    axios
      .get(
        "https://apiapp.redeondadigital.com.br/wp-json/wp/v2/posts?categories=34866",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setNoticias(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNoticias();
  }, []);

  /* ===============================
     Helpers
  =============================== */

  const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const readTime = (html = "") => {
    const text = stripHtml(html);
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min`;
  };

  // 🔥 AJUSTE DO LINK (remove "painel.")
  const normalizeLink = (url = "") => {
    if (!url) return "#";
    return url.replace(
      "https://painel.redeondadigital.com.br",
      "https://redeondadigital.com.br"
    );
  };

  const hasNoticias = useMemo(
    () => Array.isArray(noticias) && noticias.length > 0,
    [noticias]
  );

  return (
    <section className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <h2 className="text-white py-5 text-4xl text-center font-anton">
          AS PALESTRAS DO DSX EM DESTAQUE
        </h2>

        <div className="relative">
          <div
            className="
              relative
              after:absolute after:content-['']
              after:top-0 after:left-0
              after:w-80 after:h-80
              after:bg-[url('/vector-23.png')]
              after:bg-cover after:bg-no-repeat
              after:opacity-80
              after:pointer-events-none
              after:z-0
            "
          >
            <div className="relative z-10">
              <div className="relative my-8">
                {/* Navegação */}
                <div className="absolute -bottom-16 left-4 z-20 hidden md:flex">
                  <button
                    className="
                      swiper-news-prev
                      w-8 h-8 rounded-xl
                      bg-[#232323] text-white
                      grid place-items-center
                      rounded-r-none
                      border-r border-white/10
                    "
                    type="button"
                    aria-label="Anterior"
                  >
                    ‹
                  </button>

                  <button
                    className="
                      swiper-news-next
                      w-8 h-8 rounded-xl
                      bg-[#232323] text-white
                      grid place-items-center
                      rounded-l-none
                    "
                    type="button"
                    aria-label="Próximo"
                  >
                    ›
                  </button>
                </div>

                {/* Swiper */}
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".swiper-news-prev",
                    nextEl: ".swiper-news-next",
                  }}
                  spaceBetween={16}
                  slidesPerView="auto"
                  grabCursor
                  className="cursor-grab active:cursor-grabbing"
                >
                  {hasNoticias &&
                    noticias.map((noticia) => {
                      const titulo = noticia?.title?.rendered || "";
                      const excerpt = noticia?.excerpt?.rendered || "";
                      const img = noticia?.jetpack_featured_media_url || "";
                      const link = normalizeLink(noticia?.link);

                      return (
                        <SwiperSlide
                          key={noticia.id}
                          className="!w-[280px] sm:!w-[320px]"
                        >
                          {/* CARD CLICÁVEL */}
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              group block h-[520px]
                              rounded-2xl overflow-hidden
                              bg-[#044994]
                              shadow-lg shadow-black/30
                              transition-transform duration-300
                              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                            "
                          >
                            {/* topo */}
                            <div className="h-12 flex items-center justify-center">
                              <img
                                src="/logo-rede-onda.svg"
                                alt="Onda Digital"
                                className="h-6 opacity-95"
                                draggable={false}
                              />
                            </div>

                            {/* corpo */}
                            <div className="bg-white rounded-2xl mx-2 mb-2 p-4 h-[calc(520px-48px-16px)] flex flex-col">
                              <h3
                                className="text-[15px] font-extrabold leading-snug text-slate-900 line-clamp-3 min-h-[60px]"
                                dangerouslySetInnerHTML={{ __html: titulo }}
                              />

                              <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                                {noticia?.date && (
                                  <span>{formatDate(noticia.date)}</span>
                                )}
                                <span>•</span>
                                <span>
                                  {readTime(
                                    noticia?.content?.rendered || excerpt
                                  )}
                                </span>
                              </div>

                              <div className="mt-3 overflow-hidden rounded-xl">
                                <div className="relative h-[180px] bg-slate-100">
                                  {img ? (
                                    <img
                                      src={img}
                                      alt={stripHtml(titulo)}
                                      className="
                                        absolute inset-0 h-full w-full object-cover
                                        transition-transform duration-500
                                        group-hover:scale-[1.03]
                                      "
                                      loading="lazy"
                                      draggable={false}
                                    />
                                  ) : (
                                    <div className="absolute inset-0 grid place-items-center text-xs text-slate-500">
                                      Sem imagem
                                    </div>
                                  )}
                                </div>
                              </div>

                              <p className="mt-2 text-[10px] text-slate-500">
                                Crédito: João Bregmoli
                              </p>

                              {/* 🔥 DESCRIÇÃO AJUSTADA */}
                              <div
                                className="
                                  mt-3 text-[13px] leading-relaxed
                                  text-slate-700 line-clamp-3
                                "
                                dangerouslySetInnerHTML={{ __html: excerpt }}
                              />
                            </div>
                          </a>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticiasDSXPatrocinadores;
