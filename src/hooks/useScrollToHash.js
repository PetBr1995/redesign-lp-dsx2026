import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToHash(offsetPx = 90) {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (!hash) return;

    let tries = 0;

    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offsetPx;
        window.scrollTo({ top: y, behavior: "smooth" });
        return;
      }

      // tenta algumas vezes (caso componente ainda não montou)
      tries += 1;
      if (tries < 20) requestAnimationFrame(tryScroll);
    };

    // roda depois da renderização atual
    requestAnimationFrame(tryScroll);
  }, [location.pathname, location.hash, offsetPx]);
}
