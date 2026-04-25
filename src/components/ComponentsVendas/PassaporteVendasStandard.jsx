import { useNavigate } from "react-router-dom";
import { withHublaUtm } from "../../utils/hublaUtm";
import FaixaLote from "./FaixaLote";

const PassaporteVendasStandard = () => {
  const infPrice = [
    {
      nome: "VIP",
      price: "xxxx",
      parcelas: "xx,xx",
      borderColor: "#79E3A3",
      gradientColor: "#242424",
      textColor: "#6DCC96",
      iconSide: "left",
      iconCard: "/vector-31.svg",
    },
    {
      nome: "STANDARD",
      price: "297,00",
      parcelas: "xx,xx",
      borderColor: "#E46142",
      gradientColor: "#797979",
      textColor: "#DA4068",
      iconSide: "right",
      iconCard: "/vector-32.svg",
    },
  ];

  const vantagens = [
    {
      vip: true,
      standard: true,
      titulo: "ACESSO AOS 2 DIAS",
      desc: "Viva a experiência completa",
    },
    {
      vip: true,
      standard: true,
      titulo: "+40 PALESTRAS",
      desc: "Acesso integral ao conteúdo dos palcos",
    },
    {
      vip: true,
      standard: true,
      titulo: "ACESSO A FEIRA DE NEGÓCIOS",
      desc: "Foco em gerar novas oportunidades de negócio.",
    },
    {
      vip: true,
      standard: true,
      titulo: "OPORTUNIDADE DE NETWORKING",
      desc: "Ambiente estratégico de networking.",
    },
    {
      vip: true,
      standard: false,
      titulo: "ACESSO AO LOUNGE VIP",
      desc: "LOREN IPSUN LOREN IPSUN",
    },
    {
      vip: true,
      standard: false,
      titulo: "ACESSO AO FOOD STATION",
      desc: "LOREN IPSUN LOREN IPSUN",
    },
    {
      vip: true,
      standard: false,
      titulo: "CERTIFICADO DE PARTICIPAÇÃO",
      desc: "LOREN IPSUN LOREN IPSUN",
    },
    {
      vip: true,
      standard: false,
      titulo: "PRIMEIRAS FILEIRAS",
      desc: "LOREN IPSUN LOREN IPSUN",
    },
  ];

  // ✅ 1) Só o card STANDARD
  const standardCards = infPrice.filter((card) => card.nome === "STANDARD");

  // ✅ 2) Só vantagens que o STANDARD tem (remove as VIP-only)
  const standardVantagens = vantagens.filter((v) => v.standard);

  const navigate = useNavigate();

  return (
    <section className="py-8 relative overflow-hidden ">
      <div className="mx-auto px-4 relative z-20">
        <h2 className="font-anton uppercase text-white text-center text-3xl">
          Esteja onde os grandes nomes decidem o futuro dos negócios.
        </h2>

        <p className="text-white uppercase font-extralight text-center text-xl mt-4">
          Sua experiência começa aqui
        </p>
        <FaixaLote/>
        {/* Grid simples */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl mx-auto">
          {standardCards.map((card) => (
            <div
              key={card.nome}
              style={{
                "--bgColor": card.borderColor,
                "--gradientColor": card.gradientColor,
                "--textColor": card.textColor,
                "--icon": `url(${card.iconCard})`,
              }}
              className="
                  w-full rounded-2xl bg-gradient-to-b from-[var(--bgColor)] to-[var(--gradientColor)]
                  sm:col-span-2 sm:max-w-[520px] sm:mx-auto
                "
            >
              <div
                className={`relative bg-black rounded-2xl m-px overflow-hidden
                    after:content-['']
                    after:absolute
                    after:top-0
                    after:w-24
                    after:h-24
                    after:opacity-80
                    after:bg-[image:var(--icon)]
                    after:bg-no-repeat
                    after:bg-contain
                    after:bg-center
                    after:z-0
                    ${card.iconSide === "left" ? "after:left-0" : "after:right-0"}
                  `}
              >
                <h2 className="relative z-10 text-white text-5xl sm:text-6xl text-center uppercase pt-6 font-anton">
                  {card.nome}
                </h2>

                <div className="flex justify-center mt-5">
                  <span className="bg-black/25 border border-white text-white text-sm font-bold uppercase px-4 py-1 rounded-xl">
                    1° lote
                  </span>
                </div>

                <div className="relative z-10 mx-6 sm:mx-10">
                  <p
                    className="font-extrabold text-center uppercase my-4 text-6xl"
                    style={{ color: card.textColor }}
                  >
                    {`R$ ${card.price} à vista`}
                  </p>
                  <p className="text-white text-sm">
                    {`ou em 12x de R$ ${card.parcelas}`}
                  </p>
                  {/* 
                    <p className="text-white text-sm">
                      12x de {card.parcelas}
                    </p>
                      */}

                  <button
                    onClick={() =>
                      (window.location.href = withHublaUtm("https://hub.la/r/EREq9bO1fsVKl6sG7Axo"))
                    }
                    className="cursor-pointer uppercase bg-gradient-to-r from-[#F3CB46] to-[#E7A240] p-3 w-full mt-6 rounded-2xl font-bold"
                  >COMPRAR AGORA</button>
                </div>

                {/* ✅ Vantagens: só STANDARD (sem itens VIP e sem "X") */}
                <div className="mt-10 relative">
                  {standardVantagens.map((vantagem, index) => (
                    <div
                      key={`standard-vant-${index}`}
                      className="
                          mb-[1px] p-3
                          odd:bg-gradient-to-r odd:from-[#090909]/60 odd:via-[#525151]/60 odd:to-[#464646]/60
                          even:bg-gradient-to-r even:from-[#090909]/60 even:via-[#1C1C1C]/60 even:to-[#222222]/60
                          flex items-center justify-between gap-3
                        "
                    >
                      <div className="text-left">
                        <h3 className="text-white uppercase font-extrabold text-sm">
                          {vantagem.titulo}
                        </h3>
                        {/* 
                        <p className="text-white/90 tex font-normal text-sm mt-2">
                          {vantagem.desc}
                        </p>
                        */}
                      </div>

                      <img
                        src="/checkPassaport.svg"
                        alt="Disponível"
                        className="w-7 h-7 shrink-0"
                      />
                    </div>
                  ))}
                </div>

                <div className="h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassaporteVendasStandard;
