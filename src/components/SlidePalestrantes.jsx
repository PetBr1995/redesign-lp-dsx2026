import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";

import { InfoPalestrantes } from "../data/InfoPalestrantes";
import CTAButton from "./Mascaras/CTAButton";
import { smoothEase } from "../utils/motion";
import { buildBackgroundImageVars } from "../utils/imageSet";

const SlidePalestrantes = () => {
  // Trigger: controla o “ponto” do scroll em que a seção anima
  const inViewOptions = {
    once: true,
    amount: 0.24,
    margin: "0px 0px -18% 0px",
  };

  // Animação simples de entrada
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: smoothEase } },
  };

  // Stagger apenas para os blocos (título, subtítulo, slider, botão)
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
      {/* Fundo preto com clip-path criando a aba/ponta preta à direita */}
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

      {/* Conteúdo por cima (com animação de entrada da seção) */}
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
          Confira todos os palestrantes
        </motion.h3>

        <motion.h4
          variants={fadeUp}
          className="font-jamjuree font-normal text-center uppercase text-3xl"
        >
          que marcaram presença na edição de 2025
        </motion.h4>

        <motion.div variants={fadeUp} className="my-10 max-w-7xl mx-auto px-4">
          <Swiper
            spaceBetween={16}
            slidesPerView="auto"
            loop={false}
            grabCursor={true}
            className="cursor-grab active:cursor-grabbing"
          >
            {InfoPalestrantes.map((inf, index) => (
              <SwiperSlide key={index} className="!w-[230px]">
                <div
                  className="bg-modern-image relative overflow-hidden bg-black bg-cover bg-center p-4 rounded-xl shadow-lg h-80 flex flex-col justify-between"
                  style={buildBackgroundImageVars(inf.img)}
                >
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
                  <h4 className="relative z-10 font-bebas text-[#F5A205] text-xl text-center uppercase">
                    {inf.nome}
                  </h4>
                  <p className="relative z-10 font-roboto font-medium text-sm text-gray-300 text-center">
                    {inf.desc}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div variants={fadeUp} className="flex justify-center items-center">
          <CTAButton titulo="Ver todos" link="/palestrantes" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SlidePalestrantes;
