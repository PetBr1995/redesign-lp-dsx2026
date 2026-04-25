export function onlyDigits(value = "") {
  return value.replace(/\D/g, "");
}

export function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function formatWhatsappMask(value = "") {
  let digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d+)/, "($1) $2");
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
  }
  return digits.replace(/^(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
}

export function formatWhatsappE164(value = "") {
  const digits = onlyDigits(value);
  if (!digits) return "";
  if (digits.startsWith("55")) return `+${digits}`;
  return `+55${digits}`;
}

export function getFieldError(field, form) {
  if (field === "name") {
    const normalizedName = form.name.trim().replace(/\s+/g, " ");
    const nameParts = normalizedName.split(" ").filter(Boolean);

    if (nameParts.length < 2) {
      return "Informe nome e sobrenome.";
    }
  }

  if (field === "phone") {
    const digits = onlyDigits(form.phone);
    if (!(digits.length === 10 || digits.length === 11)) {
      return "Informe um WhatsApp com DDD.";
    }
  }

  if (field === "email" && !isValidEmail(form.email)) {
    return "Informe um e-mail valido.";
  }

  if (field === "cargo" && !form.cargo) {
    return "Selecione seu perfil.";
  }

  return "";
}

export function getFirstFormError(steps, form) {
  const fieldsWithError = steps
    .map((item) => ({
      key: item.key,
      error: getFieldError(item.key, form),
    }))
    .filter((item) => item.error);

  return fieldsWithError[0] || null;
}

export function normalizeHostname(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^www\./, "");
}

export function detectSiteOriginFromUrl(value = "") {
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

export function isMissingColumnError(error) {
  const code = String(error?.code || "").toUpperCase();
  const message = String(error?.message || "").toLowerCase();
  return (
    code === "PGRST204" ||
    message.includes("column") ||
    message.includes("schema cache")
  );
}
