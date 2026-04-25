import { useEffect, useState } from "react";
import PassaporteVendas from "../components/ComponentsVendas/PassaporteVendas";
import { Check, CheckSquare } from "lucide-react";
import PassaporteGrupo from "./PassaporteGrupo";
import SlidaData from "../components/SlidaData";
import HeroVendas2 from "../components/HeroVendas2";
import PassaportesMobileVendas2 from "../components/ComponentsVendas/PassaportesMobileVendas2";

const Vendas2 = () => {
  const infoCardReceber = [
    {
      number: 1,
      titulo: "Acesso aos 2 dias de evento",
      desc: "Conteúdo estratégico em 23 e 24 de julho de 2026.",
    },
    {
      number: 2,
      titulo: "Acesso a trilhas e palcos",
      desc: "Programação com foco em negócios, vendas e performance.",
    },
    {
      number: 3,
      titulo: "Feira de negócios e networking",
      desc: "Conexões e soluções em um único ambiente.",
    },
    {
      number: 4,
      titulo: "Direção prática para execução",
      desc: "Você sai com prioridades claras para aplicar no negócio.",
    },
  ];

  const infParaQuemE = [
    {
      conteudo: "Empresário que quer destravar crescimento com previsibilidade",
    },
    {
      conteudo:
        "Gestor que precisa tomar decisão com mais clareza e menos achismo",
    },
    {
      conteudo: "Profissional de marketing e vendas focado em performance",
    },
    {
      conteudo: "Time comercial que precisa vender com processo",
    },
  ];

  const infProvaSocial = [
    {
      nome: "ADRIENNE ROCHA",
      profissao:
        "A gente veio com intuito de captar o máximo de conhecimento, fazer esse brainstorm sobre o que a gente pode aplicar no nosso trabalho",
      desc: "Sai com um plano claro para os próximos 90 dias. Só isso já pagou o ingresso.",
      link_video: "https://player.vimeo.com/video/1168873838",
    },
    {
      nome: "JESSICA RAMOS",
      profissao: "Acredito que o DSX é um porta-voz para novas empresas",
      desc: "O networking foi surreal. Fiz conexões que eu não faria em meses.",
      link_video: "https://player.vimeo.com/video/1168874280",
    },
    {
      nome: "ESTER LIMA",
      profissao:
        "Às vezes a gente tem todo um gasto com viagem, agora ter um evento desse na sua região é maravilhoso",
      desc: "Não foi só palestra. Voltei com direção prática para executar no dia seguinte.",
      link_video: "https://player.vimeo.com/video/1168874343",
    },
    {
      nome: "ALEXANDRE FARIAS",
      profissao:
        "Poder fazer esse evento aqui é de suma importância pro desenvolvimento do marketing e vendas aqui na região",
      desc: "Trouxe meu time e voltamos alinhados em marketing, vendas e meta.",
      link_video: "https://player.vimeo.com/video/1168874384",
    },
  ];

  const cardConteudos = [
    {
      titulo: "CULTURA EMPRESARIAL",
      desc: "Construção de mentalidade organizacional forte, alinhada a resultados, inovação, colaboração e crescimento sustentável.",
    },
    {
      titulo: "GESTÃO",
      desc: "Estruturação de processos, pessoas e indicadores para garantir eficiência operacional e execução estratégica.",
    },
    {
      titulo: "INTELIGÊNCIA ARTIFICIAL",
      desc: "Aplicação de tecnologia para automatizar processos, otimizar decisões, aumentar produtividade e gerar vantagem competitiva.",
    },
    {
      titulo: "MARKETING",
      desc: "Estratégias para posicionar marcas, gerar demanda, atrair clientes qualificados e fortalecer autoridade no mercado.",
    },
    {
      titulo: "NEGÓCIOS",
      desc: "Modelos de crescimento, geração de receita previsível, expansão de mercado e construção de empresas escaláveis.",
    },
    {
      titulo: "PERFORMANCE",
      desc: "Otimização de resultados por meio de dados, métricas, melhoria contínua e foco em alta performance comercial.",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1015);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  /**
   * Vimeo embed limpo e sem autoplay (usuário dá play)
   * - Remove infos: title/byline/portrait/badge
   * - Mantém autopause=1 (quando um toca, o outro pausa)
   * - Aceita links: vimeo.com/ID ou player.vimeo.com/video/ID
   */
  const getVimeoEmbedUrl = (rawUrl, index) => {
    if (!rawUrl) return "";

    try {
      const u = new URL(rawUrl);

      // Pega o primeiro número do path (robusto).
      const idMatch = u.pathname.match(/\d+/);
      const id = idMatch?.[0];
      if (!id) return rawUrl;

      const params = new URLSearchParams();

      // Limpa infos.
      params.set("title", "0");
      params.set("byline", "0");
      params.set("portrait", "0");
      params.set("badge", "0");

      // Sem autoplay (usuário dá play).
      params.set("autopause", "1");
      params.set("player_id", String(index));

      return `https://player.vimeo.com/video/${id}?${params.toString()}`;
    } catch {
      return rawUrl;
    }
  };

  return (
    <>
      <section className="overflow-x-hidden">
        <div className="relative z-10 ">
          <img
            src="/logo-dsx-horizontal.svg"
            className="mx-auto my-8 w-44 sm:my-10 sm:w-56"
            alt="logo-dsx"
          />

          <h1 className="px-4 text-center font-bebas text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            O <span className="text-[#F5A205]">MAIOR EVENTO</span> DE NEGÓCIOS,
            MARKETING, VENDAS E INOVAÇÃO DO NORTE DO BRASIL{" "}
            <span className="text-[#F5A205]">ESTÁ DE VOLTA</span>
          </h1>
          <div className="py-4">
            <SlidaData />
          </div>

          {/* HERO VIDEO */}
          <div className="relative z-20 mx-auto mt-8 w-full max-w-5xl px-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 pt-[56.25%]">
              <iframe
                src="https://player.vimeo.com/video/1148163345?autoplay=1&loop=1&muted=0&controls=1&title=0&byline=0&portrait=0&badge=0"
                title="DSX 2026"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="relative -mt-12 sm:-mt-20 md:-mt-24">
            {/* BADGE CENTRALIZADO */}
            <img
              src="/badge-2-lote.png"
              className="
      absolute
      left-1/2 -translate-x-1/2
      top-15 sm:top-20 md:top-25
      z-50
      w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40
      animate-badge
      pointer-events-none
      select-none
    "
              alt="badge"
            />

            <div
              className="
      relative z-10 bg-white 
      pb-10 pt-20 sm:pt-24 md:pt-28 lg:pb-12
      before:content-['']
      before:absolute
      before:top-0
      before:left-1/2
      before:-translate-x-1/2
      before:w-28 sm:before:w-36 md:before:w-44
      before:h-28 sm:before:h-36 md:before:h-44
      before:rounded-full
      before:bg-white
      before:z-[-1]
    "
              style={{ clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0% 100%)" }}
            >
              <p
                className="
        text-red-500 relative font-black text-center
        text-xl sm:text-2xl md:text-3xl
        mt-15 sm:mt-25 md:mt-35
        inline-block left-1/2 -translate-x-1/2
        after:content-['']
        after:absolute after:left-1/2 after:top-1/2 
        after:-translate-x-1/2 after:-translate-y-1/2
        after:w-full 
        after:max-w-[220px] sm:after:max-w-[260px] md:after:max-w-[320px]
        after:h-[3px] after:bg-red-500 after:rounded-full
        
      "
              >
                De R$ 697,00
              </p>

              <p className="text-center uppercase font-light text-2xl sm:text-3xl md:text-4xl mt-2">
                Por apenas
              </p>

              <h3 className="mt-2 text-center font-bebas text-[4.5rem] leading-none font-black text-green-700 sm:text-[7rem] md:text-[9rem] lg:text-[10rem]">
                R$ 397,00
              </h3>

              <div className="flex justify-center items-center mt-6 px-4">
                <a
                  href="#passaportes"
                  className="
          text-center
          text-sm sm:text-base md:text-xl
          font-jamjuree uppercase font-extrabold
          px-4 sm:px-6 md:px-8
          py-3
          rounded-md
          bg-linear-to-r from-[#F3CB46] to-[#E7A040]
          w-full max-w-sm sm:w-auto
        "
                >
                  Garanta seu passaporte agora
                </a>
              </div>
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="bg-linear-to-r max-w-7xl mx-auto from-[#F3CB46] to-[#E7A040] rounded-2xl">
              <h1 className="px-4 py-6 text-center font-bebas text-4xl font-black uppercase leading-[0.95] text-black sm:text-5xl md:text-6xl lg:text-7xl">
                PREPARE-SE PARA A SEGUNDA EDIÇÃO
              </h1>
              <HeroVendas2 />
              <p className="mx-auto max-w-3xl px-4 pb-6 text-center text-sm text-black sm:text-base">
                O DSX é um evento consolidado com padrão nacional e impacto
                real.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <h2 className="text-center font-bebas text-3xl font-black text-white sm:text-5xl md:text-6xl lg:text-7xl">
            O que você vai receber
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
            {infoCardReceber.map((info) => (
              <div
                key={info.number}
                className="flex items-start gap-3 rounded-lg border border-white/20 bg-white/10 p-4 sm:p-5"
              >
                <p className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-[#F3CB46] to-[#E7A040] text-base font-black text-black sm:h-10 sm:w-10">
                  {info.number}
                </p>
                <div>
                  <h3 className="font-jamjuree text-lg font-extrabold uppercase tracking-wide text-white sm:text-2xl">
                    {info.titulo}
                  </h3>
                  <p className="mt-1 text-sm text-white/90 sm:text-base">
                    {info.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-2xl bg-linear-to-r from-[#F3CB46] to-[#E7A040] px-2 py-6">
            <h2 className="mb-4 px-2 text-center font-bebas text-4xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl">
              Para quem é:{" "}
            </h2>
            <div className="grid grid-cols-1 gap-2 px-3 sm:grid-cols-2 sm:px-4 lg:grid-cols-4">
              {infParaQuemE.map((info, idx) => (
                <div key={idx} className="flex gap-2 rounded-md bg-white p-3">
                  <div>
                    <CheckSquare />
                  </div>
                  <h2 className="text-sm font-bold sm:text-base">
                    {info.conteudo}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <h2 className="text-center font-bebas text-3xl font-black text-white sm:text-5xl md:text-6xl lg:text-7xl">
            CONFIRA NOSSOS CONTEÚDOS
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
            {cardConteudos.map((info) => (
              <div className="flex items-start gap-3 rounded-lg border border-white/20 bg-white/10 p-4 sm:p-5">
                <p className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-[#F3CB46] to-[#E7A040] text-base font-black text-black sm:h-10 sm:w-10">
                  <Check />
                </p>
                <div>
                  <h3 className="font-jamjuree text-lg font-extrabold uppercase tracking-wide text-white sm:text-2xl">
                    {info.titulo}
                  </h3>
                  <p className="mt-1 text-sm text-white/90 sm:text-base">
                    {info.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1">
            <div className=" flex items-start gap-3 rounded-lg border border-white/20 bg-white/10 p-4 sm:p-5">
              <p className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-[#F3CB46] to-[#E7A040] text-base font-black text-black sm:h-10 sm:w-10">
                <Check />
              </p>
              <div>
                <h3 className="font-jamjuree text-lg font-extrabold uppercase tracking-wide text-white sm:text-2xl">
                  Vendas
                </h3>
                <p className="mt-1 text-sm text-white/90 sm:text-base">
                  Estratégias e processos para atrair, negociar e fechar
                  contratos com previsibilidade e aumento de faturamento.
                </p>
              </div>
            </div>
          </div>
        </div>

                  */}

        <div
          id="passaportes"
          className="bg-[url(/ELEMENTOS-BANNER-2.png)] bg-cover bg-no-repeat bg-center"
        >
          {isMobile ? <PassaportesMobileVendas2 /> : <PassaporteVendas />}
        </div>
        <div className="py-3">
          <h1 className="px-4 text-center font-bebas text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            DESCONTO PROGRESSIVO
          </h1>
          <PassaporteGrupo />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <h2 className="mt-2 text-center font-bebas text-4xl font-black uppercase text-white sm:text-6xl lg:text-7xl">
            Depoimentos de quem viveu o DSX 2025
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-center text-sm text-white/75 sm:text-base">
            Não é promessa vazia. É experiência real de quem participou e
            aplicou.
          </p>

          <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 md:grid-cols-2">
            {infProvaSocial.map((info, index) => (
              <div
                key={`${info.nome}-${index}`}
                className="
                  group
                  flex flex-col
                  overflow-hidden
                  rounded-2xl
                  border border-white/20
                  bg-gradient-to-r from-black to-[#8e3eeb]/20
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#8e3eeb]/60
                  hover:shadow-[0_0_20px_rgba(142,62,235,0.3)]
                "
              >
                <div className="relative w-full aspect-[9/16] overflow-hidden">
                  <iframe
                    src={getVimeoEmbedUrl(info.link_video, index)}
                    className="absolute inset-0 h-full w-full"
                    allow="fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    frameBorder="0"
                    title={`Vídeo-${info.nome}`}
                  />
                </div>

                <div className="flex flex-col gap-2 p-4">
                  <h5 className="text-sm text-white/70">
                    " {info.profissao} "
                  </h5>
                  <h3 className="text-lg font-black text-white">{info.nome}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="px-4 pb-10 pt-4">
          <div className="mx-auto max-w-7xl rounded-2xl border border-[#F3CB46]/35 bg-white/[0.04] px-4 py-8 text-center text-white sm:px-6">
            <img
              src="/logo-dsx-horizontal.svg"
              className="mx-auto h-auto w-44 sm:w-52"
              alt="logo-dsx"
            />
            <div className="mx-auto mt-5 h-px w-full max-w-md bg-[#F3CB46]/25" />
            <p className="mt-5 text-sm text-white/90 sm:text-base">
              CNPJ 10.279.661/0001-51
            </p>
            <p className="mt-2 text-sm text-white/80 sm:text-base">
              Todos os direitos reservados.
            </p>
            <img src="/logo-digitalhub-branca.svg" className="w-[180px] m-auto pt-3" />
          </div>
        </footer>
      </section>
    </>
  );
};

export default Vendas2;
