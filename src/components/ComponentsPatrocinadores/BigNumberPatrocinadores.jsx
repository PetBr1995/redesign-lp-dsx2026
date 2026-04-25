const BigNumberPatrocinadores = () => {

    const data = [
        {
            number: "+ 2000",
            title: "Participantes",
            desc: "Entre empresários, líderes, gestores e profissionais da área"
        },
        {
            number: "+ 30",
            title: "Expositores",
            desc: "Reunindo marcas, soluções e conexões"
        },
        {
            number: "+ 40",
            title: "Palestrantes",
            desc: "Levaram aos palcos visão de mercado"
        }
    ]

    return (
        <>
            <section className="bg-white px-4 py-8 relative after:absolute after:content-[''] after:bg-cover after:bg-center after:bg-no-repeat after:w-15 after:h-15 after:top-0 after:left-0 after:bg-[url(/vector-22.svg)]">
                <div className="text-center max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3">
                    {data.map((item) => (

                        <div>
                            <h2 className="font-jamjuree font-extrabold text-6xl">{item.number}</h2>
                            <h5 className="uppercase font-medium text-2xl">{item.title}</h5>
                            <p className="mt-4 w-[80%] mx-auto">{item.desc}</p>
                        </div>
                    ))
                    }

                </div>
            </section>
        </>
    )
}

export default BigNumberPatrocinadores