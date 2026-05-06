import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import NewVendasHero from "../components/NewVendas/NewVendasHero";
import { RD_API_URL } from "../lib/rdStation";
import { formatDsxFormOrigin } from "../utils/formOrigin";
import { withHublaUtm } from "../utils/hublaUtm";

const NEW_VENDAS_SYMPLA_URL =
  "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721";
const NewVendasContent = lazy(() =>
  import("../components/NewVendas/NewVendasContent"),
);
const LeadPopupFormHomeTeste = lazy(() =>
  import("../components/HomeTesteComponentes/LeadPopupFormHomeTeste"),
);

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

function resolveRdConversionIdentifier(origin = "") {
  const normalized = String(origin || "").trim().toLowerCase();

  if (normalized.includes("vip")) {
    return "DSX 2026 - Formulário VIP";
  }
  if (normalized.includes("standard")) {
    return "DSX 2026 - Formulário Standard";
  }
  if (normalized.includes("grupo") && normalized.includes("10")) {
    return "DSX 2026 - Formulário Grupo 10";
  }
  if (normalized.includes("grupo") && normalized.includes("5")) {
    return "DSX 2026 - Formulário Grupo 5";
  }

  return "DSX 2026 - Formulário Standard";
}

const NewVendas = () => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [pendingSymplaUrl, setPendingSymplaUrl] = useState(NEW_VENDAS_SYMPLA_URL);
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
  const [shouldRenderContent, setShouldRenderContent] = useState(false);

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

  useEffect(() => {
    const pageTitle = "Ingressos DSX 2026 | 3º Lote Aberto";
    const pageDescription =
      "Garanta seu passaporte para o DSX 2026: o maior evento de negócios, marketing, vendas e inovação do Norte. Dias 23 e 24 de julho em Manaus.";
    const pageUrl = "https://dsx.com.vc/newvendas";
    const ogImage = "https://dsx.com.vc/optimized/step1/Banner-vendas-hero.webp";

    document.title = pageTitle;

    const updates = [
      { type: "name", key: "description", value: pageDescription },
      {
        type: "name",
        key: "robots",
        value: "index,follow,max-image-preview:large",
      },
      { type: "property", key: "og:type", value: "website" },
      { type: "property", key: "og:title", value: pageTitle },
      { type: "property", key: "og:description", value: pageDescription },
      { type: "property", key: "og:url", value: pageUrl },
      { type: "property", key: "og:image", value: ogImage },
      { type: "name", key: "twitter:card", value: "summary_large_image" },
      { type: "name", key: "twitter:title", value: pageTitle },
      { type: "name", key: "twitter:description", value: pageDescription },
      { type: "name", key: "twitter:image", value: ogImage },
    ];

    const previousTags = updates.map((item) => {
      const selector =
        item.type === "name"
          ? `meta[name="${item.key}"]`
          : `meta[property="${item.key}"]`;
      let tag = document.head.querySelector(selector);
      const existed = Boolean(tag);
      const previousContent = tag?.getAttribute("content");

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(item.type, item.key);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", item.value);
      return { tag, existed, previousContent };
    });

    let canonicalTag = document.head.querySelector('link[rel="canonical"]');
    const canonicalExisted = Boolean(canonicalTag);
    const previousCanonical = canonicalTag?.getAttribute("href");

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", pageUrl);

    const schemaId = "jsonld-new-vendas";
    const schema = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "DSX 2026 | Digital Summit Experience",
      description: pageDescription,
      startDate: "2026-07-23T09:00:00-04:00",
      endDate: "2026-07-24T22:00:00-04:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: [ogImage],
      url: pageUrl,
      location: {
        "@type": "Place",
        name: "Centro de Convenções Vasco Vasques",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Manaus",
          addressRegion: "AM",
          addressCountry: "BR",
        },
      },
      offers: {
        "@type": "Offer",
        price: "497.00",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
      organizer: {
        "@type": "Organization",
        name: "DSX | Digital Summit Experience",
        url: "https://dsx.com.vc/",
      },
    };

    let jsonLdTag = document.getElementById(schemaId);
    const jsonLdExisted = Boolean(jsonLdTag);
    const previousJsonLd = jsonLdTag?.textContent ?? "";

    if (!jsonLdTag) {
      jsonLdTag = document.createElement("script");
      jsonLdTag.setAttribute("id", schemaId);
      jsonLdTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLdTag);
    }

    jsonLdTag.textContent = JSON.stringify(schema);

    return () => {
      previousTags.forEach(({ tag, existed, previousContent }) => {
        if (!existed) {
          tag.remove();
          return;
        }
        if (previousContent === null) {
          tag.removeAttribute("content");
        } else {
          tag.setAttribute("content", previousContent);
        }
      });

      if (!canonicalExisted) {
        canonicalTag?.remove();
      } else if (previousCanonical === null) {
        canonicalTag?.removeAttribute("href");
      } else {
        canonicalTag?.setAttribute("href", previousCanonical);
      }

      if (!jsonLdExisted) {
        jsonLdTag?.remove();
      } else {
        jsonLdTag.textContent = previousJsonLd;
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

  useEffect(() => {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(
        () => setShouldRenderContent(true),
        { timeout: 1400 },
      );
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(() => setShouldRenderContent(true), 180);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const openLeadGateForSympla = (targetLink, formOrigin) => {
    if (loading) return;

    setPendingSymplaUrl(targetLink || NEW_VENDAS_SYMPLA_URL);
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
      const lpIdentifier = "LP DSX - Principal";
      const formData = new FormData(event.target);
      const name = formData.get("name")?.toString().trim() || "";
      const email = formData.get("email")?.toString().trim().toLowerCase() || "";
      const phone = formData.get("phone")?.toString().trim() || "";
      const cargo = formData.get("cargo")?.toString().trim() || "";
      const resolvedFormOrigin = selectedPassOrigin || "Standard";

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

      if (!rdResult.ok) {
        throw new Error("Erro ao enviar para RD Station");
      }

      const supabaseRuntime = await import("../lib/supabaseClient");
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
          }
        }
      }

      setLeadStatus("success");
      setMensagem("Cadastro enviado! Em breve entraremos em contato.");
      setLeadForm({ name: "", phone: "", email: "", cargo: "" });
      event.target.reset();

      window.setTimeout(() => {
        const targetUrl = pendingSymplaUrl || NEW_VENDAS_SYMPLA_URL;
        const redirectUrl = withHublaUtm(targetUrl);
        setShowLeadModal(false);
        window.location.href = redirectUrl;
      }, 700);
    } catch (error) {
      setLeadStatus("error");
      setMensagem(error?.message || "Erro ao enviar formulário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-black pb-28 md:pb-32"
      aria-label="Página de vendas DSX 2026"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-4 top-28 h-16 w-16 bg-[url('/vector-11.svg')] bg-contain bg-center bg-no-repeat opacity-20 md:left-10 md:top-36 md:h-20 md:w-20"
          style={{ animation: "spin 24s linear infinite" }}
          aria-hidden="true"
        />
        <div className="absolute -left-16 top-44 h-56 w-56 rounded-full bg-[#F5C02B]/12 blur-3xl" />
        <div className="absolute -right-16 top-80 h-64 w-64 rounded-full bg-[#F5C02B]/8 blur-3xl" />
      </div>

      <div className="relative z-10">
        <NewVendasHero ctaLink="#passaportes" />
        {shouldRenderContent ? (
          <Suspense fallback={<div className="min-h-[120px]" />}>
            <NewVendasContent onBuyPassaporte={openLeadGateForSympla} />
          </Suspense>
        ) : (
          <div className="min-h-[120px]" aria-hidden="true" />
        )}
      </div>

      {showLeadModal ? (
        <Suspense fallback={null}>
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
        </Suspense>
      ) : null}
    </section>
  );
};

export default NewVendas;
