const BigNumber = () => {
  const inf = [
    {
      number: "+2.000",
      titulo: "participantes",
      desc: "Empresários, líderes, gestores e profissionais da área",
    },
    {
      number: "+50",
      titulo: "palestrantes",
      desc: "Entre especialistas, líderes e referências de mercado",
    },
    {
      number: "+30",
      titulo: "expositores",
      desc: "Reunindo marcas, soluções e conexões",
    },
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-anton uppercase text-2xl sm:text-3xl md:text-4xl leading-tight">
          Se a 1ª edição consolidou o DSX como referência,
        </h2>

        <p className="mt-2 text-base sm:text-lg">
          a 2ª edição amplia a experiência em todos os níveis:
        </p>
      </div>

      <div
        className="
            overflow-hidden bg-white relative mt-6
            after:absolute after:content-[''] after:bottom-0 after:right-0
            after:object-none md:after:bg-[url(/vector-big-numbers.svg)] after:bg-no-repeat after:bg-contain after:bg-right-bottom


            after:w-120 after:h-90 after:opacity-45
          "
      >
        {/* Conteúdo acima do after */}
        <div
          className="
              relative z-10
              max-w-7xl mx-auto
              px-4 py-10
              grid grid-cols-1 md:grid-cols-3
              gap-8 md:gap-6
            "
        >
          {inf.map((item, idx) => (
            <div key={idx} className="text-center">
              <h2 className="font-roboto font-extrabold uppercase text-5xl sm:text-6xl md:text-7xl leading-none">
                {item.number}
              </h2>

              <h4 className="mt-2 font-medium  uppercase tracking-widest text-2xl">
                {item.titulo}
              </h4>

              <p className="text-slate-700 font-roboto font-extrabold mt-2 text-md max-w-xs mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BigNumber;
