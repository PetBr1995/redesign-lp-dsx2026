import { AnimatePresence, motion } from "framer-motion";
import { FormButton } from "../FormSection";
import { smoothEase } from "../../utils/motion";

const LeadPopupFormHomeTeste = ({
  isOpen,
  canClose,
  onClose,
  onSubmit,
  leadForm,
  setLeadForm,
  onWhatsappChange,
  leadStatus,
  message,
  loading,
  canSubmit,
  headline = "Você está prestes a fazer parte de algo que está mudando o mercado do Norte.",
  subheading = "Bem-vindo ao DSX 2026.",
  description = "Preencha seus dados e faça parte desse movimento.",
}) => {
  const MotionDiv = motion.div;

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: smoothEase }}
        >
          <button
            type="button"
            className={`absolute inset-0 bg-black/80 backdrop-blur-[2px] ${
              canClose ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            onClick={onClose}
            aria-label="Fechar popup"
          />

          <MotionDiv
            className="relative z-10 w-full max-w-[760px] rounded-2xl border border-white/10 bg-[#101010] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:p-6 md:rounded-[28px] md:p-9"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.99 }}
            transition={{ duration: 0.36, ease: smoothEase }}
          >
            <div className="mb-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#F5A205] to-[#FFD26A]" />
            <button
              type="button"
              onClick={onClose}
              className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#F5A205]/40 bg-[#1A1A1A]/92 shadow-[0_8px_22px_rgba(0,0,0,0.45)] backdrop-blur-sm ${
                canClose
                  ? "text-[#F5A205] transition duration-200 hover:scale-105 hover:border-[#FFD27A] hover:bg-[#242424] hover:text-[#FFD27A] active:scale-95"
                  : "cursor-not-allowed text-[#F5A205]/45"
              }`}
              aria-label="Fechar formulário"
            >
              <span className="text-xl leading-none">×</span>
            </button>

            <p className="text-center font-bebas pt-5 text-[2rem] leading-[0.95] text-[#F5A205] sm:text-4xl md:text-5xl">
              {headline}
            </p>
            {subheading ? (
              <h3 className="m-auto mt-2 max-w-[560px] font-jamjuree text-[20px] font-bold text-center leading-relaxed uppercase text-[#F5A205] sm:mt-3 md:text-base">
                {subheading}
              </h3>
            ) : null}
            {description ? (
              <p className="mt-2 max-w-[560px] font-jamjuree text-sm leading-relaxed text-white/85 md:text-base">
                {description}
              </p>
            ) : null}

            <form
              id="lead-form"
              data-lead-form
              onSubmit={onSubmit}
              className="mt-5 grid grid-cols-1 gap-3.5 sm:gap-4 md:mt-6 md:grid-cols-2"
            >
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-jamjuree uppercase tracking-[0.08em] text-white/70">
                  Nome completo
                </label>
                <input
                  className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#F5A205] focus:bg-white/10 sm:text-base"
                  type="text"
                  name="name"
                  placeholder="Digite seu nome completo"
                  value={leadForm.name}
                  onChange={(e) =>
                    setLeadForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-jamjuree uppercase tracking-[0.08em] text-white/70">
                  Contato (Whatsapp)
                </label>
                <input
                  className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#F5A205] focus:bg-white/10 sm:text-base"
                  type="text"
                  name="phone"
                  placeholder="(92) 99999-9999"
                  value={leadForm.phone}
                  onChange={onWhatsappChange}
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-jamjuree uppercase tracking-[0.08em] text-white/70">
                  E-mail
                </label>
                <input
                  className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#F5A205] focus:bg-white/10 sm:text-base"
                  type="email"
                  name="email"
                  placeholder="voce@empresa.com"
                  value={leadForm.email}
                  onChange={(e) =>
                    setLeadForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  autoComplete="email"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-jamjuree uppercase tracking-[0.08em] text-white/70">
                  Você é:
                </label>
                <select
                  className="w-full rounded-lg border border-white/20 bg-[#1a1a1a] p-3 text-sm text-white outline-none transition focus:border-[#F5A205] focus:bg-[#222] sm:text-base"
                  name="cargo"
                  value={leadForm.cargo}
                  onChange={(e) =>
                    setLeadForm((prev) => ({ ...prev, cargo: e.target.value }))
                  }
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Empresário">Empresário</option>
                  <option value="Diretor ou Gestor">Diretor ou Gestor</option>
                  <option value="Profissional de marketing, vendas e operações">
                    Profissional de marketing, vendas e operações
                  </option>
                  <option value="Estudante">Estudante</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              {(leadStatus === "success" || leadStatus === "error") && (
                <p
                  className={`md:col-span-2 rounded-md px-3 py-2 text-sm ${
                    leadStatus === "success"
                      ? "bg-green-500/12 text-green-300"
                      : "bg-red-500/12 text-red-300"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row sm:justify-between md:col-span-2">
                <p className="text-center text-[11px] font-jamjuree uppercase tracking-[0.08em] text-white/45 sm:text-left">
                  Preenchimento rapido e seguro
                </p>
                <div className="self-center sm:self-auto">
                  <FormButton
                    titulo={loading ? "Enviando..." : "COMPRAR PASSAPORTE"}
                    textColor="#000"
                    disabled={!canSubmit}
                    leftWidthClass="w-[220px] sm:w-[260px]"
                  />
                </div>
              </div>
            </form>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default LeadPopupFormHomeTeste;


