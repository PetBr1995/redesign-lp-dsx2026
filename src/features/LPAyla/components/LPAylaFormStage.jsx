import { useEffect, useState } from "react";

const LPAylaFormStage = ({
  steps,
  step,
  stepIndex,
  totalSteps,
  progress,
  form,
  inputRef,
  status,
  message,
  onChange,
  onNext,
  onBack,
  onSubmit,
}) => {
  const [visibleQuestionIndex, setVisibleQuestionIndex] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    if (stepIndex < visibleQuestionIndex) {
      setVisibleQuestionIndex(stepIndex);
      setIsBotTyping(false);
      return;
    }

    if (stepIndex <= visibleQuestionIndex) return;

    // Small pause before the typing indicator starts, so the user's
    // message feels "processed" before Ayla begins typing.
    const startTypingDelayMs = 260;
    const typingDurationMs = 900;

    setIsBotTyping(false);

    const typingStartTimeoutId = window.setTimeout(() => {
      setIsBotTyping(true);
    }, startTypingDelayMs);

    const revealNextQuestionTimeoutId = window.setTimeout(() => {
      setVisibleQuestionIndex(stepIndex);
      setIsBotTyping(false);
    }, startTypingDelayMs + typingDurationMs);

    return () => {
      window.clearTimeout(typingStartTimeoutId);
      window.clearTimeout(revealNextQuestionTimeoutId);
    };
  }, [stepIndex, visibleQuestionIndex]);

  const hasPreviousStep = stepIndex > 0;
  const isLastStep = stepIndex === totalSteps - 1;
  const renderedQuestionIndex = Math.min(stepIndex, visibleQuestionIndex);
  const activeStep = steps[renderedQuestionIndex] || step;
  const isComposerLocked = isBotTyping;
  const isAwaitingNextQuestion = isBotTyping && stepIndex > visibleQuestionIndex;

  const getAnswer = (stepItem) => {
    const value = form[stepItem.key];
    if (!value) return "";
    return String(value).trim();
  };

  const handleComposerSubmit = (event) => {
    event.preventDefault();

    if (isLastStep) {
      onSubmit(event);
      return;
    }

    onNext();
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#ECECEC] text-[#0f172a]">
      <header className="sticky top-0 z-20 border-b border-white/15 bg-[#021b39]">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div>
            <img className="w-20 h-auto" src="/logo-dsx-horizontal-2.svg" alt="" />
          </div>
          <div className="hidden w-[42%] max-w-[360px] items-center gap-2 md:flex">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <span
                key={`progress-dot-${index}`}
                className={`h-1 w-full rounded-full ${index <= stepIndex ? "bg-white" : "bg-white/20"
                  }`}
              />
            ))}
          </div>
          <div className="w-12" aria-hidden="true" />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 pb-44 pt-6 sm:px-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/60 bg-white">
              <img
                src="/foto-ayla.png"
                alt="Ayla"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="max-w-[680px] rounded-2xl bg-[#f4f6f8] px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <p className="break-words font-jamjuree text-[15px] leading-relaxed text-[#1f2937]">
                Empresas que dominam métodos escaláveis e networking estratégico crescem mais rápido e não perdem espaço para a concorrência. Quer descobrir como o DSX 2026 pode acelerar os resultados do seu negócio?
              </p>
            </div>
          </div>

          {steps.slice(0, renderedQuestionIndex + 1).map((stepItem, index) => {
            const answer = getAnswer(stepItem);
            const isCurrent =
              !isAwaitingNextQuestion && index === renderedQuestionIndex;

            return (
              <div key={stepItem.key} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/60 bg-white">
                    <img
                      src="/foto-ayla.png"
                      alt="Ayla"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="max-w-[680px] rounded-2xl bg-white px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <p className="break-words font-jamjuree text-[15px] leading-relaxed text-[#0f172a]">
                      {stepItem.title}
                    </p>
                  </div>
                </div>

                {!isCurrent && answer ? (
                  <div className="flex justify-end">
                    <div className="max-w-[680px] rounded-2xl bg-[#021b39] px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                      <p className="break-words font-jamjuree text-[15px] leading-relaxed text-white">
                        {answer}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}

          {isBotTyping ? (
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/60 bg-white">
                <img
                  src="/foto-ayla.png"
                  alt="Ayla"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-1 rounded-2xl bg-white px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#94a3b8] [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#94a3b8] [animation-delay:140ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#94a3b8] [animation-delay:280ms]" />
                </div>
              </div>
            </div>
          ) : null}

          {(status === "error" || status === "success") && message ? (
            <p
              className={`rounded-xl px-4 py-3 font-jamjuree text-sm ${status === "success"
                  ? "bg-green-500/15 text-green-700"
                  : "bg-red-500/15 text-red-700"
                }`}
            >
              {message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#d8d8d8] bg-[#ECECEC]/95 backdrop-blur">
        <form
          onSubmit={handleComposerSubmit}
          className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6"
        >
          {activeStep.type === "select" ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2.5">
                {activeStep.options.map((option) => {
                  const isSelected = form.cargo === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onChange("cargo", option)}
                      disabled={isComposerLocked}
                      className={`rounded-full border px-4 py-2 font-jamjuree text-sm transition ${isSelected
                          ? "border-[#021b39] bg-[#021b39] text-white"
                          : "border-[#c8ced8] bg-white text-[#0f172a] hover:border-[#021b39]/50"
                        } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={onBack}
                  disabled={!hasPreviousStep || status === "loading" || isComposerLocked}
                  className="rounded-lg border border-[#c5cad4] bg-white px-4 py-2 font-jamjuree text-sm text-[#334155] transition hover:border-[#94a3b8] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Voltar
                </button>
                <button
                  type={isLastStep ? "submit" : "button"}
                  onClick={isLastStep ? undefined : onNext}
                  disabled={status === "loading" || isComposerLocked}
                  className="rounded-full bg-[#021b39] px-5 py-2.5 font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLastStep
                    ? status === "loading"
                      ? "Enviando..."
                      : "Enviar"
                    : "Continuar"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-[#d0d5dd] bg-white px-3 py-2">
              {hasPreviousStep ? (
                <button
                  type="button"
                  onClick={onBack}
                  disabled={status === "loading" || isComposerLocked}
                  className="rounded-full px-3 py-2 font-jamjuree text-xs font-semibold uppercase tracking-[0.08em] text-[#64748b] transition hover:bg-[#f1f5f9] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Voltar
                </button>
              ) : null}
              <input
                ref={inputRef}
                type={activeStep.type}
                value={form[activeStep.key]}
                placeholder={
                  isComposerLocked ? "Ayla esta digitando..." : activeStep.placeholder
                }
                autoComplete={activeStep.autoComplete}
                onChange={(event) => onChange(activeStep.key, event.target.value)}
                disabled={isComposerLocked}
                className="h-10 flex-1 bg-transparent px-1 font-jamjuree text-[15px] text-[#0f172a] outline-none placeholder:text-[#9ca3af]"
              />
              <button
                type="submit"
                disabled={status === "loading" || isComposerLocked}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#e5e7eb] text-[#1f2937] transition hover:bg-[#d1d5db] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={isLastStep ? "Enviar formulario" : "Continuar"}
              >
                <span className="text-lg leading-none">↑</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default LPAylaFormStage;
