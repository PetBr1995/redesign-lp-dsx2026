import CTAButton from "./Mascaras/CTAButton";
import { motion } from "framer-motion";
import { smoothEase } from "../utils/motion";

const HeroSectionV2 = () => {
    const cardItens = [
        { icon: "/icon-foguete.svg", number: "+40", title: "Palestras", desc: "Grandes nomes do mercado de IA, gestão, vendas e inovação." },
        { icon: "/icone-pessoas.svg", number: "+2.000", title: "Participantes", desc: "Empresários, decisores, gestores e profissionais de alto nível." },
        { icon: "/icone-target.svg", number: "+30", title: "Expositores regionais", desc: "Marcas que representam a força e diversidade dos negócios no Norte." },
    ];

    // 👇 Trigger único pra padronizar a seção inteira
    // Ajuste o -35%: quanto mais negativo, mais "tarde" dispara.
    const inViewOptions = {
        once: true,
        amount: 0.24,
        margin: "0px 0px -18% 0px"
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.76, ease: smoothEase } },
    };

    const containerStagger = {
        hidden: {},
        show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
    };

    const cardAnim = {
        hidden: { opacity: 0, y: 18, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.66, ease: smoothEase } },
    };

    return (
        <section
            className="py-20 relative bg-[url('/background-banner-2.png')] bg-cover bg-center overflow-hidden
        after:bg-[url('/vector-2.svg')] after:bg-cover after:absolute after:content-[''] after:bottom-0 after:right-0 after:w-20 after:h-[100px]
        before:absolute before:content-[''] before:top-8 before:left-10 before:w-[60px] before:h-[60px] before:bg-cover"
        >
            <motion.div
                className="
                    absolute top-4 left-4
                    w-20 h-20
                    bg-[url(/vector-11.svg)] bg-cover bg-no-repeat bg-center
                "
                style={{ transformOrigin: "50% 50%" }}   // 👈 centro exato
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 24,
                    ease: "linear",
                }}
            />


            <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 px-4 sm:px-6 md:px-10 lg:px-16 py-10 md:py-16">
                {/* Logo */}
                <motion.div
                    className="flex-shrink-0"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={inViewOptions}
                >
                    <picture>
                        <source srcSet="/optimized/step1/dsx-2026.avif" type="image/avif" />
                        <source srcSet="/optimized/step1/dsx-2026.webp" type="image/webp" />
                        <img
                            src="/dsx-2026.jpeg"
                            alt="logo"
                            className="object-contain h-30 sm:h-34 md:h-50 lg:h-56 w-auto"
                        />
                    </picture>
                </motion.div>

                {/* Conteúdo */}
                <div className="flex-1 w-full">
                    {/* Headline */}
                    <motion.div
                        className="text-center md:text-left"
                        variants={containerStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={inViewOptions}
                    >
                        <motion.h3
                            variants={fadeUp}
                            className="mb-3 font-jamjuree text-white uppercase font-extralight tracking-[0.22em] text-xl"
                        >
                            o maior evento de
                        </motion.h3>

                        <motion.h4
                            variants={fadeUp}
                            className="font-anton text-white uppercase font-normal tracking-wide text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
                        >
                            Negócios, Marketing,
                            <br />
                            Vendas e Inovação do norte
                        </motion.h4>

                        {/* CTA opcional com o mesmo trigger */}
                        {/* <motion.div variants={fadeUp} className="mt-8 flex justify-center md:justify-start">
              <CTAButton />
            </motion.div> */}
                    </motion.div>

                    {/* Cards */}
                    <motion.div
                        className="mt-8  flex gap-6 flex-wrap justify-center sm:justify-start"
                        variants={containerStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={inViewOptions}
                    >
                        {cardItens.map((item) => (
                            <motion.div
                                key={item.title}
                                variants={cardAnim}
                                className="w-fit flex flex-col items-center md:items-start"
                            >
                                <div className="flex items-start gap-3">
                                    <h2 className="font-jamjuree text-[#12DB98] font-medium leading-none text-4xl sm:text-5xl md:text-5xl whitespace-nowrap">
                                        {item.number}
                                    </h2>

                                    <img
                                        src={item.icon}
                                        alt=""
                                        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-8 object-contain opacity-90 mt-1"
                                    />
                                </div>

                                <h3 className="mt-2 font-roboto text-white uppercase text-center md:text-left text-sm sm:text-lg md:text-xl leading-snug">
                                    {item.title}
                                </h3>
                            </motion.div>
                        ))}
                    </motion.div>
                    <div className="flex justify-start items-center pt-8">
                        <picture>
                            <source srcSet="/optimized/step1/local-dsx-2026.avif" type="image/avif" />
                            <source srcSet="/optimized/step1/local-dsx-2026.webp" type="image/webp" />
                            <img src="/local-dsx-2026.png" alt="logo" className="h-15" />
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSectionV2;
