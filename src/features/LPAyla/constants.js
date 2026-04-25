export { RD_API_URL } from "../../lib/rdStation";

export const FORM_INITIAL_STATE = {
  name: "",
  phone: "",
  email: "",
  cargo: "",
};

export const SOURCE_INITIAL_STATE = {
  page_url: "",
  site_origin: "",
  site_hostname: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
};

export const FORM_STEPS = [
  {
    key: "name",
    title: "Qual o seu nome completo?",
    placeholder: "Digite seu nome completo",
    type: "text",
    autoComplete: "name",
  },
  {
    key: "phone",
    title: "Qual o seu WhatsApp?",
    placeholder: "(92) 99999-9999",
    type: "tel",
    autoComplete: "tel",
  },
  {
    key: "email",
    title: "Qual o seu melhor e-mail?",
    placeholder: "voce@empresa.com",
    type: "email",
    autoComplete: "email",
  },
  {
    key: "cargo",
    title: "Voce se identifica com qual perfil?",
    type: "select",
    options: [
      "Empresario",
      "Diretor ou Gestor",
      "Profissional de marketing, vendas e operacoes",
      "Estudante",
      "Outros",
    ],
  },
];

export const EVENT_HIGHLIGHTS = [
  { label: "Data", value: "23 e 24 de Julho de 2026" },
  { label: "Local", value: "Centro de Convencoes Vasco Vasques" },
  { label: "Edicao", value: "Digital Summit Experience 2026" },
];

export const EVENT_BENEFITS = [
  "Conteudo aplicado para aumentar vendas e margem com previsibilidade.",
  "Trilhas de marketing, gestao, IA e performance comercial.",
  "Networking qualificado com decisores e marcas da regiao.",
  "Acesso a estrategias praticas de lideres que ja escalaram.",
];
