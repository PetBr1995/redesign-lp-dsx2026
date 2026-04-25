import {
  Armchair,
  BriefcaseBusiness,
  Building2,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

const experienceItems = [
  {
    title: "3 Palcos Simultâneos",
    description:
      "Conteúdo acontecendo ao mesmo tempo em três frentes. Você escolhe a trilha que faz mais sentido para o seu momento de negócio.",
    Icon: Building2,
  },
  {
    title: "Feira de Negócios",
    description:
      "Dezenas de expositores, produtos, serviços e soluções em um único espaço. O lugar onde negócios saem do papo e viram contrato.",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Área VIP",
    description:
      "Um ambiente exclusivo onde os palestrantes também estarão. Networking qualificado, conversas estratégicas e acesso a quem está no palco.",
    Icon: Armchair,
  },
  {
    title: "Ativação de Marcas",
    description:
      "Grandes marcas da região presentes, gerando experiências e oportunidades de negócio para quem está no evento.",
    Icon: Sparkles,
  },
  {
    title: "Praça de Alimentação",
    description:
      "Estrutura completa para você aproveitar os dois dias com conforto, sem precisar sair do evento.",
    Icon: UtensilsCrossed,
  },
];

const BusinessExperienceSection = () => {
  const firstRowItems = experienceItems.slice(0, 3);
  const secondRowItems = experienceItems.slice(3, 5);

  const renderExperienceCard = ({ title, description, Icon }) => (
    <article
      key={title}
      className="group relative overflow-hidden rounded-[18px] border border-[#8A7640]/70 p-5 md:p-6"
    >
      <div className="pointer-events-none absolute inset-[1.2px] rounded-[17px] bg-gradient-to-b from-[#181208] to-[#0F0B05]" />
      <div className="relative z-10 flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] border border-[#5E4A1E] bg-[#2A210F]">
          <Icon
            className="h-6 w-6 text-[#E8DEC4] transition-colors duration-300 group-hover:text-[#F5C02B]"
            strokeWidth={2.2}
          />
        </div>
        <div>
          <h3 className="font-anton text-[22px] uppercase leading-[1.05] text-[#F5C02B] md:text-[28px]">
            {title}
          </h3>
          <p className="mt-2 font-jamjuree text-[14px] leading-relaxed text-white md:text-[16px]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );

  return (
    <section className="relative bg-black pb-16 pt-2 md:pb-20 md:pt-3">
      <div className="pointer-events-none absolute right-0 top-12 h-52 w-52 rounded-full bg-[#F5C02B]/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-[30px] uppercase leading-[1.12] tracking-[0.01em] text-white md:text-[52px] md:leading-[1.04]">
          UMA ESTRUTURA CONSTRUÍDA PARA A MAIOR EXPERIÊNCIA EMPRESARIAL DO NORTE
        </h2>

        <p className="mx-auto mt-4 max-w-5xl text-center font-jamjuree text-[15px] leading-relaxed text-white/82 md:text-[18px]">
          O DSX 2026 não é só um evento. É um ecossistema completo pensado para
          gerar negócios, conhecimento e conexões de alto nível.
        </p>

        <div className="mt-10 space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {firstRowItems.map(renderExperienceCard)}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {secondRowItems.map(renderExperienceCard)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessExperienceSection;
