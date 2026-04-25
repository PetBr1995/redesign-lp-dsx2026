import React from 'react';

const cardInf = [
    {
        keyword: "Empresário ",
        desc: "que precisa destravar o crescimento da sua empresa com estratégia."
    },
    {
        keyword: "Gestor e líder ",
        desc: "que tomam  decisões e desejam mais clareza, método e visão de mercado."
    },
    {
        keyword: "Profissional em ascensão ",
        desc: "que busca networking qualificado e referências de alto nível.  "
    },
    {
        keyword: "Time de marketing e vendas ",
        desc: "que precisam focar em performance e resultado."
    },
    {
        keyword: "Estudante e universitário ",
        desc: "que buscam acelerar o repertório e se conectar com o mercado de trabalho."
    },

]

const PublicoDSX = () => {
    return (
        <section className="relative bg-black py-20 overflow-hidden no-section-transition">
            {/* Fundo branco com clip-path criando a ponta preta à direita */}
            <div
                className="absolute inset-0 bg-white"
                style={{
                    // Largura da ponta (controla o 80% e o 69%)
                    "--cut": "clamp(70px, 12vw, 220px)",

                    // Altura do recorte do topo (controla o 4%)
                    "--top": "clamp(18px, 3.5vw, 56px)",

                    // “deltinha” entre 80% e 69% (no seu caso era 11% do width)
                    "--kink": "clamp(18px, 3vw, 60px)",

                    clipPath:
                        "polygon(calc(80% - var(--cut)) 0, 100% 0, 100% 100%, 0 100%, 0 var(--top), calc(80% - (var(--cut) + var(--kink))) var(--top))",
                }}
            />



            {/* Conteúdo da seção (fica por cima) */}
            <div className=" relative z-10 max-w-[1600px] mx-auto px-4 text-center py-10">
                <h2 className="font-anton text-3xl md:text-4xl uppercase font-medium text-black">
                    O DSX é para você…
                </h2>
                {/* Adicione mais conteúdo aqui se quiser */}
                <div className="py-6 after:absolute after:content-[''] after:top-20 after:right-2 after:bg-[url(/vector-18.svg)] after:bg-cover after:bg-no-repeat   after:w-[45px] after:h-[45px] ">
                    <picture>
                        <source
                            srcSet="/optimized/step1/optimized/banner-public-component.avif"
                            type="image/avif"
                        />
                        <source
                            srcSet="/optimized/step1/optimized/banner-public-component.webp"
                            type="image/webp"
                        />
                        <img
                            src="/optimized/banner-public-component.jpg"
                            className="relative"
                            alt=""
                            loading="lazy"
                            decoding="async"
                        />
                    </picture>
                </div>
                <div
                    className="
                        grid gap-4 text-left
                        [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]
                        md:gap-6
                    "
                >
                    {cardInf.map((inf) => (
                        <div
                            key={inf.keyword}
                            className="
                                relative
                                pl-8 pr-2
                                md:pl-10
                                after:content-['']
                                after:absolute
                                after:left-0
                                after:top-1/2
                                after:-translate-y-1/2
                                after:w-5 after:h-5
                                md:after:w-6 md:after:h-6
                                after:bg-[url('/vector-19.svg')]
                                after:bg-no-repeat
                                after:bg-contain
                            "
                        >
                            <p className="text-sm md:text-base leading-relaxed">
                                <span className="font-black">{inf.keyword}</span>{" "}
                                {inf.desc}
                            </p>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default PublicoDSX;
