import { useEffect, useState } from "react";
import CTAButton from "./Mascaras/CTAButton";
import HeaderMask from "./Mascaras/HeaderMask";

const Header = ({ className = "", ctaLink = "/vendas" }) => {
  const [open, setOpen] = useState(false);

  // Fecha no ESC
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <>
      <section
        className={`
          fixed top-0 left-0 right-0
          z-50
          bg-black/20
          backdrop-blur-sm
          border-b border-white/10
          h-[75px] p-2
          flex items-center justify-between
          sm:justify-around
          ${className}
        `}
      >
        <a href="/#home">
          {/* Logo (sempre visível) */}
                    <picture>
            <source
              srcSet="/optimized/step1/DSX-2026-icon-1.avif"
              type="image/avif"
            />
            <source
              srcSet="/optimized/step1/DSX-2026-icon-1.webp"
              type="image/webp"
            />
            <img
              src="/DSX-2026-icon-1.png"
              alt="logo"
              className="h-[32px] sm:h-[40px] w-auto"
            />
          </picture>
        </a>

        {/* Desktop actions */}
        <div className="hidden sm:flex justify-center items-center gap-1">
          <HeaderMask
            titulo="Seja patrocinador"
            textColor="#ffffff"
            backgroundColor="#000000"
            link="/patrocinador"
            font="bold"
          />
          <CTAButton titulo="Compre agora" link={ctaLink} />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="cursor-pointer sm:hidden inline-flex items-center justify-center p-2 rounded-md text-white"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={toggle}
        >
          {/* Ícone hambúrguer simples (SVG) */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </section>

      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40
          bg-black/60
          transition-opacity duration-200
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={close}
      />

      {/* Drawer (top -> down) */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-black
          border-b border-white/10
          pt-0  /* empurra pra baixo do header */
          transition-transform duration-250 ease-out
          ${open ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="p-4 flex flex-wrap gap-3 items-stretch justify-center">
          <HeaderMask
            titulo="Seja patrocinador"
            textColor="#ffffff"
            backgroundColor="#000000"
            link="/patrocinador"
            font="bold"
          />
          <CTAButton
            titulo="Compre agora"
            link={ctaLink}
            
          // se quiser fechar ao clicar:
          // onClick={close}  (se seu CTAButton repassar props)
          />


        </div>
      </div>
    </>
  );
};

export default Header;

