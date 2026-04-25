export default function FaixaSegundoLoteHomeTeste() {
  return (
    <div className="mt-6 px-4 sm:px-6 flex justify-center">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-md px-4 py-6 sm:py-7">
        <div className="relative z-10">
          <div className="flex flex-col items-center gap-1 text-[11px] sm:text-xs uppercase tracking-wider text-center">
            <span className="text-2xl sm:text-3xl font-black text-white">
              <span className="text-white">3º</span> lote disponível
            </span>
          </div>
          {/* 
          <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-[#1F8A4C] via-[#5CCB63] to-[#D61C1C] transition-[width] duration-700 ease-linear"
              style={{ width: "95%" }}
            >
              <span
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/40 blur-[1px]"
                style={{
                  transform: "skewX(-20deg)",
                  animation: "bar-reflex 2.2s ease-in-out infinite",
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-black text-black">
                95%
              </span>
            </div>
          </div>

          */}
          <p className="mt-2 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-[#FFD0D0]">
            Garanta antes da próxima virada de lote
          </p>
        </div>
      </div>
      <style>{`
        @keyframes bar-reflex {
          0% { left: -35%; opacity: 0; }
          25% { opacity: 0.8; }
          100% { left: 130%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
