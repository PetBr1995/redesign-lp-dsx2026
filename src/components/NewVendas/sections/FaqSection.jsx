const FaqSection = ({ items, openFaqIndex, onToggleFaq }) => {
  return (
    <div className="relative bg-black pb-16 pt-6 md:pb-20 md:pt-8">
      <div className="pointer-events-none absolute right-6 top-12 h-44 w-44 rounded-full bg-[#F5C02B]/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-[30px] uppercase leading-[1.12] tracking-[0.01em] text-white md:text-[52px] md:leading-tight">
          Perguntas frequentes
        </h2>
        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-[#5F4A1E] bg-gradient-to-b from-[#1A140A] to-[#100C06] px-4 py-2 md:px-6">
          {items.map((item, index) => {
            const isOpen = openFaqIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article key={item.pergunta} className="border-b border-[#3A2F1A] py-5 last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => onToggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <h3 className="pr-4 text-[17px] font-semibold leading-[1.24] text-white md:text-[26px] md:leading-tight">
                    {item.pergunta}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={`grid h-8 w-8 place-items-center text-[#F5C02B] transition duration-300 ease-in-out ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <img src="/arrow-down.svg" alt="" className="h-5 w-5" />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      id={answerId}
                      className="pr-8 font-jamjuree text-[15px] font-normal leading-relaxed text-white md:text-[17px]"
                    >
                      {item.resposta}
                    </p>
                    {item.link ? (
                      <div className="mt-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border border-[#C9A84C] px-3 py-2 text-sm font-semibold text-[#F5C02B] transition hover:bg-[#C9A84C] hover:text-black"
                        >
                          Entrar no grupo do WhatsApp
                          <span aria-hidden>↗</span>
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
