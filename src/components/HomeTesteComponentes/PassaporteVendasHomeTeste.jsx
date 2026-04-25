import { withHublaUtm } from "../../utils/hublaUtm";
import { Check } from "lucide-react";
import { rememberDsxFormOrigin } from "../../utils/formOrigin";

const cards = [
  {
    nome: "VIP",
    price: "1.297,00",
    installment: "12x de R$ 134,14",
    cash: "ou R$ 1.297,00 à vista",
    badge: "MAIS VENDIDO",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
    benefits: [
      { label: "Lounge VIP exclusivo", included: true },
      { label: "Networking com decisores", included: true },
      { label: "Kit premium", included: true },
      { label: "Primeiras fileiras", included: true },
      { label: "2 dias de evento", included: true },
      { label: "+40 palestras", included: true },
      { label: "Feira de negócios", included: true },
      { label: "Certificado de participação", included: true },
    ],
  },
  {
    nome: "STANDARD",
    price: "497,00",
    installment: "12x de R$ 51,40",
    cash: "ou R$ 497,00 à vista",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
    benefits: [
      { label: "Lounge VIP exclusivo", included: false },
      { label: "Networking com decisores", included: false },
      { label: "Kit premium", included: false },
      { label: "Primeiras fileiras", included: false },
      { label: "2 dias de evento", included: true },
      { label: "+40 palestras", included: true },
      { label: "Feira de negócios", included: true },
      { label: "Certificado de participação", included: true },
    ],
  },
];

const SquishyPlanCard = ({ card, onBuyPassaporte, hideBuyButton = false }) => (
  <article
    className="relative h-full w-full overflow-hidden rounded-[22px] border border-[#E7A040]/35 bg-[#161616] p-5 lg:p-6"
  >
    <div className="relative z-10 flex h-full flex-col">
      {card.badge ? (
        <p className="pointer-events-none absolute -right-18 top-6 z-20 flex h-8 w-64 rotate-[35deg] items-center justify-center whitespace-nowrap border-y border-[#FF6B6B]/75 bg-[#FF1F1F]/85 text-center text-xl font-black uppercase leading-none tracking-[0.08em] text-white shadow-[0_8px_20px_rgba(0,0,0,0.35)] lg:-right-25 lg:w-80 lg:text-xl">
          {card.badge}
        </p>
      ) : null}

      <p className="mt-3 text-sm font-semibold text-white/90">
        PASSAPORTE
      </p>
      <h3 className="mt-2 text-4xl font-black uppercase leading-[0.95] text-white lg:text-5xl">
        {card.nome}
      </h3>

      {card.nome === "VIP" ? (
        <div className="mt-4 min-h-[146px] rounded-xl border border-[#5A4718]/70 bg-black/30 p-3 lg:min-h-[174px]">
          <div className="flex h-full w-full flex-col justify-center space-y-2">
            <p className="font-jamjuree text-sm font-bold text-[#F5C02B]">
              Para quem quer extrair o máximo do evento.
            </p>
            <p className="font-jamjuree text-xs leading-relaxed text-white/90">
              O VIP não é só acesso ao evento. É uma experiência diferente desde
              o momento que você chega.
            </p>
            <p className="font-jamjuree text-xs leading-relaxed text-white/90">
              Você ocupa as primeiras fileiras, recebe kit premium e tem acesso
              ao Lounge VIP exclusivo, o espaço onde os palestrantes também
              estarão. As conversas mais estratégicas do DSX acontecem ali.
            </p>
          </div>
        </div>
      ) : null}

      {card.nome === "STANDARD" ? (
        <div className="mt-4 min-h-[146px] rounded-xl border border-[#5A4718]/70 bg-black/30 p-3 lg:min-h-[174px]">
          <div className="flex h-full w-full flex-col justify-center space-y-2">
            <p className="font-jamjuree text-sm font-bold text-[#F5C02B]">
              A porta de entrada para o maior evento de negócios do Norte.
            </p>
            <p className="font-jamjuree text-xs leading-relaxed text-white/90">
              Dois dias completos de imersão. Acesso a mais de 40 palestras em
              três palcos simultâneos, feira de negócios e conteúdo que você
              realmente aplica.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-4">
        <ul className="space-y-2 rounded-xl bg-black/25 p-3">
          {card.benefits
            .filter((benefit) => benefit.included)
            .map((benefit) => (
            <li
              key={benefit.label}
              className="flex items-center gap-2 text-xs text-white sm:text-sm"
            >
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#22C55E]/70 bg-[#22C55E]/15 text-[#22C55E] sm:h-4.5 sm:w-4.5">
                <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={3} />
              </span>
              <span>{benefit.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-4">
        <p className="bg-gradient-to-r from-[#F5D247] to-[#E7A040] bg-clip-text text-2xl font-black leading-[1] text-transparent whitespace-nowrap lg:text-3xl">
          {`R$ ${card.price} à vista`}
        </p>
        <p className="mt-2 text-sm font-semibold text-white/90">
          {`ou em ${card.installment}`}
        </p>

        {!hideBuyButton ? (
          <button
            data-cta="sympla"
            onClick={() => {
              const targetLink = withHublaUtm(card.link);
              const formOrigin = card.nome;
              rememberDsxFormOrigin(formOrigin);
              if (onBuyPassaporte) {
                onBuyPassaporte(targetLink, formOrigin);
                return;
              }
              window.location.href = targetLink;
            }}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#F3CB46] to-[#E7A040] px-5 py-3 text-base font-black uppercase tracking-wide text-black transition hover:brightness-95"
          >
            COMPRAR AGORA
          </button>
        ) : null}
      </div>
    </div>
  </article>
);

const PassaporteVendasHomeTeste = ({
  onBuyPassaporte,
  hideBuyButton = false,
}) => {
  return (
    <section className="relative overflow-hidden pb-10 pt-0 md:pb-14 md:pt-0">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-2xl uppercase leading-tight text-white sm:text-3xl md:text-4xl">
          GARANTA O SEU PASSAPORTE PARA 2 DIAS DE EVENTO
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base font-black uppercase tracking-[0.04em] text-[#F5C02B] sm:text-lg">
          VAGAS LIMITADAS
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {cards.map((card) => (
            <SquishyPlanCard
              key={card.nome}
              card={card}
              onBuyPassaporte={onBuyPassaporte}
              hideBuyButton={hideBuyButton}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassaporteVendasHomeTeste;
