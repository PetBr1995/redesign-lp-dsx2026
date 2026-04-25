import { withHublaUtm } from "../../utils/hublaUtm";

import { rememberDsxFormOrigin } from "../../utils/formOrigin";

const groupPassports = [
  {
    qtdPessoas: "5 pessoas",
    valor: "472,15",
    installment: "12x de R$ 244,16",
    cash: "ou R$ 472,15 à vista (valor por participante)",
    desconto: "5% OFF",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
  },
  {
    qtdPessoas: "10 pessoas",
    valor: "447,30",
    installment: "12x de R$ 462,61",
    cash: "ou R$ 447,30 à vista (valor por participante)",
    desconto: "10% OFF",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
  },
];

const PassaporteGrupoHomeTeste = ({
  onBuyPassaporte,
  hideBuyButton = false,
}) => {
  return (
    <section className="pb-10 pt-0 md:pb-14 md:pt-0">
      <div className="mx-auto max-w-6xl px-4">
        <h3 className="text-center font-anton text-2xl uppercase text-white sm:text-3xl md:text-4xl">
          LEVE O SEU TIME
        </h3>
        <div className="mx-auto mt-3 max-w-4xl space-y-3 text-center font-jamjuree text-sm text-white/85 sm:text-base">
          <p>
            Trazer seu time para o DSX é um investimento direto em performance.
          </p>
          <p>
            Dois dias fora do operacional, absorvendo estratégia real de quem
            está construindo negócios em escala.
          </p>
          <p>
            Eles voltam com repertório, visão e ferramentas para gerar mais
            resultado.
          </p>
        </div>
        <p className="mt-4 text-center font-jamjuree text-base font-bold text-[#F5C02B] sm:text-lg">
          Quanto maior o grupo, maior o desconto:
        </p>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {groupPassports.map((item) => (
            <article
              key={item.qtdPessoas}
              className="relative flex w-full flex-col overflow-hidden rounded-[22px] border border-[#E7A040]/35 bg-[#161616] p-5"
            >
              <div className="relative z-10 flex h-full flex-col">
                <p className="inline-flex w-fit items-center rounded-full border border-[#F5D247]/35 bg-black/30 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-[#F5D247] sm:text-sm">
                  PASSAPORTE {item.qtdPessoas}
                </p>

                <h4 className="mt-4 font-anton text-[28px] uppercase leading-[0.95] text-white sm:text-[34px]">
                  EM GRUPO {item.desconto}
                </h4>

                <div className="mt-4 rounded-xl border border-[#6E5521] bg-black/35 p-3">
                  <p className="bg-gradient-to-r from-[#F5D247] to-[#E7A040] bg-clip-text font-jamjuree text-[26px] font-black leading-[1.05] text-transparent sm:text-[30px]">
                    {`R$ ${item.valor} à vista`}
                  </p>
                  <p className="mt-1 font-jamjuree text-[12px] font-bold uppercase tracking-[0.06em] text-[#F5D247] sm:text-[13px]">
                    (por pessoa)
                  </p>
                  <p className="mt-2 font-jamjuree text-xs font-semibold text-white/90 sm:text-sm">
                    {`ou em ${item.installment}`}
                  </p>
                </div>

                <div className="mt-auto pt-5">
                  {!hideBuyButton ? (
                    <button
                      data-cta="sympla"
                      onClick={() => {
                        const targetLink = withHublaUtm(item.link);
                        const formOrigin = `Grupo ${item.qtdPessoas}`;
                        rememberDsxFormOrigin(formOrigin);
                        if (onBuyPassaporte) {
                          onBuyPassaporte(targetLink, formOrigin);
                          return;
                        }
                        window.location.href = targetLink;
                      }}
                      className="w-full rounded-xl bg-gradient-to-r from-[#F3CB46] to-[#E7A040] px-5 py-3 text-sm font-black uppercase tracking-wide text-black sm:text-base"
                    >
                      COMPRAR AGORA
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
          <article className="relative flex w-full flex-col overflow-hidden rounded-[22px] border border-[#E7A040]/35 bg-[#161616] p-5">
            <h4 className="font-anton text-[30px] uppercase leading-[0.95] text-[#F5C02B] sm:text-[34px]">
              + DE 10 PESSOAS
            </h4>
            <p className="mt-4 font-jamjuree text-base font-bold text-white sm:text-lg">
              Condição comercial exclusiva
            </p>
            <p className="mt-3 font-jamjuree text-sm leading-relaxed text-white/85 sm:text-base">
              Fale diretamente com o nosso comercial e garanta a melhor
              condição para o seu time.
            </p>
            <div className="mt-auto pt-5">
              <a
                href="https://wa.me/5592985723838"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4B3C18] bg-black/35 px-4 py-3 font-jamjuree text-base font-bold text-white transition hover:border-[#F5C02B]/50 hover:bg-black/55 md:text-lg"
                aria-label="Falar no WhatsApp"
              >
                <img
                  src="/whatsapp.svg"
                  alt="WhatsApp"
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                  decoding="async"
                />
                (92) 98572-3838
              </a>
            </div>
          </article>
        </div>

        <p className="mt-8 text-center font-jamjuree text-sm font-semibold text-white/85 md:text-base">
          Desconto válido para o Passaporte Standard.
        </p>
      </div>
    </section>
  );
};

export default PassaporteGrupoHomeTeste;
