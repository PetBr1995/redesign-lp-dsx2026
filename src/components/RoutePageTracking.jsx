import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function getPagePath(location) {
  return `${location.pathname}${location.search}${location.hash}`;
}

function pushDataLayerPageView(path) {
  if (!Array.isArray(window.dataLayer)) return;

  window.dataLayer.push({
    event: "virtual_pageview",
    page_path: path,
    page_location: window.location.href,
    page_title: document.title || null,
  });
}

function pushGtagPageView(path) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title || null,
  });
}

function pushDsxTrackerPageView(path) {
  if (!window.DSXTracker || typeof window.DSXTracker.track !== "function") return;

  if (typeof window.DSXTracker.setPageContext === "function") {
    window.DSXTracker.setPageContext(window.location.href);
  }

  window.DSXTracker.track("page_view", {
    title: document.title || null,
    url: window.location.href,
    path,
    source: "react_router_navigation",
  });
}

export default function RoutePageTracking() {
  const location = useLocation();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const path = getPagePath(location);
    pushDataLayerPageView(path);
    pushGtagPageView(path);
    pushDsxTrackerPageView(path);
  }, [location]);

  return null;
}
