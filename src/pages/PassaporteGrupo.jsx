const PassaporteGrupo = () => {
  const inf = [
    {
      qtdPessoas: "5",
      valor: "377,15",
      valorParcela: "xx,xx",
      icon: "/vector-5.svg",
      porCentoOff: "5% OFF",
      link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721",
    },
    {
      qtdPessoas: "10",
      valor: "357,30",
      valorParcela: "xx,xx",
      icon: "/vector-9.svg",
      porCentoOff: "10% OFF",
      link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721",
    },
  ];
  return (
    <section className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-4 py-8 sm:gap-4">
      {inf.map((item, index) => (
        <div
          key={index}
          className="
              relative w-full max-w-[350px] rounded-3xl p-px
              bg-linear-to-b from-[#F5D247] to-[#797979]
              overflow-hidden
            "
        >
          {/* fundo decorativo (continua no wrapper) */}
          <div
            className="
                absolute top-0 right-0 z-0
                bg-[url('/fundo-passaporte.svg')]
                bg-center bg-no-repeat bg-cover
                w-[200px] h-[80px]
                z-20
              "
          />

          {/* Conteúdo */}
          <div
            style={{ "--icon": `url('${item.icon}')` }}
            className="
                relative z-10 h-full w-full rounded-3xl bg-[#111111] px-6 py-3 sm:px-10
  
                before:absolute before:content-['']
                before:-top-10 before:-right-10
                before:bg-no-repeat before:bg-cover before:bg-center
                before:bg-[image:var(--icon)]
                before:w-[130px] before:h-[130px]
                before:z-10
              "
          >
            <p className="text-white font-extralight uppercase">Em grupo</p>

            {/* Agora esse texto fica por cima do ícone sem falhar. */}
            <h2 className="relative z-20 font-anton text-4xl uppercase text-white sm:text-5xl md:text-6xl">
              {item.qtdPessoas} pessoas
            </h2>

            <div className="mt-6 relative z-20">
              <div className="flex justify-center items-center">
                <p className="w-[60%] rounded-xl border border-white p-1 text-center text-xs font-extralight uppercase text-white sm:w-[50%] sm:text-sm">
                  {item.porCentoOff}
                </p>
              </div>

              <h2 className="mt-4 bg-gradient-to-r from-[#F2C845] to-[#E7A440] bg-clip-text text-4xl font-extrabold uppercase text-transparent sm:text-5xl">
                R$ {item.valor}
              </h2>

              <p className="text-white uppercase">Por pessoa</p>

              <button
                onClick={() => {
                  window.location.href = item.link;
                }}
                className="w-full p-2 rounded-xl my-8 cursor-pointer font-bold uppercase bg-linear-to-r from-[#F3CB46] to-[#E7A240]"
              >
                Comprar agora
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PassaporteGrupo;
