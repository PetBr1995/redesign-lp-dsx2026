const RD_CONVERSIONS_BASE_URL = "https://api.rd.services/platform/conversions";
const LEGACY_RD_API_URL =
  "https://api.rd.services/platform/conversions?api_key=MHnWDjBYARQKdwUsfZRbjtVmPEyoHnSqtgFz";

const envConversionsUrl = import.meta.env.VITE_RD_STATION_CONVERSIONS_URL?.trim();
const envApiKey = import.meta.env.VITE_RD_STATION_API_KEY?.trim();

export const RD_API_URL =
  envConversionsUrl ||
  (envApiKey
    ? `${RD_CONVERSIONS_BASE_URL}?api_key=${encodeURIComponent(envApiKey)}`
    : LEGACY_RD_API_URL);
