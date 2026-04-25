import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { InfoNovosPalestrantes } from "../data/InfoNovosPalestrantes";
import CTAButton from "./Mascaras/CTAButton";
import { smoothEase } from "../utils/motion";
import { buildBackgroundImageVars } from "../utils/imageSet";

const SlideNovosPalestrantes = ({ ctaLink = "/vendas" }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    if (!swiperRef?.autoplay) return;
    swiperRef.autoplay.start();
  }, [swiperRef]);

  const inViewOptions = {
    once: true,
    amount: 0.24,
    margin: "0px 0px -18% 0px",
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: smoothEase } },
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-black"
        style={{
          "--shift": "clamp(60px, 14vw, 260px)",
          "--bottom": "clamp(18px, 3.5vw, 56px)",
          "--kink": "clamp(16px, 2.5vw, 48px)",
          clipPath: `
            polygon(
              100% calc(100% - var(--bottom)),
              calc(40% - var(--shift)) calc(100% - var(--bottom)),
              calc(39% - (var(--shift) + var(--kink))) 100%,
              0 100%,
              0 0,
              100% 0
            )
          `,
        }}
      />

      <motion.div
        className="relative z-10 text-white pt-10 pb-20"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={inViewOptions}
      >
        <motion.h3
          variants={fadeUp}
          className="text-center uppercase text-4xl font-anton"
        >
          Os principais nomes do mercado nos palcos do DSX 2026
        </motion.h3>

        <motion.h5
          variants={fadeUp}
          className="font-jamjuree font-normal text-center uppercase text-3xl"
        >
          Aprenda com quem transforma decisões em resultados
        </motion.h5>

        <motion.div variants={fadeUp} className="my-10 max-w-7xl mx-auto px-4">
          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView="auto"
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              grabCursor={true}
              touchStartPreventDefault={false}
              className="cursor-grab active:cursor-grabbing"
              onSwiper={setSwiperRef}
            >
              {InfoNovosPalestrantes.map((inf, index) => (
                <SwiperSlide key={index} className="!w-[78vw] max-w-[260px] sm:!w-[230px]">
                  <div
                    className="bg-modern-image relative overflow-hidden bg-black bg-cover bg-top pb-4 px-4 rounded-xl shadow-lg h-80 flex flex-col justify-end"
                    style={{
                      ...buildBackgroundImageVars(inf.img),
                      backgroundSize: inf.bgSize,
                      backgroundPosition: inf.bgPosition,
                    }}
                  >
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />
                    <div className="flex flex-col justify-start items-center h-18">
                      <h4 className="relative z-50 font-bebas text-[#F5A205] text-3xl text-center uppercase">
                        {inf.nome}
                      </h4>
                      <p className="relative z-40 font-roboto font-medium text-sm text-white text-center">
                        {inf.desc}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              type="button"
              onClick={() => swiperRef?.slidePrev()}
              aria-label="Slide anterior de palestrantes"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/35 p-1.5 text-[#F5A205] backdrop-blur-[2px] transition hover:scale-110 hover:bg-black/50 hover:text-[#D98A00] md:left-3"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.4} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef?.slideNext()}
              aria-label="Próximo slide de palestrantes"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/35 p-1.5 text-[#F5A205] backdrop-blur-[2px] transition hover:scale-110 hover:bg-black/50 hover:text-[#D98A00] md:right-3"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.4} />
            </button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex justify-center items-center">
          <CTAButton titulo="Compre agora" link={ctaLink} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SlideNovosPalestrantes;
