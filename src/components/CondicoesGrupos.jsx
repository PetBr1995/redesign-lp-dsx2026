

const CondicoesGrupos = () => {
  const cards = [
    {
      qtdPessoas: "5",
      porCentoOff: "5% OFF",
      imagem: "/GRUPO-5.png",
    },
    {
      qtdPessoas: "10",
      porCentoOff: "10% OFF",
      imagem: "/GRUPO-10.png",
    },
  ];

  const whatsappHref = "https://wa.me/559294116928";

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center no-section-transition"
      style={{ backgroundImage: "url('/[DSX]-Banner-Site-BG.png')" }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
        <h2 className="font-bebas text-3xl font-black uppercase text-white sm:text-5xl md:text-6xl">
          As mentes mais estratégicas do norte estarão no DSX.
          <br />A sua empresa vai ficar de fora?
        </h2>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/70 sm:text-sm">
          Condições exclusivas para grupos.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {cards.map((item) => (
            <img
              key={item.qtdPessoas}
              src={item.imagem}
              alt={`Grupo ${item.qtdPessoas}`}
              className="w-full max-w-md justify-self-center"
            />
          ))}
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-xl bg-linear-to-r from-[#FF4B7D] to-[#F7B447] px-8 py-3 text-sm font-bold uppercase text-white shadow-[0_10px_30px_rgba(255,90,120,0.25)] sm:text-base"
        >
          Falar com o comercial agora
        </a>
      </div>
    </section>
  );
};

export default CondicoesGrupos;
