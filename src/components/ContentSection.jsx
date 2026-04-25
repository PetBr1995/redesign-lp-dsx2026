import { motion } from 'framer-motion'
import CTAButton from './Mascaras/CTAButton'
import { smoothEase } from "../utils/motion";

const ContentSection = () => {
  const cardInfo = [
    {
      icon: '/vector-14.svg',
      cartTitle: 'Vendas',
      cardDesc:
        'Como atrair, negociar e fechar contratos maiores, construindo um modelo de receita previsível.',
    },
    {
      icon: '/vector-15.svg',
      cartTitle: 'Marketing & Performance',
      cardDesc:
        'Domine tráfego pago, funis de venda, criativos que convertem e estratégias de automação.',
    },
    {
      icon: '/vector-9.svg',
      cartTitle: 'Posicionamento e Branding',
      cardDesc:
        'Construa autoridade, seja referência na sua área e destaque sua marca no mercado.',
    },
    {
      icon: '/vector-16.svg',
      cartTitle: 'Ferramentas de Crescimento',
      cardDesc:
        'Aprenda com especialistas as estratégias e tecnologias que geram escala real.',
    },
    {
      icon: '/vector-5.svg',
      cartTitle: 'Inteligência Artificial',
      cardDesc: 'Como vantagem estratégica para otimizar criativos em escala, elevar a produtividade, conectar funis e automações com decisões orientadas por dados.',
    },
    {
      icon: '/vector-17.svg',
      cartTitle: 'Gestão Comercial',
      cardDesc: 'Otimize seu processo de vendas, use bem seu CRM e escale sua operação.',
    },
  ]

  return (
    <section className="relative py-0 md:py-20 overflow-hidden">
      {/* Background decorativo */}
      <div className="pointer-events-none absolute top-0 left-0 h-40 w-60 bg-[url('/vector-3.svg')] bg-cover bg-no-repeat bg-center" />

      {/* Título */}
      <div className="relative z-10 text-center uppercase text-white px-4">
        <h3 className="pt-5 font-bebas text-4xl sm:text-5xl">
          Os conteúdos que marcaram o DSX 2025
        </h3>
        <h5 className="font-extralight text-2xl sm:text-3xl">
          e destravaram novos resultados
        </h5>
      </div>

      {/* Cards com zig-zag irregular */}
      <div className="mx-auto my-0 md:my-12 w-full max-w-[1100px] px-4">
        <div className="relative min-h-[800px] md:min-h-[600px] flex flex-col justify-center items-center">
          {cardInfo.map((inf, index) => {
            // Posicionamento absoluto irregular inspirado na imagem
            const positions = [
              { left: 'md:left-[20%]', top: 'md:top-[-10%]' },        // Vendas - topo esquerda
              { left: 'md:left-[5%]', top: 'md:top-[23%]' },       // Marketing - esquerda meio
              { left: 'md:left-[50%]', top: 'md:top-[10%]' },      // Posicionamento - centro-direita topo
              { left: 'md:left-[46%]', top: 'md:top-[45%]' },      // Ferramentas - centro
              { left: 'md:left-[10%]', top: 'md:top-[63%]' },       // Planejamento - esquerda baixo
              { left: 'md:left-[35%]', top: 'md:top-[90%]' },      // Gestão - direita baixo
            ]

            return (
              <motion.div
                key={inf.cartTitle}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.24, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.62, ease: smoothEase }}
                className={`
                  flex items-center gap-4
                  py-6 px-6 sm:px-8
                  mb-6 md:mb-0
                  md:absolute
                  ${positions[index].left}
                  ${positions[index].top}
                  max-w-[450px]
                `}
              >
                {/* Ícone */}
                <img
                  src={inf.icon}
                  alt={inf.cartTitle}
                  className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20"
                  draggable={false}
                />

                {/* Conteúdo */}
                <div className="w-full max-w-[350px] text-left">
                  <h4 className="py-2 font-medium text-2xl sm:text-3xl text-[#F5A205]">
                    {inf.cartTitle}
                  </h4>

                  <p className="text-white/90 leading-relaxed">
                    {inf.cardDesc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* CTA opcional */}
      {/*
      <div className="mt-8 flex justify-center px-4">
        <CTAButton titulo="Lista de espera 2026" link="#form" />
      </div>
      */}
    </section>
  )
}

export default ContentSection
