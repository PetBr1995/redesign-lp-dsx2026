import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const InfoAmbientes = [
    {
        img: "optimized/step1/img-ambiantes/amb-1.webp",
    },
    {
        img: "optimized/step1/img-ambiantes/amb-2.webp",
    },
    {
        img: "optimized/step1/img-ambiantes/amb-3.webp",
    },
    {
        img: "optimized/step1/img-ambiantes/amb-4.webp",
    },
    {
        img: "optimized/step1/img-ambiantes/amb-5.webp",
    },
    {
        img: "optimized/step1/img-ambiantes/amb-6.webp",
    },
    {
        img: "optimized/step1/img-ambiantes/amb-7.webp",
    },
];

const AmbientesPatrocinadores = () => {
    return (
        <section className="relative bg-black text-white overflow-hidden after:absolute after:content-[''] after:bottom-0 after:right-0  after:w-70 after:h-70 after:bg-[url(/vector-25.svg)] after:bg-cover after:bg-center after:bg-no-repeat">
            <div className="relative z-10 pt-10 pb-20">
                <h2 className="text-center font-anton uppercase text-4xl leading-tight">
                    O AMBIENTE QUE COLOCA SUA MARCA EM EVIDÊNCIA
                </h2>

                <p className="mt-3 text-center font-jamjuree font-extralight text-lg text-white/80 max-w-3xl mx-auto px-4">
                    Amplie sua presença, atraia leads qualificados e escolha o espaço que reforça o seu posicionamento
                </p>

                <div className="relative my-12 max-w-7xl mx-auto px-4">
                    {/* Botões de navegação (iguais ao teu) */}
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-20 hidden md:flex">
                        <button
                            className="
      swiper-amb-prev
      w-8 h-8 rounded-xl
      bg-[#232323] text-white
      grid place-items-center
      cursor-pointer
      rounded-r-none
      border-r border-white/10
    "
                            aria-label="Anterior"
                        >
                            ‹
                        </button>

                        <button
                            className="
      swiper-amb-next
      w-8 h-8 rounded-xl
      bg-[#232323] text-white
      grid place-items-center
      cursor-pointer
      rounded-l-none
    "
                            aria-label="Próximo"
                        >
                            ›
                        </button>
                    </div>


                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: ".swiper-amb-prev",
                            nextEl: ".swiper-amb-next",
                        }}
                        spaceBetween={16}
                        slidesPerView="auto"
                        grabCursor={true}
                        className="cursor-grab active:cursor-grabbing"
                    >
                        {InfoAmbientes.map((item, index) => (
                            <SwiperSlide key={index} className="!w-[260px]">
                                <div className="rounded-xl overflow-hidden bg-[#111] shadow-lg flex flex-col">
                                    {/* Imagem */}
                                    <div
                                        className="h-[220px] bg-cover bg-center"
                                        style={{ backgroundImage: `url(${item.img})` }}
                                    />

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default AmbientesPatrocinadores;
