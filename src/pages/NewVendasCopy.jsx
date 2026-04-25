import { useEffect, useMemo, useState } from "react";
import {
  NewVendasContent,
  NewVendasHero,
} from "../components/NewVendas";
import NewVendasHeaderMask from "../components/NewVendas/NewVendasHeaderMask";
import LeadPopupFormHomeTeste from "../components/HomeTesteComponentes/LeadPopupFormHomeTeste";
import { RD_API_URL } from "../lib/rdStation";
import { getSupabaseClient, isSupabaseConfigured } from "../lib/supabaseClient";
import { formatDsxFormOrigin } from "../utils/formOrigin";

const NEW_VENDAS_SYMPLA_URL =
  "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721";

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
  return code === "PGRST204" || message.includes("column") || message.includes("schema cache");
}

const NewVendasCopy = () => {
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
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

  const errors = useMemo(() => {
    const currentErrors = {};

    if (!leadForm.name.trim()) currentErrors.name = "Informe seu nome completo.";
    if (!isValidEmail(leadForm.email)) currentErrors.email = "Informe um e-mail válido.";

    const phone = onlyDigits(leadForm.phone);
    if (!(phone.length === 10 || phone.length === 11)) {
      currentErrors.phone = "Informe um WhatsApp com DDD.";
    }

    if (!leadForm.cargo) currentErrors.cargo = "Selecione seu perfil.";

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
      { type: "name", key: "robots", value: "index,follow,max-image-preview:large" },
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
    const ctaElement = document.getElementById("newvendas-primary-cta");

    if (!ctaElement || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ctaPassedAboveViewport = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setShowStickyCta(ctaPassedAboveViewport);
      },
      { threshold: 0 }
    );

    observer.observe(ctaElement);

    return () => observer.disconnect();
  }, []);

  const openLeadModal = (event) => {
    if (event) event.preventDefault();
    if (loading) return;
    setLeadStatus("idle");
    setMensagem("Para continuar com a compra, preencha e envie o formulário.");
    setShowLeadModal(true);
  };

  const closeLeadModal = () => {
    if (loading) return;
    setShowLeadModal(false);
  };

  const handleWhatsappMask = (e) => {
    let value = e.target.value;
    value = onlyDigits(value).slice(0, 11);

    if (!value.length) {
      setLeadForm((prev) => ({ ...prev, phone: "" }));
      return;
    }

    if (value.length <= 2) value = `(${value}`;
    else if (value.length <= 6) value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    else if (value.length <= 10) value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");

    setLeadForm((prev) => ({ ...prev, phone: value }));
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (!isLeadFormValid || !canSubmitLead) {
      setLeadStatus("error");
      setMensagem("Revise os campos e tente novamente.");
      return;
    }

    setLoading(true);
    setLeadStatus("loading");

    try {
      const formData = new FormData(e.target);
      const name = formData.get("name")?.toString().trim() || "";
      const email = formData.get("email")?.toString().trim().toLowerCase() || "";
      const phone = formData.get("phone")?.toString().trim() || "";
      const cargo = formData.get("cargo")?.toString().trim() || "";
      const resolvedFormOrigin = "NewVendasCopy";

      const payload = {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: `LP - DSX 2026 - Formulario ${resolvedFormOrigin}`,
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

      if (isSupabaseConfigured) {
        const supabase = await getSupabaseClient();
        if (supabase) {
          const nowIso = new Date().toISOString();
          const trackerState = window.DSXTracker?.getState?.() || {};
          const sessionId =
            trackerState.sessionId ||
            (window.crypto?.randomUUID?.() || `session-${Date.now()}`);

          const profilePayload = {
            lead_email: email,
            lead_name: name,
            lead_phone: phone,
            lead_cargo: cargo,
            site_origin: sourceData.site_origin || null,
            site_hostname: sourceData.site_hostname || window.location.hostname || null,
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
            const retry = await supabase
              .from("tracking_lead_profiles")
              .upsert([fallbackProfilePayload], { onConflict: "lead_email" });
            profileError = retry.error;
          }

          if (!profileError) {
            const sessionPayload = {
              session_id: sessionId,
              lead_name: name,
              lead_email: email,
              lead_phone: phone,
              lead_cargo: cargo,
              site_origin: sourceData.site_origin || null,
              site_hostname: sourceData.site_hostname || window.location.hostname || null,
              page: sourceData.page_url || window.location.pathname + window.location.search,
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
              const retry = await supabase
                .from("tracking_lead_sessions")
                .upsert([fallbackSessionPayload], { onConflict: "session_id" });
              sessionError = retry.error;
            }
          }
        }
      }

      setLeadStatus("success");
      setMensagem("Cadastro enviado! Em breve entraremos em contato.");
      setLeadForm({ name: "", phone: "", email: "", cargo: "" });
      e.target.reset();
      setTimeout(() => {
        setShowLeadModal(false);
        window.location.href = NEW_VENDAS_SYMPLA_URL;
      }, 700);
    } catch (_error) {
      setLeadStatus("error");
      setMensagem(_error?.message || "Erro ao enviar formulário. Tente novamente.");
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
      </div>

      <div className="relative z-10">
        <NewVendasHero ctaLink="#lead-form" onPrimaryCtaClick={openLeadModal} />
        <NewVendasContent hidePassaporteButtons />
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-[130] bg-black px-4 py-3 transition-all duration-500 ease-out ${
          showStickyCta
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-[770px] flex-col items-center">
          <div onClickCapture={openLeadModal}>
            <NewVendasHeaderMask
            titulo="Garantir meu passaporte"
            link="#lead-form"
            target="_self"
            textColor="#FFFFFF"
            backgroundColor="#1E1A12"
            font="700"
            size="lg"
            />
          </div>
          <span className="mt-1 inline-block text-2xl font-black uppercase text-[#F5C02B]">
            Vagas limitadas
          </span>
        </div>
      </div>

      <LeadPopupFormHomeTeste
        isOpen={showLeadModal}
        popupStep={1}
        canClose={!loading}
        onClose={closeLeadModal}
        onSubmit={handleLeadSubmit}
        leadForm={leadForm}
        setLeadForm={setLeadForm}
        onWhatsappChange={handleWhatsappMask}
        leadStatus={leadStatus}
        message={mensagem}
        loading={loading}
        canSubmit={canSubmitLead}
        headline="PREENCHA O FORMULÁRIO PARA COMPRAR SEU PASSAPORTE"
        subheading=""
        description=""
      />
    </section>
  );
};

export default NewVendasCopy;
