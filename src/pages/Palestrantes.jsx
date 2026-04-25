import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TimerHeaderPalestrantes from "../components/TimerHeaderPalestrantes";
import { InfoPalestrantesNacionais } from "../data/InfoPalestrantesNacionais";
import { InfoPalestrantesRegionais } from "../data/InfoPalestrantesRegionais";
import { motion } from "framer-motion";
import BotaoWP from "../components/BotaoWP";
import { smoothEase } from "../utils/motion";
import { buildBackgroundImageVars } from "../utils/imageSet";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.56, ease: smoothEase },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: smoothEase },
  },
};

const Palestrantes = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)"); // md
    const update = () => setIsDesktop(mq.matches);

    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // Desktop: whileInView | Mobile: fade no mount
  // ✅ removido margin negativo e amount menor (corrige o "não anima" entre 768–920px)
  const titleMotionProps = isDesktop
    ? {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.24, margin: "0px 0px -12% 0px" },
      }
    : {
        initial: "hidden",
        animate: "show",
      };

  const gridMotionProps = isDesktop
    ? {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.16, margin: "0px 0px -8% 0px" },
      }
    : {
        initial: "hidden",
        animate: "show",
      };

  return (
    <>
      <section className="bg-black font-bebas">
        <div className="max-w-(--largura) mx-auto">
          <Header />

          {/* Se você usa esse componente, pode manter aqui */}
          {/* <TimerHeaderPalestrantes /> */}

          {/* Título */}
          <motion.h3
            className="mt-30 md:mt-20 pt-20 text-white text-center uppercase text-4xl font-anton"
            variants={titleVariants}
            {...titleMotionProps}
          >
            Confira todos os palestrantes
          </motion.h3>

          <motion.h5
            className="pb-20 text-white font-jamjuree font-normal text-center uppercase text-3xl"
            variants={titleVariants}
            {...titleMotionProps}
          >
            que marcaram presença na edição de 2025
          </motion.h5>

          {/* Nacionais */}
          <motion.div
            className="flex gap-3 justify-center items-center flex-wrap"
            variants={containerVariants}
            {...gridMotionProps}
          >
            {InfoPalestrantesNacionais.map((inf, index) => (
              <motion.div
                key={index}
                className="w-[230px] pb-10"
                variants={itemVariants}
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    bg-modern-image
                    bg-black
                    bg-cover
                    bg-center
                    p-4
                    rounded-xl
                    shadow-lg
                    aspect-3/4
                    flex
                    flex-col
                    justify-between
                  "
                  style={buildBackgroundImageVars(inf.img)}
                >
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

                  <h4 className="relative z-10 font-bebas text-[#F5A205] text-xl text-center uppercase">
                    // {inf.nome}
                  </h4>

                  <p className="relative z-10 font-roboto font-medium text-sm mt-2 text-gray-300 text-center normal-case">
                    {inf.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Título Regionais */}
          <motion.h3
            className="pt-10 pb-10 text-center font-bebas text-4xl text-white"
            variants={titleVariants}
            {...titleMotionProps}
          >
            Regionais
          </motion.h3>

          {/* Regionais */}
          <motion.div
            className="flex gap-3 justify-center items-center flex-wrap"
            variants={containerVariants}
            {...gridMotionProps}
          >
            {InfoPalestrantesRegionais.map((inf, index) => (
              <motion.div
                key={index}
                className="w-[230px] pb-10"
                variants={itemVariants}
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    bg-modern-image
                    bg-black
                    bg-cover
                    bg-center
                    p-4
                    rounded-xl
                    shadow-lg
                    aspect-3/4
                    flex
                    flex-col
                    justify-between
                  "
                  style={buildBackgroundImageVars(inf.img)}
                >
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

                  <h4 className="relative z-10 font-bebas text-[#F5A205] text-xl text-center uppercase">
                    // {inf.nome}
                  </h4>

                  <p className="relative z-10 font-roboto font-medium text-sm mt-2 text-gray-300 text-center normal-case">
                    {inf.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Palestrantes;
