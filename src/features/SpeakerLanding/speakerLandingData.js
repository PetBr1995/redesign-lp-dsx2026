const DEFAULT_EVENT = {
  name: "DSX 2026",
  date: "23 e 24 de julho",
  city: "Manaus",
  startDateIso: "2026-07-23T09:00:00-04:00",
};

const SYMPLA_CHECKOUT_URL =
  "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721";

const stripAccents = (value = "") =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export const toSegmentSlug = (value = "") =>
  stripAccents(value)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeSegmentLookup = (value = "") =>
  toSegmentSlug(
    String(value || "")
      .replace(/\//g, " ")
      .trim(),
  );

const segmentLandingList = [
  {
    name: "Marketing",
    image: "/optimized/step1/BannerCallToActionVendas.webp",
    category: "Segmento Estratégico",
    headline:
      "Pare de tratar o seu tráfego como aposta. No DSX, o marketing é ciência de dados e lucro",
    subtitle:
      "O ambiente presencial onde empresários e gestores dominam a aquisição de clientes com previsibilidade e escala",
    hook: "Em 2 dias, você terá o direcionamento estratégico para eliminar o desperdício de verba e construir um sistema de vendas que não depende da sorte, mas de método.",
    about:
      "Você investe em social media, design e tráfego todo mês, mas não sabe exatamente o que está funcionando e o que está queimando dinheiro?",
    topics: [
      "Como construir posicionamento e autoridade de marca em mercados saturados — sem depender de impulsionamento toda semana",
      "Estratégias de tráfego pago, funis de venda e criativos de alta conversão que realmente escalam",
      "O que os maiores times criativos do Brasil estão fazendo agora para transformar conteúdo em venda",
      "Como usar inteligência artificial para produzir mais, gastar menos e tomar decisões baseadas em dados",
      "Ferramentas e táticas modernas que geram escala — sem precisar adivinhar o que funciona",
      "Network com outros profissionais e acesso direto a palestrantes que estão no centro do mercado nacional",
    ],
    painPoints: [
      "Você investe em anúncios todo mês mas no final não sabe se lucrou ou só movimentou dinheiro.",
      "O custo para conseguir um novo cliente sobe todo mês e você não sabe por quê.",
      "Cada campanha parece um teste novo — nunca um sistema replicável.",
      "Você depende de agências que entregam relatórios, mas não entregam clientes.",
      "Seu conteúdo gera alcance, mas não gera caixa.",
    ],
    transitionLine:
      "Marketing sem método não tem escala. No DSX você aprende a construir a máquina, não só apertar o botão.",
    outcomesHeadline: "O que você vai encontrar no DSX:",
    outcomes: [
      "Como construir posicionamento e autoridade de marca em mercados saturados — sem depender de impulsionamento toda semana",
      "Estratégias de tráfego pago, funis de venda e criativos de alta conversão que realmente escalam",
      "O que os maiores times criativos do Brasil estão fazendo agora para transformar conteúdo em venda",
      "Como usar inteligência artificial para produzir mais, gastar menos e tomar decisões baseadas em dados",
      "Ferramentas e táticas modernas que geram escala — sem precisar adivinhar o que funciona",
      "Network com outros profissionais e acesso direto a palestrantes que estão no centro do mercado nacional",
    ],
    speakersHeadline: "PALESTRANTES CONFIRMADOS NO DSX 2026",
    segmentSpeakers: [
      {
        name: "Fernando Miranda",
        image: "/novas-palestrantes/Fernando-Miranda.png",
        bio: "Liderou o crescimento de uma operação de educação em 40 vezes. Especialista em Growth e Ciência de Marketing, focado em transformar dados em faturamento bruto",
      },
      {
        name: "Roberto Reis",
        image: "/novas-palestrantes/Roberto-Reis.png",
        bio: "Estrategista de Liderança e Performance. Mentor de mais de 1.200 líderes, especialista em comunicação de impacto que converte atenção em decisão.",
      },
      {
        name: "Carolina Lima",
        image: "/foto-carolina-lima.png",
        bio: "+17 anos de experiência em mídias sociais, une visão estratégica e criativa, com formação multidisciplinar e atuação empreendedora no e-commerce.",
      },
      {
        name: "João Branco",
        image: "/foto-joao-branco.png",
        bio: "O CMO responsável pelo 'Méqui'. Transformou a maior rede de fast-food do mundo no Brasil, batendo todos os recordes de vendas através de marca e performance integradas",
      },
      {
        name: "Giullya Becker",
        image: "/novas-palestrantes/GIULLYA-BECKER.png",
        bio: "Criadora do Método dos Conteúdos Magnéticos. Pioneira em oficinas práticas de criação, já formou milhares de alunos e se consolidou como referência em conteúdos que geram conexão e vendas com presença no digital.",
      },
      {
        name: "Fernan Bravo",
        image: "/palestrantes/ErickFernandes.png",
        bio: "Consultor de posicionamento, apresentador de TV, host do PodRolar, maior podcast do Norte do Brasil, e Head de Comunicação do Grupo Digital Comunicação. Especialista em transformar autoridade em audiência e audiência em resultado.",
      },
      {
        name: "Rafael Liporace",
        image: "/optimized/step1/Rafael_liporace.PNG",
        bio: "CEO da Tardezinha. O mentor por trás da maior turnê da história da música brasileira. Expert em economia criativa e em transformar eventos em ativos de milhões.",
      },
    ],
    socialProofHeadline:
      "Quem aplicou o método DSX não voltou a fazer marketing no achismo",
    socialProofQuotes: [
      "Colocar cortes de de entrevista de empresários/expositores falando da experiência que teve no DSX. Não necessariamente vídeo, pode ser o corte com a identificação e uma frase em aspas falando da experiência, pontos positivos do evento no negócio deles.",
    ],
    immersionHeadline:
      "O DSX é uma imersão construída para quem não tem tempo a perder",
    immersionBullets: [
      "2 dias dias de conteúdos estratégicos com os maiores nomes do mercado",
      "de 40 palestras",
      "3 palcos simultâneos",
      "Feira de Negócios",
      "Local: Centro de Convenções Vasco Vasques",
    ],
    valueAnchor:
      "Quanto custa para o seu negócio continuar investindo por mês em anúncios que não trazem lucro? O DSX se paga no primeiro ajuste de campanha que você fizer na segunda-feira pós-evento. O diferencial entre um profissional comum e uma referência de mercado é o nível do conteúdo que consome e das pessoas com quem convive. O DSX foi feito para quem entende isso.",
    groupHeadline: "Ninguém cresce sozinho",
    groupCopy:
      "COLOCAR OS CRIATIVOS QUE JÁ ESTÃO FUNCIONANDO DO DSX.COM.VC/VENDAS.",
    urgencyHeadline: "GARANTIR NO LOTE ATUAL",
    urgencyCopy: "GARANTIR NO LOTE ATUAL",
    faqs: [
      {
        q: "Para quem é o DSX?",
        a: "Para donos de negócio, empreendedores, gestores e profissionais que querem construir uma operação de marketing previsível dentro da própria empresa em busca de ROI.",
      },
      {
        q: "Como funciona o parcelamento?",
        a: "Em até 12x sem juros no cartão.",
      },
    ],
    finalHeadline:
      "Cada semana sem uma estratégia de marketing que funciona é mais verba queimada. Isso acaba no DSX Marketing",
    finalRecap: [
      "23 e 24 de julho • Manaus. O encontro dos maiores estrategistas de marketing do país.",
      "Funil, tráfego, copy e métricas: o mapa completo para uma operação de vendas previsível.",
      "3º lote com poucas vagas restantes neste valor",
      "▶ GARANTIR AGORA — ÚLTIMAS VAGAS DO 3º LOTE",
      "Pagamento seguro | Parcelamento em até 12x",
    ],
  },
  {
    name: "Vendas",
    image: "/optimized/step1/Banner-vendas-hero.webp",
    category: "Segmento Estratégico",
    headline:
      "Vender não pode ser uma questão de sorte, Construa uma máquina de vendas que funciona mesmo quando seu melhor vendedor sai",
    subtitle:
      "Para empreendedores, gestores e profissionais de vendas que sabem que venda previsível não é sorte nem carisma. É método, processo e métricas",
    hook: "Em 2 dias, você sai com processo, funil e time estruturados para fechar mais. Sem depender de talento individual.",
    about:
      "Você tem vendedores. Mas tem um processo validado, ou cada um vende do jeito que quer?",
    topics: [
      "Vendas",
      "Marketing & Performance",
      "Ferramentas de Crescimento",
      "Inteligência Artificial",
      "Gestão Comercial",
    ],
    painPoints: [
      "Seu processo de vendas existe na cabeça de uma pessoa, não num playbook",
      "Quando entra um vendedor novo, leva meses para atingir a meta",
      "Taxa de conversão varia demais entre os vendedores, sem consistência",
      "Você não sabe exatamente em qual etapa do funil estão perdendo negócios",
      "Seu time vende por volume e pressão, não por processo e método",
    ],
    transitionLine:
      "No DSX você aprende a construir o sistema que qualquer bom vendedor consegue replicar.",
    outcomesHeadline: "O QUE VOCÊ LEVA DO DSX",
    outcomes: [
      {
        title: "Vendas",
        description:
          "Descubra como atrair clientes de alto valor, negociar com previsibilidade e fechar contratos maiores, construindo um modelo de receita que não depende de mês bom ou vendedor motivado.",
      },
      {
        title: "Marketing & Performance",
        description:
          "Pare de impulsionar no achismo. Aprenda a estruturar tráfego pago, funis de venda e criativos de alta conversão que geram lead qualificado e reduzem o custo de aquisição.",
      },
      {
        title: "Ferramentas de Crescimento",
        description:
          "Chega de testar o que não funciona. Aprenda direto com especialistas as tecnologias e táticas que realmente escalam operações comerciais, sem desperdiçar verba nem tempo.",
      },
      {
        title: "Inteligência Artificial",
        description:
          "Transforme a IA em vantagem competitiva no seu processo de vendas. Automatize tarefas, eleve a produtividade do time comercial e tome decisões baseadas 100% em dados.",
      },
      {
        title: "Gestão Comercial",
        description:
          "Pare de perder vendas por desorganização. Estruture cada etapa do processo comercial, use o CRM de forma inteligente e prepare sua operação para escalar sem perder negócio no caminho.",
      },
    ],
    speakersHeadline: "PALESTRANTES CONFIRMADOS NO DSX 2026",
    segmentSpeakers: [
      {
        name: "Breno Maciel",
        image: "/foto-breno-maciel.png",
        bio: "Estrategista de Vendas e Processos. Especialista em estruturação de máquinas de vendas que geram previsibilidade e escala para empresas de médio e grande porte.",
      },
      {
        name: "Magno Rodrigues",
        image: "/foto-magno-rodrigues.png",
        bio: "Especialista em Performance de Time e Gestão Comercial. Mentor de líderes que buscam transformar grupos de vendedores em esquadrões de fechamento orientados por dados.",
      },
      {
        name: "Roberta Veras",
        image: "/Roberta_veras.png",
        bio: "Especialista em Vendas Consultivas e Experiência do Cliente. Focada em otimização de funil e aumento de LTV (Lifetime Value) através de processos replicáveis.",
      },
    ],
    socialProofHeadline:
      "Quem aplicou métodos aprendidos no DSX, não voltou a fazer vendas no achismo",
    socialProofQuotes: [
      "Colocar cortes de de entrevista de empresários/expositores falando da experiência que teve no DSX. Não necessariamente vídeo, pode ser o corte com a identificação e uma frase em aspas falando da experiência, pontos positivos do evento no negócio deles.",
    ],
    immersionHeadline:
      "O DSX é um evento construído para quem não tem tempo a perder",
    immersionBullets: [
      "2 dias dias de conteúdos estratégicos com os maiores nomes do mercado",
      "de 40 palestras",
      "3 palcos simultâneos",
      "Feira de Negócios",
      "Local: Centro de Convenções Vasco Vasques",
    ],
    valueAnchor:
      "Qual é o custo de um vendedor novo levar 6 meses para performar? Ou de um lead qualificado ser perdido por falta de processo? O passaporte do DSX custa menos do que um mês de meta não batida por falta de processo.",
    groupHeadline: "NINGUÉM CRESCE SOZINHO",
    groupCopy:
      "COLOCAR OS CRIATIVOS QUE JÁ ESTÃO FUNCIONANDO DO DSX.COM.VC/VENDAS.",
    urgencyHeadline: "GARANTIR NO LOTE ATUAL",
    urgencyCopy: "GARANTIR NO LOTE ATUAL",
    faqs: [
      {
        q: "Para quem é o DSX?",
        a: "Para empreendedores, gestores e profissionais de vendas que lideram times e sabem que o problema não é o vendedor, é a falta de processo, método e métricas por trás dele.",
      },
      {
        q: "Serve para vendas B2B e B2C?",
        a: "Sim. O conteúdo do DSX foi desenvolvido para funcionar em qualquer modelo de venda: consultiva, transacional, recorrente ou por projeto.",
      },
      {
        q: "Como funciona o parcelamento?",
        a: "Em até 12x no cartão de crédito.",
      },
    ],
    finalHeadline:
      "Cada semana sem um processo de vendas que funciona é mais lead perdido, mais verba queimada e mais meta não batida. Isso muda no DSX",
    finalRecap: [
      "23 e 24 de julho • Manaus. Centro de Convenções Vasco Vasques — 2 dias de imersão para construir uma máquina de vendas previsível",
      "Funil, script e treinamento, tudo estruturado antes de sair do evento",
      "3º lote com poucas vagas restantes neste valor",
      "▶ GARANTIR AGORA — ÚLTIMAS VAGAS DO 3º LOTE",
      "Pagamento seguro | Parcelamento em até 12x",
    ],
  },
  {
    name: "Inovação",
    aliases: ["inovacao"],
    image: "/dsx-2026.jpeg",
    category: "Segmento Estratégico",
    headline:
      "O repertório estratégico para manter sua operação lucrativa e relevante",
    subtitle:
      "Menos teoria, mais método para aplicar tecnologia onde ela realmente importa: no seu caixa",
    hook: "2 dias de imersão para atualizar seu framework de decisão e antecipar as tendências que já estão mudando o jogo no Norte.",
    about:
      "Você sente que o mercado está mudando mais rápido do que sua empresa consegue acompanhar?",
    topics: [
      "Estratégia de Vendas",
      "Marketing & Performance de Dados",
      "Tecnologias de Escala",
      "Inteligência Artificial Aplicada",
      "Gestão e Governança Comercial",
    ],
    painPoints: [
      "Você vê novos players crescendo em meses o que sua estrutura levou anos para consolidar",
      "Suas tentativas de inovação morrem como custo, sem virar processo ou margem",
      "Sua equipe está presa no operacional e ignora a cultura de eficiência",
      "Você investiu em ferramentas que geram complexidade, não retorno",
      "Você sabe que precisa mudar, mas não tem o método para o próximo passo",
    ],
    transitionLine:
      "Inovação sem método é apenas gasto. No DSX, você aprende a estrutura que transforma experimentação em vantagem competitiva.",
    outcomesHeadline: "Estratégia de Vendas",
    outcomes: [
      {
        title: "Estratégia de vendas",
        description:
          "Implemente processos inteligentes para atrair clientes de alto valor e negociar com previsibilidade. Construa um modelo de receita robusto onde o fechamento de grandes contratos não depende de sazonalidade ou motivação individual, mas de sistema e dado.",
      },
      {
        title: "Marketing orientado por dados",
        description:
          "Substitua o achismo por ativos digitais mensuráveis. Estruture funis de venda e criativos de alta conversão focados em reduzir o CAC e elevar a qualidade do lead, com decisões baseadas em métrica, não em intuição.",
      },
      {
        title: "Ferramentas para escalar",
        description:
          "Pare de investir em ferramenta que não entrega retorno. Tenha acesso às tecnologias e táticas de crescimento validadas por quem já domina o jogo, e saia do evento sabendo exatamente o que implementar primeiro.",
      },
      {
        title: "Inteligência artificial aplicada a negócios",
        description:
          "Transforme a IA em vantagem competitiva antes que o seu concorrente faça isso primeiro. Automatize o operacional, eleve a produtividade do time e use inteligência de dados como suporte central para as suas decisões estratégicas.",
      },
      {
        title: "Gestão e governança comercial",
        description:
          "Blindagem contra desorganização. Estruture cada etapa do processo comercial com inteligência de CRM, e prepare sua operação para o próximo nível de escala sem perder margem no caminho.",
      },
    ],
    speakersHeadline: "PALESTRANTES CONFIRMADOS NO DSX 2026",
    segmentSpeakers: [
      {
        name: "Afrânio Soares",
        image: "/novas-palestrantes/Afranio-Soares.png",
        bio: "O maior estrategista de dados e cenários do Norte. Fundador da Action, traduz números em decisões de mercado que antecipam tendências antes que elas virem ameaças.",
      },
      {
        name: "Gisele Oshiro",
        image: "/novas-palestrantes/foto-giselle-oshiro.png",
        bio: "Ela transforma inteligência emocional em estratégia aplicada ao negócio, impactando decisões, liderança e performance.",
      },
      {
        name: "Suelen Scop",
        image: "/novas-palestrantes/foto-suelen-scop.png",
        bio: "Psicóloga e Estrategista de IA aplicada ao lucro. Especialista em integrar inteligência artificial no fluxo empresarial para reduzir custos e acelerar a produtividade.",
      },
      {
        name: "Flávia Sausmikat",
        image: "/novas-palestrantes/Flavia-Sausmikat.png",
        bio: "Especialista em análise de comportamento social e de consumo, unindo rigor técnico e sensibilidade para gerar insights relevantes e estratégicos para organizações.",
      },
      {
        name: "Dr. Thales Stein",
        image: "/card-image/participante-card-img.png",
        bio: "Estrategista de Performance Humana. Especialista em otimizar a biologia do tomador de decisão para suportar a pressão da escala e manter o foco na inovação.",
      },
    ],
    socialProofHeadline:
      "Depoimentos de quem aprendeu a aplicar inovação com assertividade",
    socialProofQuotes: [
      "Colocar cortes de de entrevista de empresários/expositores falando da experiência que teve no DSX. Não necessariamente vídeo, pode ser o corte com a identificação e uma frase em aspas falando da experiência, pontos positivos do evento no negócio deles.",
    ],
    immersionHeadline:
      "O DSX é uma imersão construída para quem não tem tempo a perder",
    immersionBullets: [
      "2 dias de imersão estratégica com quem domina o mercado.",
      "+40 palestras técnicas.",
      "3 palcos simultâneos: Escolha o conteúdo que sua empresa precisa agora.",
      "Feira de Negócios: Networking direto com decisores e parceiros estratégicos.",
      "Local: Centro de Convenções Vasco Vasques",
    ],
    valueAnchor:
      "Qual é o custo de um vendedor novo levar 6 meses para performar? Ou de um lead qualificado ser perdido por falta de processo? O passaporte do DSX custa menos do que um mês de meta não batida por falta de processo.",
    groupHeadline: "NINGUÉM CRESCE SOZINHO",
    groupCopy:
      "COLOCAR OS CRIATIVOS QUE JÁ ESTÃO FUNCIONANDO DO DSX.COM.VC/VENDAS.",
    urgencyHeadline: "GARANTIR NO LOTE ATUAL",
    urgencyCopy: "GARANTIR NO LOTE ATUAL",
    faqs: [
      {
        q: "Para quem é o DSX?",
        a: "Para donos de negócio e líderes que querem entender como usar a inovação como ferramenta estratégica.",
      },
      {
        q: "Preciso entender de tecnologia para aproveitar?",
        a: "Não. O DSX foi feito justamente para o dono do negócio, não para o programador. Você não vai aprender a \"fazer código\", você vai aprender a comprar, gerir e implementar inovação para ter vantagem competitiva. Se você toma decisões na empresa, este lugar é seu.",
      },
      {
        q: "Como funciona o parcelamento?",
        a: "Em até 12 vezes no cartão de crédito.",
      },
    ],
    finalHeadline:
      "O mercado não espera. As empresas que ganham nos próximos anos já estão aprendendo a inovar com método. O DSX Inovação é o seu próximo passo",
    finalRecap: [
      "23 e 24 de julho • Manaus. Centro de Convenções Vasco Vasques — 2 dias de imersão em inovação estratégica para empreendedores",
      "Framework, validação, tendências e cultura, o kit completo para inovar com resultado",
      "3º lote com poucas vagas restantes neste valor",
      "▶ GARANTIR AGORA — ÚLTIMAS VAGAS DO 3º LOTE",
      "Pagamento seguro | Parcelamento em até 12x",
    ],
  },
  {
    name: "Negócios",
    aliases: ["negocios", "necogios"],
    image: "/optimized/step1/Banner-vendas-hero.webp",
    category: "Segmento Estratégico",
    headline: "Onde empresários constroem o futuro dos negócios no Norte",
    subtitle:
      "Conecte-se com quem já escalou operações de milhões e entenda o modelo de gestão da nova economia",
    hook: "Em 2 dias, você sai com direcionamento para construir uma empresa que cresce sem depender só de você.",
    about:
      "Você construiu um negócio que funciona, mas que ainda não sobrevive sem você?",
    topics: [
      "Estrutura e governança para decisões de alto impacto",
      "Processos-chave e delegação para escalar com previsibilidade",
      "Crescimento com clareza estratégica e execução disciplinada",
    ],
    painPoints: [
      "Você é o maior gargalo da sua empresa, toda decisão passa por você",
      "Faturamento cresce, mas lucro some em custo fixo e retrabalho",
      "Seu time executa, mas não pensa. Você ainda precisa resolver tudo",
      "Você sabe que precisa de processos, mas nunca tem tempo pra montar",
      "Toda vez que tira o pé do acelerador, a empresa desacelera junto",
    ],
    transitionLine:
      "",
    outcomesHeadline: "O QUE VOCE SAI TENDO DEPOIS DO DSX PARA O SEU NEGOCIO:",
    outcomes: [
      {
        title: "Vendas",
        description:
          "Descubra como atrair clientes de alto valor, negociar com previsibilidade e fechar contratos maiores. Construindo um modelo de receita que nao depende de mes bom ou vendedor motivado.",
      },
      {
        title: "Posicionamento e Branding",
        description:
          "Pare de brigar por atencao em um mercado saturado. Aprenda como construir uma marca que o mercado reconhece, respeita e procura.",
      },
      {
        title: "Marketing & Performance",
        description:
          "Pare de impulsionar no achismo. Aprenda a estruturar trafego pago, funis de venda e criativos de alta conversao que geram cliente qualificado e reduzem o custo de aquisicao.",
      },
      {
        title: "Ferramentas de Crescimento",
        description:
          "Chega de testar o que nao funciona. Aprenda direto com especialistas as tecnologias e taticas que realmente escalam operacoes, sem desperdicar verba nem tempo.",
      },
      {
        title: "Inteligencia Artificial",
        description:
          "Transforme a IA em vantagem competitiva. Automatize processos, eleve a produtividade do time e tome decisoes baseadas 100% em dados, antes que o seu concorrente faca isso primeiro.",
      },
      {
        title: "Gestao Comercial",
        description:
          "Pare de perder negocio por desorganizacao. Estruture cada etapa do processo comercial, use o CRM de forma inteligente e prepare sua operacao para crescer sem perder cliente no caminho.",
      },
      {
        title: "Feira de Negocios",
        description:
          "Mais de 2.000 decisores no mesmo espaco. A teoria que voce absorveu nos palcos entra em pratica aqui, em conversas com pessoas que tem o mesmo nivel de ambicao que voce.",
      },
    ],
    speakersHeadline: "PALESTRANTES CONFIRMADOS NO DSX 2026",
    segmentSpeakers: [
      {
        name: "João Kepler",
        image: "/novas-palestrantes/Joao-Kepler.png",
        bio: "O maior investidor-anjo do Brasil. Especialista em Equity e em como preparar sua empresa para valer 10x mais no mercado.",
      },
      {
        name: "Nicolas Charão",
        image: "/novas-palestrantes/Nicolas-Charao.png",
        bio: "Com mais de 10 anos de experiência, já mentoreou centenas de empresários e donos de agência, contribuindo para a formação de mais de 50 negócios milionários.",
      },
      {
        name: "Netão Bom Beef",
        image: "/foto-netao-bom-beef.PNG",
        bio: "Do açougue de bairro a um faturamento de R$ 1 milhão por dia. O case real de como transformar produto em uma rede de franquias escalável.",
      },
      {
        name: "Carlos Oshiro",
        image: "/foto-carlos-oshiro.png",
        bio: "Ajuda empresários a transitar a mentalidade da velha para a nova economia. Tem um ecossistema de mais de 1500 empresários de Manaus na nova economia.",
      },
      {
        name: "Chay Santos",
        image: "/foto-chay-santos.png",
        bio: "Estrategista de Marketing e Branding. Especialista em construir posicionamentos que permitam cobrar mais caro e dominar nichos de mercado.",
      },
      {
        name: "Fabrício Alva",
        image: "/optimized/step1/Fabricio_alva.PNG",
        bio: "Consultor empresarial, estrategista de negócios e especialista em performance,já ajudou empresas e profissionais a estruturarem seus negócios com mais clareza, eficiência e previsibilidade, unindo experiência prática com o uso inteligente da tecnologia.",
      },
    ],
    socialProofHeadline:
      "Quem já esteve no DSX não volta ao mesmo nível de negócio",
    socialProofQuotes: [
      "Saí do DSX com clareza para reorganizar minha operação e ganhamos velocidade no crescimento.",
      "Foi o ponto de virada para delegar melhor e parar de centralizar todas as decisões.",
      "As conexões que fiz no evento se transformaram em parcerias reais para o negócio.",
    ],
    socialProofVideos: [
      {
        nome: "AUGUSTO CÉSAR",
        tipo: "EXPOSITOR",
        thumb: "/card-image/expositor-card-img.png",
        video: "https://vimeo.com/1148163345?fl=ip&fe=ec",
      },
      {
        nome: "JOÃO KEPLER",
        tipo: "PALESTRANTE",
        thumb: "/card-image/kepler-card-img.png",
        video: "https://vimeo.com/1148163374?fl=ip&fe=ec",
      },
      {
        nome: "FERNANDA",
        tipo: "PARTICIPANTE",
        thumb: "/card-image/participante-card-img.png",
        video: "https://vimeo.com/1148163408?fl=ip&fe=ec",
      },
    ],
    immersionHeadline:
      "O DSX é uma imersão construída para quem não tem tempo a perder",
    immersionBullets: [
      "2 dias dias de conteúdos estratégicos com os maiores nomes do mercado",
      "de 40 palestras",
      "3 palcos simultâneos",
      "Feira de Negócios",
      "Local: Centro de Convenções Vasco Vasques",
    ],
    valueAnchor:
      "O custo de não estar no DSX é muito maior do que o valor do passaporte. Um erro na sua estratégia de escala ou um processo de delegação mal feito custa, por mês, dez vezes o investimento que você fará hoje.",
    groupHeadline: "Ninguém cresce sozinho",
    groupCopy:
      "Ninguém cresce sozinho",
    urgencyHeadline: "GARANTIR NO LOTE ATUAL",
    urgencyCopy:
      "O mercado não espera. Garanta sua cadeira no setor de decisões antes da virada de lote.",
    faqs: [
      {
        q: "Para quem é o DSX?",
        a: "Para empresários e microempreendedores que querem sair do modo operacional e construir uma empresa que escala, com método, não com sorte.",
      },
      {
        q: "Como funciona o parcelamento?",
        a: "Você pode garantir o seu passaporte via PIX (com aprovação imediata) ou parcelar no cartão de crédito em até 12 vezes.",
      },
      {
        q: "O que está incluso no ingresso VIP?",
        a: "Lounge VIP exclusivo, networking com decisores, kit premium, primeiras fileiras, 2 dias de evento, +40 palestras, feira de negócios.",
      },
    ],
    finalHeadline: "Não estar no DSX também é uma decisão estratégica",
    finalSubheadline:
      "Só certifique-se de que você consegue arcar com o preço dela",
    finalRecap: [
      "23 e 24 de julho • Manaus • Centro de Convenções Vasco Vasques — 2 dias de imersão com os melhores especialistas em negócios do Brasil.",
      "Estrutura, processos, delegação e crescimento: tudo o que falta para sua empresa funcionar sem você.",
      "3º lote com poucas vagas restantes neste valor.",
    ],
  },
].map((segment) => ({
  ...segment,
  slug: toSegmentSlug(segment.name),
  role: `Trilha de ${segment.name}`,
  event: DEFAULT_EVENT,
  ctaLabel: `Quero ingresso para ${segment.name}`,
  ctaLink: SYMPLA_CHECKOUT_URL,
  urgencyLabel: "Vagas limitadas para essa trilha",
  socialProof: {
    attendees: "+2.000",
    talks: "+40",
    exhibitors: "+30",
  },
}));

const segmentBySlug = segmentLandingList.reduce((acc, segment) => {
  acc[segment.slug] = segment;

  (segment.aliases || []).forEach((alias) => {
    const normalizedAlias = normalizeSegmentLookup(alias);
    if (normalizedAlias) {
      acc[normalizedAlias] = segment;
    }
  });

  return acc;
}, {});

export const getSegmentBySlug = (slug = "") => {
  const directKey = String(slug || "");
  return (
    segmentBySlug[directKey] || segmentBySlug[normalizeSegmentLookup(directKey)]
  );
};

export { segmentLandingList };
