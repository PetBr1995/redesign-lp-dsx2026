import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import CTAButton from "../Mascaras/CTAButton";

const SecondSectionVendas = () => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const inf = [
    {
      icon: "/vector-16.svg",
      text: "Clareza estratégica para priorizar o que realmente gera crescimento, margem e eficiência",
    },
    {
      icon: "/vector-9.svg",
      text: "Métodos aplicáveis em marketing, vendas, gestão, cultura e inovação",
    },
    {
      icon: "/vector-35.svg",
      text: "Insights para vender melhor, estruturar processos e escalar resultados",
    },
    {
      icon: "/vector-36.svg",
      text: "Networking qualificado com empresários, líderes e profissionais que estão no mesmo nível de decisão",
    },
    {
      icon: "/vector-15.svg",
      text: "Visão de mercado para antecipar movimentos e não apenas reagir a eles",
    },
    {
      icon: "/vector-5.svg",
      text: "Referências práticas de quem já está executando em alto nível, encurtando caminhos e evitando erros caros",
    },
  ];

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    const onLoaded = () => setIsReady(true);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    player.on("loaded", onLoaded);
    player.on("play", onPlay);
    player.on("pause", onPause);

    return () => {
      player.off("loaded", onLoaded);
      player.off("play", onPlay);
      player.off("pause", onPause);
      player.unload?.().catch(() => {});
    };
  }, []);

  const handlePlay = async () => {
    try {
      const player = playerRef.current;
      if (!player) return;

      await player.setMuted(false).catch(() => {});
      await player.setVolume(1).catch(() => {});
      await player.play();
    } catch {
      try {
        const player = playerRef.current;
        if (!player) return;
        await player.setMuted(true);
        await player.play();
      } catch {}
    }
  };

  return (
    <section
      className="
        relative py-10 overflow-hidden
        after:absolute after:content-[''] after:inset-0
        after:bg-[url('/fundo-faq-patrocinadores.png')]
        after:bg-cover after:bg-center after:bg-no-repeat
        after:z-[1]
      "
    >
      <div className="absolute inset-0 bg-black/50 z-[2]" />

      <div className="relative z-[3] max-w-7xl mx-auto px-4">
        {/* TÍTULO */}
        <h2
          className="
            font-anton uppercase text-white
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            leading-tight
            text-center mb-6
          "
        >
          Dois dias para alinhar visão, estratégia e execução
          <br />
          em um mercado que não aceita mais improviso.
        </h2>

        <p className="uppercase font-extralight text-white text-sm sm:text-base md:text-xl text-center mb-10">
          Você vai sair com:
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {inf.map((item, index) => (
            <div
              key={index}
              className="bg-linear-to-r from-[#FFFFFF] to-[#F5D247] p-px rounded-md"
            >
              <div className="bg-black rounded-md h-40 flex items-center gap-4 px-6">
                <img
                  src={item.icon}
                  alt="item"
                  className="w-10 sm:w-12 shrink-0"
                />
                <h3 className="text-white text-sm sm:text-base">{item.text}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <CTAButton
            titulo="Quero meu passaporte"
            link="#passaportes"
          />
        </div>
      </div>
    </section>
  );
};

export default SecondSectionVendas;
