import { motion } from "framer-motion";

const MotionArticle = motion.article;

const TestimonialsSection = ({ items }) => {
  return (
    <div className="bg-black pb-16 pt-0 md:pb-20 md:pt-0">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-[30px] uppercase leading-[1.12] text-white md:text-[52px] md:leading-[1.05]">
          O DSX mudou o jogo para quem participou
        </h2>
        <p className="mt-2 text-center text-[15px] text-white md:text-[20px]">
          Depoimentos reais da edição 2025
        </p>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-5">
          {items.map((item, index) => {
            const bubbleOnRight = index % 2 === 1;

            return (
              <div key={item.quote} className={`flex ${bubbleOnRight ? "justify-end" : "justify-start"}`}>
                <MotionArticle
                  initial={{
                    opacity: 0,
                    x: bubbleOnRight ? 50 : -50,
                    scale: 0.96,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.06,
                  }}
                  className={`relative w-full max-w-[92%] border border-[#BCC5CC] bg-[#DDE3E8] p-5 shadow-[inset_0_0_0_1px_rgba(17,27,33,0.05)] md:max-w-[78%] md:p-6 ${
                    bubbleOnRight ? "rounded-[18px] rounded-br-[8px]" : "rounded-[18px] rounded-bl-[8px]"
                  }`}
                >
                  {bubbleOnRight ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-5 -right-[11px] h-5 w-3 bg-[#BCC5CC]"
                        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-5 -right-[9px] h-5 w-3 bg-[#DDE3E8]"
                        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                      />
                    </>
                  ) : (
                    <>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-5 -left-[11px] h-5 w-3 bg-[#BCC5CC]"
                        style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-5 -left-[9px] h-5 w-3 bg-[#DDE3E8]"
                        style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
                      />
                    </>
                  )}

                  <span className="inline-flex rounded-md bg-[#CAD3DA] px-3 py-1 text-[11px] font-semibold text-[#33424C] md:text-[12px]">
                    {item.tag}
                  </span>
                  <p className="mt-4 text-[16px] leading-relaxed text-[#111B21] md:text-[20px]">{item.quote}</p>
                  <p className="mt-4 text-[14px] font-semibold text-[#0B141A] md:text-[18px]">{item.author}</p>
                </MotionArticle>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
