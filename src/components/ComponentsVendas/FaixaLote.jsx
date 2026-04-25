import { motion } from "framer-motion";
import { smoothEase, softEase } from "../../utils/motion";

export default function FaixaLote() {
  return (
    <div className="mt-6 px-4 sm:px-6 flex justify-center">
      <motion.div
        className="
          relative overflow-hidden
          w-full max-w-2xl
          px-4 py-2.5 sm:px-6 sm:py-3
          rounded-md sm:rounded-lg
          text-center uppercase font-black text-white
          text-sm sm:text-base md:text-lg
          tracking-wide sm:tracking-widest
          shadow-lg
        "
        // Fundo mais premium em verde.
        style={{
          background:
            "linear-gradient(90deg, #22c55e 0%, #16a34a 50%, #22c55e 100%)",
        }}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{
          opacity: 1,
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 10px 25px rgba(0,0,0,0.22), 0 0 0 rgba(34,197,94,0)",
            "0 13px 32px rgba(0,0,0,0.26), 0 0 14px rgba(34,197,94,0.2)",
            "0 10px 25px rgba(0,0,0,0.22), 0 0 0 rgba(34,197,94,0)",
          ],
        }}
        transition={{
          opacity: { duration: 0.52, ease: smoothEase },
          scale: { duration: 2.4, repeat: Infinity, ease: softEase },
          boxShadow: { duration: 2.4, repeat: Infinity, ease: softEase },
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shimmer sutil passando. */}
        <motion.span
          className="absolute inset-y-0 -left-1/2 w-1/3 bg-white/20"
          style={{ transform: "skewX(-25deg)" }}
          animate={{ left: ["-50%", "120%"] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            repeatDelay: 3.4,
            ease: softEase,
          }}
        />

        {/* Conteúdo */}
        <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
          2º lote disponível
        </span>
      </motion.div>
    </div>
  );
}
