const realizacaoLogos = [
  {
    src: "/logo-parceiros/logo-digital-hub-dsx-2026.png",
    alt: "Digital Hub Xperience",
  },
];

const apoioLogos = [
  {
    src: "/logo-parceiros/logo-rede-onda-digital-dsx-2026.png",
    alt: "Rede Onda Digital",
    sizeClass: "max-h-24 sm:max-h-28",
  },
  {
    src: "/logo-parceiros/logo-digital-educa-dsx-2026.png",
    alt: "Digital Educa",
  },
  {
    src: "/logo-parceiros/logo-antena-1-dsx-2026.png",
    alt: "Antena 1",
  },
  {
    src: "/logo-parceiros/logo-manaus-play.png",
    alt: "Manaus Play",
    sizeClass: "max-h-14 sm:max-h-16",
  },
  {
    src: "/logo-parceiros/logo-xpress-dsx-2026.png",
    alt: "Xpress",
    sizeClass: "max-h-16 sm:max-h-20",
  },
  {
    src: "/logo-parceiros/logo-tore-dsx-2026.png",
    alt: "Tore",
  },
  {
    src: "/logo-parceiros/MARCA%20PURAKA%20BRANCA-04.png",
    alt: "Puraka",
    sizeClass: "max-h-14 sm:max-h-16",
  },
];

const expositoresLogos = [
  {
    src: "/logo-parceiros/logo-stock360.png",
    alt: "Stock360",
  },
  {
    src: "/logo-parceiros/Logo_Influx.png",
    alt: "Influx",
  },
  {
    src: "/logo-parceiros/logo-paracabos.webp",
    alt: "Paracabos",
  },
  {
    src: "/logo-parceiros/logo-AC%20Display.png",
    alt: "AC Display",
  },
  {
    src: "/logo-parceiros/Logo_Polo.png",
    alt: "Polo",
    sizeClass: "max-h-25 sm:max-h-30",
  },
  {
    src: "/logo-parceiros/Logo_TS_Clinic.png",
    alt: "TS Clinic",
    sizeClass: "max-h-25 sm:max-h-30",
  },
  {
    src: "/logo-vbot.png",
    alt: "VBOT",
    sizeClass: "max-h-25 sm:max-h-30",
  },
];

const foodLogos = [
  {
    src: "/logo-parceiros/logo-lord-brownie.png",
    alt: "Lord Brownie",
    sizeClass: "max-h-25 sm:max-h-30",
  },
  {
    src: "/logo-parceiros/logo-CIA-DO-ESPETO.png",
    alt: "Cia do Espeto",
    sizeClass: "max-h-25 sm:max-h-30",
  },
];

const ParceirosSection = () => {
  return (
    <section className="bg-black px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-bebas text-2xl tracking-wide text-[#F5A205] sm:text-3xl">
          Quem está ao lado do maior evento de negócios do Norte.
        </h2>

        <div className="mt-6 rounded-2xl border border-[#F5A205]/50 bg-black/80 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl bg-black p-5 sm:p-6">
            <h3 className="mb-4 text-center font-jamjuree text-lg font-semibold capitalize tracking-wide text-[#F5A205]">
              Realização:
            </h3>

            <div className="grid place-items-center gap-4">
              {realizacaoLogos.map((logo) => (
                <div
                  key={logo.src}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-6 py-5"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="mx-auto h-10 w-auto object-contain sm:h-12"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl bg-black p-5 sm:p-6">
            <h3 className="mb-4 text-center font-jamjuree text-lg font-semibold capitalize tracking-wide text-[#F5A205]">
              Apoio:
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {apoioLogos.map((logo) => (
                <div
                  key={logo.src}
                  className="flex min-h-[92px] items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-4"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`w-auto object-contain ${logo.sizeClass || "max-h-10 sm:max-h-12"}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </article>
          </div>

          <article className="mt-6 rounded-xl bg-black p-5 sm:p-6">
            <h3 className="mb-4 text-center font-jamjuree text-lg font-semibold capitalize tracking-wide text-[#F5A205]">
              Expositores:
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {expositoresLogos.map((logo) => (
                <div
                  key={logo.src}
                  className="flex min-h-[92px] items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-4"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`w-auto object-contain ${logo.sizeClass || "max-h-10 sm:max-h-12"}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </article>

          <article className="mt-6 rounded-xl bg-black p-5 sm:p-6">
            <h3 className="mb-4 text-center font-jamjuree text-lg font-semibold capitalize tracking-wide text-[#F5A205]">
              Food:
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {foodLogos.map((logo) => (
                <div
                  key={logo.src}
                  className="flex min-h-[92px] items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-4"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`w-auto object-contain ${logo.sizeClass || "max-h-10 sm:max-h-12"}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ParceirosSection;
