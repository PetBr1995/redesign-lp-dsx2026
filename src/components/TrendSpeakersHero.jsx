import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { InfoNovosPalestrantes } from "../data/InfoNovosPalestrantes";
import { ChevronLeft, ChevronRight } from "lucide-react";

function normalizeSpeakerName(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getVisibleCount(width) {
  if (width >= 1024) return 10;
  if (width >= 769) return 7;
  if (width >= 640) return 3;
  return 2;
}

function mod(value, base) {
  return ((value % base) + base) % base;
}

const SLIDE_DURATION_MS = 620;

const TrendSpeakersHero = () => {
  const trendSpeakers = useMemo(() => {
    const unique = new Map();

    InfoNovosPalestrantes.forEach((speaker) => {
      const name = String(speaker?.nome || "").trim();
      const image = String(speaker?.img || "").trim();
      if (!name || !image) return;

      const key = normalizeSpeakerName(name);
      if (!key || unique.has(key)) return;
      unique.set(key, { name, image });
    });

    return Array.from(unique.values());
  }, []);

  const [startIndex, setStartIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [trackTransitionEnabled, setTrackTransitionEnabled] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);
  const [trackTranslate, setTrackTranslate] = useState(0);
  const dragStartXRef = useRef(null);
  const dragDeltaXRef = useRef(0);
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === "undefined") return 5;
    return getVisibleCount(window.innerWidth);
  });
  const totalSpeakers = trendSpeakers.length;
  const stepPercent = 100 / Math.max(visibleCount, 1);
  const isMobileTwoUp = visibleCount === 2;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => setVisibleCount(getVisibleCount(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const slideTo = useCallback(
    (direction) => {
      if (isSliding || totalSpeakers <= 1) return;

      setIsSliding(true);
      setSlideDirection(direction);
      setHoveredCard(null);

      if (direction === "next") {
        setTrackTransitionEnabled(true);
        setTrackTranslate(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTrackTranslate(-stepPercent));
        });
      } else {
        setTrackTransitionEnabled(false);
        setTrackTranslate(-stepPercent);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTrackTransitionEnabled(true);
            setTrackTranslate(0);
          });
        });
      }

      window.setTimeout(() => {
        setStartIndex((current) =>
          mod(current + (direction === "next" ? 1 : -1), totalSpeakers),
        );
        setIsSliding(false);
        setTrackTransitionEnabled(false);
        setSlideDirection(null);
        setTrackTranslate(0);
      }, SLIDE_DURATION_MS);
    },
    [isSliding, stepPercent, totalSpeakers],
  );

  useEffect(() => {
    if (isPaused || isSliding || totalSpeakers <= 1) return undefined;
    const id = window.setInterval(() => {
      slideTo("next");
    }, 5000);
    return () => window.clearInterval(id);
  }, [isPaused, isSliding, slideTo, totalSpeakers]);

  const handleNext = () => {
    slideTo("next");
  };

  const handlePrev = () => {
    slideTo("prev");
  };

  const finishDrag = useCallback(
    (triggerSlide = true) => {
      if (!isMobileTwoUp || !isDragging) return;

      const deltaX = dragDeltaXRef.current;
      const swipeThreshold = 52;

      setIsDragging(false);
      dragStartXRef.current = null;
      dragDeltaXRef.current = 0;
      setIsPaused(false);

      if (!triggerSlide) return;
      if (Math.abs(deltaX) < swipeThreshold) return;
      slideTo(deltaX < 0 ? "next" : "prev");
    },
    [isDragging, isMobileTwoUp, slideTo],
  );

  const handlePointerDown = (event) => {
    if (!isMobileTwoUp || isSliding || totalSpeakers <= 1) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragStartXRef.current = event.clientX;
    dragDeltaXRef.current = 0;
    setIsDragging(true);
    setHoveredCard(null);
    setIsPaused(true);
  };

  const handlePointerMove = (event) => {
    if (!isMobileTwoUp || !isDragging || dragStartXRef.current === null) return;
    const deltaX = event.clientX - dragStartXRef.current;
    dragDeltaXRef.current = deltaX;
    event.preventDefault();
  };

  const visibleSpeakers = useMemo(() => {
    if (!totalSpeakers) return [];

    if (!isSliding) {
      return Array.from({ length: visibleCount }, (_, offset) => {
        const idx = mod(startIndex + offset, totalSpeakers);
        return {
          ...trendSpeakers[idx],
          _sourceIndex: idx,
          _renderKey: `${idx}-${offset}`,
        };
      });
    }

    if (slideDirection === "next") {
      return Array.from({ length: visibleCount + 1 }, (_, offset) => {
        const idx = mod(startIndex + offset, totalSpeakers);
        return {
          ...trendSpeakers[idx],
          _sourceIndex: idx,
          _renderKey: `${idx}-${offset}-next`,
        };
      });
    }

    return Array.from({ length: visibleCount + 1 }, (_, offset) => {
      const idx = mod(startIndex - 1 + offset, totalSpeakers);
      return {
        ...trendSpeakers[idx],
        _sourceIndex: idx,
        _renderKey: `${idx}-${offset}-prev`,
      };
    });
  }, [
    isSliding,
    slideDirection,
    startIndex,
    totalSpeakers,
    trendSpeakers,
    visibleCount,
  ]);

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#111111] text-black ${
        isMobileTwoUp ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        finishDrag(false);
        setIsPaused(false);
        setHoveredCard(null);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => finishDrag(true)}
      onPointerCancel={() => finishDrag(false)}
      style={{ touchAction: isMobileTwoUp ? "pan-y" : "auto" }}
    >
      <div
        className="flex h-[72svh] w-full md:h-[84svh]"
        style={{
          transform: `translate3d(${trackTranslate}%, 0, 0)`,
          transition: trackTransitionEnabled && !isDragging
            ? `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
            : "none",
        }}
      >
        {visibleSpeakers.map((speaker, index) => {
          const enableReveal = !isMobileTwoUp;
          const hasHovered = hoveredCard !== null;
          const isHovered = hoveredCard === index;
          const baseWidth = 100 / Math.max(visibleCount, 1);
          const expandedWidth = visibleCount >= 5 ? 32 : visibleCount >= 4 ? 36 : 44;
          const collapsedWidth = hasHovered
            ? (100 - expandedWidth) / Math.max(visibleCount - 1, 1)
            : baseWidth;
          const widthWhenSliding = baseWidth;

          return (
            <article
              key={speaker._renderKey}
              className="group flex h-full flex-col overflow-hidden border-l border-black/15 first:border-l-0"
              style={{
                flex: `0 0 ${
                  isSliding
                    ? widthWhenSliding
                    : enableReveal && isHovered
                      ? expandedWidth
                      : collapsedWidth
                }%`,
                transition: isSliding
                  ? "none"
                  : "flex 520ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={() => {
                if (!enableReveal) return;
                if (!isSliding && !isDragging) setHoveredCard(index);
              }}
            >
              <div className="flex min-h-[82px] items-center justify-center overflow-hidden bg-[#F5D247] px-2 py-2 text-center md:min-h-[96px] md:px-3 md:py-2.5">
                <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-anton text-[1.08rem] uppercase leading-[0.92] tracking-tight md:text-[1.32rem]">
                  {speaker.name}
                </h3>
              </div>
              <div className="relative flex-1 overflow-hidden bg-black">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="absolute inset-0 h-full w-auto max-w-none object-cover object-top transition-[width,min-width] duration-500"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    width:
                      enableReveal && !isSliding && isHovered ? "100%" : "170%",
                    minWidth:
                      enableReveal && !isSliding && isHovered ? "100%" : "170%",
                  }}
                  loading={index < 2 ? "eager" : "lazy"}
                  fetchPriority={index < 2 ? "high" : "auto"}
                  decoding="async"
                />
              </div>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Slide anterior"
        onClick={handlePrev}
        className="absolute flex items-center justify-center left-2 top-1/2 z-20 -translate-y-1/2 w-10 rounded-full border border-[#F5D247]/20 bg-black/70 px-3 py-2 text-[#F5D247] transition hover:bg-black/90 md:left-4"
      >
        <ChevronLeft/>
      </button>
      <button
        type="button"
        aria-label="Próximo slide"
        onClick={handleNext}
        className="absolute flex items-center justify-center right-2 top-1/2 z-20 -translate-y-1/2 w-10 rounded-full border border-[#F5D247]/20 bg-black/70 px-3 py-2 text-[#F5D247] transition hover:bg-black/90 md:right-4"
      >
        <ChevronRight/>
      </button>
    </section>
  );
};

export default TrendSpeakersHero;
