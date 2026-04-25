import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import NewVendasHeaderMask from "../components/NewVendas/NewVendasHeaderMask";
import { audienceProfiles } from "../components/NewVendas/newVendasData";
import { RD_API_URL } from "../lib/rdStation";
import { getSupabaseClient, isSupabaseConfigured } from "../lib/supabaseClient";
import LeadPopupFormHomeTeste from "../components/HomeTesteComponentes/LeadPopupFormHomeTeste";
import {
  formatDsxFormOrigin,
  readDsxFormOrigin,
  rememberDsxFormOrigin,
} from "../utils/formOrigin";
import { withHublaUtm } from "../utils/hublaUtm";

const NewVendasSpeakersSlider = lazy(
  () => import("../components/NewVendas/NewVendasSpeakersSlider"),
);
const AudienceSection = lazy(
  () => import("../components/NewVendas/sections/AudienceSection"),
);

const galleryItems = [
  {
    src: "/optimized/step1/img-ambiantes/amb-1.webp",
    alt: "Networking entre participantes",
  },
  {
    src: "/optimized/step1/img-ambiantes/amb-2.webp",
    alt: "Discussões estratégicas no evento",
  },
  {
    src: "/optimized/step1/img-ambiantes/amb-3.webp",
    alt: "Palestra com plateia",
  },
  {
    src: "/optimized/step1/img-ambiantes/amb-4.webp",
    alt: "Conteúdo em palco principal",
  },
  {
    src: "/optimized/step1/img-ambiantes/amb-5.webp",
    alt: "Conversa sobre negócios",
  },
  {
    src: "/optimized/step1/img-ambiantes/amb-6.webp",
    alt: "Momentos de conexão no DSX",
  },
  {
    src: "/optimized/step1/img-ambiantes/amb-7.webp",
    alt: "Perguntas e respostas no auditório",
  },
  {
    src: "/optimized/step1/img-ambiantes/amb-3.webp",
    alt: "Painel com executivos",
  },
  {
    src: "/optimized/step1/img-ambiantes/amb-2.webp",
    alt: "Interação entre palestrantes",
  },
  {
    src: "/optimized/step1/img-ambiantes/amb-1.webp",
    alt: "Trocas em ambiente premium",
  },
];
const galleryTopRow = galleryItems.slice(0, 5);
const galleryBottomRow = galleryItems.slice(5, 10);
const galleryTopRowMarquee = [...galleryTopRow, ...galleryTopRow];
const galleryBottomRowMarquee = [...galleryBottomRow, ...galleryBottomRow];

const faqItems = [
  {
    question: "O DSX é para o meu perfil de negócio?",
    answer:
      "Se você é dono de empresa, líder de equipe, profissional autônomo ou executivo buscando crescimento escalável e conexões de alto nível, o DSX é para você.",
  },
  {
    question: "Posso comprar agora e trocar o nome do participante depois?",
    answer:
      "Sim. A titularidade do passaporte pode ser alterada entrando em contato com o suporte após a compra.",
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "Você pode garantir o seu passaporte via PIX (aprovação imediata) ou parcelar no cartão de crédito em até 12 vezes.",
  },
  {
    question: "A feira de negócios está inclusa em todos os passaportes?",
    answer:
      "Sim. Tanto o passaporte Standard quanto o VIP dão acesso à feira e às ativações de marca durante o evento.",
  },
  {
    question: "Qual a diferença principal do VIP?",
    answer:
      "O VIP inclui benefícios exclusivos, como área reservada, melhor experiência presencial e ambiente ideal para networking estratégico.",
  },
];

const CHECKOUT_LINK =
  "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721";

const metrics = [
  {
    target: 2000,
    label: "Participantes",
    prefix: "+",
    suffix: "",
    useThousands: true,
  },
  {
    target: 40,
    label: "Palestras",
    prefix: "+",
    suffix: "",
    useThousands: false,
  },
  {
    target: 30,
    label: "Expositores",
    prefix: "+",
    suffix: "",
    useThousands: false,
  },
];
const experienceHighlights = [
  { value: "3 PALCOS", label: "simultâneos" },
  { value: "FEIRA", label: "de negócios" },
  { value: "VIP", label: "área exclusiva", desktopOnly: true },
  { value: "PRAÇA", label: "de alimentação", desktopOnly: true },
];

const formatMetricValue = (value, metric) => {
  const baseValue = metric.useThousands
    ? value.toLocaleString("pt-BR")
    : String(value);
  return `${metric.prefix}${baseValue}${metric.suffix}`;
};

const onlyDigits = (value = "") => value.replace(/\D/g, "");
const isValidEmail = (email = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const normalizeHostname = (value = "") =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^www\./, "");
const detectSiteOriginFromUrl = (value = "") => {
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
};
const isMissingColumnError = (error) => {
  const code = String(error?.code || "").toUpperCase();
  const message = String(error?.message || "").toLowerCase();
  return (
    code === "PGRST204" ||
    message.includes("column") ||
    message.includes("schema cache")
  );
};

const resolveRdConversionIdentifier = (origin = "") => {
  return "DSX 2026 - LP: Preckechout";
};

const formatPhone = (value = "") => {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const PreCheckout = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [animatedValues] = useState(metrics.map((metric) => metric.target));
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadStatus, setLeadStatus] = useState("idle");
  const [leadError, setLeadError] = useState("");
  const [shouldRenderBelowFold, setShouldRenderBelowFold] = useState(false);
  const belowFoldTriggerRef = useRef(null);
  const [leadFormOrigin, setLeadFormOrigin] = useState(() =>
    readDsxFormOrigin("Standard"),
  );
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
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

  const yearLabel = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const triggerEl = belowFoldTriggerRef.current;
    if (!triggerEl) return undefined;

    if (!("IntersectionObserver" in window)) {
      const timeoutId = window.setTimeout(() => setShouldRenderBelowFold(true), 900);
      return () => window.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderBelowFold(true);
          observer.disconnect();
        }
      },
      { rootMargin: "280px 0px" },
    );

    observer.observe(triggerEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const iconSelector = 'link[rel="icon"]';
    let iconTag = document.head.querySelector(iconSelector);
    const iconExisted = Boolean(iconTag);
    const previousIconHref = iconTag?.getAttribute("href");

    if (!iconTag) {
      iconTag = document.createElement("link");
      iconTag.setAttribute("rel", "icon");
      iconTag.setAttribute("type", "image/png");
      document.head.appendChild(iconTag);
    }

    iconTag.setAttribute("href", "/favicon-dsx-new.png");

    return () => {
      if (!iconExisted) {
        iconTag?.remove();
      } else if (previousIconHref === null) {
        iconTag?.removeAttribute("href");
      } else {
        iconTag?.setAttribute("href", previousIconHref);
      }
    };
  }, []);

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

  const handleOpenLeadModal = (event) => {
    event.preventDefault();
    const resolvedOrigin = readDsxFormOrigin("Standard");
    setLeadFormOrigin(resolvedOrigin);
    rememberDsxFormOrigin(resolvedOrigin);
    setLeadError("");
    setLeadStatus("idle");
    setShowLeadModal(true);
  };

  const handleCloseLeadModal = () => {
    if (leadStatus === "loading") return;
    setShowLeadModal(false);
    setLeadError("");
  };

  const handleLeadInputChange = (field, value) => {
    setLeadForm((current) => ({
      ...current,
      [field]: field === "phone" ? formatPhone(value) : value,
    }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();

    const name = leadForm.name.trim();
    const email = leadForm.email.trim().toLowerCase();
    const phoneDigits = onlyDigits(leadForm.phone);
    const phone = leadForm.phone.trim();
    const cargo = leadForm.cargo.trim();

    if (!name) {
      setLeadError("Informe seu nome.");
      return;
    }
    if (!isValidEmail(email)) {
      setLeadError("Informe um e-mail válido.");
      return;
    }
    if (!(phoneDigits.length === 10 || phoneDigits.length === 11)) {
      setLeadError("Informe um telefone com DDD.");
      return;
    }
    if (!cargo) {
      setLeadError("Selecione o campo 'Você é...'.");
      return;
    }

    setLeadStatus("loading");
    setLeadError("");

    try {
      const lpIdentifier = "LP DSX - Checkout";
      const resolvedFormOrigin = leadFormOrigin || readDsxFormOrigin("Standard");
      const payload = {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: resolveRdConversionIdentifier(resolvedFormOrigin),
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

      const rdData = await rdResult.json().catch(() => ({}));
      if (!rdResult.ok || rdData?.ok === false) {
        const rdMessage =
          rdData?.errors?.[0]?.error_message ||
          rdData?.message ||
          "Falha ao enviar lead";
        throw new Error(rdMessage);
      }

      const trackerState = window.DSXTracker?.getState?.() || {};
      const sessionId =
        trackerState.sessionId ||
        (window.crypto?.randomUUID?.() || `session-${Date.now()}`);
      const nowIso = new Date().toISOString();
      const redirectUrl = withHublaUtm(CHECKOUT_LINK);
      const leadIdentity = {
        email,
        name,
        phone,
        cargo,
      };

      const profilePayload = {
        lead_email: leadIdentity.email,
        lead_name: leadIdentity.name,
        lead_phone: leadIdentity.phone,
        lead_cargo: leadIdentity.cargo,
        site_origin: sourceData.site_origin || null,
        site_hostname: sourceData.site_hostname || window.location.hostname || null,
        lp_identifier: lpIdentifier,
        first_converted_at: nowIso,
        last_seen_at: nowIso,
        has_sympla_redirected: true,
        last_sympla_redirected_at: nowIso,
      };

      // Mantem o mesmo tracking do HomeTeste quando Supabase estiver configurado.
      // Se não estiver, não bloqueia a conversão nem o redirect para o Sympla.
      if (isSupabaseConfigured) {
        try {
          const supabase = await getSupabaseClient();

          if (supabase) {
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

            if (profileError) {
              console.error(
                "[PreCheckout] erro ao salvar lead profile no Supabase",
                profileError,
              );
            } else {
              const sessionPayload = {
                session_id: sessionId,
                lead_name: leadIdentity.name,
                lead_email: leadIdentity.email,
                lead_phone: leadIdentity.phone,
                lead_cargo: leadIdentity.cargo,
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

              if (sessionError) {
                console.error(
                  "[PreCheckout] erro ao salvar lead session no Supabase",
                  sessionError,
                );
              } else {
                const eventRows = [
                  {
                    session_id: sessionId,
                    lead_email: leadIdentity.email,
                    event_name: "lead_form_submit",
                    section: "__form_submit__",
                    occurred_at: nowIso,
                    page: window.location.pathname + window.location.search,
                    payload: {
                      form_origin: "PreCheckout",
                      lp_identifier: lpIdentifier,
                      site_origin: sourceData.site_origin || null,
                      site_hostname:
                        sourceData.site_hostname || window.location.hostname || null,
                      page_url: sourceData.page_url || window.location.href,
                      profile: leadIdentity.cargo,
                    },
                  },
                  {
                    session_id: sessionId,
                    lead_email: leadIdentity.email,
                    event_name: "sympla_redirected",
                    section: "__sympla_redirected__",
                    occurred_at: nowIso,
                    page: window.location.pathname + window.location.search,
                    payload: {
                      target_link: redirectUrl,
                      site_origin: sourceData.site_origin || null,
                      site_hostname:
                        sourceData.site_hostname || window.location.hostname || null,
                      page_url: sourceData.page_url || window.location.href,
                    },
                  },
                ];

                const { error: eventsError } = await supabase
                  .from("tracking_lead_section_events")
                  .upsert(eventRows, { onConflict: "session_id,event_name,section" });

                if (eventsError) {
                  console.error(
                    "[PreCheckout] erro ao salvar tracking events no Supabase",
                    eventsError,
                  );
                }
              }
            }
          } else {
            console.warn("[PreCheckout] Supabase client indisponivel");
          }
        } catch (supabaseError) {
          console.error(
            "[PreCheckout] erro inesperado no tracking Supabase",
            supabaseError,
          );
        }
      } else {
        console.warn("[PreCheckout] Supabase nao configurado no ambiente");
      }

      setLeadStatus("success");
      setShowLeadModal(false);
      window.location.href = redirectUrl;
    } catch (_error) {
      setLeadStatus("error");
      console.error("[PreCheckout] erro no envio do lead", _error);
      setLeadError(
        _error?.message || "Não foi possível enviar agora. Tente novamente.",
      );
    }
  };

  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden px-4 pb-0 pt-10 md:px-8 md:pb-20 md:pt-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 14% 12%, rgba(245,192,43,0.25), transparent 40%), radial-gradient(circle at 80% 20%, rgba(0,158,64,0.2), transparent 38%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0B0B]">
          <div className="flex flex-col items-center justify-center px-5 py-8 md:px-10 md:py-12">
            <div className="inline-flex w-fit self-center rounded-sm bg-[#0A0A0A] px-2 py-1">
              <img
                src="/logo-dsx-horizontal-2.svg"
                alt="DSX 2026"
                className="h-12 w-auto object-contain md:h-14"
                loading="eager"
                decoding="async"
              />
            </div>
            <h1 className="mt-4 max-w-xl text-center font-anton text-[clamp(1.2rem,6vw,3.2rem)] md:max-w-4xl uppercase leading-[1.35]">
              O maior evento de negócios, marketing, vendas e inovação do Norte
            </h1>

            <div className="mx-auto mt-7 flex w-full max-w-4xl flex-wrap justify-center gap-x-4 gap-y-5 px-2 py-2 md:px-0">
              {metrics.map((item, index) => (
                <div key={item.label} className="min-w-0 text-center">
                  <p className="font-jamjuree text-[28px] font-extrabold leading-none tracking-normal text-white md:text-[52px]">
                    {formatMetricValue(animatedValues[index] ?? 0, item)}
                  </p>
                  <p className="mt-1 font-jamjuree text-[12px] font-bold uppercase tracking-[0.02em] text-white md:text-[15px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-3 grid w-full max-w-[980px] grid-cols-2 gap-3 px-2 md:grid-cols-4 md:gap-5 md:px-0">
              {experienceHighlights.map((item) => (
                <div
                  key={`${item.value}-${item.label}`}
                  className="nv-highlight-wrap w-full"
                >
                  <div className="nv-highlight-inner flex min-h-[104px] flex-col items-center justify-center px-3 py-3 text-center md:min-h-[132px] md:px-5">
                    <p className="font-jamjuree text-[20px] font-extrabold leading-none text-[#F5C02B] md:text-[40px]">
                      {item.value}
                    </p>
                    <p className="mt-1 font-jamjuree text-[12px] font-bold uppercase tracking-[0.02em] text-white md:text-[20px] md:leading-[1.05]">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-left text-white/90">
              <div className="flex w-full items-center justify-start gap-1.5">
                <Calendar size={18} color="#F5C02B" />
                <p className="text-left font-jamjuree text-[0.98rem] leading-relaxed">
                  23 e 24 de Julho
                </p>
              </div>
              <div className="flex w-full items-center justify-start gap-1.5">
                <MapPin size={18} color="#F5C02B" className="mt-0.5 shrink-0" />
                <p className="text-left font-jamjuree text-[0.98rem] leading-relaxed">
                  Centro de Convenções Vasco Vasques, Manaus/AM
                </p>
              </div>
            </div>

            <div
              id="newvendas-primary-cta"
              className="mt-7 w-full max-w-[460px]"
              onClickCapture={handleOpenLeadModal}
            >
              <NewVendasHeaderMask
                titulo="COMPRAR PASSAPORTE"
                link="#lead-form-checkoutvendas"
                target="_self"
                textColor="#FFFFFF"
                backgroundColor="#1E1A12"
                font="700"
                size="lg"
              />
            </div>
          </div>
        </div>
      </section>
      <div ref={belowFoldTriggerRef} className="h-px w-full" aria-hidden="true" />
      {shouldRenderBelowFold ? (
        <Suspense fallback={<div className="min-h-[120px]" aria-hidden="true" />}>
          <div
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "1px 1400px",
            }}
          >
            <section className="bg-black px-4 pb-10 md:px-8 md:pb-14">
              <NewVendasSpeakersSlider />
            </section>
            <AudienceSection items={audienceProfiles} />

          <section className="relative overflow-hidden bg-black px-4 py-14 md:px-8 md:py-20">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 12% 85%, rgba(0,183,255,0.18), transparent 34%), radial-gradient(circle at 83% 5%, rgba(245,192,43,0.16), transparent 32%)",
              }}
              aria-hidden="true"
            />

            <div className="relative mx-auto w-full max-w-7xl">
              <h2 className="text-center font-anton text-[clamp(2rem,6vw,3.7rem)] uppercase leading-[1.2]">
                O Ambiente que gera negócios reais
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-white/75 md:text-lg">
                Conteúdo aplicado, conexões de alto nível e experiências que aproximam
                decisores, marcas e oportunidades em um único lugar.
              </p>
            </div>
            <div className="mt-10 space-y-4 -mx-4 md:-mx-8">
              <div className="faixa-wrapper">
                <div
                  className="faixa-track gap-3 md:gap-5"
                  style={{ animationDuration: "92s" }}
                >
                  {galleryTopRowMarquee.map((item, index) => (
                    <div
                      key={`top-${item.src}-${index}`}
                      className="group w-[220px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0E0E0E] md:w-[300px] lg:w-[340px]"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-[180px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[210px] lg:h-[230px]"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="faixa-wrapper">
                <div
                  className="faixa-track-fast gap-3 md:gap-5"
                  style={{ animationDirection: "reverse", animationDuration: "64s" }}
                >
                  {galleryBottomRowMarquee.map((item, index) => (
                    <div
                      key={`bottom-${item.src}-${index}`}
                      className="group w-[220px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0E0E0E] md:w-[300px] lg:w-[340px]"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-[180px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[210px] lg:h-[230px]"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#0A0A0A] px-4 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
            <div className="mx-auto w-full max-w-4xl">
              <h2 className="text-center font-anton text-[clamp(2rem,5vw,3rem)] uppercase leading-none">
                Perguntas frequentes
              </h2>

              <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#121212] p-2 md:p-3">
                {faqItems.map((item, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <article
                      key={item.question}
                      className="border-b border-[#2B2B2B] px-3 py-4 last:border-b-0 md:px-4"
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 text-left"
                        onClick={() =>
                          setOpenFaqIndex((current) =>
                            current === index ? -1 : index,
                          )
                        }
                        aria-expanded={isOpen}
                      >
                        <h3 className="font-jamjuree text-lg font-semibold leading-snug text-white md:text-[1.35rem]">
                          {item.question}
                        </h3>
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#3B3B3B] text-[#F5C02B] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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
                          {item.answer}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <p className="mt-8 text-center font-jamjuree text-sm text-white/45">
                DSX {yearLabel}. Todos os direitos reservados.
              </p>
            </div>
          </section>
          </div>
        </Suspense>
      ) : (
        <div className="min-h-[120px]" aria-hidden="true" />
      )}

      <LeadPopupFormHomeTeste
        isOpen={showLeadModal}
        canClose={leadStatus !== "loading"}
        onClose={handleCloseLeadModal}
        onSubmit={handleLeadSubmit}
        leadForm={leadForm}
        setLeadForm={setLeadForm}
        onWhatsappChange={(event) => handleLeadInputChange("phone", event.target.value)}
        leadStatus={leadStatus}
        message={leadError}
        loading={leadStatus === "loading"}
        canSubmit={leadStatus !== "loading"}
        headline="GARANTA SUA VAGA"
        subheading=""
        description=""
      />

    </main>
  );
};

export default PreCheckout;
