import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const mainSpeakers = [
  {
    name: "João Branco",
    image: "/foto-joao-branco.png",
    bio: "O CMO que transformou o McDonald's em Méqui. Foram quase 10 anos na linha de frente, batendo absolutamente todos os recordes da história da marca no Brasil.",
  },
  {
    name: "João Kepler",
    image: "/novas-palestrantes/Joao-Kepler.png",
    bio: 'Autor de "O Poder do Equity" e "O Ponto Cego Empresarial". Ele não fala sobre crescimento isolado; ele desenha estratégias e amplia a visão de dezenas de grandes empresários. Você vai descobrir os problemas que o seu negócio tem e você não está enxergando.',
  },
  {
    name: "Netão Bom Beef",
    image: "/foto-netao-bom-beef.PNG",
    bio: "A verdadeira aula de escala física. Ele começou com um açougue de bairro. Hoje, fatura R$ 1 MILHÃO por dia. A trajetória real que vai virar aprendizado puro para quem quer construir um império.",
  },
  {
    name: "Fernando Miranda",
    image: "/novas-palestrantes/Fernando-Miranda.png",
    bio: "CEO da Staage e host do maior podcast de marketing do Brasil. Fernando liderou um crescimento de 40 vezes na unidade de educação da EXAME e traz a bagagem de gigantes como Banco do Brasil, XP e InfoMoney.",
  },
  {
    name: "Nicolas Charão",
    image: "/novas-palestrantes/Nicolas-Charao.png",
    bio: "O destravador de crescimento. Já ajudou mais de 50 negócios a cruzarem a barreira do primeiro milhão. Ele vai te provar que ter mais receita sem ter mais liberdade não é sucesso, é cilada.",
  },
  {
    name: "Giullya Becker",
    image: "/novas-palestrantes/GIULLYA-BECKER.png",
    bio: "Giullya Becker é publicitária e criadora do Método dos Conteúdos Magnéticos. Pioneira em oficinas práticas de criação, já formou milhares de alunos e se consolidou como referência em conteúdos que geram conexão e vendas com presença no digital.",
  },
  {
    name: "Carolina Lima",
    image: "/foto-carolina-lima.png",
    bio: "17 anos construindo estratégia de conteúdo para marcas de sucesso. Você vai entender de uma vez por todas a mecânica da atração.",
  },
  {
    name: "Roberto Reis",
    image: "/novas-palestrantes/Roberto-Reis.png",
    bio: "Estrategista eleitoral com 27 anos de atuação. Em 2026 tem eleição. E política move mercado, capital e negócio. Você vai entender quais regras vão mudar no seu setor.",
  },
  {
    name: "Afrânio Soares",
    image: "/palestrantes/AfranioSoares.png",
    bio: "Doutor em Administração e fundador da Action Pesquisas, é a maior referência em inteligência de mercado da região Norte há mais de 25 anos.",
  },
  {
    name: "Breno Maciel",
    image: "/foto-breno-maciel.png",
    bio: "CEO da Vanguarda Martech, maior agência de marketing do Norte, gerencia mais de R$ 60 milhões em verbas de marketing e é palestrante do RD Summit pelo terceiro ano consecutivo.",
  },
  {
    name: "Carlos Oshiro",
    image: "/foto-carlos-oshiro.png",
    bio: "Fundador da Targo Educação Empresarial, colunista na CBN e referência no ecossistema empresarial de Manaus há mais de 25 anos.",
  },
  {
    name: "Chay Santos",
    image: "/foto-chay-santos.png",
    bio: "CEO da Agência A Mangarataia e autora de Empreender Nunca Foi Sorte, especialista em branding estratégico e posicionamento de marcas.",
  },
  {
    name: "Flávia Sausmikat",
    image: "/novas-palestrantes/Flavia-Sausmikat.png",
    bio: "Diretora-geral do Instituto Action de Pesquisas, atua há mais de duas décadas na análise de comportamentos sociais, eleitorais e de consumo em todo o Brasil.",
  },
  {
    name: "Fabricio Alva",
    image: "/optimized/step1/Fabricio_alva.PNG",
    bio: "Especialista em gestão empresarial com foco em estruturação de operações e processos que preparam empresas para escalar.",
  },
  {
    name: "Rafael Liporace",
    image: "/optimized/step1/Rafael_liporace.PNG",
    bio: "Cofundador e CEO da Tardezinha, estrategista por trás da maior turnê da história do entretenimento brasileiro. Especialista em escala exponencial e gestão de grandes operações, lidera empresas premiadas nacionalmente por sua cultura de performance e excelência operacional.",
  },
  {
    name: "Gisele Oshiro",
    image: "/novas-palestrantes/foto-giselle-oshiro.png",
    bio: "Empresária, especialista em inteligência emocional e apresentadora do podcast Mulheres que Inspiram na CBN.",
  },
  {
    name: "Magno Rodrigues",
    image: "/palestrantes/MagnoRodrigues.png",
    bio: "Educador financeiro e fundador da Pega Bizu, criador de uma metodologia própria que já ajudou centenas de negócios a construírem uma gestão financeira eficiente.",
  },
  {
    name: "Suelen Scop",
    image: "/palestrantes/SuellenScop.png",
    bio: "Psicóloga, diretora operacional da Singulari e especialista na aplicação prática de inteligência artificial em contextos reais de negócio.",
  },
  {
    name: "Roberta Veras",
    image: "/Roberta_veras.png",
    bio: "Educadora financeira, consultora empresarial e especialista em vendas. Possui uma trajetória construída no varejo e no empreendedorismo como gestora de franquias e performance comercial com destaque nacional.",
  },
];

const NewVendasSpeakersSlider = () => {
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isDraggingSpeakers, setIsDraggingSpeakers] = useState(false);
  const [openSpeakerName, setOpenSpeakerName] = useState(null);
  const [isTrackTransitionEnabled, setIsTrackTransitionEnabled] = useState(true);
  const speakerDragStartXRef = useRef(null);

  useEffect(() => {
    const getCardsPerView = () => {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 640) return 2;
      return 1;
    };

    const applyCardsPerView = () => {
      const nextCardsPerView = getCardsPerView();
      setCardsPerView(nextCardsPerView);
      setCurrentSpeakerIndex((current) =>
        Math.min(current, Math.max(mainSpeakers.length - nextCardsPerView, 0)),
      );
    };

    applyCardsPerView();
    window.addEventListener("resize", applyCardsPerView);
    return () => window.removeEventListener("resize", applyCardsPerView);
  }, []);

  const maxSpeakerIndex = Math.max(mainSpeakers.length - cardsPerView, 0);

  useEffect(() => {
    if (maxSpeakerIndex === 0 || isDraggingSpeakers) return;

    const autoplayId = window.setInterval(() => {
      goToNextSpeakerSlide();
    }, 4200);

    return () => window.clearInterval(autoplayId);
  }, [maxSpeakerIndex, isDraggingSpeakers, currentSpeakerIndex]);

  const goToNextSpeakerSlide = () => {
    if (maxSpeakerIndex === 0) return;

    if (currentSpeakerIndex >= maxSpeakerIndex) {
      setIsTrackTransitionEnabled(false);
      setCurrentSpeakerIndex(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTrackTransitionEnabled(true);
        });
      });
      return;
    }

    setIsTrackTransitionEnabled(true);
    setCurrentSpeakerIndex((current) => Math.min(current + 1, maxSpeakerIndex));
  };

  const goToPreviousSpeakerSlide = () => {
    if (maxSpeakerIndex === 0) return;

    if (currentSpeakerIndex <= 0) {
      setIsTrackTransitionEnabled(false);
      setCurrentSpeakerIndex(maxSpeakerIndex);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTrackTransitionEnabled(true);
        });
      });
      return;
    }

    setIsTrackTransitionEnabled(true);
    setCurrentSpeakerIndex((current) => Math.max(current - 1, 0));
  };

  const handleSpeakerDragStart = (clientX) => {
    speakerDragStartXRef.current = clientX;
    setIsDraggingSpeakers(true);
  };

  const handleSpeakerDragEnd = (clientX) => {
    if (speakerDragStartXRef.current === null) return;

    const deltaX = clientX - speakerDragStartXRef.current;
    const swipeThreshold = 50;

    if (deltaX <= -swipeThreshold) {
      goToNextSpeakerSlide();
    } else if (deltaX >= swipeThreshold) {
      goToPreviousSpeakerSlide();
    }

    speakerDragStartXRef.current = null;
    setIsDraggingSpeakers(false);
  };

  const handleToggleSpeakerBio = (speakerName) => {
    setOpenSpeakerName((current) =>
      current === speakerName ? null : speakerName,
    );
  };

  return (
    <section className="mx-auto mt-8 w-full max-w-6xl">

      <h3 className="text-center font-anton text-[clamp(1.3rem,4.2vw,2.8rem)] uppercase leading-[1.08] tracking-[0.03em] text-[#F5C02B]">
        Conheça os primeiros palestrantes confirmados do DSX
      </h3>


      <div className="relative mx-auto mt-6 w-full max-w-[1220px]">
        <div
          className={`overflow-hidden select-none ${isDraggingSpeakers ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ touchAction: "pan-y" }}
          onMouseDown={(event) => handleSpeakerDragStart(event.clientX)}
          onMouseUp={(event) => handleSpeakerDragEnd(event.clientX)}
          onMouseLeave={(event) => {
            if (speakerDragStartXRef.current !== null) {
              handleSpeakerDragEnd(event.clientX);
            }
          }}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            if (!touch) return;
            handleSpeakerDragStart(touch.clientX);
          }}
          onTouchEnd={(event) => {
            const touch = event.changedTouches[0];
            if (!touch) return;
            handleSpeakerDragEnd(touch.clientX);
          }}
        >
          <div
            className={`flex items-start ${
              isTrackTransitionEnabled
                ? "transition-transform duration-500 ease-out"
                : "transition-none"
            }`}
            style={{
              transform: `translateX(-${(currentSpeakerIndex * 100) / cardsPerView}%)`,
            }}
          >
            {mainSpeakers.map((speaker) => (
              <div
                key={speaker.name}
                className="w-full shrink-0 px-0.5 sm:w-1/2 sm:px-1 lg:w-1/4 lg:px-1.5"
              >
                {(() => {
                  const isOpen = openSpeakerName === speaker.name;
                  const descriptionId = `speaker-description-${speaker.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]/g, "")}`;

                  return (
                <article className="relative flex h-[338px] w-full flex-col overflow-hidden rounded-xl border border-[#5A4718] bg-black/80 text-left shadow-lg sm:h-[368px] md:h-[390px]">
                  <div className="relative h-[220px] w-full overflow-hidden bg-black sm:h-[250px] md:h-[270px]">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-full w-full object-contain object-center"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      onDragStart={(event) => event.preventDefault()}
                    />
                  </div>

                  <div className="px-3.5 pt-3 text-center">
                    <h4 className="font-bebas text-[1.75rem] uppercase tracking-[0.02em] text-[#F5A205]">
                      {speaker.name}
                    </h4>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-[52px] z-20 px-3.5">
                    <div
                      id={descriptionId}
                      className={`overflow-hidden rounded-xl border bg-[#050505]/96 transition-all duration-300 ease-out ${
                        isOpen
                          ? "max-h-[180px] border-[#5A4718]/90 px-3 py-3 opacity-100 shadow-[0_10px_30px_rgba(0,0,0,0.45)] pointer-events-auto"
                          : "max-h-0 border-transparent px-3 py-0 opacity-0"
                      }`}
                    >
                      <p className="font-jamjuree text-sm leading-relaxed text-white/90 md:text-[14px]">
                        {speaker.bio}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-[#5A4718]/70 bg-black/90">
                    <button
                      type="button"
                      aria-label={`${isOpen ? "Ocultar" : "Ver"} descrição de ${speaker.name}`}
                      aria-expanded={isOpen}
                      aria-controls={descriptionId}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleToggleSpeakerBio(speaker.name);
                      }}
                      className="mx-auto my-2 grid h-10 w-10 place-items-center rounded-full border border-[#7A5E24] bg-[#151005] text-[#F5C02B] transition hover:bg-[#F5C02B]/12"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={2.4}
                      />
                    </button>
                  </div>
                </article>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>

        {maxSpeakerIndex > 0 ? (
          <>
            <button
              type="button"
              onClick={goToPreviousSpeakerSlide}
              aria-label="Slide anterior de palestrantes"
              className="absolute left-2 top-[165px] z-10 -translate-y-1/2 text-[#F5C02B] transition hover:scale-110 hover:text-[#FFD45A] sm:top-[188px] md:left-3 md:top-[200px]"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.4} />
            </button>
            <button
              type="button"
              onClick={goToNextSpeakerSlide}
              aria-label="Próximo slide de palestrantes"
              className="absolute right-2 top-[165px] z-10 -translate-y-1/2 text-[#F5C02B] transition hover:scale-110 hover:text-[#FFD45A] sm:top-[188px] md:right-3 md:top-[200px]"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.4} />
            </button>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default NewVendasSpeakersSlider;
