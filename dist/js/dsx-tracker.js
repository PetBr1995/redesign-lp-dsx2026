(function () {
  "use strict";

  // Evita inicializar duas vezes.
  if (window.__DSX_TRACKER_INITIALIZED__) return;
  window.__DSX_TRACKER_INITIALIZED__ = true;

  // =============================
  // Reset v0: base minima e segura
  // =============================
  var VERSION = "reset-v2";
  var SESSION_STORAGE_KEY = "__DSX_TRACKER_SESSION_ID__";
  var TRACKING_ENDPOINT = "/api/tracking/session";
  var FORM_SELECTOR = "#lead-form, [data-lead-form]";
  var CTA_SELECTOR = '[data-cta="sympla"], a[href*="sympla.com"]';
  var SECTION_SELECTOR = "[data-section]";
  var SECTION_BOOTSTRAP_TIMEOUT_MS = 12000;

  var state = {
    sessionId: getOrCreateSessionId(),
    startedAt: new Date().toISOString(),
    page: window.location.pathname + window.location.search,
    pageUrl: window.location.href,
    siteOrigin: detectSiteOrigin(window.location.hostname),
    referrer: document.referrer || null,
    utm: readUtmParams(),
    lead: {
      name: null,
      email: null,
      phone: null,
      cargo: null,
    },
    events: [],
    lastScrollY: window.scrollY || window.pageYOffset || 0,
    sections: {},
    sectionObserverStarted: false,
    lastCompletedSection: null,
    exitTracked: false,
    sessionPayloadSentReason: null,
    allSectionsEventSent: false,
  };

  function updatePageContext(nextUrl) {
    try {
      var safeUrl = String(nextUrl || window.location.href || "");
      var parsed = new URL(safeUrl, window.location.origin);
      state.pageUrl = parsed.href;
      state.page = parsed.pathname + parsed.search + parsed.hash;
      return;
    } catch {
      // fallback para ambientes sem URL valida
    }

    state.pageUrl = window.location.href;
    state.page = window.location.pathname + window.location.search + window.location.hash;
  }

  function init() {
    updatePageContext(window.location.href);
    trackPageView();
    trackSectionCompletion();
    trackBottomCompletion();
    trackCtaClick();
    trackFormSubmit();
    setupExitTracking();
    exposeDebugApi();
    log("initialized", {
      version: VERSION,
      session_id: state.sessionId,
      form_selector: FORM_SELECTOR,
      cta_selector: CTA_SELECTOR,
      section_selector: SECTION_SELECTOR,
    });
  }

  function trackPageView() {
    pushEvent("page_view", {
      title: document.title || null,
      url: window.location.href,
      site_origin: state.siteOrigin,
      referrer: state.referrer,
    });
  }

  function trackCtaClick() {
    document.addEventListener(
      "click",
      function (event) {
        var target = event.target;
        if (!(target instanceof Element)) return;

        var cta = target.closest(CTA_SELECTOR);
        if (!cta) return;

        pushEvent("cta_click", {
          text: normalizeText(cta.textContent),
          href: cta.getAttribute("href") || null,
          id: cta.id || null,
          classes: cta.className || null,
        });
      },
      true
    );
  }

  function trackFormSubmit() {
    document.addEventListener(
      "submit",
      function (event) {
        var form = event.target;
        if (!(form instanceof HTMLFormElement)) return;
        if (!form.matches(FORM_SELECTOR)) return;

        var fields = readFormFields(form);
        state.lead = {
          name: fields.name || null,
          email: fields.email || null,
          phone: fields.phone || null,
          cargo: fields.cargo || null,
        };

        pushEvent("lead_form_submit", {
          form_id: form.id || null,
          field_names: Object.keys(fields),
          has_name: !!fields.name,
          has_email: !!fields.email,
          has_phone: !!fields.phone,
          has_cargo: !!fields.cargo,
        });
      },
      true
    );
  }

  function trackSectionCompletion() {
    if (!("IntersectionObserver" in window)) {
      log("section_observer_unavailable", { reason: "IntersectionObserver missing" });
      return;
    }

    waitAndStartSectionObserver();
  }

  function waitAndStartSectionObserver() {
    var startedAt = Date.now();
    var rootNode = document.documentElement || document.body;
    var mutationObserver = null;
    var intervalId = null;

    function cleanup() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }

      if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
      }
    }

    function tryStart(source) {
      if (state.sectionObserverStarted) return true;

      var nodes = document.querySelectorAll(SECTION_SELECTOR);
      if (nodes.length) {
        startSectionObserver(nodes);
        log("section_observer_ready", {
          source: source,
          total_sections: nodes.length,
        });
        cleanup();
        return true;
      }

      var timedOut = Date.now() - startedAt >= SECTION_BOOTSTRAP_TIMEOUT_MS;
      if (timedOut) {
        log("section_observer_unavailable", {
          reason: "No [data-section] nodes found",
          waited_ms: SECTION_BOOTSTRAP_TIMEOUT_MS,
        });
        cleanup();
        return false;
      }

      return false;
    }

    if (tryStart("init")) return;

    if (rootNode && "MutationObserver" in window) {
      mutationObserver = new MutationObserver(function () {
        tryStart("mutation");
      });
      mutationObserver.observe(rootNode, { childList: true, subtree: true });
    }

    intervalId = window.setInterval(function () {
      tryStart("interval");
    }, 250);

    window.addEventListener(
      "load",
      function () {
        tryStart("window_load");
      },
      { once: true }
    );
  }

  function startSectionObserver(nodes) {
    state.sectionObserverStarted = true;
    state.sections = {};

    nodes.forEach(function (node) {
      var sectionKey = getSectionKey(node);
      state.sections[sectionKey] = {
        seen: false,
        completed: false,
      };
    });

    var observer = new IntersectionObserver(
      function (entries) {
        var currentScrollY = window.scrollY || window.pageYOffset || 0;
        var scrollingDown = currentScrollY >= state.lastScrollY;

        entries.forEach(function (entry) {
          var sectionKey = getSectionKey(entry.target);
          var progress = state.sections[sectionKey];
          if (!progress || progress.completed) return;

          if (entry.isIntersecting) {
            progress.seen = true;
            return;
          }

          // "Percorreu a secao" = entrou em viewport e saiu pelo topo no scroll para baixo.
          var passedThroughSection = progress.seen && scrollingDown && entry.boundingClientRect.bottom <= 0;
          if (!passedThroughSection) return;

          progress.completed = true;
          state.lastCompletedSection = sectionKey;
          pushEvent("section_completed", {
            section: sectionKey,
            section_id: entry.target.id || null,
            message: "Usuario percorreu a secao especifica",
          });

          maybeSendSessionPayloadOnAllSectionsCompleted();
        });

        state.lastScrollY = currentScrollY;
      },
      {
        threshold: 0,
      }
    );

    Array.prototype.forEach.call(nodes, function (node) {
      observer.observe(node);
    });
  }

  function readFormFields(form) {
    var data = new FormData(form);
    var map = {};

    data.forEach(function (value, key) {
      if (typeof key !== "string") return;
      var normalizedKey = key.trim().toLowerCase();
      if (!normalizedKey) return;
      map[normalizedKey] = normalizeText(String(value || ""));
    });

    return {
      name: pickFirst(map, ["name", "nome", "full_name", "nome_completo"]),
      email: pickFirst(map, ["email", "e-mail", "mail"]),
      phone: pickFirst(map, ["phone", "telefone", "celular", "whatsapp", "tel"]),
      cargo: pickFirst(map, ["cargo", "perfil", "voce_e", "você_e"]),
    };
  }

  function pushEvent(name, data) {
    var item = {
      name: name,
      session_id: state.sessionId,
      at: new Date().toISOString(),
      page: state.page,
      data: data || {},
    };

    state.events.push(item);
    log("event", item);
    emitTrackEvent(item);
  }

  function exposeDebugApi() {
    window.DSXTracker = {
      version: VERSION,
      getState: function () {
        return {
          sessionId: state.sessionId,
          startedAt: state.startedAt,
          page: state.page,
          pageUrl: state.pageUrl,
          siteOrigin: state.siteOrigin,
          referrer: state.referrer,
          lead: state.lead,
          lastCompletedSection: state.lastCompletedSection,
          sessionPayloadSentReason: state.sessionPayloadSentReason,
          totalEvents: state.events.length,
          events: state.events.slice(),
        };
      },
      clearEvents: function () {
        state.events = [];
        log("events_cleared");
      },
      track: function (name, data) {
        if (!name) return;
        pushEvent(String(name), data || {});
      },
      setPageContext: function (nextUrl) {
        updatePageContext(nextUrl);
      },
    };
  }

  function setupExitTracking() {
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState !== "hidden") return;
      trackExit("visibility_hidden");
    });

    window.addEventListener("beforeunload", function () {
      trackExit("beforeunload");
    });
  }

  function trackExit(reason) {
    if (state.exitTracked) return;
    state.exitTracked = true;

    pushEvent("page_exit", {
      reason: reason,
      last_completed_section: state.lastCompletedSection || null,
      total_events_recorded: state.events.length,
    });

    // Se nao concluiu tudo, envia como abandono.
    sendSessionPayload("page_abandon");
  }

  function maybeSendSessionPayloadOnAllSectionsCompleted() {
    if (!state.sectionObserverStarted) return;

    var keys = Object.keys(state.sections || {});
    if (!keys.length) return;

    var completedCount = 0;
    for (var i = 0; i < keys.length; i++) {
      if (state.sections[keys[i]] && state.sections[keys[i]].completed) {
        completedCount += 1;
      }
    }

    if (completedCount === keys.length) {
      if (!state.allSectionsEventSent) {
        state.allSectionsEventSent = true;
        pushEvent("all_sections_completed", {
          total_sections: keys.length,
          completed_sections: completedCount,
          completed_keys: keys,
        });
      }

      log("all_sections_completed_detected", {
        total_sections: keys.length,
        completed_sections: completedCount,
        completed_keys: keys,
      });
      sendSessionPayload("all_sections_completed");
    }
  }

  function trackBottomCompletion() {
    window.addEventListener(
      "scroll",
      function () {
        maybeSendSessionPayloadOnBottomReached();
      },
      { passive: true }
    );

    // Tenta tambem no load inicial.
    maybeSendSessionPayloadOnBottomReached();
  }

  function maybeSendSessionPayloadOnBottomReached() {
    if (!state.sectionObserverStarted) return;
    if (state.sessionPayloadSentReason) return;

    var scrollTop = window.scrollY || window.pageYOffset || 0;
    var viewportHeight =
      window.innerHeight || document.documentElement.clientHeight || 0;
    var docHeight = document.documentElement.scrollHeight || 0;
    if (!docHeight) return;

    var scrolledRatio = (scrollTop + viewportHeight) / docHeight;
    if (scrolledRatio < 0.97) return;

    var keys = Object.keys(state.sections || {});
    if (!keys.length) return;

    var seenCount = 0;
    for (var i = 0; i < keys.length; i++) {
      if (state.sections[keys[i]] && state.sections[keys[i]].seen) {
        seenCount += 1;
      }
    }

    if (seenCount !== keys.length) return;

    if (!state.allSectionsEventSent) {
      state.allSectionsEventSent = true;
      pushEvent("all_sections_completed", {
        total_sections: keys.length,
        completed_sections: seenCount,
        completed_keys: keys,
      });
    }

    log("all_sections_completed_by_bottom_detected", {
      total_sections: keys.length,
      seen_sections: seenCount,
      ratio: scrolledRatio,
    });

    sendSessionPayload("all_sections_completed");
  }

  function buildSessionPayload(reason) {
    var sectionKeys = Object.keys(state.sections || {});
    var completedSections = [];

    for (var i = 0; i < sectionKeys.length; i++) {
      var key = sectionKeys[i];
      if (state.sections[key] && state.sections[key].completed) {
        completedSections.push(key);
      }
    }

    return {
      reason: reason,
      session_id: state.sessionId,
      started_at: state.startedAt,
      sent_at: new Date().toISOString(),
      page: state.page,
      page_url: state.pageUrl,
      site_origin: state.siteOrigin,
      referrer: state.referrer,
      utm: state.utm,
      lead: state.lead,
      sections: {
        total: sectionKeys.length,
        completed: completedSections.length,
        completed_keys: completedSections,
        last_completed_section: state.lastCompletedSection || null,
      },
      total_events: state.events.length,
      events: state.events.slice(),
    };
  }

  function sendSessionPayload(reason) {
    // Envio unico: ou concluiu tudo, ou abandonou.
    if (state.sessionPayloadSentReason) return;
    state.sessionPayloadSentReason = reason;

    var payload = buildSessionPayload(reason);
    var serialized = JSON.stringify(payload);
    log("session_payload_dispatch", {
      endpoint: TRACKING_ENDPOINT,
      reason: reason,
      payload: payload,
    });
    void serialized;
    // Endpoint desativado: persistencia sera feita no frontend via listener + supabase.
  }

  function emitTrackEvent(item) {
    try {
      var event = new CustomEvent("dsx:track", { detail: item });
      window.dispatchEvent(event);
    } catch {
      // no-op
    }
  }

  function pickFirst(obj, keys) {
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (obj[k]) return obj[k];
    }
    return null;
  }

  function getSectionKey(node) {
    if (!node || !(node instanceof Element)) return "unknown-section";
    return (
      normalizeText(node.getAttribute("data-section")) ||
      normalizeText(node.id) ||
      "unknown-section"
    );
  }

  function normalizeText(value) {
    var text = String(value == null ? "" : value).replace(/\s+/g, " ").trim();
    return text || null;
  }

  function normalizeHostname(value) {
    return String(value == null ? "" : value)
      .toLowerCase()
      .replace(/^www\./, "")
      .trim();
  }

  function detectSiteOrigin(hostname) {
    var normalized = normalizeHostname(hostname);
    if (!normalized) return null;
    if (normalized.indexOf("dsx.com.vc") !== -1) return "dsx";
    if (normalized.indexOf("digitalhub.com.vc") !== -1) return "digitalhub";
    if (normalized.indexOf("digitaleduca.com.vc") !== -1) return "digitaleduca";
    return normalized;
  }

  function readUtmParams() {
    var params = new URLSearchParams(window.location.search);
    return {
      utm_source: normalizeText(params.get("utm_source")),
      utm_medium: normalizeText(params.get("utm_medium")),
      utm_campaign: normalizeText(params.get("utm_campaign")),
      utm_content: normalizeText(params.get("utm_content")),
      utm_term: normalizeText(params.get("utm_term")),
    };
  }

  function getOrCreateSessionId() {
    try {
      var existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (existing) return existing;
      var generated =
        Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, generated);
      return generated;
    } catch {
      return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
    }
  }

  function log(name, data) {
    try {
      if (!window.console || typeof window.console.log !== "function") return;
      window.console.log("[DSX Tracker]", name, data || {});
    } catch {
      // no-op
    }
  }

  init();
})();
