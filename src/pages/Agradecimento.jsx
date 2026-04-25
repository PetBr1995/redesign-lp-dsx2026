import { motion } from "framer-motion";
import { smoothEase } from "../utils/motion";

const titleVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: smoothEase },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: smoothEase, delay: 0.12 },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.72, ease: smoothEase },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase, delay: 0.15 },
  },
};

const Agradecimento = () => {
  return (
    <section
      className="
        relative
        min-h-screen
        bg-black
        pb-[120px]
        flex
        flex-col
        bg-[url('/background-banner-2.png')]
        bg-cover
        bg-center
        bg-no-repeat
        overflow-hidden
      "
    >
      {/* CONTEÚDO CENTRALIZADO */}
      <div className="flex-1 flex items-center relative">
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">

          {/* DECORAÇÃO SUPERIOR (antes ::after) */}
          <motion.div
            className="
              absolute
              -top-10
              right-10
              w-[100px]
              h-[100px]
              bg-[url('/vector-8.svg')]
              bg-cover
              bg-center
              bg-no-repeat
              pointer-events-none
              z-10
            "
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear",
            }}
          />

          {/* DECORAÇÃO INFERIOR (antes ::before) */}
          <motion.div
            className="
              absolute
              -bottom-40
              left-0
              w-[80px]
              h-[80px]
              bg-[url('/vector-5.svg')]
              bg-cover
              bg-center
              bg-no-repeat
              pointer-events-none
              z-10
            "
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "linear",
            }}
          />

          <a href="/#home">
            <motion.img
              src="/DSX-logo-palestrantes.png"
              alt="logo"
              className="mx-auto w-[80px] relative z-20"
              variants={logoVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            />
          </a>

          <motion.h2
            className="relative z-20 mt-12 sm:mt-16 font-bebas text-4xl sm:text-6xl md:text-7xl text-white leading-tight"
            variants={titleVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <span className="text-[#F5A205]">Obrigado!</span>{" "}
            Recebemos seu interesse em participar do DSX 2026
          </motion.h2>

          <motion.p
            className="relative z-20 mt-4 sm:mt-6 text-white font-roboto uppercase text-lg sm:text-2xl md:text-3xl font-extralight"
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            Em breve, nossa equipe vai entrar em contato com você.
          </motion.p>
        </div>
      </div>

      {/* FOOTER FIXO */}
      <motion.footer
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-20
          py-6
          bg-[#111111]
          bg-no-repeat
          bg-bottom-right
          bg-[url('/Ellipse-background.png')]
          bg-size-[240px]
          md:bg-size-[320px]
        "
        variants={footerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="/vemai-dsx.png"
            alt="Vem aí DSX"
            className="w-[60%] max-w-[260px] md:w-[40%]"
          />

          <img
            src="/powered-digital-hub.png"
            alt="Powered by Digital Hub"
            className="w-[60%] max-w-[260px] md:w-[40%]"
          />
        </div>
      </motion.footer>
    </section>
  );
};

export default Agradecimento;
