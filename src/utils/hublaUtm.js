const STORAGE_KEY = "hubla_utms";

function dedupeParams(params) {
  const deduped = new URLSearchParams();
  const seen = new Set();

  params.forEach((value, key) => {
    if (seen.has(key)) return;
    seen.add(key);
    deduped.set(key, value);
  });

  return deduped;
}

function getCurrentOrStoredParams() {
  const current = new URLSearchParams(window.location.search);
  const dedupedCurrent = dedupeParams(current);

  // Se a URL atual tem query, salva e usa
  if (dedupedCurrent.toString()) {
    sessionStorage.setItem(STORAGE_KEY, dedupedCurrent.toString());
    return dedupedCurrent;
  }

  // Senão, tenta recuperar o que foi salvo
  const saved = sessionStorage.getItem(STORAGE_KEY) || "";
  return dedupeParams(new URLSearchParams(saved));
}

function buildSck(params) {
  const utm_source = params.get("utm_source") ?? "";
  const utm_medium = params.get("utm_medium") ?? "";
  const utm_campaign = params.get("utm_campaign") ?? "";
  const utm_term = params.get("utm_term") ?? "";
  const utm_content = params.get("utm_content") ?? "";

  const hasAny =
    utm_source || utm_medium || utm_campaign || utm_term || utm_content;

  return hasAny
    ? `sck=${encodeURIComponent(
        `${utm_source}|${utm_medium}|${utm_campaign}|${utm_term}|${utm_content}`
      )}`
    : "";
}

export function withHublaUtm(url) {
  const params = getCurrentOrStoredParams();
  if (!params.toString()) return url;

  const u = new URL(url);
  const destinationParams = dedupeParams(u.searchParams);

  // Normaliza query de destino para evitar parâmetros repetidos (ex: referrer duplicado)
  u.search = destinationParams.toString();

  // Merge dos params atuais/stored na URL de destino
  params.forEach((value, key) => {
    // não sobrescreve se o destino já tiver esse param
    if (!u.searchParams.has(key)) u.searchParams.set(key, value);
  });

  // Adiciona sck se ainda não existir
  if (!u.searchParams.has("sck")) {
    const sck = buildSck(params);
    if (sck) {
      const [k, v] = sck.split("=");
      u.searchParams.set(k, v);
    }
  }

  return u.toString();
}
