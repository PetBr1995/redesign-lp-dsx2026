import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RD_API_URL } from "../../lib/rdStation";

/** helpers */
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

const HeroPatrocinadores = () => {
    const navigate = useNavigate();

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
        fullName: "",
        email: "",
        whatsapp: "",
        role: "",
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
        if (!form.fullName.trim()) e.fullName = "Informe seu nome completo.";
        if (!isValidEmail(form.email)) e.email = "Informe um e-mail válido.";

        const phone = onlyDigits(form.whatsapp);
        if (!(phone.length === 10 || phone.length === 11)) e.whatsapp = "Informe um WhatsApp com DDD.";

        if (!form.role.trim()) e.role = "Informe seu cargo.";
        if (!form.company.trim()) e.company = "Informe a empresa.";

        return e;
    }, [form]);

    const canSubmit = status !== "loading" && Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!canSubmit) {
            setStatus("error");
            setMessage("Revise os campos e tente novamente.");
            return;
        }

        setStatus("loading");

        const payload = {
            event_type: "CONVERSION",
            event_family: "CDP",
            payload: {
                // Ajuste o identificador conforme seu RD
                conversion_identifier: "LP - Patrocinadores DSX 2026",

                // Campos padrão (se quiser manter)
                name: form.fullName.trim(),
                email: form.email.trim().toLowerCase(),
                personal_phone: formatWhatsappE164(form.whatsapp),
                company_name: form.company.trim(),

                // Campos customizados (CF) — AJUSTE OS NOMES para bater com os campos do RD
                cf_nome_completo: form.fullName.trim(),
                cf_email_corporativo: form.email.trim().toLowerCase(),
                cf_whatsapp: formatWhatsappE164(form.whatsapp),
                cf_cargo: form.role.trim(),
                cf_nome_da_empresa: form.company.trim(),

                // UTM / origem
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
            },

            // Ajuste tags/source se quiser
            tags: ["patrocinadores", "dsx-2026"],
            source: "landing-patrocinadores",
        };

        try {
            // ✅ Direto no RD (igual seu exemplo)
            const res = await fetch(RD_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            // // ✅ Alternativa (PROD): via backend/proxy
            // const res = await fetch("/api/lead", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(payload),
            // });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || data.ok === false) {
                setStatus("error");
                setMessage(data.message || "Não foi possível enviar. Tente novamente.");
                return;
            }

            setStatus("success");
            setMessage(data.message || "Cadastro enviado! Em breve entraremos em contato.");
            setForm({ fullName: "", email: "", whatsapp: "", role: "", company: "" });

            navigate("/agradecimento");
        } catch (err) {
            setStatus("error");
            setMessage("Falha de rede. Verifique sua conexão e tente novamente.");
        }
    };

    return (
        <section
            className="
        relative isolate overflow-hidden
        bg-[url('/optimized/step1/BannerPatrocinadores.webp')]
        bg-cover bg-center bg-no-repeat
      "
            style={{
                backgroundImage:
                    "image-set(url('/optimized/step1/BannerPatrocinadores.avif') type('image/avif'), url('/optimized/step1/BannerPatrocinadores.webp') type('image/webp'))",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/55"></div>

            {/* Decoração */}
            <div
                className="
          pointer-events-none absolute bottom-0 right-0
          h-40 w-40 sm:h-56 sm:w-56 md:h-72 md:w-72
          bg-[url('/vector-21.svg')] bg-contain bg-no-repeat bg-right-bottom
          opacity-90
        "
                aria-hidden="true"
            />

            {/* Logo */}
            <a href="/">
                <img
                    src="/dsx2026.png"
                    className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-36 sm:w-44 md:w-52"
                    alt="logo"
                />
            </a>

            {/* Conteúdo */}
            <div className="relative z-10 px-4 pt-28 sm:pt-32 md:pt-36 pb-12">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Texto */}
                    <div className="text-center md:text-left">
                        <h1 className="uppercase font-anton text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight">
                            PATROCINE O MAIOR
                            <br />
                            EVENTO DE NEGÓCIOS, MARKETING, VENDAS E INOVAÇÃO DO NORTE
                        </h1>

                        <p className="mt-4 font-roboto text-white/90 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
                            Presença estratégica, networking e ativações que aproximam sua marca de quem lidera o mercado.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full">
                        <form
                            onSubmit={handleSubmit}
                            className="
                bg-white/95 backdrop-blur
                rounded-2xl shadow-xl
                p-5 sm:p-6
                grid gap-3
                max-w-xl mx-auto md:ml-auto md:mr-0
              "
                        >
                            <input
                                className="h-11 rounded-xl border-2 border-black/40 px-4 outline-none focus:ring-2 focus:ring-black/20"
                                type="text"
                                placeholder="Nome Completo"
                                value={form.fullName}
                                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                                autoComplete="name"
                            />

                            <input
                                className="h-11 rounded-xl border-2 border-black/40 px-4 outline-none focus:ring-2 focus:ring-black/20"
                                type="email"
                                placeholder="Email corporativo"
                                value={form.email}
                                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                autoComplete="email"
                            />

                            <input
                                className="h-11 rounded-xl border-2 border-black/40 px-4 outline-none focus:ring-2 focus:ring-black/20"
                                type="tel"
                                placeholder="WhatsApp"
                                value={form.whatsapp}
                                onChange={handleWhatsappMask}
                                inputMode="tel"
                                autoComplete="tel"
                            />

                            <input
                                className="h-11 rounded-xl border-2 border-black/40 px-4 outline-none focus:ring-2 focus:ring-black/20"
                                type="text"
                                placeholder="Cargo"
                                value={form.role}
                                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                                autoComplete="organization-title"
                            />

                            <input
                                className="h-11 rounded-xl border-2 border-black/40 px-4 outline-none focus:ring-2 focus:ring-black/20"
                                type="text"
                                placeholder="Empresa"
                                value={form.company}
                                onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                                autoComplete="organization"
                            />

                            {(status === "success" || status === "error") && (
                                <p className={`text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`}>
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="
                  cursor-pointer
                  mt-2 h-11 rounded-xl
                  bg-gradient-to-r from-[#913DE3] via-[#A83EAA] to-[#C34484]
                  text-white font-semibold
                  shadow-lg
                  hover:scale-[1.02] hover:shadow-xl
                  transition-all duration-300
                  uppercase
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
                            >
                                {status === "loading" ? "Enviando..." : "Quero patrocinar"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroPatrocinadores;
