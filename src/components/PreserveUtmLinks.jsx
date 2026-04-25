import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PREFIX_DOMAINS = [
  "https://pay.hub.la",
  "https://invoice.hub.la",
  "https://app.hub.la",
  "https://hub.la",
];

const STORAGE_KEY = "hubla_utms";

const REWRITE_SELECTOR = PREFIX_DOMAINS.map(
  (domain) => `a[href^="${domain}"]`,
).join(", ");

function getUtmParamsExtraFromSearchParams(sp) {
  const utm_source = sp.get("utm_source") ?? "";
  const utm_medium = sp.get("utm_medium") ?? "";
  const utm_campaign = sp.get("utm_campaign") ?? "";
  const utm_term = sp.get("utm_term") ?? "";
  const utm_content = sp.get("utm_content") ?? "";

  const hasAny =
    utm_source || utm_medium || utm_campaign || utm_term || utm_content;

  return hasAny
    ? `&sck=${encodeURIComponent(
        `${utm_source}|${utm_medium}|${utm_campaign}|${utm_term}|${utm_content}`
      )}`
    : "";
}

function shouldRewriteLink(href) {
  return PREFIX_DOMAINS.some((d) => href.startsWith(d));
}

function getPersistedParams(locationSearch) {
  // 1) se a URL atual tem query, salva e usa ela
  const current = new URLSearchParams(locationSearch);
  if (current.toString()) {
    sessionStorage.setItem(STORAGE_KEY, current.toString());
    return current;
  }

  // 2) senão, tenta usar o que foi salvo na primeira entrada (landing)
  const saved = sessionStorage.getItem(STORAGE_KEY) || "";
  return new URLSearchParams(saved);
}

function appendTrackingParams(href, params) {
  if (!href || !params || !params.toString()) return href;
  if (!shouldRewriteLink(href)) return href;
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }
  if (
    href.includes("utm_source=") ||
    href.includes("utm_medium=") ||
    href.includes("utm_campaign=")
  ) {
    return href;
  }

  const qs = params.toString();
  const sck = getUtmParamsExtraFromSearchParams(params);
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}${qs}${sck}`;
}

export default function PreserveUtmLinks() {
  const location = useLocation();

  useEffect(() => {
    const params = getPersistedParams(location.search);
    if (!params.toString()) return;

    let isCancelled = false;
    let isListenerAttached = false;

    const handleClickCapture = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !shouldRewriteLink(href)) return;
      const nextHref = appendTrackingParams(href, params);
      if (nextHref !== href) anchor.setAttribute("href", nextHref);
    };

    const applyToExistingLinks = () => {
      if (isCancelled) return;
      document.querySelectorAll(REWRITE_SELECTOR).forEach((anchor) => {
        const href = anchor.getAttribute("href");
        if (!href) return;
        const nextHref = appendTrackingParams(href, params);
        if (nextHref !== href) anchor.setAttribute("href", nextHref);
      });

      if (!isListenerAttached) {
        document.addEventListener("click", handleClickCapture, true);
        isListenerAttached = true;
      }
    };

    let idleId = null;
    let timeoutId = null;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(applyToExistingLinks, { timeout: 1500 });
    } else {
      timeoutId = window.setTimeout(applyToExistingLinks, 200);
    }

    return () => {
      isCancelled = true;
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      if (isListenerAttached) {
        document.removeEventListener("click", handleClickCapture, true);
      }
    };
  }, [location.search]);

  return null;
}
