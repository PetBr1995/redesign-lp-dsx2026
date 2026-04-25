const HeaderMask = ({ titulo, textColor, backgroundColor, link, target, font, size = "md" }) => {
    const isLarge = size === "lg";

    return (
        <a href={link} target={target}>
            <section className="font-jamjuree relative z-10 flex justify-center items-center">
                
                {/* Wrapper com borda gradient */}
                <div className="relative rounded-2xl bg-gradient-to-r from-[#8E3EEB] to-[#E0474A] p-[2px]">
                    
                    {/* Container interno */}
                    <div
                        className={`relative flex justify-center items-center rounded-[14px] overflow-hidden ${
                            isLarge ? "min-w-[248px] h-12 px-6" : "min-w-[220px] h-11 px-5"
                        }`}
                        style={{ backgroundColor }}
                    >
                        
                        {/* INNER GRADIENT GLOW */}
                        <div className="absolute inset-0 rounded-[14px]
                                        bg-gradient-to-r from-[#8E3EEB] to-[#E0474A]
                                        opacity-40 blur-md">
                        </div>

                        {/* Conteúdo */}
                        <p
                            className={`relative uppercase text-center leading-none ${
                                isLarge ? "text-[15px]" : "text-[14px]"
                            }`}
                            style={{ fontWeight: font, color: textColor }}
                        >
                            {titulo}
                        </p>

                    </div>
                </div>

            </section>
        </a>
    )
}

export default HeaderMask
