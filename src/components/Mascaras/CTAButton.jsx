const CTAButton = ({ titulo, textColor,link }) => {
    return (
        <>
            <a href={link}>
                <section className="font-jamjuree flex justify-center items-center">
                    {/* ESQUERDA */}
                    <div
                        className="
                    relative
                    rounded-2xl
                    bg-linear-to-r from-[#F3CB46] to-[#E7A040]
                    p-0.5
                    "
                    >
                        <div className="flex justify-center items-center rounded-[14px] w-[200px] h-10">
                            <p className="uppercase text-[14px] font-bold" style={{ color: textColor }}>{titulo}</p>
                        </div>
                    </div>

                    {/* DIREITA */}
                    <div className="relative -ml-0.5 rounded-2xl bg-linear-to-r from-[#E7A040] to-[#E7A040] p-0.5">
                        <div className="relative flex justify-center items-center rounded-[14px] w-[50px] h-10">
                            <img src="/Arrow-2.svg" alt="" aria-hidden="true" className="w-[20px] h-auto rotate-90" />
                        </div>
                    </div>
                </section>
            </a>
        </>
    )
}

export default CTAButton
