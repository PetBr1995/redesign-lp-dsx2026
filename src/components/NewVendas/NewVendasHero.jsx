import NewVendasHeaderMask from "./NewVendasHeaderMask";
import NewVendasBigNumbersSection from "./NewVendasBigNumbersSection";
import { Calendar, MapPin } from "lucide-react";

const NewVendasHero = ({
  ctaLink = "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721",
  onPrimaryCtaClick,
}) => {
  const ctaTarget = ctaLink.startsWith("#") ? "_self" : "_blank";

  return (
    <section className="bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-14 top-0 h-52 w-52 rounded-full bg-[#F5C02B]/12 blur-3xl md:-left-20 md:h-72 md:w-72" />
        <div className="pointer-events-none absolute -right-18 top-12 h-58 w-58 rounded-full bg-[#F5C02B]/8 blur-3xl md:h-80 md:w-80" />
        <div className="pointer-events-none absolute bottom-6 left-1/2 h-40 w-[60%] -translate-x-1/2 rounded-full bg-[#DFAE2D]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-4 pb-12 pt-10 md:pb-16 md:pt-14">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-10 lg:flex-row-reverse lg:items-center">
            <div className="w-full lg:w-[56%] flex justify-center items-center">
              <div className="w-full sm:w-[90%] md:w-[80%] overflow-hidden rounded-2xl border border-[#5D481B]/70 bg-[#140F07] shadow-[0_24px_60px_rgba(0,0,0,0.42)]">
                <img
                  src="/banner-mobile.png"
                  alt="Palestrantes confirmados do DSX"
                  className="block h-auto w-full object-cover opacity-95"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

            <div className="w-full text-center lg:w-[44%] lg:text-center">
              {/*
              <div className="flex justify-center">
                <span className="inline-flex items-center rounded-full border border-[#9F7A2A] bg-[#1A150C] px-4 py-2 font-jamjuree text-xs font-semibold uppercase tracking-[0.14em] text-[#F5C02B] md:text-sm">
                  3º lote liberado • dsx 2026
                </span>
              </div>
                  */}

              <div className="mt-5 flex justify-center">
                <img
                  src="/logo-dsx-horizontal-2.svg"
                  alt="DSX"
                  className="block h-14 w-auto object-contain md:h-18"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <h1 className="mt-5 text-center font-anton text-[clamp(1.9rem,4.2vw,3.9rem)] uppercase leading-[1.12] tracking-[0.014em] lg:text-[clamp(2rem,3.1vw,3.25rem)]">
                <span className="block text-[#F5C02B] lg:whitespace-nowrap">o maior evento</span>
                <span className="mt-1 block text-white lg:whitespace-nowrap">de negócios, marketing,</span>
                <span className="mt-1 block text-white lg:whitespace-nowrap">
                  vendas e inovação <span className="text-[#F5C02B]">do norte</span>
                </span>
              </h1>
              <div className="mt-6">
                <p className="mx-auto font-bold max-w-3xl text-center font-jamjuree text-[clamp(1rem,2.1vw,1.1rem)] leading-[1.55] text-white/84">
                  Dois dias de conteúdo estratégico, networking e oportunidades reais
                  para acelerar faturamento, posicionamento e liderança no seu mercado.
                </p>
              </div>
              <div className="mt-8 flex justify-center" id="newvendas-primary-cta">
                <NewVendasHeaderMask
                  titulo="COMPRAR PASSAPORTE"
                  link={ctaLink}
                  target={ctaTarget}
                  onClick={onPrimaryCtaClick}
                  textColor="#FFFFFF"
                  backgroundColor="#141006"
                  font="700"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-black pb-10 md:pb-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#4B3916]/0 bg-[#130E07]/0 px-4 py-6 md:px-6 md:py-7">

            <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#846225]/0 bg-[#171208]/0 px-4 py-4 text-left">
                <div className="mb-2 flex items-center gap-2 text-[#F5C02B]">
                  <Calendar size={18} />
                  <span className="font-jamjuree text-xs font-bold uppercase tracking-[0.14em]">
                    Data
                  </span>
                </div>
                <p className="font-jamjuree text-base font-semibold text-white">
                  23 e 24 de Julho de 2026
                </p>
              </div>

              <div className="rounded-2xl border border-[#846225]/0 bg-[#171208]/0 px-4 py-4 text-left">
                <div className="mb-2 flex items-center gap-2 text-[#F5C02B]">
                  <MapPin size={18} />
                  <span className="font-jamjuree text-xs font-bold uppercase tracking-[0.14em]">
                    Local
                  </span>
                </div>
                <p className="font-jamjuree text-base font-semibold text-white">
                  Centro de Convenções Vasco Vasques · Manaus/AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NewVendasBigNumbersSection />
    </section>
  );
};

export default NewVendasHero;
