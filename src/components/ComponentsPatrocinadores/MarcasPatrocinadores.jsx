const MarcasPatrocinadores = () => {
    return (
        <section className="bg-black py-20 pb-0">
            {/* Título */}
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-white font-anton text-3xl sm:text-4xl lg:text-5xl uppercase">
                    Marcas que acreditaram no DSX 2025
                </h2>
                <p className="mt-4 text-white/80 text-lg">
                    Agora, é a sua vez de estar entre elas.
                </p>
            </div>

            {/* Logos com clip-path */}
            <div className="mt-12">
                <div
                    className="bg-white overflow-hidden"
                    style={{
                        // x ≈ 34%
                        "--x": "clamp(260px, 26vw, 440px)",

                        // k ≈ +7%
                        "--k": "clamp(70px, 7vw, 110px)",

                        // topo mais profundo (10%)
                        "--topInset": "clamp(32px, 3.2vw, 56px)",

                        // corte superior (15%)
                        "--topCut": "clamp(36px, 3.6vw, 60px)",

                        // base (85% / 15%)
                        "--bottomCut": "clamp(36px, 3.6vw, 60px)",

                        // cantos inferiores (15% / 85%)
                        "--corner": "clamp(120px, 12vw, 240px)",

                        clipPath: `
                          polygon(
                            0% var(--topCut),
                            0% var(--topInset),
                            var(--x) var(--topInset),
                            calc(var(--x) + var(--k)) 0%,
                            100% 0%,
                            100% var(--topCut),
                      
                            100% calc(100% - var(--bottomCut)),
                            100% 100%,
                            calc(100% - var(--corner)) 100%,
                            var(--corner) 100%,
                            0% 100%,
                            0% calc(100% - var(--bottomCut))
                          )
                        `,
                    }}


                >
                    <div
                        className="
                max-w-7xl mx-auto
                px-6 py-14
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
                gap-x-10 gap-y-12
                place-items-center
              "
                    >
                        {[
                            "/patrocinadores/logo-digital.svg",
                            "/patrocinadores/logo-tore.svg",
                            "/patrocinadores/logo-onda-digital.svg",
                            "/optimized/step1/logo-parceiros/logo-xpress-dsx-2026.webp",
                            "/patrocinadores/logo-action.svg",
                            "/patrocinadores/logo-ac-display.svg",
                            "/patrocinadores/logo-manaus-play.svg",
                            "/patrocinadores/logo-helloo.svg",
                            "/patrocinadores/logo-mondon.svg",
                            "/patrocinadores/logo-digital-educa.svg",
                            "/patrocinadores/logo-ramson.svg",
                            "/patrocinadores/logo-engeco.svg",
                            "/patrocinadores/logo-governo-do-estado.svg",
                        ].map((src, index) => (
                            <div
                                key={index}
                                className="h-16 sm:h-18 lg:h-20 flex items-center justify-center"
                            >
                                <img
                                    src={src}
                                    alt="logo patrocinador"
                                    className="
                      max-h-full
                      max-w-[140px] sm:max-w-[150px] lg:max-w-[160px]
                      object-contain
                      opacity-90
                      transition
                      hover:opacity-100
                    "
                                    draggable={false}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarcasPatrocinadores;
