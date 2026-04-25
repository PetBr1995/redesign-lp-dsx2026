import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RD_API_URL } from "../lib/rdStation";
import { formatDsxFormOrigin } from "../utils/formOrigin";

/**
 * ⚠️ CHAVES FAKE — APENAS EXEMPLO DIDÁTICO
 * NÃO USAR EM PRODUÇÃO
 */
const RD_CLIENT_ID = "9f630d53-f053-4a1e-b933-02b395254e04";
const RD_CLIENT_SECRET = "3e5506d29c6c4b2ca94bd7e8986291ce";

/**
 * Endpoint do seu backend/proxy
 * (é ele que, no mundo real, usaria as chaves acima)
 */
const API_URL = "/api/lead";

function onlyDigits(v = "") {
  return v.replace(/\D/g, "");
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Converte para padrão +55XXXXXXXXXXX
function formatWhatsappE164(numero = "") {
  const n = onlyDigits(numero);
  if (!n) return "";
  if (n.startsWith("55")) return `+${n}`;
  return `+55${n}`;
}

/** ✅ Botão reutilizável (submit) */
export const FormButton = ({
  titulo = "Enviar",
  textColor = "#000",
  disabled = false,
  leftWidthClass = "w-[200px]",
}) => {
  return (
    <button type="submit" disabled={disabled} className="disabled:cursor-not-allowed">
      <section className={`flex justify-center items-center ${disabled ? "opacity-60" : ""}`}>
        {/* ESQUERDA */}
        <div
          className="
            relative
            rounded-2xl
            bg-linear-to-r from-[#F3CB46] to-[#E7A040]
            p-0.5
          "
        >
          <div className={`flex justify-center items-center rounded-[14px] ${leftWidthClass} h-10`}>
            <p
              className="uppercase text-[14px] font-bold"
              style={{ color: textColor }}
            >
              {titulo}
            </p>
          </div>
        </div>

        {/* DIREITA */}
        <div className="relative -ml-0.5 rounded-2xl bg-linear-to-r from-[#E7A040] to-[#E7A040] p-0.5">
          <div className="flex justify-center items-center rounded-[14px] w-[50px] h-10">
            <img src="/Arrow-2.svg" alt="" aria-hidden="true" className="w-[20px] h-auto" />
          </div>
        </div>
      </section>
    </button>
  );
};

const FormSection = () => {
  const [sourceData, setSourceData] = useState({
    page_url: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSourceData({
      page_url: window.location.href,
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    });
  }, []);

  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    company: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleWhatsappMask = (e) => {
    let value = e.target.value;
    value = onlyDigits(value);

    if (value.length === 0) {
      setForm((prev) => ({ ...prev, whatsapp: "" }));
      return;
    }

    value = value.slice(0, 11);

    if (value.length <= 2) value = `(${value}`;
    else if (value.length <= 6) value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    else {
      if (value.length <= 10) value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      else value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    setForm((prev) => ({ ...prev, whatsapp: value }));
  };

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Informe seu nome completo.";
    if (!isValidEmail(form.email)) e.email = "Informe um e-mail válido.";

    const phone = onlyDigits(form.whatsapp);
    if (!(phone.length === 10 || phone.length === 11)) e.whatsapp = "Informe um WhatsApp com DDD.";

    if (!form.company.trim()) e.company = "Informe a empresa.";
    return e;
  }, [form]);

  const canSubmit = status !== "loading";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!canSubmit) {
      setStatus("error");
      setMessage("Revise os campos e tente novamente.");
      return;
    }

    setStatus("loading");
    const formOrigin = "Home Principal";

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: `LP - DSX 2026 - Formulario ${formOrigin}`,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        personal_phone: formatWhatsappE164(form.whatsapp),
        company_name: form.company.trim(),
        cf_nome_completo: form.name.trim(),
        cf_nome_da_empresa: form.company.trim(),
        cf_telefon: formatWhatsappE164(form.whatsapp),
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
        cf_origem_formulario: formatDsxFormOrigin(formOrigin, "Home Principal"),
      },
      tags: ["lista-antecipada", "dsx"],
      source: "landing-save-the-date",
    };

    try {
      const res = await fetch(RD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.ok === false) {
        setStatus("error");
        setMessage(data.message || "Não foi possível enviar. Tente novamente.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Cadastro enviado! Em breve entraremos em contato.");
      setForm({ name: "", whatsapp: "", email: "", company: "" });
      navigate("/agradecimento");
    } catch (err) {
      setStatus("error");
      setMessage("Falha de rede. Verifique sua conexão e tente novamente.");
    }
  };

  return (
    <section
      id="form"
      className="
        relative pt-10 text-center
        bg-modern-image bg-cover bg-center bg-no-repeat
        w-full overflow-hidden
        after:absolute after:inset-0 after:content-[''] after:bg-black after:opacity-[0.80]
      "
      style={{
        "--bg-image-fallback": "url('/optimized/bg-form-section.jpg')",
        "--bg-image-modern":
          "image-set(url('/optimized/bg-form-section.avif') type('image/avif'))",
      }}
    >
      {/* decoração girando */}
      <motion.div
        className="
          absolute top-20 left-[25px]
          w-[70px] h-[70px]
          bg-[url('/vector-12.svg')] bg-cover bg-center bg-no-repeat
          z-10 pointer-events-none
        "
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      />
      {/*
      <img className="relative z-20 mx-auto w-[350px]" src="/save-the-date.svg" alt="savedate" />
       */}

      <div className="relative z-20 flex items-center justify-center">
        <img className="ml-0 w-[250px]" src="/dsx2026main.png" alt="logo-dsx" />
      </div>

      <h4 className="relative z-20 mt-10 text-white text-4xl font-bebas">
        Entre na lista antecipada e saia na frente
      </h4>

      <form
        onSubmit={handleSubmit}
        className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-4 py-10 w-[90%] max-w-[800px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:col-span-2">
          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 focus:outline-none focus:border-[#F5A205] transition w-full"
            type="text"
            placeholder="Nome completo:"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            autoComplete="name"
          />

          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 focus:outline-none focus:border-[#F5A205] transition w-full"
            type="text"
            placeholder="Contato (Whatsapp):"
            value={form.whatsapp}
            onChange={handleWhatsappMask}
            inputMode="tel"
            autoComplete="tel"
          />

          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 focus:outline-none focus:border-[#F5A205] transition w-full"
            type="email"
            placeholder="E-mail:"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            autoComplete="email"
          />

          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 focus:outline-none focus:border-[#F5A205] transition w-full"
            type="text"
            placeholder="Empresa:"
            value={form.company}
            onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
            autoComplete="organization"
          />

          {(status === "success" || status === "error") && (
            <div className="md:col-span-2">
              <p className={`text-sm ${status === "success" ? "text-green-300" : "text-red-300"}`}>
                {message}
              </p>
            </div>
          )}

          {/* ✅ substitui o botão padrão pelo FormButton */}
          <div className="pt-8 flex justify-center items-center md:col-span-2">
            <FormButton
              titulo={status === "loading" ? "Enviando..." : "Enviar"}
              textColor="#000"
              disabled={!canSubmit}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default FormSection;
