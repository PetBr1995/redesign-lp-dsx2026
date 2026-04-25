import HeaderMask from "../Mascaras/HeaderMask"
import MainMask from "../Mascaras/MainMask"

const CallToActionVendas = () => {
  return (
    <section
      className="
        relative w-full

        bg-[url('/optimized/step1/BannerCallToActionVendas.webp')]
        bg-cover bg-no-repeat
        bg-[center_top]
        sm:bg-center

        sm:min-h-[100svh]

        before:content-['']
        before:absolute before:inset-0
        before:bg-black before:opacity-[0.82]
        before:z-10

        after:content-['']
        after:absolute after:bottom-0 after:right-0
        after:w-[160px] after:h-[120px]
        sm:after:w-[220px] sm:after:h-[160px]
        lg:after:w-110 lg:after:h-80
        after:bg-[url('/vector-37.svg')]
        after:bg-cover after:bg-center after:bg-no-repeat
        after:z-10
      "
    >
      <div
        className="
          relative z-20
          flex flex-col justify-center items-start
          max-w-7xl mx-auto
          px-5 sm:px-6 lg:px-8
          py-10 sm:py-12
          sm:min-h-[100svh]
        "
      >
        <h2
          className="
            text-3xl sm:text-5xl lg:text-6xl
            leading-tight lg:leading-[1.05]
            text-white font-anton uppercase
            max-w-xl sm:max-w-2xl lg:max-w-3xl
          "
        >
          <span className="text-[#F5D247]">Feira de Negócios:</span>{" "}
          conexões que viram oportunidades
        </h2>

        <p
          className="
            mt-4 sm:mt-6
            text-base sm:text-lg lg:text-xl
            leading-relaxed
            text-white font-medium
            max-w-md sm:max-w-xl lg:max-w-2xl
          "
        >
          Com a circulação de mais de 2.000 visitantes, a feira cria oportunidades
          de troca e geração de negócios durante os dois dias de evento.
        </p>

        <div className="mt-6 sm:mt-8">
          <HeaderMask link="/patrocinador" textColor="#ffffff" titulo="Seja patrocinador" font="bolder" />
        </div>
      </div>
    </section>
  )
}

export default CallToActionVendas

