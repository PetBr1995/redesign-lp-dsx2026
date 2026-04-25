const DsxConsolidation = () => {
  const cardItens = [
    {
      icon: "/icon-foguete.svg",
      number: "+ 50",
      title: "Palestras",
      desc: "Grandes nomes do mercado de IA, gestão, vendas e inovação.",
    },
    {
      icon: "icone-pessoas.svg",
      number: "+ 2.000",
      title: "Participantes",
      desc: "Empresários, decisores, gestores e profissionais de alto nível.",
    },
    {
      icon: "/icone-target.svg",
      number: "+ 30",
      title: "Expositores regionais",
      desc: "Marcas que representam a força e diversidade dos negócios no Norte.",
    },
  ];

  return (
    <section
      className="
        py-12 sm:py-16 lg:py-20
        bg-black
        relative
        after:absolute
        after:content-['']:
        after:top-0
        after:left-0
        after:w-[350px]
        after:h-[220px]
        after:bg-[url('/vector-3.svg')]
        after:bg-no-repeat
        after:bg-cover
        after:bg-center
        z-10
      "
    >
      <div className="pb-12 pt-20 relative z-50 text-center uppercase text-white">
        <h3 className="font-anton font-extralight text-4xl">O DSX consolidou o Norte como referência</h3>
        <h5 className="font-jamjuree font-extralight text-3xl">em inovação e tecnologia</h5>
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-4 sm:gap-6
          "
        >
          {cardItens.map((iten) => (
            <div
              key={iten.title}
              className="
                font-roboto bg-[#111111] rounded-[10px]
                w-full
                sm:w-[calc(50%-12px)]
                lg:w-[calc(33.333%-16px)]
                max-w-[320px]
                min-h-[260px] sm:min-h-[280px]
                flex flex-col justify-start
                px-6
                pt-12 sm:pt-14
                pb-6
                relative
                border
                border-white
                text-center
                z-40
              "
            >
              {/* Ícone flutuante */}
              <div

              >
                <img
                  src={iten.icon}
                  alt="icone"
                  className="mx-auto mb-3 w-[35px]"
                />
              </div>
              <h2 className="text-[#12DB98] text-6xl font-medium font-jamjuree">
                {iten.number}
              </h2>

              <h4 className="text-xl sm:text-3xl my-3 font-light text-white uppercase">
                {iten.title}
              </h4>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DsxConsolidation;
