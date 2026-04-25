import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { smoothEase } from "../utils/motion";

const HeroVendas2 = () => {
  const cardItens = [
    {
      iconType: "calendar",
      number: "2",
      title: "Dias de imersão",
      desc: "Dois dias intensivos de conteúdo prático e networking.",
    },
    {
      icon: "/icon-foguete.svg",
      number: "+40",
      title: "Palestras",
      desc: "Grandes nomes do mercado de IA, gestão, vendas e inovação.",
    },
    {
      icon: "/icone-pessoas.svg",
      number: "+2.000",
      title: "Participantes",
      desc: "Empresários, decisores, gestores e profissionais de alto nível.",
    },
    {
      icon: "/icone-target.svg",
      number: "+30",
      title: "Expositores regionais",
      desc: "Marcas que representam a força e diversidade dos negócios no Norte.",
    },
  ];

  const containerStagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };

  const cardAnim = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.64, ease: smoothEase },
    },
  };

  return (
    <section className="relative overflow-hidden bg-center bg-cover">
      <div className="pb-12 mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.24, margin: "0px 0px -10% 0px" }}
          className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {cardItens.map((item) => (
            <motion.div
              key={item.title}
              variants={cardAnim}
              className="rounded-xl px-4 py-4 flex flex-col justify-center items-center text-center"
            >
              <div className="flex items-center gap-3">
                <h2
                  className="font-jamjuree text-[#15803D] font-black leading-none 
                             text-3xl sm:text-4xl md:text-5xl whitespace-nowrap"
                >
                  {item.number}
                </h2>

                {item.iconType === "calendar" ? (
                  <CalendarDays className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-black" />
                ) : (
                  <img
                    src={item.icon}
                    alt=""
                    className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain brightness-0"
                  />
                )}
              </div>

              <h3
                className="mt-3 font-roboto text-black uppercase font-bold 
                           text-sm sm:text-base md:text-lg leading-snug"
              >
                {item.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroVendas2;
