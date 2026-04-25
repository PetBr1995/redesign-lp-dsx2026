"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { dlPush } from "../componentes/dataLayer"
import { ArrowRight, CircleCheck, CircleX } from "lucide-react"
import Footer from "@/componentes/footer"
import { AnimatedTop } from "@/componentes/AnimatedTop"
import { AnimatedLeft } from "@/componentes/AnimatedLeft"
import { AnimatedRight } from "@/componentes/AnimatedRight"
import { AnimatedBottom } from "@/componentes/AnimatedBottom"
import Countdown from "@/componentes/Countdown"
import { useOnScreen } from "@/componentes/useOnScreen"
import EventScheduleTabs from "@/componentes/EventScheduleTabs"

const faqData = [
  {
    id: 1,
    question: "O que é o Amazon IA Summit?",
    answer:
      "É a maior imersão do Norte do Brasil focada em Inteligência Artificial aplicada a negócios. Um evento que conecta empresários, gestores e líderes a especialistas que mostram como usar IA de forma prática e estratégica.",
  },
  {
    id: 2,
    question: "Quando e onde acontece?",
    answer:
      "Manaus – Centro de Convenções do Amazonas Vasco Vasques 1 e 2 de dezembro de 2025",
  },
  {
    id: 3,
    question: "Quem deve participar?",
    answer:
      "Empresários, gestores, líderes de negócios e profissionais interessados em inovação, tecnologia e competitividade.",
  },
  {
    id: 4,
    question: "Preciso ter conhecimento técnico em IA para participar?",
    answer:
      "Não! O evento é voltado para aplicação prática de IA nos negócios, em linguagem acessível tanto para iniciantes quanto para avançados.",
  },
  {
    id: 5,
    question: "O que está incluso no passaporte?",
    answer:
      "2 dias de imersão em Inteligência Artificial, cultura digital, liderança, inovação aplicada a negócios ✔ Acesso aos 3 palcos simultâneos com conteúdos estratégicos ✔ +40 palestras com líderes e especialistas nacionais ✔ Feira de negócios com marcas e soluções que estão moldando o mercado",
  },
  {
    id: 6,
    question: "Haverá diferentes tipos de passaporte?",
    answer:
      "Standard - acesso completo aos dois dias de evento. VIP — inclui benefícios diferenciados, como áreas exclusivas. In Group — opções especiais para grupos de 5 ou 10 pessoas, com valores diferenciados.",
  },
  {
    id: 7,
    question: "Como posso comprar meu passaporte?",
    answer:
      "Basta clicar no botão “Compre seu passaporte agora” disponível no site oficial e garantir sua vaga.",
  },
  {
    id: 8,
    question: "As vagas são limitadas?",
    answer:
      "Sim. O evento tem capacidade limitada e os primeiros lotes são promocionais. Recomendamos garantir o passaporte o quanto antes.",
  },
]

// --- Funções auxiliares ---
function formatPhoneBR(input: string) {
  const digits = input.replace(/\D/g, "").slice(0, 11)
  if (digits.length === 0) return ""
  if (digits.length < 3) return `(${digits}`
  if (digits.length < 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length < 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

// --- Tipagem do formulário ---
type FormData = {
  nomeCompleto: string;
  email: string;
  whatsapp: string;
  perfil: string;
  nomeEmpresa: string;
  faturamento: string;
  concordaPrivacidade: boolean;
};

// Função para normalizar o WhatsApp no formato +55XXXXXXXXXXX
const formatarWhatsapp = (numero: string): string => {
  const somenteNumeros = numero.replace(/\D/g, "");
  if (somenteNumeros.startsWith("55")) {
    return `+${somenteNumeros}`;
  }
  return `+55${somenteNumeros}`;
};

const RD_API_URL =
  process.env.NEXT_PUBLIC_RD_STATION_CONVERSIONS_URL ||
  (process.env.NEXT_PUBLIC_RD_STATION_API_KEY
    ? `https://api.rd.services/platform/conversions?api_key=${encodeURIComponent(process.env.NEXT_PUBLIC_RD_STATION_API_KEY)}`
    : "https://api.rd.services/platform/conversions?api_key=MHnWDjBYARQKdwUsfZRbjtVmPEyoHnSqtgFz");

export default function Home() {

 const [sourceData, setSourceData] = useState({
     page_url: "",
     utm_source: "",
     utm_medium: "",
     utm_campaign: "",
     utm_term: "",
     utm_content: "",
   });
 
   useEffect(() => {
     const urlParams = new URLSearchParams(window.location.search);
 
     setSourceData({
       page_url: window.location.href,
       utm_source: urlParams.get("utm_source") || "",
       utm_medium: urlParams.get("utm_medium") || "",
       utm_campaign: urlParams.get("utm_campaign") || "",
       utm_term: urlParams.get("utm_term") || "",
       utm_content: urlParams.get("utm_content") || "",
     });
   }, []);
 
   const [formData, setFormData] = useState<FormData>({
     nomeCompleto: "",
     email: "",
     whatsapp: "",
     perfil: "",
     nomeEmpresa: "",
     faturamento: "",
     concordaPrivacidade: false,
   })
   const [nomeErro, setNomeErro] = useState("");
 
   const handleSubmit = async (e?: React.FormEvent, envioSimplificado = false) => {
     e?.preventDefault(); // só previne se existir evento
 
     if (!envioSimplificado) {
       const isValid =
         formData.nomeCompleto.trim() &&
         formData.email.trim() &&
         formData.whatsapp.trim() &&
         formData.perfil &&
         formData.nomeEmpresa.trim() &&
         formData.faturamento.trim() &&
         formData.concordaPrivacidade;
 
       if (!isValid) return;
     }
 
     if (typeof window !== "undefined" && window.dataLayer) {
       window.dataLayer.push({
         event: "form_enviado",
         form_name: "form-lp-oficial",
         formDados: {
           nome: formData.nomeCompleto,
           email: formData.email,
           telefone: formatarWhatsapp(formData.whatsapp),
           voce_e: formData.perfil,
           empresa: formData.nomeEmpresa,
           faturamento: formData.faturamento,
         },
       });
       console.info("Evento 'form_enviado' disparado no dataLayer");
     }
 
     dlPush({
       event: "form_ready_to_submit",
       form_name: "confirmacao_amazon_ia",
       nome: formData.nomeCompleto,
       email: formData.email,
       whatsapp: formData.whatsapp,
       perfil: formData.perfil,
       empresa: formData.nomeEmpresa,
       faturamento: formData.faturamento,
     });
 
     console.info("form_ready_to_submit disparado");
 
     const payload = {
       event_type: "CONVERSION",
       event_family: "CDP",
       payload: {
         conversion_identifier: "LP - Amazon IA Summit",
         name: formData.nomeCompleto,
         email: formData.email,
         personal_phone: formatarWhatsapp(formData.whatsapp),
         cf_voce_e: formData.perfil,
         company_name: formData.nomeEmpresa,
         cf_qual_o_faturamento_da_sua_empresa: formData.faturamento,
         traffic_source: sourceData.utm_source,
         traffic_campaign: sourceData.utm_campaign,
         traffic_medium: sourceData.utm_medium,
         traffic_value: sourceData.utm_term,
         cf_utm_campaign: sourceData.utm_campaign,
         cf_utm_medium: sourceData.utm_medium,
         cf_utm_term: sourceData.utm_term,
         cf_utm_content: sourceData.utm_content,
         cf_utm_source: sourceData.utm_source,
         cf_url_de_conversao: sourceData.page_url,
       },
     };
 
     console.log("Payload enviado para RD Station:", formData.faturamento, formData.perfil);
 
     try {
       const response = await fetch(RD_API_URL, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "Accept": "application/json",
         },
         body: JSON.stringify(payload),
       });
 
       if (response.ok) {
         dlPush({
           event: "form_submit_success",
           form_name: "confirmacao_amazon_ia",
         });
 
         console.log("✅ Lead enviado com sucesso para o RD Station!");
 
         const currentParams = new URLSearchParams(window.location.search);
         let symplaUrl = "https://www.sympla.com.br/evento/amazon-ia-summit/3124323";
         if ([...currentParams].length > 0) {
           symplaUrl += "?" + currentParams.toString();
         }
         window.open(symplaUrl);
       } else {
         const text = await response.text();
         console.error("❌ Erro ao enviar lead:", response.status, text);
 
         dlPush({
           event: "form_submit_error",
           form_name: "confirmacao_amazon_ia",
           status: response.status,
         });
       }
     } catch (error) {
       console.error("⚠️ Erro na integração:", error);
 
       dlPush({
         event: "form_submit_exception",
         form_name: "confirmacao_amazon_ia",
         error_type: "exception",
       });
     }
   };
 
 
   const handleInputChange = (
     field: keyof FormData,
     value: FormData[typeof field]
   ) => {
     setFormData((prev) => ({
       ...prev,
       [field]: value,
     }))
   }
 
   // ---------------------------
   // Step-by-step specific state
   // ---------------------------
   const steps = [
     "nomeCompleto",
     "email",
     "whatsapp",
     "perfil",
     "nomeEmpresa",
     "faturamento",
   ] as const;
   type StepKey = typeof steps[number];
 
   const [stepIndex, setStepIndex] = useState<number>(0);
   const currentStep = steps[stepIndex];
 
   const nomeRef = useRef<HTMLInputElement | null>(null);
   const emailRef = useRef<HTMLInputElement | null>(null);
   const whatsappRef = useRef<HTMLInputElement | null>(null);
 
   useEffect(() => {
     try {
       if (currentStep === "nomeCompleto") nomeRef.current?.focus?.({ preventScroll: true });
       if (currentStep === "email") emailRef.current?.focus?.({ preventScroll: true });
       if (currentStep === "whatsapp") whatsappRef.current?.focus?.({ preventScroll: true });
     } catch (err) {
       // fallback para navegadores antigos
       if (currentStep === "nomeCompleto") nomeRef.current?.focus?.();
       if (currentStep === "email") emailRef.current?.focus?.();
       if (currentStep === "whatsapp") whatsappRef.current?.focus?.();
     }
   }, [currentStep]);
 
   const validateStep = (step: StepKey) => {
     switch (step) {
       case "nomeCompleto":
         return formData.nomeCompleto.trim().length >= 2;
       case "email":
         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
       case "whatsapp":
         return formData.whatsapp.replace(/\D/g, "").length >= 10;
       case "perfil":
         return formData.perfil.trim().length > 0;
       case "nomeEmpresa":
         return formData.nomeEmpresa.trim().length > 0;
       case "faturamento":
         return formData.faturamento.trim().length > 0;
       default:
         return false;
     }
   };
   function nextStep() {
     // Validação padrão
     if (!validateStep(currentStep)) return;
 
     // ✅ Validação do nome completo
     if (currentStep === "nomeCompleto") {
       const nome = formData.nomeCompleto.trim();
       const partes = nome.split(/\s+/);
 
       if (partes.length < 2) {
         setNomeErro("Por favor, digite seu nome completo (nome e sobrenome).");
         return;
       } else {
         setNomeErro(""); // limpa erro se estiver tudo certo
       }
     }
 
     // Step perfil
     if (currentStep === "perfil") {
       const resposta = formData.perfil.toLowerCase();
       const permitido = ["empresário", "diretor ou gestor"];
 
       if (!permitido.includes(resposta)) {
         handleSubmit(undefined, true);
         return;
       }
     }
 
     setStepIndex((s) => Math.min(s + 1, steps.length - 1));
   }
 
   function prevStep() {
     setStepIndex((s) => Math.max(s - 1, 0));
   }
 
   function handleKeyDownEnter(e: React.KeyboardEvent) {
     if (e.key === "Enter") {
       e.preventDefault();
       nextStep();
     }
   }
 
   const progressPercent = Math.round((stepIndex / (steps.length - 1)) * 100);


   const [openItem, setOpenItem] = useState<number | null>(null)
  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  //faq
  const [isVisible] = useOnScreen();
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isVisible && !hasAppeared) {
      timeoutId = setTimeout(() => {
        setHasAppeared(true);
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isVisible, hasAppeared]);


  return (
    <div className="overflow-hidden bg-[var(--background)]">
      {/* hero section */}
      <div className="mx-auto hero-banner py-5 xl:py-15 relative z-10">
        <div className="max-w-[var(--largura)] px-5 mx-auto text-white relative">
          <div className="bg-[#0C33C6]/20 py-10 lg:py-20 px-10 lg:px-20 rounded-[20px] backdrop-blur-[5px]">

            <AnimatedBottom>
              <div className="flex flex-col md:flex-row justify-center items-center z-50 relative font-[500] text-[var(--verde)] mb-5">
                <p className="text-xl lg:text-3xl">Dos mesmos criadores do</p>
                <div className="relative -my-2">
                  <Image src="/DSX1.png" alt="DSX" width={80} height={80} />
                </div>
                <p className="text-xl lg:text-3xl">vem aí</p>
              </div>
            </AnimatedBottom>

            {/* Logo */}
            <AnimatedRight>
              <div className="max-w-[300px] md:max-w-[700px] my-7 table mx-auto">
                <Image src="/logo.svg" alt="Amazon IA" width={400} height={200} priority />
              </div>
            </AnimatedRight>

            <AnimatedLeft>
              <div className="max-w-[900px] text-center text-3xl md:text-4xl leading-[1.2] mx-auto z-50 relative fontspace">
                <p className="uppercase font-[600]">
                  o maior encontro de Inteligência Artificial aplicada a negócios do Norte do Brasil
                </p>
              </div>
            </AnimatedLeft>

            <AnimatedTop>
              <a href="#formulario" className="bg-[var(--verde)] rounded-full text-center table mx-auto mt-10 uppercase font-bold px-8 py-3 text-lg text-[var(--azul)]">Comprar Agora</a>
            </AnimatedTop>

          </div>
        </div>
      </div>

        {/*slide*/}
      <div className="overflow-hidden w-full bg-white py-3 relative z-10">
        <div className="flex w-max animate-slide" style={{ animation: 'slide 20s linear infinite', }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="item h-10" key={index}>
              <Image
                src="/date-amazonia.svg"
                alt="Amazon IA Summit 2025"
                className="h-full mx-4"
                width={300}
                height={300}
              />
            </div>
          ))}
        </div>
      </div>

      {/*section 2*/}
      <div className="max-w-[var(--largura)] mx-auto px-5 mt-15 mb-20 relative">
        <Image className="absolute -top-50 -right-[900px] opacity-70 scale-x-[-1]" src={"/faixa-2.webp"} alt="Amazon IA" width={2000} height={2000}/>
        <h3 className="fontspace uppercase text-center font-bold text-white text-2xl mb-8">O que você vai viver <span className="text-[var(--verde)]">no AMAZON IA SUMMIT</span></h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative z-1">
          <AnimatedLeft>
            <div className="relative text-center">
              <Image src={"/hand-brain.svg"} alt="Amazon IA" width={80} height={80} className="mb-5 z-1 relative mx-auto"/>
              <p className="text-white z-1 relative font-bold fontspace uppercase text-lg md:text-2xl leading-[1.2]">2 dias de<br/>evento</p>
            </div>
          </AnimatedLeft>
          <AnimatedTop>
            <div className="relative text-center">
              <Image src={"/frame-img.svg"} alt="Amazon IA" width={80} height={80} className="mb-5 z-1 relative mx-auto"/>
              <p className="text-white z-1 relative font-bold fontspace uppercase text-lg md:text-2xl leading-[1.2]">3 palcos<br/>simultâneos</p>
            </div>
          </AnimatedTop>
          <AnimatedTop>
            <div className="relative text-center">
              <Image src={"/rocket-circle.svg"} alt="Amazon IA" width={80} height={80} className="mb-5 z-1 relative mx-auto"/>
              <p className="text-white z-1 relative font-bold fontspace uppercase text-lg md:text-2xl leading-[1.2]">+ de 40<br/>palestrantes</p>
            </div>
          </AnimatedTop>
          <AnimatedRight>
            <div className="relative text-center">
              <Image src={"/user-circle.svg"} alt="Amazon IA" width={80} height={80} className="mb-5 z-1 relative mx-auto"/>
              <p className="text-white z-1 relative font-bold fontspace uppercase text-lg md:text-2xl leading-[1.2]">Feira de <br/>negócios</p>
            </div>
          </AnimatedRight>
        </div>
      </div>

      {/*section 3*/}
      <div className="pb-60 relative">
        <div className="max-w-[var(--largura)] px-5 mx-auto relative">
          <div className="grid grid-cols-1 items-center md:grid-cols-10 gap-10 z-10 relative">
            
            <div className="text-white col-span-10 md:col-span-4">
              <AnimatedTop>
                <h3 className="uppercase fontspace font-bold text-2xl mb-5">O que é o <span className="text-[var(--verde)]">Amazon IA Summit?</span></h3>
                <p className="mb-5">A última chance de acertar o plano da sua empresa para 2026 usando Inteligência Artificial.</p>
                <p className="mb-5">Durante dois dias, em Manaus, mais de 2.000 líderes, 20 palestrantes e 30 marcas mostrarão, na prática, como aplicar IA em negócios, com conteúdos voltados a vendas, marketing, cultura, gestão e estratégia para decidir melhor e vender mais.</p>
                <p className="mb-8">Você vai sair do Amazon IA Summit com um plano executável e pronto para liderar seu mercado em 2026.</p>
              </AnimatedTop>
            </div>
            
            <div className="col-span-10 md:col-span-6">
              <AnimatedLeft>
                <div className="w-[100%]overflow-hidden rounded-xl overflow-hidden">
                  <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                    <iframe
                      src="https://player.vimeo.com/video/1129634547?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                      title="VT_TEASER AMAZON IA - VEICULACAO"
                    ></iframe>
                    <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
                  </div>
                </div>
              </AnimatedLeft>
            </div>
          </div>

          <a href="#formulario" className="bg-[var(--verde)] rounded-full text-center inline-block uppercase font-bold px-8 py-3 text-lg text-[var(--azul)] mx-auto table mt-10">Comprar Agora</a>
        </div>
        <div className="absolute bottom-0 opacity-50 left-[50%] -translate-x-[50%] bg-[#00FF65] w-[150%] h-[300px] blur-[100px] rounded-[100%]"></div>
      </div>

      {/*section 4*/}
      <div className="max-w-[var(--largura)] px-5 mx-auto mb-10 -mt-30 relative">
        <div className="border-1 border-white rounded-xl p-5 md:p-10">
          <h3 className="uppercase fontspace text-center font-bold text-white text-2xl mb-5 md:mb-10">O que faz esse evento único</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative text-[var(--azul)]">

            <AnimatedTop>
              <div className="bg-white p-5 md:p-8 rounded-xl h-full">
                <Image src={"/brain.svg"} alt="Amazon IA" width={40} height={40} className="mb-5"/>
                <h4 className="font-bold text-lg leading-[1.2] mb-2">Estratégia Empresarial</h4>
                <p className="text-[var(--azul)] text-md leading-[1.2]">O papel da liderança na transformação das empresas com IA, cultura e mentalidade digital.</p>
              </div>
            </AnimatedTop>

            <AnimatedTop>
              <div className="bg-white p-5 md:p-8 rounded-lg h-full">
                <Image src={"/hand.svg"} alt="Amazon IA" width={40} height={40} className="mb-5"/>
                <h4 className="font-bold text-lg leading-[1.2] mb-2">Gestão e Planejamento com IA</h4>
                <p className="text-[var(--azul)] text-md leading-[1.2]">Liderança empresarial orientada por dados e IA para acelerar o crescimento.</p>
              </div>
            </AnimatedTop>

            <AnimatedTop>
              <div className="bg-white p-5 md:p-8 rounded-lg h-full">
                <Image src={"/icon-circle-p.svg"} alt="Amazon IA" width={40} height={40} className="mb-5"/>
                <h4 className="font-bold text-lg leading-[1.2] mb-2">Vendas com IA</h4>
                <p className="text-[var(--azul)] text-md leading-[1.2]">O uso da IA para aumentar receita, produtividade e escalar resultados comerciais.</p>
              </div>
            </AnimatedTop>

            <AnimatedTop>
              <div className="bg-white p-5 md:p-8 rounded-lg h-full">
                <Image src={"/icon-rocket.svg"} alt="Amazon IA" width={40} height={40} className="mb-5"/>
                <h4 className="font-bold text-lg leading-[1.2] mb-2">Marketing com IA</h4>
                <p className="text-[var(--azul)] text-md leading-[1.2]">Aplicação da IA na criação de conteúdo, atração de clientes e expansão em marketing.</p>
              </div>
            </AnimatedTop>

            <AnimatedTop>
              <div className="bg-white p-5 md:p-8 rounded-lg h-full">
                <Image src={"/robot.svg"} alt="Amazon IA" width={40} height={40} className="mb-5"/>
                <h4 className="font-bold text-lg leading-[1.2] mb-2">Ferramentas e Agentes de IA</h4>
                <p className="text-[var(--azul)] text-md leading-[1.2]">Uso de ferramentas e agentes de IA para potencializar operações e integrar times.</p>
              </div>
            </AnimatedTop>

            <AnimatedTop>
              <div className="bg-white p-5 md:p-8 rounded-lg h-full">
                <Image src={"/handglobe.svg"} alt="Amazon IA" width={40} height={40} className="mb-5"/>
                <h4 className="font-bold text-lg leading-[1.2] mb-2">Varejo com IA</h4>
                <p className="text-[var(--azul)] text-md leading-[1.2]">Redefinindo o varejo e a experiência do cliente com IA.</p>
              </div>
            </AnimatedTop>

            <AnimatedTop>
              <div className="bg-white p-5 md:p-8 rounded-lg h-full">
                <Image src={"/brain2.svg"} alt="Amazon IA" width={40} height={40} className="mb-5"/>
                <h4 className="font-bold text-lg leading-[1.2] mb-2">Liderança e Mentalidade</h4>
                <p className="text-[var(--azul)] text-md leading-[1.2]">O equilíbrio entre tecnologia, emoção e propósito como base da liderança moderna.</p>
              </div>
            </AnimatedTop>

            <AnimatedTop>
              <div className="bg-white p-5 md:p-8 rounded-lg h-full">
                <Image src={"/heart.svg"} alt="Amazon IA" width={40} height={40} className="mb-5"/>
                <h4 className="font-bold text-lg leading-[1.2] mb-2">IA na Saúde</h4>
                <p className="text-[var(--azul)] text-md leading-[1.2]">O uso da IA para otimizar processos na medicina e na gestão em saúde.</p>
              </div>
            </AnimatedTop>

            <AnimatedTop>
              <div className="bg-white p-5 md:p-8 rounded-lg h-full">
                <Image src={"/lamp-g.svg"} alt="Amazon IA" width={40} height={40} className="mb-5"/>
                <h4 className="font-bold text-lg leading-[1.2] mb-2">Educação e Letramento Digital com IA</h4>
                <p className="text-[var(--azul)] text-md leading-[1.2]">Redefinindo o ensino e o desenvolvimento de pessoas com IA.</p>
              </div>
            </AnimatedTop>

          </div>
        </div>
      </div>

      {/*section 5 - palestrantes*/}
      <div className="bg-[#002CB3] relative">
        <div className="max-w-[var(--largura)] mx-auto px-5 py-20 relative">
          <div className="border-1 border-white rounded-[20px] p-5 md:p-20 backdrop-blur-[3px] z-[1] relative">
            <h3 className="uppercase fontspace text-center font-bold text-white text-2xl mb-5 mx-auto relative z-1">
              <span className="text-[var(--verde)]">Palestrantes e temas</span>
              <br/>
              que vão te guiar para o próximo ciclo dos negócios
            </h3>
            <EventScheduleTabs/>
            {/*<div className="grid items-end grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
              <Image src={"/pessoas/yago-martins.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/marcos-rossi.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/thiago-reis.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/piero-franceschi.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/rafael-milagre.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/thais-martan.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/joao-vitor.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/daniel-antunes.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/nicolas-charao.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/caio-camargo.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/emilia-chagas.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/felipe-hatab.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/fernando-rank.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/julio-andrade.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/karol-oliveira.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/marcela-zaidem.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/afranio-soares.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/arlesson-anjos.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/breno-maciel.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/carlos-oshiro.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/eduardo-honorato.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/fabricio-alva.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/flavia-soares.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/gisele-oshiro.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/glauber-gomes.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/guilherme-furchi.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/iasmim-garcia.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/luiz-eduardo.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/marcelo-laranjeira.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/marcelo-salum.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/marcio-lins.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/rodrigo-araujo.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/rosevany-oliveira.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/silvestre-castro.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/suelen-scop.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/aline-sordili.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/gustavo-jinkings.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/junior-bombom.png"} width={500} height={500} alt=""/>
              <Image src={"/pessoas/maurilio-nunes.png"} width={500} height={500} alt=""/>
            </div>*/}
            <div className="flex gap-5 items-center justify-center mt-10">
              <Link href="/palestrantes" className="hidden border-1 border-white text-white uppercase font-bold rounded-full px-8 py-3 z-[1] relative">ver todos</Link>
              <a href="#formulario" className="bg-[var(--verde)] rounded-full text-center inline-block uppercase font-bold px-8 py-3 text-lg text-[var(--azul)]">Comprar Agora</a>
            </div>

          </div>
          <Image className="absolute -right-150 translate-y-[-50%] top-[50%] h-full" src={"/ondas-4.svg"} width={2000} height={2000} alt=""/>
        </div>
      </div>

      {/* section 6 - ingressos*/}
      <div className="bg-[#002CB3]">
        <div className="max-w-[var(--largura)] mx-auto px-5 pb-20">
          <div className="bg-white rounded-full text-center mx-auto w-fit uppercase font-bold px-6 py-1 text-lg text-[var(--azul)] mb-5">Passaportes</div>
          <h3 className="fontspace uppercase text-center font-bold text-white text-2xl mb-5 md:mb-15 mx-auto relative z-1">Seu lugar no Amazon IA Summit <span className="text-[var(--verde)]">está a um clique de distância</span></h3>
          <AnimatedTop>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 items-center mb-15 max-w-[1000px] mx-auto">
              <div className="vip relative z-1 md:scale-113 col-span-1">
                <Image className="mx-auto -mb-10 elative z-[1]" src={"/icon-vip.svg"} width={80} height={80} alt=""/>
                <div className="px-10 pb-10 pt-18 rounded-xl bg-[var(--verde)] bg-[url(/listas-vip.png),url('/icon-vip-w.png')] bg-[position:bottom,center] bg-no-repeat bg-[length:contain,500px]">
                  <div className="bg-white text-[var(--azul)] text-center rounded-full uppercase text-sm leading-[1] font-bold table mx-auto px-5 py-2">Passaporte</div>
                  <h4 className="text-[var(--azul)] text-center font-bold uppercase text-4xl mb-8 mt-2 fontspace">Vip</h4>
                  <ul className="flex flex-col gap-3 mb-5 font-[600] text-[var(--azul)]">
                    <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--azul)]"/> Acesso aos 2 dias de evento</li>
                    <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--azul)]"/> Acesso a +40 palestras locais e nacionais</li>
                    <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--azul)]"/> Acesso à feira de negócios</li>
                    <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--azul)]"/> Oportunidade de networking</li>
                    <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--azul)]"/> Acesso ao food station</li>
                    <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--azul)]"/> Certificado de participação (2 dias de evento)</li>
                    <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--azul)]"/> Kit Premium de boas-vindas</li>
                    <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--azul)]"/> Acesso exclusivo ao Lounge VIP: conforto e network</li>
                    <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--azul)]"/> Open de finger food liberado no lounge a partir das 13h</li>
                    <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[20px] text-[var(--azul)]"/> Acesso exclusivo às primeiras fileiras de cadeiras nas palestras</li>
                  </ul>
                  <Image className="relative z-[1] mb-11" src={"/price-vip2.svg"} width={400} height={400} alt=""/>
                  <a href="#formulario" className="bg-[var(--azul)] rounded-full text-center table mx-auto mt-8 uppercase font-bold px-8 py-3 text-md leading-[1] text-white">Comprar Agora</a>
                </div>
              </div>

              <div className="grupos relative space-y-3 col-span-2">
                <div className="bg-[#E40000] mx-auto text-center rounded-md p-2 text-white uppercase mt-10 md:mt-0 font-bold fontspace text-lg w-[80%]">Último Lote</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  <div className="standard relative">
                    <Image className="mx-auto -mb-10 relative z-[1]" src={"/icon-standard.svg"} width={80} height={80} alt=""/>
                    <div className="border-1 border-white px-10 pb-10 pt-18 rounded-xl bg-[#0836BD] overflow-hidden relative bg-[url(/listas-standard.png),url('/icon-standard-w.png')] bg-[position:bottom,center] bg-no-repeat bg-[length:contain,500px]">
                      <div className="bg-white text-[var(--azul)] text-center rounded-full uppercase text-sm leading-[1] font-bold table mx-auto px-5 py-2">Passaporte</div>
                      <h4 className="text-[var(--verde)] text-center font-bold uppercase text-4xl mb-5 mt-2 fontspace">Standard</h4>
                      <ul className="flex flex-col gap-3 mb-5 text-white">
                        <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--verde)]"/> Acesso aos 2 dias de evento</li>
                        <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--verde)]"/> Acesso a +40 palestras locais e nacionais</li>
                        <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--verde)]"/> Acesso à feira de negócios</li>
                        <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--verde)]"/> Oportunidade de networking</li>
                        <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--verde)]"/> Acesso ao food station</li>
                        <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleCheck className="w-[18px] min-w-[18px] text-[var(--verde)]"/> Certificado de participação (2 dias de evento)</li>
                        <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleX className="w-[18px] min-w-[18px] text-[#FF2525]"/> Kit Premium de boas-vindas</li>
                        <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleX className="w-[18px] min-w-[18px] text-[#FF2525]"/> Acesso exclusivo ao Lounge VIP: conforto e network</li>
                        <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleX className="w-[18px] min-w-[18px] text-[#FF2525]"/> Open de finger food liberado no lounge a partir das 13h</li>
                        <li className="flex items-center gap-2 text-md leading-[1.1]"><CircleX className="w-[18px] min-w-[20px] text-[#FF2525]"/> Acesso exclusivo às primeiras fileiras de cadeiras nas palestras</li>
                      </ul>
                      <Image className="relative z-[1]" src={"/price-standard2.svg"} width={400} height={400} alt=""/>
                      <a href="#formulario" className="bg-[var(--verde)] rounded-full text-center table mx-auto mt-5 uppercase font-bold px-8 py-3 text-md leading-[1] text-[var(--azul)] relative z-[1]">Comprar Agora</a>
                      <div className="absolute -bottom-10 -left-10 w-30 h-30 bg-[#63FF71] rounded-full blur-[50px] opacity-60"></div>
                    </div>
                  </div>

                  <div className="relative space-y-3 md:mt-10">

                    <div className="grupo-10 relative flex">
                      <div className="w-full border-1 border-white p-5 rounded-xl bg-[#0836BD] relative overflow-hidden bg-[url(/listas-group.png),url('/icon-group-w.png')] bg-[position:bottom,center] bg-no-repeat bg-[length:contain,500px]">
                        <div className="bg-white text-[var(--azul)] text-center rounded-full uppercase text-[10px] leading-[1] font-bold table mx-auto px-2 py-1">Passaporte Exclusivo</div>
                        <h4 className="text-[var(--verde)] text-center font-bold uppercase text-xl mt-2 fontspace">In Group</h4>
                        <p className="text-sm leading-[1] uppercase font-bold text-center text-white mb-2 fontspace">10 Pessoas</p>
                        <Image className="relative z-[1] mx-auto w-[80%]" src={"/price-grupo10p.svg"} width={400} height={400} alt=""/>
                        {/*<a href="#formulario" className="bg-[var(--verde)] rounded-full text-center table mx-auto mt-4 uppercase font-bold px-4 py-2 text-[12px] leading-[1] text-[var(--azul)] relative z-[1]">Comprar Agora</a>*/}
                        <div className="absolute -bottom-10 -right-10 w-30 h-30 bg-[#63FF71] rounded-full blur-[50px] opacity-60"></div>
                      </div>
                      <Image className="relative z-[1] -ml-8 !w-15" src={"/15off.svg"} width={100} height={100} alt=""/>
                    </div>

                    <div className="grupo-5 relative flex">
                      <div className="w-full border-1 border-white p-5 rounded-xl bg-[#0836BD] relative overflow-hidden bg-[url(/listas-group.png),url('/icon-group-w.png')] bg-[position:bottom,center] bg-no-repeat bg-[length:contain,500px]">
                        <div className="bg-white text-[var(--azul)] text-center rounded-full uppercase text-[10px] leading-[1] font-bold table mx-auto px-2 py-1">Passaporte Exclusivo</div>
                        <h4 className="text-[var(--verde)] text-center font-bold uppercase text-xl mt-2 fontspace">In Group</h4>
                        <p className="text-sm leading-[1] uppercase font-bold text-center text-white mb-2 fontspace">5 Pessoas</p>
                        <Image className="relative z-[1] mx-auto w-[80%]" src={"/price-grupo5p.svg"} width={400} height={400} alt=""/>
                        {/*<a href="#formulario" className="bg-[var(--verde)] rounded-full text-center table mx-auto mt-4 uppercase font-bold px-4 py-2 text-[12px] leading-[1] text-[var(--azul)] relative z-[1]">Comprar Agora</a>*/}
                        <div className="absolute -bottom-10 -right-10 w-30 h-30 bg-[#63FF71] rounded-full blur-[50px] opacity-60"></div>
                      </div>
                      <Image className="relative z-[1] -ml-8 !w-15" src={"/10off.svg"} width={100} height={100} alt=""/>
                    </div>

                    <div className="estudante relative flex">
                      <div className="w-full border-1 border-white p-5 rounded-xl bg-[#0836BD] relative overflow-hidden bg-[url(/listas-group.png),url('/icon-group-w.png')] bg-[position:bottom,center] bg-no-repeat bg-[length:contain,500px]">
                        <div className="bg-white text-[var(--azul)] text-center rounded-full uppercase text-[10px] leading-[1] font-bold table mx-auto px-2 py-1">Passaporte Exclusivo</div>
                        <h4 className="text-[var(--verde)] text-center font-bold uppercase text-xl mt-2 fontspace">Estudantes</h4>
                        <Image className="relative z-[1] mx-auto w-[65%]" src={"/price-estudante.svg"} width={400} height={400} alt=""/>
                        <p className="text-[12px] leading-[1.2] text-white mt-3">*Entrada válida apenas com comprovação legal de acordo com a Lei Federal nº12.933/2013</p>
                        {/*<a href="#formulario" className="bg-[var(--verde)] rounded-full text-center table mx-auto mt-4 uppercase font-bold px-4 py-2 text-[12px] leading-[1] text-[var(--azul)] relative z-[1]">Comprar Agora</a>*/}
                        <div className="absolute -bottom-10 -right-10 w-30 h-30 bg-[#63FF71] rounded-full blur-[50px] opacity-60"></div>
                      </div>
                      <Image className="relative z-[1] -ml-8 !w-15 opacity-0" src={"/50off.svg"} width={100} height={100} alt=""/>
                    </div>

                    <div className="estudante relative flex">
                      <div className="w-full border-1 border-white p-5 rounded-xl bg-[#0836BD] relative overflow-hidden bg-[url(/listas-group.png),url('/icon-group-w.png')] bg-[position:bottom,center] bg-no-repeat bg-[length:contain,500px]">
                        <div className="bg-white text-[var(--azul)] text-center rounded-full uppercase text-[10px] leading-[1] font-bold table mx-auto px-2 py-1">Passaporte Exclusivo</div>
                        <h4 className="text-[var(--verde)] text-center font-bold uppercase text-xl mt-2 fontspace">PCD</h4>
                        <Image className="relative z-[1] mx-auto w-[65%]" src={"/price-estudante.svg"} width={400} height={400} alt=""/>
                        <p className="text-[12px] leading-[1.2] text-white mt-3">*Ingresso exclusivo para PCDs mediante laudo</p>
                        {/*<a href="#formulario" className="bg-[var(--verde)] rounded-full text-center table mx-auto mt-4 uppercase font-bold px-4 py-2 text-[12px] leading-[1] text-[var(--azul)] relative z-[1]">Comprar Agora</a>*/}
                        <div className="absolute -bottom-10 -right-10 w-30 h-30 bg-[#63FF71] rounded-full blur-[50px] opacity-60"></div>
                      </div>
                      <Image className="relative z-[1] -ml-8 !w-15 opacity-0" src={"/50off.svg"} width={100} height={100} alt=""/>
                    </div>

                    <a href="#formulario" className="md:hidden bg-[var(--verde)] rounded-full text-center table mx-auto mt-5 uppercase font-bold px-8 py-3 text-md leading-[1] text-[var(--azul)] relative z-[1]">Comprar Agora</a>

                  </div>

                </div>
              </div>

            </div>

          </AnimatedTop>

          {/* Botão que abre o popup */}
          {/*<button
            onClick={abrirPopup}
            className="border-2 border-white uppercase text-white font-bold px-10 py-3 rounded-full table md:hidden mx-auto transition mt-10">Compare os Passaportes</button>
          {popupAberto && <PrecosPassaportes onClose={fecharPopup} />}*/}

        </div>
      </div>

      {/*section formulario 8*/}
      <div className="relative">
        <div id="formulario" className="max-w-[1100px] px-5 mx-auto py-10 md:py-20 relative">
          <div className="bg-[#00FF65]/60 w-[600px] h-[400px] absolute -top-[200px] -right-[250px] opacity-60 rounded-[100%] blur-[100px]"></div>
          <h3 className="text-white uppercase fontspace font-bold text-2xl mb-10 text-center z-1 relative"><p className="text-[var(--verde)]">Preencha seus dados e faça parte do Amazon IA Summit,</p> o evento que conecta negócios, tecnologia e Amazônia.</h3>
          
          <div id="form" className="relative">
            <div className="max-w-[800px] mx-auto relative">
              <div className="bg-[#0C33C6]/20 w-[600px] h-[600px] absolute -top-[200px] -left-[400px] rounded-[100%] blur-[100px]"></div>
              <Image className="mx-auto mb-10" src={"/logo.svg"} width={250} height={250} alt="" />
              <div className="mx-auto z-1 relative">
                <div className="form border-1 border-white/20 rounded-xl py-5 md:py-10 px-5 md:px-20 bg-white/8">
                  <AnimatedRight>
    
                    <Countdown />
    
                    {/* Step-by-step form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
    
                      {/* Step: nomeCompleto */}
                      {currentStep === "nomeCompleto" && (
                        <div className="space-y-2">
                          <input
                            ref={nomeRef}
                            type="text"
                            placeholder="Nome completo:"
                            value={formData.nomeCompleto}
                            onChange={(e) => {
                              handleInputChange("nomeCompleto", e.target.value);
                              setNomeErro(""); // remove erro ao digitar
                            }}
                            onKeyDown={handleKeyDownEnter}
                            className={`bg-[#FFFFFF1C] w-full border-1 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none 
            ${nomeErro ? "border-red-500 focus:ring-red-500" : "border-[var(--verde)] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"}`}
                            required
                          />
                          {nomeErro && (
                            <p className="text-red-400 text-sm">{nomeErro}</p>
                          )}
                        </div>
                      )}
    
    
                      {/* Step: email */}
                      {currentStep === "email" && (
                        <div className="space-y-2">
                          <input
                            ref={emailRef}
                            type="email"
                            placeholder="E-mail:"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            onKeyDown={handleKeyDownEnter}
                            className="w-full bg-[#FFFFFF1C] border-[var(--verde)] border-1 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                            required
                          />
                        </div>
                      )}
    
                      {/* Step: whatsapp */}
                      {currentStep === "whatsapp" && (
                        <div className="space-y-2">
                          <input
                            ref={whatsappRef}
                            type="tel"
                            placeholder="Contato (WhatsApp):"
                            value={formData.whatsapp}
                            onChange={(e) => handleInputChange("whatsapp", formatPhoneBR(e.target.value))}
                            onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                              const pasted = e.clipboardData.getData("text");
                              e.preventDefault();
                              handleInputChange("whatsapp", formatPhoneBR(pasted));
                            }}
                            onKeyDown={handleKeyDownEnter}
                            inputMode="numeric"
                            className="w-full bg-[#FFFFFF1C] border-[var(--verde)] border-1 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                            required
                          />
                        </div>
                      )}
    
                      {/* Step: perfil */}
                      {currentStep === "perfil" && (
                        <div className="mb-2 mt-3 border-1 border-[var(--verde)] p-5 rounded-lg bg-[#FFFFFF1C]">
                          <label className="text-white font-medium text-base block mb-2">Você é:</label>
                          <div className="flex flex-col flex-wrap gap-3">
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id="empresario"
                                name="perfil"
                                value="Empresário"
                                checked={formData.perfil === "Empresário"}
                                onChange={(e) => handleInputChange("perfil", e.target.value)}
                                className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-cyan-400 focus:ring-cyan-400 focus:ring-2"
                              />
                              <label htmlFor="empresario" className="text-white text-sm leading-[1] cursor-pointer">
                                Empresário
                              </label>
                            </div>
    
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id="diretor"
                                name="perfil"
                                value="Diretor ou Gestor"
                                checked={formData.perfil === "Diretor ou Gestor"}
                                onChange={(e) => handleInputChange("perfil", e.target.value)}
                                className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-cyan-400 focus:ring-cyan-400 focus:ring-2"
                              />
                              <label htmlFor="diretor" className="text-white text-sm leading-[1] cursor-pointer">
                                Diretor ou Gestor
                              </label>
                            </div>
    
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id="profissional"
                                name="perfil"
                                value="Profissional de marketing, vendas e operações"
                                checked={formData.perfil === "Profissional de marketing, vendas e operações"}
                                onChange={(e) => handleInputChange("perfil", e.target.value)}
                                className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-cyan-400 focus:ring-cyan-400 focus:ring-2"
                              />
                              <label htmlFor="profissional" className="text-white text-sm leading-[1] cursor-pointer">
                                Profissional de marketing, vendas e operações
                              </label>
                            </div>
    
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id="estudante"
                                name="perfil"
                                value="Estudante"
                                checked={formData.perfil === "Estudante"}
                                onChange={(e) => handleInputChange("perfil", e.target.value)}
                                className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-cyan-400 focus:ring-cyan-400 focus:ring-2"
                              />
                              <label htmlFor="estudante" className="text-white text-sm leading-[1] cursor-pointer">
                                Estudante
                              </label>
                            </div>
    
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id="outros"
                                name="perfil"
                                value="Outros"
                                checked={formData.perfil === "Outros"}
                                onChange={(e) => handleInputChange("perfil", e.target.value)}
                                className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-cyan-400 focus:ring-cyan-400 focus:ring-2"
                              />
                              <label htmlFor="outros" className="text-white text-sm leading-[1] cursor-pointer">
                                Outros
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
    
    
                      {/* Step: empresa */}
                      {currentStep === "nomeEmpresa" && (
                        <div className="space-y-2">
                          <input
                            ref={nomeRef}
                            type="text"
                            placeholder="Qual o nome da sua empresa ou da empresa que você atua?"
                            value={formData.nomeEmpresa}
                            onChange={(e) => handleInputChange("nomeEmpresa", e.target.value)}
                            onKeyDown={handleKeyDownEnter}
                            className="bg-[#FFFFFF1C] w-full border-[var(--verde)] border-1 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                            required
                          />
                        </div>
                      )}
    
                      {/* Step: faturamento */}
                      {currentStep === "faturamento" && (
                        <div className="mb-2 mt-3 border-1 border-[var(--verde)] p-5 rounded-lg bg-[#FFFFFF1C]">
                          <label className="text-white font-medium text-base block mb-2">
                            Qual o faturamento da sua empresa?
                          </label>
    
                          <div className="flex flex-col flex-wrap gap-3">
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id="Abaixo de 700 mil por ano"
                                name="faturamento"
                                value="Abaixo de 700 mil por ano"
                                checked={formData.faturamento === "Abaixo de 700 mil por ano"}
                                onChange={(e) => handleInputChange("faturamento", e.target.value)}
                                className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-cyan-400 focus:ring-cyan-400 focus:ring-2"
                              />
                              <label htmlFor="Abaixo de 700 mil por ano" className="text-white text-sm leading-[1] cursor-pointer">
                                Abaixo de 700 mil por ano
                              </label>
                            </div>
    
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id="Fatura até 1 milhão por ano"
                                name="faturamento"
                                value="Fatura até 1 milhão por ano"
                                checked={formData.faturamento === "Fatura até 1 milhão por ano"}
                                onChange={(e) => handleInputChange("faturamento", e.target.value)}
                                className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-cyan-400 focus:ring-cyan-400 focus:ring-2"
                              />
                              <label htmlFor="Fatura até 1 milhão por ano" className="text-white text-sm leading-[1] cursor-pointer">
                                Fatura até 1 milhão por ano
                              </label>
                            </div>
    
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id="De R$ 1 milhão a R$ 5 milhões"
                                name="faturamento"
                                value="De R$ 1 milhão a R$ 5 milhões"
                                checked={formData.faturamento === "De R$ 1 milhão a R$ 5 milhões"}
                                onChange={(e) => handleInputChange("faturamento", e.target.value)}
                                className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-cyan-400 focus:ring-cyan-400 focus:ring-2"
                              />
                              <label htmlFor="De R$ 1 milhão a R$ 5 milhões" className="text-white text-sm leading-[1] cursor-pointer">
                                De R$ 1 milhão a R$ 5 milhões
                              </label>
                            </div>
    
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id="De R$ 5 milhões a R$ 20 milhões"
                                name="faturamento"
                                value="De R$ 5 milhões a R$ 20 milhões"
                                checked={formData.faturamento === "De R$ 5 milhões a R$ 20 milhões"}
                                onChange={(e) => handleInputChange("faturamento", e.target.value)}
                                className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-cyan-400 focus:ring-cyan-400 focus:ring-2"
                              />
                              <label htmlFor="De R$ 5 milhões a R$ 20 milhões" className="text-white text-sm leading-[1] cursor-pointer">
                                De R$ 5 milhões a R$ 20 milhões
                              </label>
                            </div>
    
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id="Acima de R$ 20 milhões"
                                name="faturamento"
                                value="Acima de R$ 20 milhões"
                                checked={formData.faturamento === "Acima de R$ 20 milhões"}
                                onChange={(e) => handleInputChange("faturamento", e.target.value)}
                                className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-cyan-400 focus:ring-cyan-400 focus:ring-2"
                              />
                              <label htmlFor="Acima de R$ 20 milhões" className="text-white text-sm leading-[1] cursor-pointer">
                                Acima de R$ 20 milhões
                              </label>
                            </div>
    
                          </div>
    
                          <div className="flex items-center space-x-3 border-t border-gray-700 pt-4">
                            <input
                              type="checkbox"
                              id="privacidade"
                              checked={formData.concordaPrivacidade}
                              onChange={(e) => handleInputChange("concordaPrivacidade", e.target.checked)}
                              className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-gray-400 rounded focus:ring-cyan-400 focus:ring-2"
                              required
                            />
                            <label htmlFor="privacidade" className="text-gray-300 text-sm leading-[1.2] cursor-pointer">
                              Concordo com a Política de Privacidade e com o uso dos meus dados para fins de atendimento.
                            </label>
                          </div>
                        </div>
                      )}
    
                      {/* Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          {stepIndex > 0 && (
                            <button
                              type="button"
                              onClick={prevStep}
                              className="text-sm text-white/80 hover:text-white px-3 py-2 cursor-pointer"
                            >
                              ← Voltar
                            </button>
                          )}
                        </div>
    
                        <div className="flex items-center gap-3">
                          {/* ✅ Só mostra o botão se o campo do step atual estiver preenchido */}
                          {currentStep !== "faturamento" ? (
                            formData[currentStep] && formData[currentStep].trim() !== "" && (
                              <button
                                type="button"
                                onClick={nextStep}
                                className="bg-[var(--verde)] flex items-center text-black rounded-full uppercase font-bold px-8 py-3 leading-[1] cursor-pointer"
                              >
                                {stepIndex === 3 &&
                                  formData.perfil !== "Empresário" &&
                                  formData.perfil !== "Diretor ou Gestor"
                                  ? "ir para compra"
                                  : "próximo"}
                              </button>
                            )
                          ) : (
                            <button
                              type="submit"
                              disabled={false}
                              className="bg-[var(--verde)] flex items-center text-black rounded-full uppercase font-bold px-8 py-3 leading-[1] disabled:opacity-60 cursor-pointer"
                            >
                              Ir para a compra <ArrowRight />
                            </button>
                          )}
                        </div>
                      </div>
    
    
                      {/* progress */}
                      <div className="relative">
                        <div className="text-sm text-gray-300 mb-2">
                          Etapa {stepIndex + 1} de {steps.length}
                        </div>
                        <div className="h-2 bg-white/40 rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--verde)] transition-all" style={{ width: `${progressPercent}%` }} />
                        </div>
                      </div>
    
                    </form>
                  </AnimatedRight>
                </div>
              </div>
    
            </div>
          </div>

          <Image className="absolute rotate-95 bottom-0 -left-[800px] opacity-70" src={"/faixa-2.webp"} alt="Amazon IA" width={2000} height={2000}/>
        </div>
      </div>


      {/* section 9 */}
      <div className="section-9 py-15 relative">
        <Image className="absolute right-0 top-0 h-full opacity-30 w-full" src={"/line-patr.svg"} width={1000} height={1000} alt=""/>
        <div className="max-w-[var(--largura)] mx-auto px-5 text-center">

          <div className="text-white fontspace uppercase mb-5 md:mb-10 mx-auto text-2xl font-bold">
            Quem acredita na inovação e impulsiona o Amazon IA Summit
          </div>

          <AnimatedTop>
            <div className="bg-white p-5 rounded-2xl flex flex-col md:flex-row gap-3 md:gap-0 justify-between mb-5 max-w-[1100px] mx-auto">
              <div className="relative w-[100%] lg:w-[40%]">
                <h4 className="text-[var(--azul)] mb-2 font-[600]">Realização:</h4>
                <div className="flex justify-center gap-3 flex-wrap">
                  <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-agenciadigital.svg"} alt="logo" width={200} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-ondadigital.svg"} alt="logo" width={200} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-tore.svg"} alt="logo" width={200} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-xpress.svg"} alt="logo" width={120} height={200}/></div>
                </div>
              </div>
              <div className="relative w-[100%] lg:w-[60%]">
                <h4 className="text-[var(--azul)] mb-2 font-[600]">Apoio:</h4>
                <div className="flex justify-center gap-3 flex-wrap">
                  <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-digitaleduca.svg"} alt="logo" width={100} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-governo.svg"} alt="logo" width={100} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-viadireta.svg"} alt="logo" width={135} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-mac.svg"} alt="logo" width={135} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 p-3 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-puraka.svg"} alt="logo" width={100} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-porao.svg"} alt="logo" width={135} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-tssuplementos.svg"} alt="logo" width={120} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 p-3 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-ozonio.svg"} alt="logo" width={100} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 p-3 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-tete.svg"} alt="logo" width={120} height={200}/></div>
                  <div className="border-2 border-[#0C33C6]/50 p-3 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-toya.svg"} alt="logo" width={100} height={200}/></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl mb-5 max-w-[1100px] mx-auto">
              <h4 className="text-[var(--azul)] mb-2 font-[600]">Feira de Negócios:</h4>
              <div className="flex flex-wrap gap-3 justify-center mx-auto">
                <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-manausplay.svg"} alt="logo" width={120} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/Logo-Digibroad.svg"} alt="logo" width={120} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-vbot.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-AUTOMATIKUS.svg"} alt="logo" width={140} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-dipper.svg"} alt="logo" width={140} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-conquer.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-volvo.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-acdisplay.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-ibv.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-polotelecom.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-digioptics.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-action.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-ebrasil.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-growthmachine.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-otima.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-dx.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-echoenergia.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-zend.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-4 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-totvs.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-3 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-vtd.png"} alt="logo" width={100} height={200}/></div>
              </div>
            </div>

            <div className="mb-5 md:mb-10 max-w-[1100px] mx-auto bg-white p-5 rounded-2xl">
              <h4 className="text-[var(--azul)] mb-2 font-[600]">Foods:</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                
                <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/LOGOTIPO-MAQUINISTA.svg"} alt="logo" width={135} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-hondasush.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-pizzacrek.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-scooby.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-3 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-sosopa.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-MANAUARAS-BURGER.svg"} alt="logo" width={135} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-3 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-CROK.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-CONVENIENCIA.svg"} alt="logo" width={120} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-5 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-danyaircakes.svg"} alt="logo" width={135} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-3 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-cafe-Beira-Rio.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-2 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-Bendito-Gelato.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-2 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-lugano.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-2 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-ocostelao.svg"} alt="logo" width={200} height={200}/></div>
                <div className="border-2 border-[#0C33C6]/50 p-2 bg-white rounded-xl flex aspect-3/2 w-[48%] md:w-[150px]"><Image className="mx-auto" src={"/logos/logo-sorvetenachapa.svg"} alt="logo" width={200} height={200}/></div>
              </div>
            </div>

          </AnimatedTop>

          <a href="https://wa.me/5592936180463?text=Ol%C3%A1!%20Tenho%20interesse%20em%20conhecer%20as%20oportunidades%20de%20patroc%C3%ADnio%20do%20Amazon%20IA%20Summit%202025"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--verde)] text-[var(--azul)] uppercase font-bold inline-block rounded-full px-8 py-2"
          >Junte-se a nós e seja um PATROCINADOR</a>
        </div>
      </div>


      {/* section 10 - faq */}
      <div className="py-20 bg-gradient-to-b from-[var(--background)] to-[#00FF65]/40 relative">
        <Image className="w-full absolute bottom-0 opacity-30" src={"/lines-footer.svg"} width={1200} height={100} alt=""/>
        <div className="max-w-[var(--largura)] px-5 mx-auto">
          <div className="text-center mb-5">
            <h3 className="text-2xl font-bold uppercase fontspace text-white">Restou alguma dúvida?</h3>
          </div>

          <AnimatedTop>
            <div className="space-y-4 w--full md:w-[60%] mx-auto">
              {faqData.map((item) => {
                const isOpen = openItem === item.id
                return (
                  <div
                    key={item.id}
                    className={`rounded-lg transition-colors duration-200 ${isOpen ? "bg-[#22C26C]" : "bg-white"}`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      className={`w-full px-6 py-4 text-left flex justify-between items-center rounded-lg transition-colors duration-200 cursor-pointer ${
                        isOpen ? "hover:bg-[#22C26C]" : "hover:bg-[#22C26C]"
                      }`}
                    >
                      <h3 className={`text-lg font-semibold ${isOpen ? "text-white" : "text-black hover:text-white"}`}>
                        {item.question}
                      </h3>

                      <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-green-200" : "text-green-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-4">
                        <p className={`leading-relaxed ${isOpen ? "text-green-100" : "text-green-200"}`}>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </AnimatedTop>

          <a href="#formulario" className="bg-[var(--verde)] rounded-full text-center table mx-auto mt-10 uppercase font-bold px-8 py-3 text-lg text-[var(--azul)] relative z-[1]">Comprar Agora</a>
        </div>
      </div>

      <Footer/>

    </div>
  )
}
