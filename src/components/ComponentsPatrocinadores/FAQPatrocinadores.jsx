import { useState } from "react";

const FAQpatrocinadores = () => {
  const FAQquestions = [
    {
      numero: 1,
      pergunta: "Para quem é o patrocínio do DSX 2026?",
      resposta:
        "Para marcas que querem presença estratégica diante de empresários, líderes e gestores, usando o DSX como plataforma para posicionamento, relacionamento e geração de demanda no Norte.",
    },
    {
      numero: 2,
      pergunta: "Quais formatos de presença existem para patrocinadores?",
      resposta:
        "Há possibilidades de cotas de patrocínio, exposição na feira, ativações de marca, experiências e entregas de visibilidade no evento e na comunicação. O time comercial indica o melhor formato conforme seu objetivo.",
    },
    {
      numero: 3,
      pergunta: "Como o DSX ajuda minha marca a gerar leads qualificados?",
      resposta:
        "Com contato direto em feira e ativações, além de presença em um ambiente que concentra público qualificado. O patrocínio cria motivo e contexto para conversas que viram relacionamento e oportunidade.",
    },
    {
      numero: 4,
      pergunta: "Existe exclusividade por segmento para patrocinadores?",
      resposta:
        "Em algumas cotas e formatos, pode existir exclusividade por categoria. Isso depende do modelo escolhido e da disponibilidade no momento da contratação.",
    },
    {
      numero: 5,
      pergunta: "Como funciona a entrega e o suporte para ativação no evento?",
      resposta:
        "Após a confirmação, você recebe um fluxo de onboarding com prazos, orientações e suporte do time do DSX para garantir que sua marca esteja bem posicionada e que a ativação aconteça com clareza e qualidade.",
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

        before:absolute
        before:content-['']
        before:bg-cover
        before:bg-center
        before:bg-no-repeat
        before:bg-[url(/fundo-faq-patrocinadores.png)]
        before:w-full
        before:h-full
      "
    >
      {/* CONTEÚDO */}
      <div className="relative z-10 max-w-[1000px] mx-auto ">
        <h4 className="text-3xl text-center font-jamjuree tracking-widest text-[#F5D247] uppercase">
          FAQ
        </h4>

        <h2 className="text-center font-anton mt-2 text-4xl text-white uppercase">
          Perguntas frequentes para patrocinadores
        </h2>

        <div className="mt-10 grid grid-cols-1  after:absolute
        after:content-['']
        after:-bottom-20
        after:left-1/2
        after:-translate-x-1/2
        after:w-90
        after:h-30
        after:bg-cover
        after:bg-center
        after:bg-no-repeat
        after:bg-[url(/vector-26.svg)]">
          <div className="space-y-4 mb-25">
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

                      <h3 className="font-jamjuree text-base font-semibold text-white">
                        {item.pergunta}
                      </h3>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`grid h-8 w-8 place-items-center text-[#F5D247] transition ${
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

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden pl-10 text-sm leading-relaxed text-[#F5D247]">
                      {item.resposta}
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

export default FAQpatrocinadores;
