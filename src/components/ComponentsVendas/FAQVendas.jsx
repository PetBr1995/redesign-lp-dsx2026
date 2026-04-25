import { useState } from "react";

const FAQVendas = () => {
  const FAQquestions = [
    {
      numero: 1,
      pergunta: "Quando acontece o DSX 2026?",
      resposta:
        "O DSX 2026 acontece em julho. A data oficial será anunciada em breve.",
    },
    {
      numero: 2,
      pergunta: "Para quem é o DSX?",
      resposta:
        "Para empresários, gestores e líderes, profissionais em ascensão, times de marketing e vendas e estudantes/universitários que querem acelerar repertório, conexões e decisões com visão prática de mercado.",
    },
    {
      numero: 3,
      pergunta: "Já existe programação e palestrantes confirmados?",
      resposta:
        "A curadoria está em construção. Para acompanhar os anúncios oficiais, entre no grupo de WhatsApp DSX Conexões. Acesse o link para entrar:",
      link: "https://chat.whatsapp.com/B9hsyLb6Ksp979K4W8eh5S",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="
        relative
        mx-auto
        px-4
        py-16

      
      "
    >
      {/* CONTEÚDO */}
      <div className="relative z-10 max-w-[1000px] mx-auto">
        {/* Header */}
        <h4 className="text-3xl text-center font-jamjuree tracking-widest text-[#F5D247] uppercase">
          FAQ
        </h4>

        <h2 className="text-center font-anton mt-2 text-4xl md:text-5xl text-white uppercase">
          Perguntas frequentes
        </h2>

        {/* Accordion */}
        <div className="mt-10">
          <div className="space-y-4">
            {FAQquestions.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.numero}
                  className={`p-5 border-b border-zinc-200 ${
                    index === 0 ? "border-t" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-anton text-lg text-white">
                        {item.numero}
                      </span>

                      <h3 className="font-jamjuree text-base sm:text-lg font-semibold text-white">
                        {item.pergunta}
                      </h3>
                    </div>

                    {/* Arrow */}
                    <span
                      aria-hidden="true"
                      className={`grid h-8 w-8 place-items-center text-[#F5D247] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <img
                        src="/arrow-down.svg"
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                    </span>
                  </button>

                  {/* Conteúdo */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden pl-10 text-sm sm:text-base leading-relaxed text-[#F5D247]">
                      {item.resposta}

                      {item.link && (
                        <div className="mt-4">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md border border-[#F5D247] px-4 py-2 text-sm font-semibold text-[#F5D247] transition hover:bg-[#F5D247] hover:text-black"
                          >
                            Entrar no grupo do WhatsApp
                            <span aria-hidden>↗</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQVendas;
