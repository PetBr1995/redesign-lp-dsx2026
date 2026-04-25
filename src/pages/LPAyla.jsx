import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDsxFormOrigin } from "../utils/formOrigin";
import {
  FORM_INITIAL_STATE,
  FORM_STEPS,
  RD_API_URL,
  SOURCE_INITIAL_STATE,
} from "../features/LPAyla/constants";
import {
  detectSiteOriginFromUrl,
  formatWhatsappE164,
  formatWhatsappMask,
  getFieldError,
  getFirstFormError,
  normalizeHostname,
} from "../features/LPAyla/utils";
import LPAylaFormStage from "../features/LPAyla/components/LPAylaFormStage";

const LPAyla = () => {
  const navigate = useNavigate();

  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(FORM_INITIAL_STATE);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [sourceData, setSourceData] = useState(SOURCE_INITIAL_STATE);

  const inputRef = useRef(null);
  const step = FORM_STEPS[stepIndex];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setSourceData({
      page_url: window.location.href,
      site_origin: detectSiteOriginFromUrl(window.location.href),
      site_hostname: normalizeHostname(window.location.hostname),
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    });
  }, []);

  useEffect(() => {
    if (step.type !== "select") {
      inputRef.current?.focus();
    }
  }, [step.type, stepIndex]);

  const currentError = useMemo(
    () => getFieldError(step.key, form),
    [step.key, form],
  );

  const progress = ((stepIndex + 1) / FORM_STEPS.length) * 100;

  const nextStep = () => {
    if (currentError) {
      setMessage(currentError);
      setStatus("error");
      return;
    }

    setStatus("idle");
    setMessage("");
    setStepIndex((prev) => Math.min(prev + 1, FORM_STEPS.length - 1));
  };

  const prevStep = () => {
    setStatus("idle");
    setMessage("");
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "phone" ? formatWhatsappMask(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstError = getFirstFormError(FORM_STEPS, form);
    if (firstError) {
      const targetStep = FORM_STEPS.findIndex((item) => item.key === firstError.key);
      setStepIndex(targetStep >= 0 ? targetStep : 0);
      setStatus("error");
      setMessage(firstError.error);
      return;
    }

    setStatus("loading");
    setMessage("");

    const formOrigin = "LPAyla";

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: `LP - DSX 2026 - Formulario ${formOrigin}`,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        personal_phone: formatWhatsappE164(form.phone),
        job_title: form.cargo,
        company_name: form.cargo,
        traffic_source: sourceData.utm_source,
        traffic_campaign: sourceData.utm_campaign,
        traffic_medium: sourceData.utm_medium,
        cf_utm_campaign: sourceData.utm_campaign,
        cf_utm_medium: sourceData.utm_medium,
        cf_utm_source: sourceData.utm_source,
        cf_utm_term: sourceData.utm_term,
        cf_utm_content: sourceData.utm_content,
        cf_url_de_conversao: sourceData.page_url,
        cf_origem_formulario: formatDsxFormOrigin(formOrigin, "LPAyla"),
      },
      tags: ["dsx-vendas", "lp-ayla"],
      source: "landing-ayla",
    };

    try {
      const response = await fetch(RD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulario.");
      }

      const supabaseRuntime = await import("../lib/supabaseClient");
      const supabaseTarget = "ayla";
      const isAylaConfigured = supabaseRuntime.isSupabaseConfiguredFor
        ? supabaseRuntime.isSupabaseConfiguredFor(supabaseTarget)
        : supabaseRuntime.isSupabaseConfigured;

      if (isAylaConfigured) {
        const supabase = await supabaseRuntime.getSupabaseClient(supabaseTarget);
        if (supabase) {
          const leadPayload = {
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim().toLowerCase(),
            cargo: form.cargo,
          };

          const { error: leadError } = await supabase
            .from("lp_ayla_chat_leads")
            .insert([leadPayload]);

          if (leadError?.code === "23505") {
            console.warn("[LPAyla] Lead already exists (duplicate email)", {
              email: leadPayload.email,
            });
          }

          if (leadError && leadError.code !== "23505") {
            console.error("[LPAyla] Supabase insert failed", {
              code: leadError.code,
              message: leadError.message,
              details: leadError.details,
              hint: leadError.hint,
            });
            throw new Error("Erro ao salvar lead no Supabase.");
          }
        }
      } else {
        console.warn(
          "[LPAyla] Supabase (Ayla) is not configured. Check VITE_SUPABASE_AYLA_URL and VITE_SUPABASE_AYLA_ANON_KEY.",
        );
      }

      setStatus("success");
      setMessage("Perfeito. Seus dados foram enviados com sucesso.");

      const params = new URLSearchParams(window.location.search);
      params.delete("etapa");
      const queryString = params.toString();
      const targetUrl = queryString ? `/?${queryString}` : "/";

      window.setTimeout(() => {
        navigate(targetUrl, { replace: true });
      }, 700);
    } catch {
      setStatus("error");
      setMessage("Nao foi possivel enviar agora. Tente novamente.");
    }
  };

  return (
    <LPAylaFormStage
      steps={FORM_STEPS}
      step={step}
      stepIndex={stepIndex}
      totalSteps={FORM_STEPS.length}
      progress={progress}
      form={form}
      inputRef={inputRef}
      status={status}
      message={message}
      onChange={handleChange}
      onNext={nextStep}
      onBack={prevStep}
      onSubmit={handleSubmit}
    />
  );
};

export default LPAyla;
