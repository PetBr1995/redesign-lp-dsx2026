import CTAButton from '../Mascaras/CTAButton'
import { motion } from "framer-motion"
import { smoothEase } from "../../utils/motion";

const HeroWhatsAppPage = () => {
  const cardItens = [
    {
      icon: "/icon-foguete.svg",
      number: "+50",
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

  return (
    <section className="py-20 relative bg-[url('/background-banner-2.png')] bg-cover bg-center
      after:bg-[url('/vector-2.svg')] after:bg-cover after:absolute after:content-['']
      after:bottom-0 after:right-0 after:w-20 after:h-[100px]
      before:absolute before:content-[''] before:top-8 before:left-10
      before:bg-[url('/vector-11.svg')] before:w-[60px] before:h-[60px] before:bg-cover"
    >
      <div
        className="
          mx-auto max-w-7xl
          flex flex-col md:flex-row items-center
          gap-8 md:gap-12 lg:gap-16
          px-4 sm:px-6 md:px-10 lg:px-16
          py-10 md:py-16
        "
      >
        {/* Logo */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.76, ease: smoothEase }}
        >
          <img
            src="/dsx-2026-logo.png"
            alt="logo"
            className="object-contain h-30 sm:h-34 md:h-50 lg:h-56 w-auto"
          />
        </motion.div>

        {/* Conteúdo */}
        <div className="flex-1 w-full">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.74, ease: smoothEase, delay: 0.08 }}
          >
            <h4
              className="
                font-anton text-white uppercase font-normal tracking-wide
                text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                leading-tight
              "
            >
              o maior evento de
              Negócios, Marketing,
              <br />
              Vendas e Inovação do norte esta de volta
            </h4>
          </motion.div>

          {/* Cards (se quiser, te ajudo a animar com Framer também 😏) */}
        </div>
      </div>
    </section>
  )
}

export default HeroWhatsAppPage
