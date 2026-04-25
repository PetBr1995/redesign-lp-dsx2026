const JPG_EXT_REGEX = /\.jpe?g$/i;

export function buildModernImageSet(src = "") {
  if (!src) return "";
  if (!JPG_EXT_REGEX.test(src)) return `url("${src}")`;

  const base = src.replace(JPG_EXT_REGEX, "");
  return `image-set(url("${base}.avif") type("image/avif"), url("${base}.webp") type("image/webp"), url("${src}") type("image/jpeg"))`;
}

export function buildBackgroundImageVars(src = "") {
  const fallback = src ? `url("${src}")` : "none";
  const modern = buildModernImageSet(src) || fallback;

  return {
    "--bg-image-fallback": fallback,
    "--bg-image-modern": modern,
  };
}
