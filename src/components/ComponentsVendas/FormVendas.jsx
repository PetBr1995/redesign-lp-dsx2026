import { useEffect, useMemo, useState } from "react";
import { RD_API_URL } from "../../lib/rdStation";
import { formatDsxFormOrigin } from "../../utils/formOrigin";

// ===================
// Utils
// ===================

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

// ===================
// Botão reutilizável
// ===================

export const FormButton = ({
  titulo = "Enviar",
  textColor = "#000",
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="disabled:cursor-not-allowed"
    >
      <section
        className={`flex justify-center items-center ${
          disabled ? "opacity-60" : ""
        }`}
      >
        {/* Esquerda */}
        <div className="relative rounded-2xl bg-linear-to-r from-[#F3CB46] to-[#E7A040] p-0.5">
          <div className="flex justify-center items-center rounded-[14px] w-[200px] h-10 bg-transparent">
            <p
              className="uppercase text-[14px] font-bold"
              style={{ color: textColor }}
            >
              {titulo}
            </p>
          </div>
        </div>

        {/* Direita */}
        <div className="relative -ml-0.5 rounded-2xl bg-linear-to-r from-[#E7A040] to-[#E7A040] p-0.5">
          <div className="flex justify-center items-center rounded-[14px] w-[50px] h-10">
            <img src="/Arrow-2.svg" alt="" aria-hidden="true" className="w-[18px]" />
          </div>
        </div>
      </section>
    </button>
  );
};

// ===================
// Form principal
// ===================

const FormVendas = () => {
  // 🔎 UTMs
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

  // 📩 Form
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    company: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  // 📱 Máscara WhatsApp
  const handleWhatsappMask = (e) => {
    let value = onlyDigits(e.target.value);

    value = value.slice(0, 11);

    if (value.length <= 2) value = `(${value}`;
    else if (value.length <= 6)
      value = value.replace(/^(\d{2})(\d+)/, "($1) $2");
    else if (value.length <= 10)
      value = value.replace(/^(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
    else value = value.replace(/^(\d{2})(\d{5})(\d+)/, "($1) $2-$3");

    setForm((prev) => ({ ...prev, whatsapp: value }));
  };

  // ✅ Validação
  const errors = useMemo(() => {
    const e = {};

    if (!form.name.trim()) e.name = true;
    if (!isValidEmail(form.email)) e.email = true;

    const phone = onlyDigits(form.whatsapp);
    if (!(phone.length === 10 || phone.length === 11)) e.whatsapp = true;

    if (!form.company.trim()) e.company = true;

    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0 && status !== "loading";

  // 🚀 Envio
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    setStatus("loading");
    setMessage("");
    const formOrigin = "NewVendas";

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: `LP - DSX 2026 - Formulario ${formOrigin}`,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        personal_phone: formatWhatsappE164(form.whatsapp),
        company_name: form.company.trim(),

        // UTMs
        traffic_source: sourceData.utm_source,
        traffic_campaign: sourceData.utm_campaign,
        traffic_medium: sourceData.utm_medium,

        cf_utm_campaign: sourceData.utm_campaign,
        cf_utm_medium: sourceData.utm_medium,
        cf_utm_source: sourceData.utm_source,
        cf_utm_term: sourceData.utm_term,
        cf_utm_content: sourceData.utm_content,
        cf_url_de_conversao: sourceData.page_url,
        cf_origem_formulario: formatDsxFormOrigin(formOrigin, "NewVendas"),
      },
      tags: ["dsx-vendas"],
      source: "landing-vendas",
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

      if (!res.ok) {
        throw new Error("Erro ao enviar");
      }

      setStatus("success");
      setForm({
        name: "",
        whatsapp: "",
        email: "",
        company: "",
      });

      // 👉 Redirect para o grupo VIP do WhatsApp
      window.location.href = "https://chat.whatsapp.com/GXEsJXjFNBi1a3LLAiG90R";
    } catch (err) {
      setStatus("error");
      setMessage("Erro ao enviar formulário. Tente novamente.");
    }
  };

  // ===================
  // UI
  // ===================

  return (
    <section
      id="form-vendas"
      className="
        relative py-16
        bg-cover bg-center bg-no-repeat
        overflow-hidden

        after:absolute
        after:content-['']
        after:inset-0
        after:bg-[url('/fundo-faq-patrocinadores.png')]
        after:bg-cover
        after:bg-center
        after:bg-no-repeat
        after:z-[1]
      "
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <img src="/dsx2026.png" alt="logo" className="mx-auto mb-6" />

        <p className="uppercase text-xl font-extralight mb-2 text-white text-center">
          Preencha seu dados e receba as
        </p>

        <h2 className="text-center text-white font-anton uppercase text-3xl sm:text-4xl mb-8">
          informações em primeira mão através do Grupo VIP
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Nome completo"
            className="p-3 bg-transparent border border-white rounded-md text-white placeholder-white/70 focus:outline-none focus:border-[#F5A205]"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />

          <input
            type="text"
            placeholder="Whatsapp"
            className="p-3 bg-transparent border border-white rounded-md text-white placeholder-white/70 focus:outline-none focus:border-[#F5A205]"
            value={form.whatsapp}
            onChange={handleWhatsappMask}
          />

          <input
            type="email"
            placeholder="Email"
            className="p-3 bg-transparent border border-white rounded-md text-white placeholder-white/70 focus:outline-none focus:border-[#F5A205]"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />

          <input
            type="text"
            placeholder="Empresa"
            className="p-3 bg-transparent border border-white rounded-md text-white placeholder-white/70 focus:outline-none focus:border-[#F5A205]"
            value={form.company}
            onChange={(e) =>
              setForm((p) => ({ ...p, company: e.target.value }))
            }
          />

          {status === "error" && (
            <p className="md:col-span-2 text-center text-red-400 text-sm">
              {message}
            </p>
          )}

          <div className="md:col-span-2 flex justify-center pt-6">
            <FormButton
              titulo={status === "loading" ? "Enviando..." : "Enviar"}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormVendas;
