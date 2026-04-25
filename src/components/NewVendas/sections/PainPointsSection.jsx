import { useEffect, useRef } from "react";
import { CircleX } from "lucide-react";

const PainPointsSection = ({ items }) => {
  const listRef = useRef(null);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const cards = Array.from(listEl.querySelectorAll(".painpoint-card"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          if (entry.isIntersecting) {
            card.classList.add("visible");
          } else {
            card.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div ref={listRef} className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="painpoint-card rounded-2xl border-l-2 border-red-600 bg-[#1E1A12] px-5 py-4 font-jamjuree text-[15px] font-normal leading-relaxed text-white shadow-[inset_0_0_0_1px_rgba(201,168,76,0.08)] md:text-[17px]"
            style={{ "--enter-delay": `${index * 90}ms` }}
          >
            <span className="mr-2 inline-flex align-middle">
              <CircleX className="h-[18px] w-[18px] text-[#E23636]" strokeWidth={2} />
            </span>
            {item}
          </div>
        ))}
      </div>

      <p className="py-10 text-center font-anton text-[26px] uppercase leading-[1.18] text-[#F5C02B] md:py-12 md:text-[42px] md:leading-tight">
        No DSX, você resolve tudo isso em 2 dias.
      </p>
    </div>
  );
};

export default PainPointsSection;
