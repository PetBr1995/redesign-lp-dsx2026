import { useState } from "react";

const FAQ = () => {
  const FAQquestions = [
    {
      numero: 1,
      pergunta: "Quando acontece o DSX 2026?",
      resposta:
        "O DSX 2026 acontece nos dias 23 e 24 julho, no Centro de Convenções Vasco Vasques em Manaus.",
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
        "A curadoria ainda está em construção, porém, você pode conferir as atuais presenças confirmadas em nosso perfil oficial @dsx.summit. Para acompanhar os anúncios oficiais, entre em nosso Grupo VIP no Whatsapp. Acesse o link para entrar:",
      link: "https://chat.whatsapp.com/GXEsJXjFNBi1a3LLAiG90R",
    },
    {
      numero: 4,
      pergunta: "Quais tipos de passaporte estarão disponíveis?",
      resposta:
        "Contamos com diferentes opções para perfis e objetivos, incluindo Standard, VIP,  passaportes em grupo (10 e 5 pessoas), além de condições específicas para estudantes e PCD.",
    },
    {
      numero: 5,
      pergunta: "O evento emite certificado?",
      resposta:
        "Sim. O DSX 2026 contará com certificado de participação, com orientações de acesso e emissão informadas mais perto da data.",
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
        bg-modern-image
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        "--bg-image-fallback": "url('/optimized/banner-faq.jpg')",
        "--bg-image-modern":
          "image-set(url('/optimized/banner-faq.avif') type('image/avif'))",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/80" />

      {/* CONTEÚDO */}
      <div className="relative z-10 mx-auto max-w-[1000px]">
        <h4 className="text-3xl text-center font-jamjuree tracking-widest text-[#F5D247] uppercase">
          FAQ
        </h4>

        <h2 className="text-center font-anton mt-2 text-4xl text-white uppercase">
          Perguntas frequentes
        </h2>

        <div className="mt-10 grid grid-cols-1">
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

                      <h3 className="font-jamjuree text-base font-semibold text-white">
                        {item.pergunta}
                      </h3>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`cursor-pointer grid h-8 w-8 place-items-center text-[#F5D247] transition ${
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

                      {item.link && (
                        <div className="mt-3">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md border border-[#F5D247] px-3 py-2 text-sm font-semibold text-[#F5D247] transition hover:bg-[#F5D247] hover:text-black"
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

export default FAQ;
