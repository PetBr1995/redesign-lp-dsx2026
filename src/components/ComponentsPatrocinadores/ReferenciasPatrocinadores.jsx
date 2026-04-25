import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

// ✅ ajuste o caminho conforme sua pasta
import FormPatrocinadores from "./FormPatrocinadores";

const InfoReferencias = [
  {
    avif: "/optimized/step1/card-tallis.avif",
    webp: "/optimized/step1/card-tallis.webp",
  },
  {
    avif: "/optimized/step1/Card-alfredo.avif",
    webp: "/optimized/step1/Card-alfredo.webp",
  },
  {
    avif: "/optimized/step1/card-camila.avif",
    webp: "/optimized/step1/card-camila.webp",
  },
  {
    avif: "/optimized/step1/Card-kepler.avif",
    webp: "/optimized/step1/Card-kepler.webp",
  },
  {
    avif: "/optimized/step1/Card-hanna.avif",
    webp: "/optimized/step1/Card-hanna.webp",
  },
  {
    avif: "/optimized/step1/Card-rafael.avif",
    webp: "/optimized/step1/Card-rafael.webp",
  },
];

const ReferenciasPatrocinadores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Conteúdo */}
      <div className="relative z-10 pt-10 pb-20">
        <h3 className="text-center font-extralight uppercase text-2xl font-jamjuree mb-4">
          Em 2025, reunimos
        </h3>

        <h5 className="font-anton font-extralight text-center uppercase text-4xl leading-tight">
          <span className="text-[#F5D247]">as principais referências</span> em
          marketing,
          <br />
          vendas e performance do Brasil
        </h5>

        <div className="relative after:absolute after:content-[''] after:top-0 after:left-0 after:w-80 after:h-80 after:bg-[url(/vector-23.png)] after:bg-cover">
          <div className="relative my-12 max-w-7xl mx-auto px-4">
            {/* Botões de navegação */}
            <div className="absolute -bottom-20 -translate-y-1/2 left-4 z-20 hidden md:flex">
              <button
                className="
                  swiper-ref-prev
                  w-8 h-8 rounded-xl
                  bg-[#232323] text-white
                  grid place-items-center
                  cursor-pointer
                  rounded-r-none
                  border-r-1
                  border-white/10
                "
                aria-label="Anterior"
                type="button"
              >
                ‹
              </button>

              <button
                className="
                  swiper-ref-next
                  w-8 h-8 rounded-xl
                  bg-[#232323] text-white
                  grid place-items-center
                  cursor-pointer
                  rounded-l-none
                "
                aria-label="Próximo"
                type="button"
              >
                ›
              </button>
            </div>

            {/* Swiper */}
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".swiper-ref-prev",
                nextEl: ".swiper-ref-next",
              }}
              spaceBetween={16}
              slidesPerView="auto"
              grabCursor={true}
              className="cursor-grab active:cursor-grabbing"
            >
              {InfoReferencias.map((item, index) => (
                <SwiperSlide key={index} className="!w-[260px]">
                  <div
                    className="
                      h-[360px]
                      rounded-xl
                      bg-cover bg-center
                      shadow-lg
                    "
                    style={{
                      backgroundImage: `image-set(url('${item.avif}') type('image/avif'), url('${item.webp}') type('image/webp'))`,
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="
              h-11 px-6 rounded-xl
              bg-gradient-to-r from-[#913DE3] via-[#A83EAA] to-[#C34484]
              text-white font-semibold
              shadow-lg
              hover:scale-[1.02] hover:shadow-xl
              transition-all duration-300
              uppercase
              mt-6
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
              <div className="bg-white px-6 pt-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Quero patrocinar o DSX 2026
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Preencha os dados e nossa equipe entra em contato.
                </p>
              </div>

              <div className="bg-white px-6 pb-6 pt-4">
                <FormPatrocinadores/>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReferenciasPatrocinadores;
