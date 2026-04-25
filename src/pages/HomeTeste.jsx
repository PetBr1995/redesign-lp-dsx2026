import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import useScrollToHash from "../hooks/useScrollToHash";
import { RD_API_URL } from "../lib/rdStation";
import { getSupabaseClient, isSupabaseConfigured } from "../lib/supabaseClient";
import {
  formatDsxFormOrigin,
  readDsxFormOrigin,
  rememberDsxFormOrigin,
} from "../utils/formOrigin";

import HeroSection from "../components/HeroSection";
import NewTimerHeaderHomeTeste from "../components/HomeTesteComponentes/NewTimerHeaderHomeTeste";
import HeroSectionV2 from "../components/HeroSectionV2";
import SlideFaixa from "../components/SlideFaixa";
import LeadPopupFormHomeTeste from "../components/HomeTesteComponentes/LeadPopupFormHomeTeste";

const ContentSection = lazy(() => import("../components/ContentSection"));
const FaleConosco = lazy(() => import("../components/FaleConosco"));
const Footer = lazy(() => import("../components/Footer"));
const Depoimentos = lazy(() => import("../components/Depoimentos"));
const PublicoDSX = lazy(() => import("../components/PublicoDSX"));
const FAQ = lazy(() => import("../components/FAQ"));
const BannerSection = lazy(() => import("../components/BannerSection"));
const BotaoWPFooter = lazy(() => import("../components/BotaoWPFooter"));
const ParceirosSection = lazy(() => import("../components/ParceirosSection"));
const PassaporteVendasHomeTeste = lazy(
  () => import("../components/HomeTesteComponentes/PassaporteVendasHomeTeste")
);
const PassaportesMobileHomeTeste = lazy(
  () => import("../components/HomeTesteComponentes/PassaportesMobileHomeTeste")
);
const PassaporteGrupoHomeTeste = lazy(
  () => import("../components/HomeTesteComponentes/PassaporteGrupoHomeTeste")
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
  return code === "PGRST204" || message.includes("column") || message.includes("schema cache");
}

const LEAD_DONE_KEY = "lead_home_teste_done";
const LEAD_IDENTITY_KEY = "lead_home_teste_identity";
const PENDING_EVENTS_KEY = "lead_home_teste_pending_events";

function LazyMountSection({
  children,
  minHeightClass = "min-h-[280px]",
  fallbackClassName = "bg-black",
  rootMargin = "380px 0px",
}) {
  const rootRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) return;

    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setIsMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isMounted, rootMargin]);

  if (!isMounted) {
    return <div ref={rootRef} className={`${minHeightClass} ${fallbackClassName}`} />;
  }

  return (
    <div ref={rootRef}>
      <Suspense fallback={<div className={`${minHeightClass} ${fallbackClassName}`} />}>
        {children}
      </Suspense>
    </div>
  );
}

const HomeTeste = () => {
  useEffect(() => {
    const pageTitle = "Sobre | DSX | Digital Summit Experience";
    const pageDescription =
      "DSX 2026: o maior evento de negócios, marketing, vendas e inovação do Norte. Dias 23 e 24 de julho, em Manaus.";
    const pageUrl = "https://dsx.com.vc/sobre";
    const ogImage = "https://dsx.com.vc/og-home-dsx-2026.jpg";

    document.title = pageTitle;

    const updates = [
      { type: "name", key: "description", value: pageDescription },
      { type: "property", key: "og:type", value: "website" },
      { type: "property", key: "og:title", value: pageTitle },
      { type: "property", key: "og:description", value: pageDescription },
      { type: "property", key: "og:url", value: pageUrl },
      { type: "property", key: "og:image", value: ogImage },
      { type: "name", key: "twitter:card", value: "summary_large_image" },
      { type: "name", key: "twitter:title", value: pageTitle },
      { type: "name", key: "twitter:description", value: pageDescription },
      { type: "name", key: "twitter:image", value: ogImage },
      { type: "name", key: "twitter:url", value: pageUrl },
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

      if (!iconExisted) {
        iconTag?.remove();
      } else if (previousIconHref === null) {
        iconTag?.removeAttribute("href");
      } else {
        iconTag?.setAttribute("href", previousIconHref);
      }
    };
  }, []);

  const [showTimerHeader, setShowTimerHeader] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [hasAutoPopupShown, setHasAutoPopupShown] = useState(false);
  const [hasClosedAutoPopup, setHasClosedAutoPopup] = useState(false);
  const [hasLeadConverted, setHasLeadConverted] = useState(false);
  const [leadModalOrigin, setLeadModalOrigin] = useState("auto");
  const [leadFormOrigin, setLeadFormOrigin] = useState(() =>
    readDsxFormOrigin("Home Principal")
  );

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
  const [isMobile, setIsMobile] = useState(false);
  const [pendingPurchaseLink, setPendingPurchaseLink] = useState("");
  const pendingTrackingEventsRef = useRef([]);
  const hasLeadConvertedRef = useRef(false);
  const leadIdentityRef = useRef(null);
  const markSymplaFlagTrue = async () => {
    if (!isSupabaseConfigured) return;
    const supabase = await getSupabaseClient();
    if (!supabase) return;
    const leadIdentity = leadIdentityRef.current;
    if (!leadIdentity?.email) return;

    const trackerState = window.DSXTracker?.getState?.() || {};
    const sessionId = trackerState.sessionId || null;
    const nowIso = new Date().toISOString();

    const profilePayload = {
      lead_email: leadIdentity.email,
      lead_name: leadIdentity.name || null,
      lead_phone: leadIdentity.phone || null,
      lead_cargo: leadIdentity.cargo || null,
      site_origin: sourceData.site_origin || null,
      site_hostname: sourceData.site_hostname || window.location.hostname || null,
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

    if (profileError) {
      console.error("[HomeTeste] erro ao marcar profile sympla=true", profileError);
    }

    if (!sessionId) return;

    const sessionPayload = {
      session_id: sessionId,
      lead_email: leadIdentity.email,
      lead_name: leadIdentity.name || null,
      lead_phone: leadIdentity.phone || null,
      lead_cargo: leadIdentity.cargo || null,
      site_origin: sourceData.site_origin || null,
      site_hostname: sourceData.site_hostname || window.location.hostname || null,
      page:
        sourceData.page_url ||
        window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      utm_source: sourceData.utm_source || sourceData.site_origin || null,
      utm_medium: sourceData.utm_medium || null,
      utm_campaign: sourceData.utm_campaign || null,
      utm_content: sourceData.utm_content || null,
      utm_term: sourceData.utm_term || null,
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

    if (sessionError) {
      console.error("[HomeTeste] erro ao marcar session sympla=true", sessionError);
    }
  };
  const dispatchJourneyEvent = (eventName, data = {}) => {
    try {
      const trackerState = window.DSXTracker?.getState?.() || {};
      const sessionId = trackerState.sessionId || null;
      const detail = {
        name: eventName,
        session_id: sessionId,
        at: new Date().toISOString(),
        page: window.location.pathname + window.location.search,
        data,
      };
      window.dispatchEvent(new CustomEvent("dsx:track", { detail }));
    } catch {
      // no-op
    }
  };

  const midnightToday = useMemo(() => {
    const date = new Date();
    date.setHours(24, 0, 0, 0);
    return date;
  }, []);

  useScrollToHash(90);

  useEffect(() => {
    const jsonLdId = "jsonld-dsx-home";
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://dsx.com.vc/#organization",
          name: "DSX | Digital Summit Experience",
          url: "https://dsx.com.vc/",
          logo: "https://dsx.com.vc/dsx-2026-logo.png",
        },
        {
          "@type": "Event",
          "@id": "https://dsx.com.vc/#event",
          name: "DSX 2026 | Digital Summit Experience",
          description:
            "Evento de negócios, marketing, vendas e inovação do Norte do Brasil.",
          startDate: "2026-03-13T09:00:00-04:00",
          endDate: "2026-03-14T22:00:00-04:00",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          image: ["https://dsx.com.vc/dsx2026.png"],
          url: "https://dsx.com.vc/",
          location: {
            "@type": "Place",
            name: "Studio 5 Centro de Convenções",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Manaus",
              addressRegion: "AM",
              addressCountry: "BR",
            },
          },
          organizer: {
            "@id": "https://dsx.com.vc/#organization",
          },
        },
      ],
    };

    let scriptTag = document.getElementById(jsonLdId);
    const scriptExisted = Boolean(scriptTag);
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("id", jsonLdId);
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify(structuredData);

    return () => {
      if (!scriptExisted) {
        scriptTag?.remove();
      }
    };
  }, []);

  useEffect(() => {
    try {
      const leadAlreadyCaptured = window.localStorage.getItem(LEAD_DONE_KEY);
      const leadIdentityRaw = window.localStorage.getItem(LEAD_IDENTITY_KEY);
      const pendingEventsRaw = window.sessionStorage.getItem(PENDING_EVENTS_KEY);

      if (leadAlreadyCaptured === "1") {
        setHasLeadConverted(true);
      }

      if (leadIdentityRaw) {
        const parsedIdentity = JSON.parse(leadIdentityRaw);
        if (parsedIdentity?.email) {
          leadIdentityRef.current = parsedIdentity;
        }
      }

      if (pendingEventsRaw) {
        const parsedEvents = JSON.parse(pendingEventsRaw);
        if (Array.isArray(parsedEvents)) {
          pendingTrackingEventsRef.current = parsedEvents;
        }
      }
    } catch {
      // no-op
    }
  }, []);

  useEffect(() => {
    hasLeadConvertedRef.current = hasLeadConverted;
  }, [hasLeadConverted]);

  const buildTrackingEventRow = (eventDetail, leadIdentity) => {
    const eventName = eventDetail?.name;
    const section = (() => {
      if (eventName === "section_completed") {
        return eventDetail?.data?.section || "__unknown_section__";
      }
      if (eventName === "all_sections_completed") return "__all__";
      if (eventName === "lead_form_submit") return "__form_submit__";
      if (eventName === "buy_button_clicked") return "__buy_clicked__";
      if (eventName === "sympla_redirected") return "__sympla_redirected__";
      return "__other__";
    })();

    return {
      session_id: eventDetail?.session_id || null,
      lead_email: leadIdentity?.email || null,
      event_name: eventName,
      section,
      occurred_at: eventDetail?.at || new Date().toISOString(),
      page: eventDetail?.page || window.location.pathname + window.location.search,
      payload: {
        ...(eventDetail?.data || {}),
        site_origin: sourceData.site_origin || null,
        site_hostname: sourceData.site_hostname || window.location.hostname || null,
        page_url: sourceData.page_url || window.location.href,
      },
    };
  };

  const persistTrackingEvents = async (events, leadIdentity) => {
    if (!events?.length || !isSupabaseConfigured || !leadIdentity) {
      return;
    }
    const supabase = await getSupabaseClient();
    if (!supabase) return;

    const sessionId = events[0]?.session_id || null;
    if (!sessionId) return;
    const hasSymplaRedirected = events.some(
      (eventDetail) =>
        eventDetail?.name === "sympla_redirected" ||
        eventDetail?.name === "buy_button_clicked"
    );
    const nowIso = new Date().toISOString();

    const sessionPayload = {
      session_id: sessionId,
      lead_name: leadIdentity.name || null,
      lead_email: leadIdentity.email || null,
      lead_phone: leadIdentity.phone || null,
      lead_cargo: leadIdentity.cargo || null,
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
      has_sympla_redirected: hasSymplaRedirected,
      sympla_redirected_at: hasSymplaRedirected ? nowIso : null,
    };

    const profilePayload = {
      lead_email: leadIdentity.email || null,
      lead_name: leadIdentity.name || null,
      lead_phone: leadIdentity.phone || null,
      lead_cargo: leadIdentity.cargo || null,
      site_origin: sourceData.site_origin || null,
      site_hostname: sourceData.site_hostname || window.location.hostname || null,
      first_converted_at: nowIso,
      last_seen_at: nowIso,
      has_sympla_redirected: hasSymplaRedirected,
      last_sympla_redirected_at: hasSymplaRedirected ? nowIso : null,
    };

    const rows = events
      .filter(
        (eventDetail) =>
          eventDetail?.name === "section_completed" ||
          eventDetail?.name === "all_sections_completed" ||
          eventDetail?.name === "lead_form_submit" ||
          eventDetail?.name === "buy_button_clicked" ||
          eventDetail?.name === "sympla_redirected"
      )
      .map((eventDetail) => buildTrackingEventRow(eventDetail, leadIdentity));

    if (!rows.length) return;

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

    if (profileError) {
      console.error("[HomeTeste] erro ao salvar tracking_lead_profiles", profileError);
      return;
    }

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

    if (sessionError) {
      console.error("[HomeTeste] erro ao salvar tracking_lead_sessions", sessionError);
      return;
    }

    const { error: eventsError } = await supabase
      .from("tracking_lead_section_events")
      .upsert(rows, { onConflict: "session_id,event_name,section" });

    if (eventsError) {
      console.error(
        "[HomeTeste] erro ao salvar tracking_lead_section_events",
        eventsError
      );
      return;
    }

    pendingTrackingEventsRef.current = [];
    try {
      window.sessionStorage.removeItem(PENDING_EVENTS_KEY);
    } catch {
      // no-op
    }
  };

  useEffect(() => {
    const onTrackEvent = (event) => {
      const detail = event?.detail || {};
      const eventName = detail?.name;

      if (
        eventName !== "section_completed" &&
        eventName !== "all_sections_completed" &&
        eventName !== "lead_form_submit" &&
        eventName !== "buy_button_clicked" &&
        eventName !== "sympla_redirected"
      ) {
        return;
      }

      // Dedup local por sessao + evento + secao/chave.
      const sectionToken =
        eventName === "section_completed"
          ? detail?.data?.section || "no-section"
          : eventName === "all_sections_completed"
            ? "__all__"
            : eventName === "buy_button_clicked"
              ? "__buy__"
              : eventName === "sympla_redirected"
                ? "__redirect__"
                : "__form__";

      const dedupKey = [
        detail?.session_id || "no-session",
        eventName,
        sectionToken,
      ].join("|");

      const alreadyQueued = pendingTrackingEventsRef.current.some(
        (item) => item.__dedupKey === dedupKey
      );
      if (alreadyQueued) return;

      const enriched = { ...detail, __dedupKey: dedupKey };
      pendingTrackingEventsRef.current.push(enriched);
      try {
        window.sessionStorage.setItem(
          PENDING_EVENTS_KEY,
          JSON.stringify(pendingTrackingEventsRef.current)
        );
      } catch {
        // no-op
      }

      if (hasLeadConvertedRef.current && leadIdentityRef.current) {
        void persistTrackingEvents(
          pendingTrackingEventsRef.current,
          leadIdentityRef.current
        );
      }
    };

    window.addEventListener("dsx:track", onTrackEvent);
    return () => window.removeEventListener("dsx:track", onTrackEvent);
  }, [sourceData]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageUrl = window.location.href;
    const siteHostname = normalizeHostname(window.location.hostname);
    const siteOrigin = detectSiteOriginFromUrl(pageUrl) || siteHostname;
    setSourceData({
      page_url: pageUrl,
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
    const onScroll = () => setShowTimerHeader(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1015);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (!showLeadModal) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
    };
  }, [showLeadModal]);

  useEffect(() => {
    if (hasAutoPopupShown) return undefined;

    const onScroll = () => {
      if (hasAutoPopupShown) return;
      const totalHeight = document.documentElement.scrollHeight || 0;
      const triggerPoint = totalHeight * 0.5;
      const viewportBottom = window.scrollY + window.innerHeight;

      if (viewportBottom < triggerPoint) return;

      setHasAutoPopupShown(true);
      setLeadModalOrigin("auto");
      setShowLeadModal(true);
      window.removeEventListener("scroll", onScroll);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [hasAutoPopupShown]);

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
  const canCloseLeadModal = !loading;

  const handleWhatsappMask = (e) => {
    let value = e.target.value;
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

  const closeLeadModal = () => {
    if (loading) return;
    if (leadModalOrigin === "auto" && !hasLeadConvertedRef.current) {
      setHasClosedAutoPopup(true);
    }

    setShowLeadModal(false);
  };

  const handleBuyPassaporte = (targetLink, formOrigin) => {
    if (!targetLink) return;
    const resolvedFormOrigin = formOrigin || readDsxFormOrigin("Checkout");
    setLeadFormOrigin(resolvedFormOrigin);
    rememberDsxFormOrigin(resolvedFormOrigin);

    dispatchJourneyEvent("buy_button_clicked", {
      target_link: targetLink,
    });

    if (hasLeadConvertedRef.current && leadIdentityRef.current) {
      void markSymplaFlagTrue();
    }

    if (hasLeadConverted) {
      dispatchJourneyEvent("sympla_redirected", {
        target_link: targetLink,
      });
      window.location.href = targetLink;
      return;
    }

    if (!hasClosedAutoPopup) {
      setLeadStatus("error");
      setMensagem(
        "Feche o primeiro formulário da página para desbloquear a compra."
      );
      return;
    }

    setPendingPurchaseLink(targetLink);
    setLeadStatus("idle");
    setMensagem("Para continuar com a compra, preencha e envie o formulário.");
    setLeadModalOrigin("checkout");
    setShowLeadModal(true);
  };

  const redirectToPendingPurchase = () => {
    if (!pendingPurchaseLink) return;
    const targetLink = pendingPurchaseLink;
    setPendingPurchaseLink("");
    dispatchJourneyEvent("sympla_redirected", {
      target_link: targetLink,
    });
    window.location.href = targetLink;
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
      const resolvedFormOrigin =
        leadModalOrigin === "checkout"
          ? leadFormOrigin || readDsxFormOrigin("Checkout")
          : "Home Principal";

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
            "Home Principal"
          ),
        },
        tags: ["dsx-hometeste", "popup"],
        source: "landing-home-teste",
      };

      if (!isSupabaseConfigured) {
        throw new Error("Supabase não configurado");
      }
      const supabase = await getSupabaseClient();
      if (!supabase) {
        throw new Error("Supabase não configurado");
      }

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

      const leadIdentity = { name, email, phone, cargo };
      leadIdentityRef.current = leadIdentity;
      window.localStorage.setItem(LEAD_IDENTITY_KEY, JSON.stringify(leadIdentity));
      await persistTrackingEvents(pendingTrackingEventsRef.current, leadIdentity);

      setLeadStatus("success");
      setHasLeadConverted(true);
      window.localStorage.setItem(LEAD_DONE_KEY, "1");
      const successText = "Cadastro enviado! Em breve entraremos em contato.";
      setMensagem(successText);
      setLeadForm({ name: "", phone: "", email: "", cargo: "" });
      e.target.reset();
      setTimeout(() => {
        setShowLeadModal(false);
        redirectToPendingPurchase();
      }, 1200);
    } catch (_error) {
      setLeadStatus("error");
      const errorText =
        _error?.message || "Erro ao enviar formulário. Tente novamente.";
      console.error("[HomeTeste] erro no envio", _error);
      setMensagem(errorText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="home" className="bg-black pb-43 md:pb-18 overflow-x-hidden">
      <div data-section="hero">
        <HeroSection ctaLink="#passaportes" />
      </div>
      <div data-section="destaques">
        <HeroSectionV2 />
      </div>
      <div data-section="faixa">
        <SlideFaixa />
      </div>
      <NewTimerHeaderHomeTeste
        isVisible={showTimerHeader}
        headerText="3º lote disponível:"
        ctaTitle="Garanta seu passaporte"
        targetDate={midnightToday}
      />

      <div data-section="conteudo">
        <LazyMountSection minHeightClass="min-h-[700px] md:min-h-[620px]">
          <ContentSection />
        </LazyMountSection>
      </div>
      <div data-section="depoimentos">
        <LazyMountSection minHeightClass="min-h-[620px] md:min-h-[560px]">
          <Depoimentos ctaLink="#passaportes" />
        </LazyMountSection>
      </div>
      <div data-section="publico">
        <LazyMountSection minHeightClass="min-h-[520px]">
          <PublicoDSX />
        </LazyMountSection>
      </div>
      <div data-section="banner">
        <LazyMountSection minHeightClass="min-h-[380px]">
          <BannerSection />
        </LazyMountSection>
      </div>
      <div
        id="passaportes"
        data-section="passaportes"
        className="bg-[url(/ELEMENTOS-BANNER-2.png)] bg-cover bg-no-repeat bg-center"
      >
        <LazyMountSection minHeightClass="min-h-[880px] md:min-h-[760px]">
          {isMobile ? (
            <PassaportesMobileHomeTeste onBuyPassaporte={handleBuyPassaporte} />
          ) : (
            <PassaporteVendasHomeTeste onBuyPassaporte={handleBuyPassaporte} />
          )}
        </LazyMountSection>
      </div>
      <div data-section="grupo">
        <LazyMountSection minHeightClass="min-h-[540px] md:min-h-[460px]">
          <PassaporteGrupoHomeTeste onBuyPassaporte={handleBuyPassaporte} />
        </LazyMountSection>
      </div>
      <div data-section="fale-conosco">
        <LazyMountSection minHeightClass="min-h-[460px]">
          <FaleConosco />
        </LazyMountSection>
      </div>
      <div data-section="parceiros">
        <LazyMountSection minHeightClass="min-h-[320px]">
          <ParceirosSection />
        </LazyMountSection>
      </div>
      <div data-section="faq">
        <LazyMountSection minHeightClass="min-h-[520px]">
          <FAQ />
        </LazyMountSection>
      </div>
      <LazyMountSection minHeightClass="min-h-[1px]">
        <BotaoWPFooter />
      </LazyMountSection>
      <div className="h-px w-full" data-section="footer-trigger" />
      <div data-section="footer">
        <LazyMountSection minHeightClass="min-h-[220px]">
          <Footer />
        </LazyMountSection>
      </div>
      <LeadPopupFormHomeTeste
        isOpen={showLeadModal}
        popupStep={1}
        canClose={canCloseLeadModal}
        onClose={closeLeadModal}
        onSubmit={handleLeadSubmit}
        leadForm={leadForm}
        setLeadForm={setLeadForm}
        onWhatsappChange={handleWhatsappMask}
        leadStatus={leadStatus}
        message={mensagem}
        loading={loading}
        canSubmit={canSubmitLead}
      />
    </section>
  );
};

export default HomeTeste;
