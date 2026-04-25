import { motion } from "framer-motion";
import CTAButton from "../Mascaras/CTAButton";
import Timer from "../Timer";
import { smoothEase } from "../../utils/motion";

const NewTimerHeaderHomeTeste = ({
  isVisible,
  headerText = "O evento começa em:",
  ctaTitle = "3º lote disponível",
  ctaLink = "#passaportes",
  targetDate = "2026-07-23T00:00:00",
}) => {
  return (
    <motion.div
      initial={false}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.35, ease: smoothEase }}
      className="
      fixed bottom-0 left-0 right-0
      z-[120]
      bg-white
      shadow-[0_-8px_30px_rgba(0,0,0,0.2)]
      px-3 py-3
      pb-[calc(env(safe-area-inset-bottom)+12px)]
      overflow-hidden
    
      after:absolute
      after:content-['']
      after:hidden
      sm:after:block
      after:-bottom-7
      after:right-0
      after:w-[100px]
      after:h-[100px]
      after:bg-[url('/vector-1.svg')]
      after:bg-no-repeat
      after:bg-contain
      after:z-[1]
    "
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <motion.div
        initial={false}
        animate={isVisible ? { y: 0 } : { y: 18 }}
        transition={{ duration: 0.45, ease: smoothEase }}
        className="
          mx-auto
          max-w-6xl
          flex flex-col
          items-center justify-center
          gap-2

          sm:flex-row
          sm:gap-4
        "
      >
        {/* Esquerda: texto */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          {/* 
          <MainMask
            titulo="O evento começa em: "
            backgroundColor="#F2F2F2"
            textColor="#000000"
            link="/vendas"
            target="_blank"
          />
           */}
          <h2 className="uppercase font-black font-jamjuree  px-3 ">
            {headerText}
          </h2>
        </div>

        {/* Meio: timer */}
        {/*
        <div className="w-full sm:w-auto flex justify-center">
          <Timer targetDate={targetDate} className="scale-90 sm:scale-100" />
        </div>
          */}
        <div className="relative z-20">
          <CTAButton titulo={ctaTitle} link={ctaLink} />
        </div>
        {/* Direita: CTA */}
        {/*
        <div className="relative z-50 w-full sm:w-auto flex justify-center sm:justify-end">
          <CTAButton titulo="Lista de espera 2026" link="/#form" />
        </div>
        */}
      </motion.div>
    </motion.div>
  );
};

export default NewTimerHeaderHomeTeste;


