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

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-16 md:pt-14">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-[#9F7A2A] bg-[#1A150C] px-4 py-2 font-jamjuree text-xs font-semibold uppercase tracking-[0.14em] text-[#F5C02B] md:text-sm">
              3º lote liberado • dsx 2026
            </span>

            <div className="mt-5 flex justify-center">
              <img
                src="/logo-dsx-horizontal-2.svg"
                alt="DSX"
                className="block h-14 w-auto object-contain md:h-18"
                loading="eager"
                decoding="async"
              />
            </div>

            <h1 className="mx-auto mt-5 max-w-5xl font-anton text-[clamp(1.95rem,5.1vw,4.7rem)] uppercase leading-[1.03] tracking-[0.006em]">
              <span className="block text-[#F5C02B]">o maior evento</span>
              <span className="mt-1 block text-white">de negócios, marketing,</span>
              <span className="mt-1 block text-white">
                vendas e inovação <span className="text-[#F5C02B]">do norte</span>
              </span>
            </h1>

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

      <section className="bg-black pb-10 md:pb-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#4B3916] bg-[#130E07]/95 px-4 py-6 md:px-6 md:py-7">
            <p className="mx-auto max-w-3xl text-center font-jamjuree text-[clamp(1rem,2.1vw,1.15rem)] leading-[1.55] text-white/84">
              Dois dias de conteúdo estratégico, networking e oportunidades reais
              para acelerar faturamento, posicionamento e liderança no seu mercado.
            </p>

            <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#846225] bg-[#171208]/90 px-4 py-4 text-left">
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

              <div className="rounded-2xl border border-[#846225] bg-[#171208]/90 px-4 py-4 text-left">
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

            <div className="mt-6 flex justify-center">
              <a
                href="#passaportes"
                className="rounded-xl border border-[#7E6225] bg-transparent px-5 py-3 font-jamjuree text-sm font-semibold uppercase tracking-[0.1em] text-[#F5C02B] transition hover:bg-[#F5C02B]/10"
              >
                Ver opções de passaporte
              </a>
            </div>
          </div>
        </div>
      </section>
      <NewVendasBigNumbersSection />
    </section>
  );
};

export default NewVendasHero;
