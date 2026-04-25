import CTAButton from "./Mascaras/CTAButton";

const SecondSection = () => {
  return (
    <section
      className="
        relative
        bg-[url('/background-banner-2.png')]
        bg-cover bg-center bg-no-repeat

        after:absolute
        after:content-['']
        after:w-[64px] sm:after:w-[80px]
        after:h-[92px] sm:after:h-[115px]
        after:bottom-0
        after:right-0
        after:bg-[url('/vector-2.svg')]
        after:bg-cover
        after:bg-center
        after:bg-no-repeat
      "
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 place-items-center gap-6 sm:gap-8 font-bebas">
          {/* Bloco logos/data */}
          <div className="text-white text-center md:text-left w-full flex flex-col items-center md:items-start">
            <img
              src="/data-dsx.svg"
              alt="data"
              className="w-[96px] sm:w-[120px] mb-2"
            />
            <img
              src="/dsx2026main.png"
              alt="logo"
              className="w-[220px] sm:w-[260px] mx-auto md:mx-0"
            />
          </div>

          {/* Bloco texto */}
          <div className="text-white text-center space-y-3 sm:space-y-4 w-full max-w-[520px]">
            <h4
              className="
                tracking-wider
                font-jamjuree
                font-extralight
                uppercase

                text-lg
                leading-snug

                sm:text-3xl
                sm:leading-snug

                md:text-4xl
                md:leading-normal
              "
            >
              O maior evento de
            </h4>

            <h2
              className="
                font-anton
                font-medium
                uppercase
                mx-auto

                text-[34px]
                leading-[1.05]

                sm:text-5xl
                sm:leading-[1.05]

                md:text-6xl
                md:leading-tight
              "
            >
              Negócios, Marketing,<br className="hidden sm:block" />
              Vendas e Inovação do norte
            </h2>

            {/* opcional: microtexto de apoio no mobile */}
            {/* <p className="font-jamjuree font-light text-sm sm:text-base opacity-90">
              Conteúdo prático, networking e oportunidades reais.
            </p> */}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <div className="w-full max-w-[340px] sm:max-w-none sm:w-auto">
            <CTAButton link="#form" titulo="Lista de espera 2026" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
