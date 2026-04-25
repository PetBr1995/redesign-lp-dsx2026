import NewVendasHeaderMask from "../../../components/NewVendas/NewVendasHeaderMask";
import PassaportesSection from "../../../components/NewVendas/sections/PassaportesSection";
import FooterSection from "../../../components/NewVendas/sections/FooterSection";
import LeadPopupFormHomeTeste from "../../../components/HomeTesteComponentes/LeadPopupFormHomeTeste";
import { RD_API_URL } from "../../../lib/rdStation";
import { formatDsxFormOrigin } from "../../../utils/formOrigin";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const NEW_VENDAS_SYMPLA_URL =
  "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721";

const THEME_COPY = {
  marketing: {
    painPoints: [
      "Investe em tráfego, mas não enxerga ROI com clareza.",
      "Produz conteúdo, mas os leads não avançam para venda.",
      "Equipe sem processo claro de aquisição e conversão.",
      "Dependência de campanhas pontuais para bater meta.",
    ],
    promise: "Sair com funis e campanhas estruturados para gerar demanda previsível.",
    ctaAfterSpeakers: "QUERO APRENDER COM ESSES ESPECIALISTAS",
    ctaAfterSocial: "QUERO FAZER PARTE",
    ctaAfterPrices: "GARANTIR POR 12x R$ 41,42",
    ctaFinal: "GARANTIR AGORA — ULTIMAS VAGAS",
  },
  vendas: {
    painPoints: [
      "Time vende por esforço, sem processo repetivel.",
      "Pipeline desorganizado e baixa previsibilidade mensal.",
      "Negociacao longa, com perda de margem no fechamento.",
      "Dependencia excessiva de poucos vendedores-chave.",
    ],
    promise: "Sair com rotina comercial, playbook e metodo de fechamento aplicavel no dia seguinte.",
    ctaAfterSpeakers: "QUERO FECHAR MAIS",
    ctaAfterSocial: "QUERO FAZER PARTE",
    ctaAfterPrices: "GARANTIR POR 12x R$ 41,42",
    ctaFinal: "GARANTIR AGORA — ULTIMAS VAGAS",
  },
  inovacao: {
    painPoints: [
      "Muita tendencia e pouca aplicacao real no negocio.",
      "Operacao lenta por falta de automacao pratica.",
      "Dificuldade para priorizar o que realmente gera ganho.",
      "Decisoes sem dados confiaveis em tempo habil.",
    ],
    promise: "Sair com mapa de adocao de inovacao orientado a resultado e produtividade.",
    ctaAfterSpeakers: "QUERO INOVAR COM METODO",
    ctaAfterSocial: "QUERO FAZER PARTE",
    ctaAfterPrices: "GARANTIR POR 12x R$ 41,42",
    ctaFinal: "GARANTIR AGORA — ULTIMAS VAGAS",
  },
  negocios: {
    painPoints: [
      "A empresa para quando voce para.",
      "Falta clareza de prioridade para o proximo ciclo.",
      "Crescimento sem estrutura, com retrabalho constante.",
      "Networking sem estrategia de negocio concreta.",
    ],
    promise: "Sair com direcao estrategica para crescer com mais previsibilidade e liberdade.",
    ctaAfterSpeakers: "QUERO CRESCER COM ESTRATEGIA",
    ctaAfterSocial: "QUERO FAZER PARTE",
    ctaAfterPrices: "GARANTIR POR 12x R$ 41,42",
    ctaFinal: "GARANTIR AGORA — ULTIMAS VAGAS",
  },
};

const LOT_CONFIG = {
  currentLot: "Lote 2",
  nextLot: "Lote 3",
  percentFilled: 73,
  currentPrice: "R$ 497",
  nextPrice: "R$ 697",
  remainingSeats: 27,
};

const FAQS = [
  {
    q: "Para quem essa trilha e indicada?",
    a: "Para empresarios, gestores e profissionais que querem acelerar resultado com aplicacao pratica, sem teoria vazia.",
  },
  {
    q: "Vale a pena vir de fora de Manaus?",
    a: "Sim. O networking, as trilhas praticas e os cases ao vivo foram pensados para gerar retorno direto para quem se desloca.",
  },
  {
    q: "Posso parcelar o ingresso?",
    a: "Sim. Parcelamento em ate 12x no cartao com confirmacao imediata.",
  },
  {
    q: "O que inclui no ingresso?",
    a: "Acesso completo aos dois dias, trilhas de conteudo, area de conexoes e experiencias oficiais do evento.",
  },
  {
    q: "E se eu nao puder comparecer?",
    a: "Voce pode transferir sua vaga sem custo dentro do prazo definido nas politicas do evento.",
  },
  {
    q: "Como funciona logistica de hotel e estacionamento?",
    a: "Apos a compra, voce recebe o guia com recomendacoes de hospedagem, acesso ao local e informacoes de estacionamento.",
  },
];

const toVimeoEmbedUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    const id = parsedUrl.pathname.split("/").filter(Boolean)[0];

    const params = new URLSearchParams(parsedUrl.search);
    params.set("autoplay", "1");
    params.set("title", "0");
    params.set("byline", "0");
    params.set("portrait", "0");

    return `https://player.vimeo.com/video/${id}?${params.toString()}`;
  } catch {
    return url;
  }
};

const formatAnimatedMetricValue = (value, metric) => {
  const baseValue = metric.useThousands
    ? value.toLocaleString("pt-BR")
    : String(value);
  return `${metric.prefix}${baseValue}${metric.suffix}`;
};

function onlyDigits(value = "") {
  return value.replace(/\D/g, "");
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function normalizeHostname(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^www\./, "");
}

function detectSiteOriginFromUrl(value = "") {
  if (!value) return "";

  try {
    const hostname = normalizeHostname(new URL(value).hostname);
    if (!hostname) return "";
    if (hostname.includes("dsx.com.vc")) return "dsx";
    if (hostname.includes("digitalhub.com.vc")) return "digitalhub";
    if (hostname.includes("digitaleduca.com.vc")) return "digitaleduca";
    return hostname;
  } catch {
    return "";
  }
}

function isMissingColumnError(error) {
  const code = String(error?.code || "").toUpperCase();
  const message = String(error?.message || "").toLowerCase();
  return (
    code === "PGRST204" ||
    message.includes("column") ||
    message.includes("schema cache")
  );
}

function resolveRdConversionIdentifier(segmentName = "", origin = "") {
  const normalizedSegmentName = String(segmentName || "").trim() || "Segmento";
  const normalized = String(origin || "").trim().toLowerCase();

  if (normalized.includes("vip")) {
    return `DSX 2026 - LP: ${normalizedSegmentName} - Formulário VIP`;
  }
  if (normalized.includes("standard")) {
    return `DSX 2026 - LP: ${normalizedSegmentName} - Formulário Standard`;
  }
  if (normalized.includes("grupo") && normalized.includes("10")) {
    return `DSX 2026 - LP: ${normalizedSegmentName} - Formulário Grupo 10`;
  }
  if (normalized.includes("grupo") && normalized.includes("5")) {
    return `DSX 2026 - LP: ${normalizedSegmentName} - Formulário Grupo 5`;
  }

  return `DSX 2026 - LP: ${normalizedSegmentName} - Formulário Standard`;
}

const SpeakerLandingTemplate = ({ speaker }) => {
  const speakerSlug = String(speaker?.slug || "").toLowerCase();
  const useNegociosTemplate =
    speakerSlug === "negocios" ||
    speakerSlug === "marketing" ||
    speakerSlug === "vendas" ||
    speakerSlug === "inovacao";
  const [isDepoimentoModalOpen, setIsDepoimentoModalOpen] = useState(false);
  const [activeDepoimentoVideo, setActiveDepoimentoVideo] = useState(null);
  const [negociosFaqOpenIndex, setNegociosFaqOpenIndex] = useState(0);
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);
  const [isMobilePassaportes, setIsMobilePassaportes] = useState(false);
  const [segmentSpeakerIndex, setSegmentSpeakerIndex] = useState(0);
  const [segmentCardsPerView, setSegmentCardsPerView] = useState(3);
  const [isDraggingSegmentSpeakers, setIsDraggingSegmentSpeakers] = useState(false);
  const segmentSpeakerDragStartXRef = useRef(null);
  const [shouldRenderNegociosBelowFold, setShouldRenderNegociosBelowFold] = useState(false);
  const negociosBelowFoldTriggerRef = useRef(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [pendingSymplaUrl, setPendingSymplaUrl] = useState(
    speaker?.ctaLink || NEW_VENDAS_SYMPLA_URL,
  );
  const [selectedPassOrigin, setSelectedPassOrigin] = useState("Standard");
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    cargo: "",
  });
  const [sourceData, setSourceData] = useState({
    page_url: "",
    site_origin: "",
    site_hostname: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [leadStatus, setLeadStatus] = useState("idle");

  const theme = useMemo(() => {
    return THEME_COPY[speakerSlug] || THEME_COPY.marketing;
  }, [speakerSlug]);
  const errors = useMemo(() => {
    const currentErrors = {};

    if (!leadForm.name.trim()) {
      currentErrors.name = "Informe seu nome completo.";
    }
    if (!isValidEmail(leadForm.email)) {
      currentErrors.email = "Informe um e-mail válido.";
    }

    const phone = onlyDigits(leadForm.phone);
    if (!(phone.length === 10 || phone.length === 11)) {
      currentErrors.phone = "Informe um WhatsApp com DDD.";
    }

    if (!leadForm.cargo) {
      currentErrors.cargo = "Selecione seu perfil.";
    }

    return currentErrors;
  }, [leadForm]);
  const isLeadFormValid = Object.keys(errors).length === 0;
  const canSubmitLead = !loading;
  const immersionMetricDefs = useMemo(
    () => [
      { target: 2000, label: "PARTICIPANTES", prefix: "+", suffix: "", useThousands: true },
      { target: 40, label: "PALESTRAS", prefix: "+", suffix: "", useThousands: false },
      { target: 3, label: "PALCOS", prefix: "", suffix: "", useThousands: false },
    ],
    [],
  );
  const animatedMetricValues = useMemo(
    () => immersionMetricDefs.map((metric) => metric.target),
    [immersionMetricDefs],
  );

  useEffect(() => {
    if (!useNegociosTemplate) {
      setShouldLoadHeroVideo(false);
      return undefined;
    }

    let frameA = 0;
    let frameB = 0;

    frameA = window.requestAnimationFrame(() => {
      frameB = window.requestAnimationFrame(() => {
        setShouldLoadHeroVideo(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(frameA);
      window.cancelAnimationFrame(frameB);
    };
  }, [useNegociosTemplate]);

  useEffect(() => {
    if (!useNegociosTemplate) return undefined;

    const triggerEl = negociosBelowFoldTriggerRef.current;
    if (!triggerEl) return undefined;

    if (!("IntersectionObserver" in window)) {
      const timeoutId = window.setTimeout(() => setShouldRenderNegociosBelowFold(true), 900);
      return () => window.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderNegociosBelowFold(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(triggerEl);
    return () => observer.disconnect();
  }, [useNegociosTemplate, speakerSlug]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobilePassaportes(window.innerWidth <= 1015);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const segmentSpeakerCount = speaker?.segmentSpeakers?.length || 0;
  const maxSegmentSpeakerIndex = Math.max(segmentSpeakerCount - segmentCardsPerView, 0);

  useEffect(() => {
    if (!useNegociosTemplate) return undefined;

    const getCardsPerView = () => {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    };

    const applyCardsPerView = () => {
      const nextCardsPerView = getCardsPerView();
      setSegmentCardsPerView(nextCardsPerView);
      setSegmentSpeakerIndex((current) =>
        Math.min(current, Math.max(segmentSpeakerCount - nextCardsPerView, 0)),
      );
    };

    applyCardsPerView();
    window.addEventListener("resize", applyCardsPerView);
    return () => window.removeEventListener("resize", applyCardsPerView);
  }, [useNegociosTemplate, segmentSpeakerCount]);

  useEffect(() => {
    if (!useNegociosTemplate || maxSegmentSpeakerIndex === 0 || isDraggingSegmentSpeakers) return undefined;

    const autoplayId = window.setInterval(() => {
      setSegmentSpeakerIndex((current) =>
        current >= maxSegmentSpeakerIndex ? 0 : current + 1,
      );
    }, 4200);

    return () => window.clearInterval(autoplayId);
  }, [useNegociosTemplate, maxSegmentSpeakerIndex, isDraggingSegmentSpeakers]);

  useEffect(() => {
    if (!useNegociosTemplate) return;
    setSegmentSpeakerIndex(0);
  }, [useNegociosTemplate, speaker?.slug]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentUrl = window.location.href;
    const siteHostname = normalizeHostname(window.location.hostname);
    const siteOrigin = detectSiteOriginFromUrl(currentUrl) || siteHostname;

    setSourceData({
      page_url: currentUrl,
      site_origin: siteOrigin,
      site_hostname: siteHostname,
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    });
  }, []);

  useEffect(() => {
    if (!showLeadModal) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [showLeadModal]);

  const goToNextSegmentSpeakerSlide = () => {
    setSegmentSpeakerIndex((current) =>
      current >= maxSegmentSpeakerIndex ? 0 : current + 1,
    );
  };

  const goToPreviousSegmentSpeakerSlide = () => {
    setSegmentSpeakerIndex((current) =>
      current <= 0 ? maxSegmentSpeakerIndex : current - 1,
    );
  };

  const handleSegmentSpeakerDragStart = (clientX) => {
    segmentSpeakerDragStartXRef.current = clientX;
    setIsDraggingSegmentSpeakers(true);
  };

  const handleSegmentSpeakerDragEnd = (clientX) => {
    if (segmentSpeakerDragStartXRef.current === null) return;

    const deltaX = clientX - segmentSpeakerDragStartXRef.current;
    const swipeThreshold = 50;

    if (deltaX <= -swipeThreshold) {
      goToNextSegmentSpeakerSlide();
    } else if (deltaX >= swipeThreshold) {
      goToPreviousSegmentSpeakerSlide();
    }

    segmentSpeakerDragStartXRef.current = null;
    setIsDraggingSegmentSpeakers(false);
  };

  const openLeadGateForSympla = (targetLink, formOrigin) => {
    if (loading) return;

    setPendingSymplaUrl(targetLink || speaker?.ctaLink || NEW_VENDAS_SYMPLA_URL);
    setSelectedPassOrigin(formOrigin || "Standard");
    setLeadStatus("idle");
    setMensagem("Para continuar com a compra, preencha e envie o formulário.");
    setShowLeadModal(true);
  };

  const closeLeadModal = () => {
    if (loading) return;
    setShowLeadModal(false);
    setLeadStatus("idle");
    setMensagem("");
  };

  const handleWhatsappMask = (event) => {
    let value = event.target.value;
    value = onlyDigits(value).slice(0, 11);

    if (!value.length) {
      setLeadForm((prev) => ({ ...prev, phone: "" }));
      return;
    }

    if (value.length <= 2) value = `(${value}`;
    else if (value.length <= 6)
      value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    else if (value.length <= 10)
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");

    setLeadForm((prev) => ({ ...prev, phone: value }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    setMensagem("");

    if (!isLeadFormValid || !canSubmitLead) {
      setLeadStatus("error");
      setMensagem("Revise os campos e tente novamente.");
      return;
    }

    setLoading(true);
    setLeadStatus("loading");

    try {
      const formData = new FormData(event.target);
      const name = formData.get("name")?.toString().trim() || "";
      const email = formData.get("email")?.toString().trim().toLowerCase() || "";
      const phone = formData.get("phone")?.toString().trim() || "";
      const cargo = formData.get("cargo")?.toString().trim() || "";
      const resolvedFormOrigin = selectedPassOrigin || "Standard";
      const lpIdentifier = `LP DSX - ${String(speaker?.name || "Segmento").trim()}`;

      const payload = {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: resolveRdConversionIdentifier(
            speaker?.name,
            resolvedFormOrigin,
          ),
          name,
          email,
          personal_phone: phone,
          voce_e: cargo,
          cf_voce_e: cargo,
          cf_cargo: cargo,
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
          cf_origem_formulario: formatDsxFormOrigin(
            resolvedFormOrigin,
            "Home Principal",
          ),
        },
        tags: ["dsx-hometeste", "popup"],
        source: "landing-home-teste",
      };

      const rdResult = await fetch(RD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!rdResult.ok) {
        throw new Error("Erro ao enviar para RD Station");
      }

      const supabaseRuntime = await import("../../../lib/supabaseClient");
      if (supabaseRuntime.isSupabaseConfigured) {
        const supabase = await supabaseRuntime.getSupabaseClient();
        if (supabase) {
          const nowIso = new Date().toISOString();
          const trackerState = window.DSXTracker?.getState?.() || {};
          const sessionId =
            trackerState.sessionId ||
            window.crypto?.randomUUID?.() ||
            `session-${Date.now()}`;

          const profilePayload = {
            lead_email: email,
            lead_name: name,
            lead_phone: phone,
            lead_cargo: cargo,
            site_origin: sourceData.site_origin || null,
            site_hostname:
              sourceData.site_hostname || window.location.hostname || null,
            lp_identifier: lpIdentifier,
            first_converted_at: nowIso,
            last_seen_at: nowIso,
            has_sympla_redirected: true,
            last_sympla_redirected_at: nowIso,
          };

          let { error: profileError } = await supabase
            .from("tracking_lead_profiles")
            .upsert([profilePayload], { onConflict: "lead_email" });

          if (profileError && isMissingColumnError(profileError)) {
            const fallbackProfilePayload = { ...profilePayload };
            delete fallbackProfilePayload.site_origin;
            delete fallbackProfilePayload.site_hostname;
            let retry = await supabase
              .from("tracking_lead_profiles")
              .upsert([fallbackProfilePayload], { onConflict: "lead_email" });
            profileError = retry.error;

            if (profileError && isMissingColumnError(profileError)) {
              const fallbackProfileWithoutLp = { ...fallbackProfilePayload };
              delete fallbackProfileWithoutLp.lp_identifier;
              retry = await supabase
                .from("tracking_lead_profiles")
                .upsert([fallbackProfileWithoutLp], { onConflict: "lead_email" });
              profileError = retry.error;
            }
          }

          if (!profileError) {
            // Best-effort update to persist LP identifier when fallback inserts omit some fields.
            try {
              await supabase
                .from("tracking_lead_profiles")
                .update({ lp_identifier: lpIdentifier })
                .eq("lead_email", email);
            } catch {
              // Ignore when column is unavailable or policy prevents this update.
            }

            const sessionPayload = {
              session_id: sessionId,
              lead_name: name,
              lead_email: email,
              lead_phone: phone,
              lead_cargo: cargo,
              site_origin: sourceData.site_origin || null,
              site_hostname:
                sourceData.site_hostname || window.location.hostname || null,
              lp_identifier: lpIdentifier,
              page:
                sourceData.page_url ||
                window.location.pathname + window.location.search,
              referrer: document.referrer || null,
              utm_source: sourceData.utm_source || sourceData.site_origin || null,
              utm_medium: sourceData.utm_medium || null,
              utm_campaign: sourceData.utm_campaign || null,
              utm_content: sourceData.utm_content || null,
              utm_term: sourceData.utm_term || null,
              converted_at: nowIso,
              has_sympla_redirected: true,
              sympla_redirected_at: nowIso,
            };

            let { error: sessionError } = await supabase
              .from("tracking_lead_sessions")
              .upsert([sessionPayload], { onConflict: "session_id" });

            if (sessionError && isMissingColumnError(sessionError)) {
              const fallbackSessionPayload = { ...sessionPayload };
              delete fallbackSessionPayload.site_origin;
              delete fallbackSessionPayload.site_hostname;
              let retry = await supabase
                .from("tracking_lead_sessions")
                .upsert([fallbackSessionPayload], { onConflict: "session_id" });
              sessionError = retry.error;

              if (sessionError && isMissingColumnError(sessionError)) {
                const fallbackSessionWithoutLp = { ...fallbackSessionPayload };
                delete fallbackSessionWithoutLp.lp_identifier;
                retry = await supabase
                  .from("tracking_lead_sessions")
                  .upsert([fallbackSessionWithoutLp], { onConflict: "session_id" });
                sessionError = retry.error;
              }
            }

            if (!sessionError) {
              // Best-effort update to persist LP identifier when fallback inserts omit some fields.
              try {
                await supabase
                  .from("tracking_lead_sessions")
                  .update({ lp_identifier: lpIdentifier })
                  .eq("session_id", sessionId);
              } catch {
                // Ignore when column is unavailable or policy prevents this update.
              }
            }
          }
        }
      }

      setLeadStatus("success");
      setMensagem("Cadastro enviado! Em breve entraremos em contato.");
      setLeadForm({ name: "", phone: "", email: "", cargo: "" });
      event.target.reset();

      window.setTimeout(() => {
        const targetUrl =
          pendingSymplaUrl || speaker?.ctaLink || NEW_VENDAS_SYMPLA_URL;
        setShowLeadModal(false);
        window.location.href = targetUrl;
      }, 700);
    } catch (error) {
      setLeadStatus("error");
      setMensagem(error?.message || "Erro ao enviar formulário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!speaker) return null;
  const activePainPoints = speaker.painPoints?.length
    ? speaker.painPoints
    : theme.painPoints;
  const activeFaqs = speaker.faqs?.length ? speaker.faqs : FAQS;
  const activeQuotes = speaker.socialProofQuotes?.length
    ? speaker.socialProofQuotes
    : [
      "Saí com funil pronto e reduzi CPL em 32% em 30 dias.",
      "Ajustamos o processo comercial e dobramos taxa de fechamento.",
      "Networking do evento virou parceria e novo canal de receita.",
    ];
  const activeDepoimentoEmbedUrl = activeDepoimentoVideo?.video
    ? toVimeoEmbedUrl(activeDepoimentoVideo.video)
    : "";

  if (useNegociosTemplate) {
    const socialVideos = speaker.socialProofVideos?.length
      ? speaker.socialProofVideos
      : [
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
      ];
    const handleBuyPassaporte = (targetLink, formOrigin) => {
      openLeadGateForSympla(targetLink, formOrigin);
    };
    const immersionHighlights = [
      { value: "+2mil", label: "Participantes" },
      { value: "+40", label: "palestras" },
      { value: "3 PALCOS", label: "simultâneos" },
      { value: "FEIRA", label: "de Negócios" },
    ];

    return (
      <section className="relative isolate overflow-hidden bg-black pb-16 text-white md:pb-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(245,192,43,0.18)_0%,rgba(0,0,0,0.96)_48%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(245,192,43,0.08)_0%,rgba(0,0,0,0)_44%,rgba(0,0,0,0.92)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl space-y-12 px-4 pb-16 pt-8 md:space-y-16 md:pt-12">
          <section className="overflow-hidden rounded-[28px] border border-[#F5C02B]/35 bg-[#0B0B0B]">
            <div className="p-5 pb-6 md:p-10">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mx-auto inline-flex w-fit rounded-sm bg-[#0A0A0A] px-2 py-1">
                  <img
                    src="/logo-dsx-horizontal-2.svg"
                    alt="DSX 2026"
                    className="h-12 w-auto object-contain md:h-14"
                  />
                </div>
                <h1 className="mt-4 font-anton text-[clamp(1.6rem,5vw,3.3rem)] uppercase leading-[1.2]">{speaker.headline}</h1>

                <div className="mx-auto mt-6 w-full max-w-3xl overflow-hidden rounded-[24px]">
                  {shouldLoadHeroVideo ? (
                    <iframe
                      src="https://player.vimeo.com/video/1146735494?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
                      title={`Aftermovie DSX - ${speaker.name}`}
                      loading={useNegociosTemplate ? "eager" : "lazy"}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="h-[220px] w-full border-0 sm:h-[260px] md:h-[530px]"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShouldLoadHeroVideo(true)}
                      className="group grid h-[220px] w-full place-items-center bg-[#121212] sm:h-[260px] md:h-[530px]"
                      aria-label="Carregar vídeo do evento"
                    >
                      <span className="rounded-full border border-[#F5C02B]/50 px-5 py-2 font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-[#F5C02B] transition group-hover:bg-[#F5C02B]/10">
                        Assistir vídeo
                      </span>
                    </button>
                  )}
                </div>

                <p className="mx-auto mt-4 max-w-2xl font-jamjuree text-base text-white/85 md:text-lg">{speaker.subtitle}</p>
                <p className="mx-auto mt-4 max-w-2xl border-l-2 border-[#F5C02B]/50 pl-4 text-left font-jamjuree text-[#F9E1A5]">{speaker.hook}</p>

                <div className="mx-auto mt-5 w-full max-w-md space-y-2 text-left text-white/90">
                  <div className="flex w-full items-start justify-start gap-2">
                    <CalendarDays size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                    <p className="font-jamjuree text-[0.98rem] leading-relaxed">{speaker.event.date}</p>
                  </div>
                  <div className="flex w-full items-start justify-start gap-2">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                    <p className="font-jamjuree text-[0.98rem] leading-relaxed">{speaker.event.city}</p>
                  </div>
                </div>

                <p className="mt-6 font-jamjuree text-sm font-bold uppercase tracking-[0.1em] text-[#F5C02B]">
                  3º lote • Poucas vagas disponíveis
                </p>
                <div className="mx-auto mt-3 w-fit">
                  <NewVendasHeaderMask
                    titulo="GARANTIR MEU PASSAPORTE"
                    link="#passaportes"
                    textColor="#FFFFFF"
                    backgroundColor="#1E1A12"
                    font="700"
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </section>

          <div ref={negociosBelowFoldTriggerRef} className="h-px w-full" aria-hidden="true" />
          {shouldRenderNegociosBelowFold ? (
            <div
              className="space-y-12 md:space-y-16"
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: "1px 3600px",
              }}
            >
          <section className="rounded-2xl border border-[#F5C02B]/35 bg-[#0E0E0E]/85 p-6">
            <h2 className="font-anton text-[clamp(1.3rem,5vw,3.3rem)] text-center md:text-start uppercase text-[#FF8B8B] leading-[1.22]">
              {speaker.about}
            </h2>
            <ul className="mt-6 space-y-3 font-jamjuree text-white/85">
              {activePainPoints.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <XCircle size={18} className="mt-0.5 shrink-0 text-[#FF8B8B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-jamjuree text-base text-[#F8E3AA]">{speaker.transitionLine}</p>
          </section>

          <section>
            <h2 className="font-anton text-3xl uppercase text-[#F5C02B] md:text-4xl text-center">{speaker.speakersHeadline}</h2>
            <div className="relative mx-auto mt-6 w-full max-w-[920px]">
              <div
                className={`overflow-hidden select-none ${isDraggingSegmentSpeakers ? "cursor-grabbing" : "cursor-grab"}`}
                style={{ touchAction: "pan-y" }}
                onMouseDown={(event) => handleSegmentSpeakerDragStart(event.clientX)}
                onMouseUp={(event) => handleSegmentSpeakerDragEnd(event.clientX)}
                onMouseLeave={(event) => {
                  if (segmentSpeakerDragStartXRef.current !== null) {
                    handleSegmentSpeakerDragEnd(event.clientX);
                  }
                }}
                onTouchStart={(event) => {
                  const touch = event.touches[0];
                  if (!touch) return;
                  handleSegmentSpeakerDragStart(touch.clientX);
                }}
                onTouchEnd={(event) => {
                  const touch = event.changedTouches[0];
                  if (!touch) return;
                  handleSegmentSpeakerDragEnd(touch.clientX);
                }}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${(segmentSpeakerIndex * 100) / segmentCardsPerView}%)`,
                  }}
                >
                  {(speaker.segmentSpeakers || []).map((item) => (
                    <div
                      key={`${item.name}-${item.image}`}
                      className="w-full shrink-0 px-0.5 sm:w-1/2 sm:px-1 lg:w-1/3 lg:px-1.5"
                    >
                      <article className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#F5C02B]/35 bg-black/80 text-left shadow-lg">
                        <div className="relative h-[220px] w-full overflow-hidden bg-[#000000] sm:h-[250px] md:h-[270px]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain object-center"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            onDragStart={(event) => event.preventDefault()}
                          />
                        </div>

                        <div className="px-3.5 pt-3">
                          <h4 className="font-bebas text-[1.75rem] uppercase tracking-[0.02em] text-[#F5A205]">
                            {item.name}
                          </h4>
                        </div>
                        <div className="flex-1 px-3.5 pb-3.5">
                          <p
                            className="font-jamjuree text-sm leading-relaxed text-white/90 md:text-[14px]"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 5,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.bio}
                          </p>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {maxSegmentSpeakerIndex > 0 ? (
                <>
                  <button
                    type="button"
                    onClick={goToPreviousSegmentSpeakerSlide}
                    aria-label="Slide anterior de palestrantes"
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 text-[#F5C02B] transition hover:scale-110 hover:text-[#FFD45A] md:left-3"
                  >
                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.4} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextSegmentSpeakerSlide}
                    aria-label="Próximo slide de palestrantes"
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-[#F5C02B] transition hover:scale-110 hover:text-[#FFD45A] md:right-3"
                  >
                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.4} />
                  </button>
                </>
              ) : null}
            </div>
          </section>

          <section className="rounded-2xl bg-[#ECECEC] p-6 text-black md:p-8">
            <h2 className="font-anton text-[clamp(1.6rem,5vw,3.3rem)] text-center md:text-start uppercase leading-[1.2] md:text-4xl">{speaker.outcomesHeadline}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {speaker.outcomes.map((item) => {
                const title = typeof item === "string" ? "" : item?.title || "";
                const description =
                  typeof item === "string" ? item : item?.description || "";

                return (
                  <article key={typeof item === "string" ? item : `${title}-${description}`} className="rounded-2xl bg-white p-4 shadow-[0_10px_22px_rgba(0,0,0,0.08)]">
                    <div className="flex items-start gap-2 font-jamjuree text-sm text-[#1A1A1A]">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#D98A00]" />
                      <div>
                        {title ? <p className="font-bold">{title}</p> : null}
                        <p>{description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-[#F5C02B]/35 bg-[#0C0C0C]/90 p-6">
            <h2 className="font-anton text-[clamp(1.6rem,5vw,3.3rem)] leading-[1.22] uppercase text-center">{speaker.socialProofHeadline}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {socialVideos.map((item, index) => (
                <button
                  key={`${item.nome}-${index}`}
                  type="button"
                  onClick={() => {
                    setActiveDepoimentoVideo(item);
                    setIsDepoimentoModalOpen(true);
                  }}
                  className="group relative overflow-hidden rounded-xl bg-[#141414] p-0 text-left"
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <img
                      src={item.thumb}
                      alt={item.nome}
                      className="block h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/25" />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-white/25 text-white backdrop-blur-sm transition group-hover:scale-105">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M9 18V6L19 12L9 18Z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="px-3 pb-4 pt-3">
                    <p className="font-anton text-[1.6rem] uppercase leading-none text-white">{item.nome}</p>
                    <p className="mt-1 font-jamjuree text-xs font-bold uppercase tracking-[0.08em] text-[#F5C02B]">
                      {item.tipo}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-7 w-fit">
              <NewVendasHeaderMask
                titulo="QUERO FAZER PARTE"
                link={speaker.ctaLink}
                textColor="#FFFFFF"
                backgroundColor="#17140D"
                font="700"
                size="lg"
              />
            </div>
          </section>

          {isDepoimentoModalOpen ? (
            <div className="fixed inset-0 z-[220] grid place-items-center px-4">
              <button
                type="button"
                aria-label="Fechar vídeo"
                className="absolute inset-0 bg-black/75"
                onClick={() => {
                  setIsDepoimentoModalOpen(false);
                  setActiveDepoimentoVideo(null);
                }}
              />
              <div className="relative z-[221] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#F5C02B]/35 bg-black">
                <div className="flex items-center justify-between border-b border-[#F5C02B]/35 px-4 py-3">
                  <p className="font-anton text-xl uppercase text-white">
                    {activeDepoimentoVideo?.nome || "Depoimento"}
                  </p>
                  <button
                    type="button"
                    className="text-white/80 transition hover:text-white"
                    onClick={() => {
                      setIsDepoimentoModalOpen(false);
                      setActiveDepoimentoVideo(null);
                    }}
                    aria-label="Fechar"
                  >
                    ✕
                  </button>
                </div>
                <div className="aspect-video bg-black">
                  {activeDepoimentoEmbedUrl ? (
                    <iframe
                      src={activeDepoimentoEmbedUrl}
                      className="h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                      title={`Depoimento ${activeDepoimentoVideo?.nome || ""}`}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          <section className="rounded-2xl border border-[#F5C02B]/35 bg-[linear-gradient(150deg,rgba(16,12,6,0.88)_0%,rgba(7,7,7,0.92)_78%)] p-6">
            <h2 className="font-anton text-[clamp(1.4rem,5vw,3.3rem)] text-center leading-[1.22] uppercase text-[#F5C02B]">{speaker.immersionHeadline}</h2>
            <p className="mt-4 text-center font-jamjuree text-base font-bold uppercase tracking-[0.08em] text-white/90 md:text-lg">
              2 dias de imersão estratégica com quem domina o mercado.
            </p>
            <div className="mt-5 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
              {immersionHighlights.map((item) => (
                <div key={`${item.value}-${item.label}`} className="nv-highlight-wrap w-full">
                  <div className="nv-highlight-inner flex min-h-[96px] flex-col items-center justify-center px-3 py-3 text-center md:min-h-[120px]">
                    <p className="font-jamjuree text-[15px] font-extrabold leading-none text-[#F5C02B] md:text-[30px]">
                      {item.value}
                    </p>
                    <p className="mt-1 font-jamjuree text-[9px] font-bold uppercase tracking-[0.02em] text-white md:text-[15px]">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-left text-white/90">
              <div className="flex w-full items-start justify-start gap-2">
                <CalendarDays size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                <p className="font-jamjuree text-[1.08rem] font-bold leading-relaxed md:text-[1.18rem]">
                  {speaker.event.date}
                </p>
              </div>
              <div className="flex w-full items-start justify-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                <p className="font-jamjuree text-[1.08rem] font-bold leading-relaxed md:text-[1.18rem]">
                  {speaker.event.city}
                </p>
              </div>
            </div>
            <p className="mt-6 rounded-xl border border-[#F5C02B]/35 bg-[#15120B] p-4 font-jamjuree text-sm text-[#F8E3AA]">
              {speaker.valueAnchor}
            </p>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#F5C02B]/35">
            <PassaportesSection
              isMobile={isMobilePassaportes}
              onBuyPassaporte={handleBuyPassaporte}
              hidePassaporteButtons={false}
            />
          </section>

          <section className="rounded-2xl border border-[#F5C02B]/35 bg-black p-6">
            <h2 className="font-anton text-3xl uppercase">FAQ</h2>
            <div className="mt-6 rounded-2xl border border-[#F5C02B]/35 bg-black p-2 md:p-3">
              {activeFaqs.map((item, index) => {
                const isOpen = negociosFaqOpenIndex === index;

                return (
                  <article
                    key={item.q}
                    className="border-b border-[#F5C02B]/35 px-3 py-4 last:border-b-0 md:px-4"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 text-left"
                      onClick={() =>
                        setNegociosFaqOpenIndex((current) =>
                          current === index ? -1 : index,
                        )
                      }
                      aria-expanded={isOpen}
                    >
                      <h3 className="font-jamjuree text-lg font-semibold leading-snug text-white md:text-[1.35rem]">
                        {item.q}
                      </h3>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#F5C02B]/35 text-[#F5C02B] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                          }`}
                        aria-hidden="true"
                      >
                        <img src="/arrow-down.svg" alt="" className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${isOpen
                        ? "mt-3 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <p className="overflow-hidden font-jamjuree text-[1rem] leading-relaxed text-white/80">
                        {item.a}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[26px] border border-[#F5C02B]/35 bg-black p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-black" />
            </div>
            <div className="relative">
              <h2 className="font-anton leading-[1.22] uppercase text-center text-[clamp(1.5rem,5vw,3.3rem)] md:text-start">{speaker.finalHeadline}</h2>
              <p className="mt-2 font-jamjuree text-white/85">{speaker.finalSubheadline}</p>
              <ul className="mt-4 space-y-2 font-jamjuree text-white/90">
                {speaker.finalRecap.map((item) => (
                  <li key={item} className="inline-flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-[#F5C02B]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 w-fit">
                <NewVendasHeaderMask
                  titulo="GARANTIR MEU PASSAPORTE"
                  link="#passaportes"
                  textColor="#FFFFFF"
                  backgroundColor="#17140D"
                  font="700"
                  size="lg"
                />
              </div>
            </div>
          </section>

          <FooterSection />
            </div>
          ) : (
            <div className="min-h-[720px]" aria-hidden="true" />
          )}
        </div>
        {showLeadModal ? (
          <LeadPopupFormHomeTeste
            isOpen={showLeadModal}
            canClose
            onClose={closeLeadModal}
            onSubmit={handleLeadSubmit}
            leadForm={leadForm}
            setLeadForm={setLeadForm}
            onWhatsappChange={handleWhatsappMask}
            leadStatus={leadStatus}
            message={mensagem}
            loading={loading}
            canSubmit={canSubmitLead}
            headline="GARANTA SUA VAGA"
            subheading=""
            description=""
          />
        ) : null}
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-black pb-24 text-white md:pb-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(245,192,43,0.18)_0%,rgba(0,0,0,0.96)_48%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(245,192,43,0.08)_0%,rgba(0,0,0,0)_44%,rgba(165,48,48,0.12)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-12 px-4 pb-16 pt-8 md:space-y-16 md:pt-12">
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0B0B]">
          <div className="grid items-center gap-5 p-5 pb-6 md:grid-cols-[1.08fr_0.92fr] md:p-10">
            <div className="text-center md:text-left">
              <div className="inline-flex w-fit rounded-sm bg-[#0A0A0A] px-2 py-1 mx-auto md:mx-0">
                <img
                  src="/logo-dsx-horizontal-2.svg"
                  alt="DSX 2026"
                  className="h-12 w-auto object-contain md:h-14"
                />
              </div>
              <p className="mt-3 font-jamjuree text-xs font-bold uppercase tracking-[0.14em] text-[#F5C02B] md:text-sm">
                {speaker.name} | {speaker.event.name}
              </p>
              <h1 className="mt-3 font-anton text-[clamp(1.6rem,5vw,3.3rem)] uppercase leading-[1.2]">{speaker.headline}</h1>
              <p className="mt-4 max-w-2xl font-jamjuree text-base text-white/85 md:text-lg mx-auto md:mx-0">{speaker.subtitle}</p>
              <p className="mt-4 border-l-2 border-[#F5C02B]/50 pl-4 font-jamjuree text-[#F9E1A5] text-left md:text-left">{speaker.hook}</p>

              <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-4 md:mx-0 md:justify-start">
                {immersionMetricDefs.map((item, index) => (
                  <div key={item.label} className="min-w-0 text-center md:text-left">
                    <p className="font-jamjuree text-[28px] font-extrabold leading-none text-white md:text-[44px]">
                      {formatAnimatedMetricValue(animatedMetricValues[index] ?? 0, item)}
                    </p>
                    <p className="mt-1 font-jamjuree text-[11px] font-bold uppercase tracking-[0.02em] text-white md:text-[14px]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-left text-white/90">
                <div className="flex w-full items-start justify-start gap-2">
                  <CalendarDays size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                  <p className="font-jamjuree text-[0.98rem] leading-relaxed">{speaker.event.date}</p>
                </div>
                <div className="flex w-full items-start justify-start gap-2">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                  <p className="font-jamjuree text-[0.98rem] leading-relaxed">{speaker.event.city}</p>
                </div>
              </div>

              <div className="mt-6 w-fit mx-auto md:mx-0">
                <NewVendasHeaderMask
                  titulo="GARANTIR MINHA VAGA"
                  link={speaker.ctaLink}
                  textColor="#FFFFFF"
                  backgroundColor="#17140D"
                  font="700"
                  size="lg"
                />
              </div>
              <p className="mt-3 text-center font-jamjuree text-xs font-bold uppercase tracking-[0.1em] text-[#F5C02B] md:text-left">
                {LOT_CONFIG.currentLot} - ultimas {LOT_CONFIG.remainingSeats} vagas neste preco
              </p>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/60 shadow-[0_0_0_1px_rgba(255,221,130,0.12),0_20px_44px_rgba(0,0,0,0.55)]">
              {shouldLoadHeroVideo ? (
                <iframe
                  src="https://player.vimeo.com/video/1146735494?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
                  title={`Aftermovie DSX - ${speaker.name}`}
                  loading={useNegociosTemplate ? "eager" : "lazy"}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-[260px] w-full border-0 md:h-[530px]"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShouldLoadHeroVideo(true)}
                  className="group grid h-[260px] w-full place-items-center bg-[#121212] md:h-[530px]"
                  aria-label="Carregar vídeo do evento"
                >
                  <span className="rounded-full border border-[#F5C02B]/50 px-5 py-2 font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-[#F5C02B] transition group-hover:bg-[#F5C02B]/10">
                    Assistir vídeo
                  </span>
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#F5C02B]/35 bg-[linear-gradient(150deg,rgba(30,20,6,0.9)_0%,rgba(12,12,12,0.9)_82%)] p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-[#F5C02B]">
              {LOT_CONFIG.currentLot}: {LOT_CONFIG.percentFilled}% preenchido
            </p>
            <p className="font-jamjuree text-sm uppercase text-white/80">
              Hoje {LOT_CONFIG.currentPrice} | {LOT_CONFIG.nextLot}: {LOT_CONFIG.nextPrice}
            </p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#F5C02B_0%,#E89921_100%)]"
              style={{ width: `${LOT_CONFIG.percentFilled}%` }}
            />
          </div>
          <p className="mt-3 font-jamjuree text-sm text-white/75">
            O preco sobe quando as vagas acabam - sem aviso previo.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-[#0E0E0E]/85 p-6">
            <h2 className="font-anton text-3xl uppercase text-[#FF8B8B]">Isso esta acontecendo com voce?</h2>
            <ul className="mt-5 space-y-3 font-jamjuree text-white/85">
              {activePainPoints.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <XCircle size={18} className="mt-0.5 shrink-0 text-[#FF8B8B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-jamjuree text-sm uppercase tracking-[0.08em] text-[#F5C02B]">
              {speaker.transitionLine || "A boa noticia: existe um caminho pratico para virar esse jogo."}
            </p>
          </article>

          <article className="rounded-2xl border border-[#F5C02B]/45 bg-[linear-gradient(160deg,rgba(26,20,9,0.9)_0%,rgba(10,10,10,0.92)_70%)] p-6 shadow-[inset_0_1px_0_rgba(255,236,180,0.24)]">
            <h2 className="font-anton text-3xl uppercase text-[#F5C02B]">
              {speaker.outcomesHeadline || "Transformacao Que Voce Leva"}
            </h2>
            <ul className="mt-5 space-y-3 font-jamjuree text-white/90">
              {speaker.outcomes.map((item) => {
                const title = typeof item === "string" ? "" : item?.title || "";
                const description =
                  typeof item === "string" ? item : item?.description || "";

                return (
                  <li
                    key={typeof item === "string" ? item : `${title}-${description}`}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                    <div>
                      {title ? <p className="font-bold">{title}</p> : null}
                      <p>{description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 rounded-xl border border-[#F5C02B]/25 bg-[#171107] px-4 py-3 font-jamjuree text-sm text-[#F8E3AA]">
              Dado da ultima edicao: +{speaker.socialProof.attendees} participantes e +{speaker.socialProof.talks} palestras aplicadas.
            </p>
            <p className="mt-4 font-jamjuree text-white/80">{theme.promise}</p>
          </article>
        </section>

        <section>
          <p className="font-jamjuree text-xs font-semibold uppercase tracking-[0.12em] text-[#F5C02B]">
            Especialistas Confirmados
          </p>
          <h2 className="mt-1 font-anton text-3xl uppercase md:text-4xl">
            {speaker.speakersHeadline || `Palestrantes Da Trilha De ${speaker.name}`}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(speaker.segmentSpeakers || []).map((item, idx) => (
              <article
                key={`${item.name}-${item.image}`}
                className={`overflow-hidden rounded-2xl border border-[#F5C02B]/30 bg-[#080808] ${!item.bio && idx % 2 ? "lg:translate-y-4" : ""}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-[250px] w-full bg-black object-contain object-center p-2"
                />
                <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.92)_45%)] px-3 pb-4 pt-5">
                  <p className="font-anton text-[1.3rem] uppercase leading-none text-[#F5C02B]">{item.name}</p>
                  <p className={`${item.bio ? "mt-2 text-sm normal-case tracking-normal" : "mt-2 text-xs uppercase tracking-[0.06em]"} font-jamjuree text-white/75`}>
                    {item.bio || `+${10 + idx * 3} anos de mercado | case real na trilha de ${speaker.name}`}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-7 w-fit">
            <NewVendasHeaderMask
              titulo={theme.ctaAfterSpeakers}
              link={speaker.ctaLink}
              textColor="#FFFFFF"
              backgroundColor="#17140D"
              font="700"
              size="lg"
            />
            <p className="mt-2 font-jamjuree text-xs uppercase tracking-[0.08em] text-white/70">
              Pagamento seguro | Parcelamento | Transferencia permitida
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0D0D0D]/88 p-6">
          <h2 className="font-anton text-3xl uppercase">Programacao Da Trilha</h2>
          <div className="mt-5 space-y-4">
            {speaker.topics.map((topic, idx) => (
              <article key={topic} className="grid gap-2 rounded-xl border border-white/10 bg-[#141414]/85 p-4 md:grid-cols-[140px_1fr] md:items-center">
                <p className="font-jamjuree text-xs font-bold uppercase tracking-[0.1em] text-[#F5C02B]">
                  Bloco {idx + 1}
                </p>
                <div>
                  <h3 className="font-anton text-2xl uppercase text-white">{topic}</h3>
                  <p className="mt-1 font-jamjuree text-sm text-white/80">
                    Voce sai sabendo aplicar esse bloco no seu negocio com roteiro pratico.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-white/10 bg-[#0C0C0C]/90 p-6 md:grid-cols-2">
          <article>
            <h2 className="font-anton text-3xl uppercase">{speaker.socialProofHeadline || "Prova Social Real"}</h2>
            <p className="mt-2 font-jamjuree text-white/75">
              Resultado de quem participou e aplicou no proprio negocio.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-[#F5C02B]/25 bg-[#15120B] p-3">
                <p className="font-anton text-2xl text-[#F5C02B]">{speaker.socialProof.attendees}</p>
                <p className="font-jamjuree text-[11px] uppercase text-white/70">Participantes</p>
              </div>
              <div className="rounded-xl border border-[#F5C02B]/25 bg-[#15120B] p-3">
                <p className="font-anton text-2xl text-[#F5C02B]">{speaker.socialProof.talks}</p>
                <p className="font-jamjuree text-[11px] uppercase text-white/70">Palestras</p>
              </div>
              <div className="rounded-xl border border-[#F5C02B]/25 bg-[#15120B] p-3">
                <p className="font-anton text-2xl text-[#F5C02B]">{speaker.socialProof.exhibitors}</p>
                <p className="font-jamjuree text-[11px] uppercase text-white/70">Expositores</p>
              </div>
            </div>
          </article>
          <article className="space-y-3">
            {activeQuotes.map((quote) => (
              <blockquote key={quote} className="rounded-xl border border-white/10 bg-[#141414] p-4 font-jamjuree text-sm text-white/85">
                "{quote}"
              </blockquote>
            ))}
            <p className="font-jamjuree text-xs uppercase tracking-[0.1em] text-white/60">
              Empresas presentes: varejo | industria | servicos | tecnologia
            </p>
          </article>
          <div className="md:col-span-2 mt-2 w-fit">
            <NewVendasHeaderMask
              titulo={theme.ctaAfterSocial}
              link={speaker.ctaLink}
              textColor="#FFFFFF"
              backgroundColor="#17140D"
              font="700"
              size="lg"
            />
            <p className="mt-2 font-jamjuree text-xs uppercase tracking-[0.08em] text-white/70">
              Pagamento seguro | Parcelamento | Transferencia permitida
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#F5C02B]/30 bg-[linear-gradient(150deg,rgba(16,12,6,0.88)_0%,rgba(7,7,7,0.92)_78%)] p-6">
          <h2 className="font-anton text-3xl uppercase text-[#F5C02B]">
            {speaker.immersionHeadline || "Experiencia Do Evento"}
          </h2>
          {speaker.immersionBullets?.length ? (
            <ul className="mt-4 space-y-2 font-jamjuree text-white/85">
              {speaker.immersionBullets.map((item) => (
                <li key={item} className="inline-flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-[#F5C02B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 max-w-3xl font-jamjuree text-white/85">
              Ambiente imersivo, networking com decisores, coffee premium, area de conexoes e energia ao vivo que nao existe no online.
            </p>
          )}
          {speaker.valueAnchor ? (
            <p className="mt-5 rounded-xl border border-[#F5C02B]/25 bg-[#15120B] p-4 font-jamjuree text-sm text-[#F8E3AA]">
              {speaker.valueAnchor}
            </p>
          ) : null}
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <img src="/optimized/step1/BannerCallToActionVendas.webp" alt="Ambiente DSX" className="h-40 w-full rounded-xl object-cover md:h-48" />
            <img src="/local-dsx-2026.png" alt="Local do evento DSX" className="h-40 w-full rounded-xl object-cover md:h-48" />
            <img src="/dsx-2026.jpeg" alt="Experiencia de palco DSX" className="h-40 w-full rounded-xl object-cover md:h-48" />
          </div>
        </section>

        {useNegociosTemplate ? (
          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-[#101010]/90 p-6">
              <h2 className="font-anton text-3xl uppercase">Criativos em alta</h2>
              <p className="mt-2 font-jamjuree text-white/75">
                Peças já validadas em DSX.com.vc/vendas.
              </p>
              <div className="mt-4 grid gap-3">
                <img src="/optimized/step1/Banner-vendas-hero.webp" alt="Criativo DSX hero" className="h-40 w-full rounded-xl object-cover" />
                <img src="/card-image/participante-card-img.png" alt="Criativo DSX participante" className="h-40 w-full rounded-xl object-cover" />
                <img src="/card-image/expositor-card-img.png" alt="Criativo DSX expositor" className="h-40 w-full rounded-xl object-cover" />
              </div>
            </article>
            <article className="rounded-2xl border border-[#F5C02B]/25 bg-[#12100A]/90 p-6">
              <h2 className="font-anton text-3xl uppercase text-[#F5C02B]">{speaker.groupHeadline || "Ninguem cresce sozinho"}</h2>
              <p className="mt-3 font-jamjuree text-white/88">
                {speaker.groupCopy || "Garanta o passaporte em grupo e acelere a execução com o seu time."}
              </p>
              <div className="mt-4 grid gap-3">
                <img src="/12-[DSX]-Grupo-VIP-BANNER-LP-WEB.png" alt="Passaporte em grupo DSX web" className="hidden h-32 w-full rounded-xl object-cover md:block" />
                <img src="/12-[DSX]-Grupo-VIP-BANNER-LP-MOBILE.png" alt="Passaporte em grupo DSX mobile" className="h-32 w-full rounded-xl object-cover" />
              </div>
              <p className="mt-5 font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-[#F5C02B]">
                {speaker.urgencyHeadline || "GARANTIR NO LOTE ATUAL"}
              </p>
              <p className="mt-2 font-jamjuree text-sm text-white/80">
                {speaker.urgencyCopy || "O mercado não espera. Garanta sua cadeira antes da virada de lote."}
              </p>
            </article>
          </section>
        ) : (
          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-[#101010]/90 p-6">
              <h2 className="font-anton text-3xl uppercase">Oferta</h2>
              <p className="mt-2 font-jamjuree text-white/75">
                Dois dias para acelerar sua execucao com metodo e conexoes certas.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-white/15 bg-[#161616] p-4">
                  <p className="font-anton text-xl uppercase text-white">Standard</p>
                  <p className="mt-2 font-anton text-3xl text-[#F5C02B]">{LOT_CONFIG.currentPrice}</p>
                  <p className="font-jamjuree text-xs uppercase text-white/65">12x de R$ 41,42</p>
                  <ul className="mt-3 space-y-2 font-jamjuree text-sm text-white/85">
                    <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} className="text-[#F5C02B]" />2 dias de trilhas</li>
                    <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} className="text-[#F5C02B]" />Area de conexoes</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-[#F5C02B]/45 bg-[linear-gradient(160deg,rgba(32,22,8,0.95)_0%,rgba(16,16,16,0.95)_82%)] p-4 shadow-[inset_0_1px_0_rgba(255,236,180,0.2)]">
                  <p className="font-anton text-xl uppercase text-[#F5C02B]">VIP</p>
                  <p className="mt-2 font-anton text-3xl text-[#F5C02B]">R$ 797</p>
                  <p className="font-jamjuree text-xs uppercase text-white/70">12x de R$ 66,42</p>
                  <ul className="mt-3 space-y-2 font-jamjuree text-sm text-white/88">
                    <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} className="text-[#F5C02B]" />Tudo do Standard</li>
                    <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} className="text-[#F5C02B]" />Fila preferencial e area VIP</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 w-fit">
                <NewVendasHeaderMask
                  titulo={theme.ctaAfterPrices}
                  link={speaker.ctaLink}
                  textColor="#FFFFFF"
                  backgroundColor="#17140D"
                  font="700"
                  size="lg"
                />
                <p className="mt-2 font-jamjuree text-xs uppercase tracking-[0.08em] text-white/70">
                  Pagamento seguro | Parcelamento | Transferencia permitida
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-[#F5C02B]/25 bg-[#12100A]/90 p-6">
              <h2 className="font-anton text-3xl uppercase text-[#F5C02B]">Bonus Exclusivos</h2>
              <ul className="mt-4 space-y-3 font-jamjuree text-white/88">
                <li className="rounded-xl border border-white/10 bg-[#181818] p-3">Comunidade pos-evento <span className="ml-2 text-white/50 line-through">R$ 297</span></li>
                <li className="rounded-xl border border-white/10 bg-[#181818] p-3">Templates de execucao <span className="ml-2 text-white/50 line-through">R$ 197</span></li>
                <li className="rounded-xl border border-white/10 bg-[#181818] p-3">Workshop extra online <span className="ml-2 text-white/50 line-through">R$ 397</span></li>
                <li className="rounded-xl border border-white/10 bg-[#181818] p-3">Certificado oficial <span className="ml-2 text-white/50 line-through">R$ 97</span></li>
              </ul>
            </article>
          </section>
        )}

        {!useNegociosTemplate ? (
          <section className="rounded-2xl border border-[#F5C02B]/35 bg-[linear-gradient(160deg,rgba(24,16,6,0.92)_0%,rgba(12,12,12,0.94)_75%)] p-6">
            <h2 className="inline-flex items-center gap-2 font-anton text-3xl uppercase text-[#F5C02B]">
              <ShieldCheck size={24} />
              Garantia E Seguranca
            </h2>
            <p className="mt-3 font-jamjuree text-white/88">
              Se nao puder comparecer, transferencia sem custo dentro do prazo oficial. Sua vaga e seu investimento ficam protegidos.
            </p>
            <p className="mt-2 inline-flex items-center gap-2 font-jamjuree text-sm text-white/75">
              <Clock3 size={16} className="text-[#F5C02B]" />
              Confirmacao imediata apos pagamento.
            </p>
          </section>
        ) : null}

        <section className="rounded-2xl border border-white/10 bg-[#0E0E0E]/90 p-6">
          <h2 className="font-anton text-3xl uppercase">FAQ</h2>
          <div className="mt-6 rounded-2xl border border-[#2B2B2B] bg-[#121212] p-2 md:p-3">
            {activeFaqs.map((item, index) => {
              const isOpen = negociosFaqOpenIndex === index;

              return (
                <article
                  key={item.q}
                  className="border-b border-[#2B2B2B] px-3 py-4 last:border-b-0 md:px-4"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() =>
                      setNegociosFaqOpenIndex((current) =>
                        current === index ? -1 : index,
                      )
                    }
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-jamjuree text-lg font-semibold leading-snug text-white md:text-[1.35rem]">
                      {item.q}
                    </h3>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#3B3B3B] text-[#F5C02B] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    >
                      <img src="/arrow-down.svg" alt="" className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${isOpen
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <p className="overflow-hidden font-jamjuree text-[1rem] leading-relaxed text-white/80">
                      {item.a}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[26px] border border-[#F5C02B]/35 p-6 md:p-8">
          <div className="pointer-events-none absolute inset-0">
            <img src="/optimized/step1/BannerCallToActionVendas.webp" alt="" aria-hidden="true" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.62)_48%,rgba(10,7,3,0.8)_100%)]" />
          </div>
          <div className="relative">
            <h2 className="font-anton text-3xl uppercase md:text-5xl">
              {speaker.finalHeadline || theme.ctaFinal}
            </h2>
            {speaker.finalSubheadline ? (
              <p className="mt-2 font-jamjuree text-white/85">{speaker.finalSubheadline}</p>
            ) : null}
            <ul className="mt-4 space-y-2 font-jamjuree text-white/90">
              {(speaker.finalRecap?.length ? speaker.finalRecap : [
                "Acesso completo aos 2 dias de evento",
                "Networking com decisores e empresarios",
                "Trilha pratica para aplicar ja no proximo ciclo",
              ]).map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#F5C02B]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-[#F5C02B]">
              {LOT_CONFIG.currentLot} - ultimas {LOT_CONFIG.remainingSeats} vagas neste preco
            </p>
            <div className="mt-6 w-fit">
              <NewVendasHeaderMask
              titulo={useNegociosTemplate ? "GARANTIR AGORA — ÚLTIMAS VAGAS DO 3º LOTE" : theme.ctaFinal}
                link={speaker.ctaLink}
                textColor="#FFFFFF"
                backgroundColor="#17140D"
                font="700"
                size="lg"
              />
              <p className="mt-2 font-jamjuree text-xs uppercase tracking-[0.08em] text-white/75">
                Pagamento seguro | Parcelamento | Transferencia permitida
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-6 font-jamjuree text-xs text-white/55">
          <p>Digital Hub Eventos LTDA | CNPJ 10.279.661/0001-51</p>
          <p className="mt-1">Endereço eletrônico: https://dsx.com.vc</p>
          <p className="mt-1">Politica de privacidade | Termos de uso | Politica de cancelamento e transferencia</p>
        </footer>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#F5C02B]/35 bg-black/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
        <p className="mb-2 text-center font-jamjuree text-[11px] font-bold uppercase tracking-[0.08em] text-[#F5C02B]">
          3º lote • Poucas vagas disponíveis
        </p>
        <div className="mx-auto w-fit">
          <NewVendasHeaderMask
            titulo="GARANTIR MEU PASSAPORTE"
            link="#passaportes"
            textColor="#FFFFFF"
            backgroundColor="#17140D"
            font="700"
            size="lg"
          />
        </div>
      </div>
    </section>
  );
};

export default SpeakerLandingTemplate;
