const DSX_FORM_ORIGIN_STORAGE_KEY = "dsx_form_origin";

function normalizeOrigin(value = "") {
  return String(value || "").trim();
}

export function rememberDsxFormOrigin(origin = "") {
  const normalizedOrigin = normalizeOrigin(origin);
  if (!normalizedOrigin) return;

  try {
    window.localStorage.setItem(DSX_FORM_ORIGIN_STORAGE_KEY, normalizedOrigin);
  } catch {
    // Ignore storage restrictions.
  }
}

export function readDsxFormOrigin(fallback = "Nao Informado") {
  const normalizedFallback = normalizeOrigin(fallback) || "Nao Informado";

  try {
    const stored = window.localStorage.getItem(DSX_FORM_ORIGIN_STORAGE_KEY);
    return normalizeOrigin(stored) || normalizedFallback;
  } catch {
    return normalizedFallback;
  }
}

export function formatDsxFormOrigin(origin = "", fallback = "Nao Informado") {
  const normalized = normalizeOrigin(origin) || normalizeOrigin(fallback) || "Nao Informado";
  return `Formulario ${normalized}`;
}
