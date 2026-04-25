import CTAButton from "../Mascaras/CTAButton";

const Palcos = () => {
  const palcos = [
    { nome: "Palco Plenária" },
    { nome: "Palco 2" },
    { nome: "Palco 3" },
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Imagem */}
        <picture>
          <source srcSet="/optimized/step1/image-palcos.avif" type="image/avif" />
          <source srcSet="/optimized/step1/image-palcos.webp" type="image/webp" />
          <img
            src="/optimized/step1/image-palcos.webp"
            alt="Palcos"
            className="mb-6 mx-auto"
            loading="lazy"
          />
        </picture>

        {/* Título */}
        <h2 className="text-white text-center font-anton uppercase text-4xl sm:text-5xl md:text-6xl leading-tight">
          Múltiplos palcos, grandes nomes
          <br className="hidden sm:block" /> e programação simultânea
        </h2>

        {/* Descrição */}
        <p className="text-white text-center font-normal mt-4 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
          Palestras, painéis e conversas estratégicas acontecendo ao mesmo
          tempo, permitindo que você escolha os conteúdos mais relevantes para o
          seu momento, negócio ou carreira
        </p>

        {/* Cards */}

        {/* 
        <div className="py-6 flex flex-wrap justify-center items-center gap-3">
          {palcos.map((palco, index) => (
            <div
              key={index}
              className="
                relative
                px-4 py-2
                w-full sm:w-auto
                min-w-[160px]
                text-center
                rounded-md
                bg-[#2B2B2B]/40

                after:absolute
                after:content-['']
                after:w-4
                after:h-4
                after:bg-cover
                after:bg-center
                after:bg-no-repeat
                after:top-2
                after:left-2
                after:opacity-60
                after:bg-[url(/vector-34.svg)]
              "
            >
              <h2 className="text-white uppercase text-sm sm:text-base">
                {palco.nome}
              </h2>
            </div>
          ))}
        </div>
                */}
        <div className="mt-8">
          <CTAButton
            titulo="quero meu passaporte"
            link="#passaportes"
          />
        </div>
      </div>
    </section>
  );
};

export default Palcos;
