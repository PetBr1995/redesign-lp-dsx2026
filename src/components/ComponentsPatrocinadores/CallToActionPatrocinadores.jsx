import { useEffect, useState } from "react";

// ✅ ajuste o caminho conforme sua estrutura
import FormPatrocinadores from "./FormPatrocinadores";

const CallToActionPatrocinadores = () => {
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
    <section
      className="
        relative
        flex items-center
        bg-[url('/optimized/step1/banner-call-section.webp')]
        bg-cover
        bg-no-repeat
        bg-center
        w-screen

        min-h-[520px]
        sm:min-h-[600px]
        lg:min-h-[680px]

        py-24

        after:absolute
        after:content-['']
        after:w-100
        after:h-70
        after:top-0
        after:right-0
        after:bg-cover
        after:bg-no-repeat
        after:bg-center
        after:bg-[url(/vector-27.svg)]

        before:absolute
        before:content-['']
        before:w-90
        before:h-80
        before:bottom-0
        before:left-0
        before:bg-cover
        before:bg-no-repeat
        before:bg-center
        before:bg-[url(/vector-28.svg)]
        before:z-10
      "
      style={{
        backgroundImage:
          "image-set(url('/optimized/step1/banner-call-section.avif') type('image/avif'), url('/optimized/step1/banner-call-section.webp') type('image/webp'))",
      }}
    >
      {/* Overlay preto 71% */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6 flex-wrap">
          <img src="/logo-dsx-horizontal.svg" alt="logo DSX" />
          <img src="/data-dsx.svg" alt="data DSX" />
        </div>

        <h2 className="mt-8 font-anton text-white text-3xl sm:text-4xl md:text-5xl max-w-3xl">
          PATROCINE O DSX 2026 E GARANTA PRESENÇA E NETWORK
        </h2>

        <p className="mt-4 text-white max-w-xl">
          Escolha agora os espaços mais estratégicos para posicionar sua marca no
          evento.
        </p>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="
            mt-8
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
                <FormPatrocinadores />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CallToActionPatrocinadores;
