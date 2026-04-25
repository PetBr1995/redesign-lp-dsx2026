import { Link } from "react-router-dom";
import { EVENT_BENEFITS, EVENT_HIGHLIGHTS } from "../constants";

const LPAylaEventStage = () => {
  const eventPillars = [
    {
      title: "Conteudo de aplicacao imediata",
      description:
        "Aprenda estrategias praticas para vendas, marketing, lideranca e crescimento com foco em resultado.",
    },
    {
      title: "Networking de decisores",
      description:
        "Conecte-se com empresarios, executivos, gestores e parceiros estrategicos no mesmo ambiente.",
    },
    {
      title: "Visao de futuro com IA",
      description:
        "Entenda como usar IA para aumentar produtividade, reduzir custos e ampliar performance comercial.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090909] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-12 h-64 w-64 rounded-full bg-[#F5A205]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-[#E7A040]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(245,162,5,0.14),transparent_46%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.78)_75%)]" />
      </div>

      <section className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <img
            src="/logo-dsx-horizontal-2.svg"
            alt="DSX"
            className="h-7 w-auto opacity-95"
          />
          <span className="rounded-full border border-[#F5A205]/45 bg-[#F5A205]/10 px-4 py-1.5 font-jamjuree text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFD27A]">
            Etapa concluida
          </span>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="font-jamjuree text-[11px] uppercase tracking-[0.22em] text-[#F5A205]">
            DSX 2026
          </p>
          <h1 className="mt-3 max-w-3xl font-bebas text-5xl leading-[0.9] sm:text-6xl md:text-7xl">
            O evento que conecta estrategia, vendas e crescimento real
          </h1>
          <p className="mt-5 max-w-2xl font-jamjuree text-base leading-relaxed text-white/75 sm:text-lg">
            Nos dias 23 e 24 de julho, em Manaus, voce vai estar com empresarios,
            lideres e profissionais que estao construindo negocios com previsibilidade
            e alta performance.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {EVENT_HIGHLIGHTS.map((item) => (
              <article
                key={item.label}
                className="rounded-xl border border-white/15 bg-white/[0.03] p-4 backdrop-blur-sm"
              >
                <p className="font-jamjuree text-[11px] uppercase tracking-[0.12em] text-[#F5A205]">
                  {item.label}
                </p>
                <p className="mt-1.5 font-jamjuree text-sm font-semibold text-white sm:text-base">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-5 -top-6 h-24 w-24 rounded-full bg-[#F5A205]/25 blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#121212] p-3 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
            <img
              src="/dsx2026main.png"
              alt="Publico do DSX 2026"
              className="h-[280px] w-full rounded-2xl object-cover sm:h-[340px] lg:h-[420px]"
            />
            <div className="mt-3 rounded-2xl border border-[#F5A205]/25 bg-[#171717] p-4">
              <p className="font-jamjuree text-[11px] uppercase tracking-[0.14em] text-[#F5A205]">
                Para quem e o DSX
              </p>
              <p className="mt-2 font-jamjuree text-sm leading-relaxed text-white/80">
                Donos de negocios, executivos, gestores e profissionais que querem
                escalar resultado com estrategia, execucao e conexoes de alto nivel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-5 sm:p-7">
          <h2 className="font-bebas text-4xl leading-none sm:text-5xl">
            O que te espera no DSX
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {EVENT_BENEFITS.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-[#161616] p-4 font-jamjuree text-sm leading-relaxed text-white/85 sm:text-base"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {eventPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-[#F5A205]/20 bg-[#131313] p-5"
            >
              <h3 className="font-bebas text-2xl leading-[0.95] text-[#FFD27A]">
                {pillar.title}
              </h3>
              <p className="mt-3 font-jamjuree text-sm leading-relaxed text-white/75">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl border border-[#F5A205]/30 bg-gradient-to-r from-[#20170a] via-[#1a130b] to-[#121212] p-6 sm:p-8 md:p-10">
          <h3 className="font-bebas text-3xl leading-none sm:text-4xl">
            Pronto para garantir sua vaga?
          </h3>
          <p className="mt-3 max-w-2xl font-jamjuree text-sm leading-relaxed text-white/80 sm:text-base">
            Sua inscricao ja foi registrada. Agora voce pode seguir para a pagina
            de compra e escolher o melhor passaporte.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/precheckout"
              className="rounded-lg bg-gradient-to-r from-[#F5A205] to-[#E7A040] px-6 py-3 text-center font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-[#101010] shadow-[0_8px_30px_rgba(245,162,5,0.28)] transition hover:brightness-105"
            >
              Ir para pre-checkout
            </Link>
            <Link
              to="/vendas"
              className="rounded-lg border border-white/25 px-6 py-3 text-center font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/5"
            >
              Ver pagina de vendas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LPAylaEventStage;
